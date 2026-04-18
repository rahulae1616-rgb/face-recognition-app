# 🤖 Face Recognition Full-Stack App

A production-ready face recognition system built with **React**, **Express**, **MongoDB**, and **face-api.js**. This app allows users to register via webcam and recognize faces against a stored database of embeddings.

---

## 🚀 24/7 Public Deployment Guide

To ensure this app runs 24/7 and is accessible from any device, follow these steps:

### 1. Persistent Database (MongoDB Atlas)
The app currently uses an in-memory database as a fallback. To keep your data safe:
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a "Shared" cluster (Free tier).
3. Whitelist IP `0.0.0.0/0` (for cloud access).
4. Get your **Connection String** (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/face_db`).

### 2. Cloud Hosting (Render / Railway / GCP)
I have provided a `Dockerfile` that contains all the native libraries needed for face recognition.

**Using Render (Easiest for 24/7):**
1. Push this codebase to a **GitHub Repository**.
2. Log in to [Render.com](https://render.com/).
3. Create a new **Web Service** and connect your GitHub repo.
4. Set the **Environment Variables**:
   - `MONGODB_URI`: Your Atlas connection string.
   - `NODE_ENV`: `production`
   - `PORT`: `4000`
5. Render will detect the `Dockerfile` and deploy the app to a public URL!

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- Models downloaded (run `npm run download-models` in the backend)

### 1. Setup Backend
```bash
cd backend
npm install
npm run download-models
npm run dev
```
*Backend runs on `http://localhost:4000`*

### 2. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🛡️ Technical Architecture
- **Frontend:** React (Vite) + Framer Motion (Glassmorphism UI).
- **Backend:** Express.js + face-api.js (TensorFlow.js).
- **Storage:** Multer (local image storage) + MongoDB (face embeddings).
- **Face Recognition:** Uses SSD MobileNet V1 for detection and 128-D descriptors for recognition.

## ⚠️ Important Notes
- **HTTPS:** Browsers require HTTPS to access the webcam in production. Hosting providers like Render/GCP provide this automatically.
- **Canvas Support:** For production Linux environments, the `Dockerfile` installs `libcairo2`, `libpango`, and other native dependencies.
