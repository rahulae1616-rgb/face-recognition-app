import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import mongoose from 'mongoose';
import { connectDb, stopDb } from './config/db.js';
import { userRoutes } from './routes/users.js';
import { ensureModelsLoaded } from './services/faceService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 4000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/face_recognition_app';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    db: {
      state: mongoose.connection.readyState, // 0=disconnected,1=connected,2=connecting,3=disconnecting
      name: mongoose.connection.name,
      host: mongoose.connection.host,
    },
  });
});

app.use('/api/users', userRoutes);

// Serve frontend static files
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Global catch-all for SPA routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}


app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      res.status(400).json({ ok: false, message: 'Image is too large (max 5MB).' });
      return;
    }
  }
  if (err?.message === 'Only JPEG, PNG, or WebP images are allowed') {
    res.status(400).json({ ok: false, message: err.message });
    return;
  }
  res.status(500).json({ ok: false, message: err?.message || 'Server error' });
});

async function main() {
  console.log('🚀 Starting Face Recognition Server...');
  const modelsPath = path.join(__dirname, '..', 'models');
  
  if (!fs.existsSync(modelsPath)) {
    console.error('❌ Models folder missing! Please ensure npm run download-models was successful.');
    process.exit(1);
  }

  // Start listening immediately so Render/Cloud hosts see the app as "Healthy"
  const server = app.listen(PORT, async () => {
    console.log(`✅ Server is live on port ${PORT}`);
    
    try {
      console.log('📡 Connecting to Database...');
      const dbInfo = await connectDb(MONGODB_URI);
      console.log('🗄️ Database connected successfully.');
      if (dbInfo?.usingMemory) {
        console.log('⚠️ Using in-memory MongoDB (Data will NOT persist).');
      }

      console.log('🧠 Loading AI Models into memory...');
      const startTime = Date.now();
      await ensureModelsLoaded();
      const endTime = Date.now();
      console.log(`✨ AI Models loaded successfully in ${((endTime - startTime)/1000).toFixed(1)}s!`);
      console.log('🚀 SYSTEM READY');
    } catch (err) {
      console.error('❌ Critical failure during background startup:');
      console.error(err);
      // We don't exit here so the server stays "Up" for debugging logs
    }
  });

  server.on('error', (e) => {
    console.error('❌ Server failed to start:');
    console.error(e);
    process.exit(1);
  });
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});

process.on('SIGINT', async () => {
  await stopDb();
  process.exit(0);
});
