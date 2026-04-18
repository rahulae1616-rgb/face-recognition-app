import path from 'path';
import { fileURLToPath } from 'url';
import { Canvas, Image, ImageData, loadImage } from 'canvas';
import * as faceapi from 'face-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let modelsLoaded = false;

function modelsDir() {
  return path.join(__dirname, '..', '..', 'models');
}

export async function ensureModelsLoaded() {
  if (modelsLoaded) return;
  await faceapi.tf.setBackend('cpu');
  await faceapi.tf.ready();
  const dir = modelsDir();
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(dir);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(dir);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(dir);
  modelsLoaded = true;
}

function ssdOptions() {
  const minConfidence = Number(process.env.MIN_DETECTION_CONFIDENCE ?? 0.5);
  return new faceapi.SsdMobilenetv1Options({
    minConfidence: Number.isFinite(minConfidence) ? minConfidence : 0.5,
  });
}

/**
 * @param {Buffer} imageBuffer
 * @returns {Promise<{ descriptor: number[] } | null>}
 */
export async function extractDescriptorFromBuffer(imageBuffer) {
  await ensureModelsLoaded();
  const img = await loadImage(imageBuffer);
  const result = await faceapi
    .detectSingleFace(img, ssdOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
  if (!result) return null;
  return { descriptor: Array.from(result.descriptor) };
}

/**
 * @param {number[]} a
 * @param {number[]} b
 */
export function euclideanDistance(a, b) {
  return faceapi.euclideanDistance(a, b);
}

/**
 * @param {number[]} query
 * @param {{ userId: string; embedding: number[] }[]} candidates
 * @param {number} threshold
 */
export function findBestMatch(query, candidates, threshold) {
  let best = null;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = euclideanDistance(query, c.embedding);
    if (d < bestDist) {
      bestDist = d;
      best = { userId: c.userId, distance: d };
    }
  }
  if (!best || bestDist > threshold) return null;
  return { ...best, distance: bestDist };
}
