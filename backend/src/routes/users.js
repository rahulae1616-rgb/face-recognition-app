import express from 'express';
import fs from 'fs/promises';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User.js';
import { upload } from '../middleware/upload.js';
import {
  extractDescriptorFromBuffer,
  findBestMatch,
  euclideanDistance,
} from '../services/faceService.js';

const router = express.Router();

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Argentina',
  'Australia',
  'Austria',
  'Bangladesh',
  'Belgium',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Denmark',
  'Egypt',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Italy',
  'Japan',
  'Kenya',
  'Malaysia',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Nigeria',
  'Norway',
  'Pakistan',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Russia',
  'Saudi Arabia',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Sweden',
  'Switzerland',
  'Thailand',
  'Turkey',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Vietnam',
];

const GMAIL_RE = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

function validationErrors(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ ok: false, errors: errors.array() });
    return true;
  }
  return false;
}

router.post(
  '/register',
  upload.single('photo'),
  body('name').trim().notEmpty().isLength({ max: 120 }),
  body('age').isInt({ min: 1, max: 150 }),
  body('email').trim().notEmpty(),
  body('country').trim().notEmpty().isLength({ max: 120 }),
  async (req, res) => {
    if (validationErrors(req, res)) return;
    if (!req.file) {
      res.status(400).json({ ok: false, message: 'Photo is required' });
      return;
    }

    const { name, age, email, country } = req.body;
    if (!GMAIL_RE.test(email)) {
      await fs.unlink(req.file.path).catch(() => {});
      res.status(400).json({ ok: false, message: 'Only Gmail addresses (@gmail.com) are allowed' });
      return;
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      await fs.unlink(req.file.path).catch(() => {});
      res.status(409).json({ ok: false, message: 'This email is already registered' });
      return;
    }

    let descriptor;
    try {
      const buf = await fs.readFile(req.file.path);
      const extracted = await extractDescriptorFromBuffer(buf);
      if (!extracted) {
        await fs.unlink(req.file.path).catch(() => {});
        res.status(400).json({
          ok: false,
          message: 'No clear face detected in the photo. Try better lighting and face the camera.',
        });
        return;
      }
      descriptor = extracted.descriptor;
    } catch (e) {
      await fs.unlink(req.file.path).catch(() => {});
      res.status(500).json({ ok: false, message: 'Failed to process face image' });
      return;
    }

    const dupThreshold = Number(process.env.DUPLICATE_FACE_THRESHOLD ?? 0.45);
    const others = await User.find({}, { embedding: 1 }).lean();
    for (const u of others) {
      const d = euclideanDistance(descriptor, u.embedding);
      if (d < dupThreshold) {
        await fs.unlink(req.file.path).catch(() => {});
        res.status(409).json({
          ok: false,
          message: 'A profile with a very similar face already exists. Use a different account or contact support.',
        });
        return;
      }
    }

    try {
      const user = await User.create({
        name,
        age: Number(age),
        email: email.toLowerCase(),
        country,
        imageFilename: req.file.filename,
        embedding: descriptor,
      });
      res.status(201).json({
        ok: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          age: user.age,
          email: user.email,
          country: user.country,
        },
      });
    } catch (err) {
      await fs.unlink(req.file.path).catch(() => {});
      if (err?.code === 11000) {
        res.status(409).json({ ok: false, message: 'This email is already registered' });
        return;
      }
      res.status(500).json({ ok: false, message: 'Registration failed' });
    }
  }
);

router.post(
  '/recognize',
  upload.single('photo'),
  async (req, res) => {
    if (!req.file) {
      res.status(400).json({ ok: false, message: 'Photo is required' });
      return;
    }
    let descriptor;
    try {
      const buf = await fs.readFile(req.file.path);
      const extracted = await extractDescriptorFromBuffer(buf);
      if (!extracted) {
        res.status(400).json({
          ok: false,
          message: 'No face detected. Center your face in the frame and try again.',
        });
        return;
      }
      descriptor = extracted.descriptor;
    } catch {
      res.status(500).json({ ok: false, message: 'Failed to process image' });
      return;
    } finally {
      await fs.unlink(req.file.path).catch(() => {});
    }

    const threshold = Number(process.env.FACE_MATCH_THRESHOLD ?? 0.55);
    const users = await User.find({}, { embedding: 1, name: 1, age: 1, email: 1, country: 1 }).lean();
    const candidates = users.map((u) => ({
      userId: u._id.toString(),
      embedding: u.embedding,
    }));
    const match = findBestMatch(descriptor, candidates, threshold);

    if (!match) {
      res.json({ ok: true, matched: false, message: 'Please Register First' });
      return;
    }

    const user = users.find((u) => u._id.toString() === match.userId);
    res.json({
      ok: true,
      matched: true,
      distance: match.distance,
      user: user
        ? {
            name: user.name,
            age: user.age,
            email: user.email,
            country: user.country,
          }
        : null,
    });
  }
);

router.get('/countries', (_req, res) => {
  res.json({ ok: true, countries: COUNTRIES });
});

export { router as userRoutes };
