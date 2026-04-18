import fs from 'fs';
import fsp from 'fs/promises';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODELS_DIR = path.join(__dirname, '..', 'models');
const BASE =
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(new URL(res.headers.location, url).href).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`GET ${url} -> ${res.statusCode}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function downloadFile(relPath) {
  const url = `${BASE}/${relPath}`;
  const dest = path.join(MODELS_DIR, relPath);
  await fsp.mkdir(path.dirname(dest), { recursive: true });
  const buf = await get(url);
  await fsp.writeFile(dest, buf);
  process.stdout.write(`OK ${relPath}\n`);
}

/**
 * face-api manifests are a JSON array: [{ paths: ["shard1", ...], weights: [...] }]
 */
async function downloadFromManifest(manifestName) {
  const manifestUrl = `${BASE}/${manifestName}`;
  const manifestBuf = await get(manifestUrl);
  await fsp.writeFile(path.join(MODELS_DIR, manifestName), manifestBuf);
  process.stdout.write(`OK ${manifestName}\n`);

  const parsed = JSON.parse(manifestBuf.toString('utf8'));
  const entry = Array.isArray(parsed) ? parsed[0] : parsed;
  const shardNames = entry?.paths;
  if (!Array.isArray(shardNames)) {
    throw new Error(`Unexpected manifest format: ${manifestName}`);
  }
  const dir = path.posix.dirname(manifestName);
  for (const shard of shardNames) {
    const rel = dir === '.' ? shard : path.posix.join(dir, shard);
    await downloadFile(rel);
  }
}

async function main() {
  if (!fs.existsSync(MODELS_DIR)) {
    await fsp.mkdir(MODELS_DIR, { recursive: true });
  }
  process.stdout.write('Downloading face-api.js weights (this may take a minute)...\n');
  await downloadFromManifest('ssd_mobilenetv1_model-weights_manifest.json');
  await downloadFromManifest('face_landmark_68_model-weights_manifest.json');
  await downloadFromManifest('face_recognition_model-weights_manifest.json');
  process.stdout.write(`\nDone. Models saved to:\n${MODELS_DIR}\n`);
}

main().catch((e) => {
  process.stderr.write(String(e?.stack || e) + '\n');
  process.exit(1);
});
