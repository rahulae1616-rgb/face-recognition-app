# Face recognition web app (React + Express + MongoDB)

This workspace contains a **separate frontend and backend** for registering users with a webcam photo, storing **128-D face embeddings** (face-api.js) in MongoDB, and recognizing faces against stored profiles.

## Prerequisites

- **Node.js 18+** (Node 22 is supported; the backend pins **`canvas` v3**, which ships prebuilt binaries for recent Node versions on Windows/macOS/Linux.)
- **MongoDB** (local install, Atlas, or Docker)

### Quick MongoDB (Docker)

From the repository root:

```bash
docker compose up -d
```

This exposes MongoDB on `mongodb://127.0.0.1:27017`.

## Backend setup (`backend/`)

```bash
cd backend
npm install
npm run download-models
copy .env.example .env
npm run dev
```

Notes:

- `npm run download-models` downloads SSD MobileNet, landmark, and recognition weights into `backend/models/`.
- Edit `.env` if your Mongo URI or frontend origin differs.
- Registered face images are stored under `backend/uploads/` and served at `http://localhost:4000/uploads/<filename>`.

Default API: `http://localhost:4000`

## Frontend setup (`frontend/`)

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

The Vite dev server **proxies** `/api` and `/uploads` to the backend on port **4000**.

## Environment variables

See `backend/.env.example`:

- `MONGODB_URI` — Mongo connection string
- `CLIENT_ORIGIN` — CORS origin (default `http://localhost:5173`)
- `FACE_MATCH_THRESHOLD` — max Euclidean distance for a positive match (lower = stricter)
- `DUPLICATE_FACE_THRESHOLD` — reject registration if closest existing face is nearer than this
- `MIN_DETECTION_CONFIDENCE` — SSD face detector minimum score

## API

- `GET /api/health`
- `GET /api/users/countries`
- `POST /api/users/register` — `multipart/form-data`: `name`, `age`, `email`, `country`, `photo` (image)
- `POST /api/users/recognize` — `multipart/form-data`: `photo` (image)

## Troubleshooting

- **Backend exits with “Models folder missing”** — run `npm run download-models` inside `backend/`.
- **“No clear face detected”** — improve lighting, face the camera, move closer, and avoid heavy motion blur.
- **Canvas / native module errors** — this project uses **`canvas@3`**, which usually installs via **prebuilds**. If you still hit compile errors, install the **Desktop development with C++** workload in Visual Studio Build Tools, or switch to **Node 20 LTS**, then delete `backend/node_modules` and run `npm install` again.
- **Camera blocked** — use HTTPS in production; for local dev, browsers allow `http://localhost` camera access after permission prompt.
