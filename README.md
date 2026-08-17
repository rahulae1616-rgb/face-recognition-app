<div align="center">

<!-- Animated Shields & Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/AI Engine-face--api.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white" alt="face-api.js">
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  <a href="https://github.com/rahulae1616-rgb/face-recognition-app">
    <img src="https://img.shields.io/badge/GitHub-rahulae1616--rgb-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

<br>

<!-- Stylish Animated SVG Title Banner -->
<svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="160">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="frBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#030b17">
        <animate attributeName="stop-color" values="#030b17;#051a33;#021226;#030b17" dur="10s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" stop-color="#0a2a4a">
        <animate attributeName="stop-color" values="#0a2a4a;#023859;#0c3259;#0a2a4a" dur="10s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#010612">
        <animate attributeName="stop-color" values="#010612;#02142b;#010612" dur="10s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>

    <!-- Shimmer Text Gradient -->
    <linearGradient id="frTextGrad" x1="-100%" y1="0%" x2="200%" y2="0%">
      <stop offset="0%" stop-color="#00ff88">
        <animate attributeName="offset" values="-1;2" dur="3.6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="25%" stop-color="#00f2fe">
        <animate attributeName="offset" values="-0.75;2.25" dur="3.6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="50%" stop-color="#4facfe">
        <animate attributeName="offset" values="-0.5;2.5" dur="3.6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="75%" stop-color="#61dafb">
        <animate attributeName="offset" values="-0.25;2.75" dur="3.6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#00ff88">
        <animate attributeName="offset" values="0;3" dur="3.6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>

    <!-- Neon Glow Filter -->
    <filter id="frGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <pattern id="frGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 136, 0.05)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Container Box -->
  <rect width="800" height="160" rx="16" fill="url(#frBgGrad)" stroke="rgba(0, 255, 136, 0.3)" stroke-width="1.5"/>
  <rect width="800" height="160" rx="16" fill="url(#frGrid)"/>

  <!-- Biometric HUD Targeting Corner Lines (Left Box) -->
  <g transform="translate(60, 40)" stroke="#00ff88" stroke-width="2" fill="none" opacity="0.8">
    <path d="M 0,15 L 0,0 L 15,0"/>
    <path d="M 65,0 L 80,0 L 80,15"/>
    <path d="M 0,65 L 0,80 L 15,80"/>
    <path d="M 65,80 L 80,80 L 80,65"/>
    <!-- Face Silhouette Dots -->
    <circle cx="40" cy="30" r="14" stroke="rgba(0, 255, 136, 0.4)" stroke-dasharray="3 3"/>
    <circle cx="33" cy="28" r="2" fill="#00ff88"/>
    <circle cx="47" cy="28" r="2" fill="#00ff88"/>
    <path d="M35,42 Q40,47 45,42" stroke="#00ff88" stroke-width="1.5"/>
    <!-- Laser Scanning Line inside Reticle -->
    <line x1="2" y1="10" x2="78" y2="10" stroke="#00ff88" stroke-width="1.5">
      <animate attributeName="y1" values="5;75;5" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="y2" values="5;75;5" dur="2s" repeatCount="indefinite"/>
    </line>
  </g>

  <!-- Biometric HUD Reticle (Right Side) -->
  <g transform="translate(660, 40)" stroke="#00f2fe" stroke-width="2" fill="none" opacity="0.8">
    <path d="M 0,15 L 0,0 L 15,0"/>
    <path d="M 65,0 L 80,0 L 80,15"/>
    <path d="M 0,65 L 0,80 L 15,80"/>
    <path d="M 65,80 L 80,80 L 80,65"/>
    <circle cx="40" cy="40" r="22" stroke="rgba(0, 242, 254, 0.4)" stroke-dasharray="4 4">
      <animateTransform attributeName="transform" type="rotate" values="0 40 40;360 40 40" dur="8s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- Main Title -->
  <text x="400" y="70" text-anchor="middle" fill="url(#frTextGrad)" font-family="'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="900" letter-spacing="3" filter="url(#frGlow)">
    🤖 FACE RECOGNITION 🤖
  </text>

  <!-- Subtitle -->
  <text x="400" y="105" text-anchor="middle" fill="#e0f2fe" font-family="'Segoe UI', sans-serif" font-size="16" font-weight="600" letter-spacing="1.5">
    Real-Time AI Biometrics &amp; Facial Recognition System
    <animate attributeName="opacity" values="1;0.65;1" dur="3.2s" repeatCount="indefinite"/>
  </text>

  <!-- Animated Bottom Accent -->
  <rect x="250" y="125" width="300" height="3" rx="1.5" fill="url(#frTextGrad)">
    <animate attributeName="width" values="220;350;220" dur="3.8s" repeatCount="indefinite"/>
    <animate attributeName="x" values="290;225;290" dur="3.8s" repeatCount="indefinite"/>
  </rect>
</svg>

<br>
<br>

> 🔍 **Face Recognition Full-Stack App** is an AI biometrics solution engineered with **React (Vite)**, **Express.js**, **MongoDB Atlas**, and **face-api.js** (TensorFlow.js). Users can register faces via webcam and perform instant 128-dimensional facial embedding matching against a stored vector database.

</div>

---

## ⚡ Key Highlights

- 🎥 **Real-Time Webcam Scan:** Live facial landmark tracking and biometric scanning right in the browser.
- 🧠 **TensorFlow.js & SSD MobileNet V1:** High-accuracy face detection model with 128-D vector extraction.
- 💾 **Persistent Vector Storage:** MongoDB integration for storing user profile metadata & face embeddings.
- 💎 **Glassmorphic UI:** Modern UI crafted with React, Framer Motion, and Tailwind-inspired styling.
- 🐳 **Production Dockerized:** Includes Linux canvas native builds (`libcairo2`, `libpango`) ready for 24/7 cloud hosting on Render or GCP.

---

## 🏗️ Architecture & Data Flow

```
┌──────────────────────┐        Webcam Stream        ┌──────────────────────────┐
│  React (Vite) Frontend│ ────────────────────────>  │ Express + face-api.js    │
│  Framer Motion UI    │                            │ TensorFlow.js AI Model   │
└──────────────────────┘                            └────────────┬─────────────┘
                                                                 │
                                                   128-D Vectors │
                                                                 ▼
                                                    ┌──────────────────────────┐
                                                    │ MongoDB Atlas Database   │
                                                    │ User Profiles & Descriptors│
                                                    └──────────────────────────┘
```

---

## 🚀 24/7 Production Cloud Deployment

To host this app online 24/7 with zero downtime:

### 1. **Database Setup (MongoDB Atlas)**
1. Register a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free shared cluster.
3. Whitelist Network IP `0.0.0.0/0` (allows cloud access).
4. Obtain your connection string:
   `mongodb+srv://<username>:<password>@cluster.mongodb.net/face_db`

### 2. **Render Cloud Hosting (Recommended)**
1. Connect your GitHub repository to [Render.com](https://render.com/).
2. Create a new **Web Service** selecting this repository.
3. Configure **Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `NODE_ENV`: `production`
   - `PORT`: `4000`
4. Render will detect the included [`Dockerfile`](Dockerfile) and build all C++ canvas dependencies automatically!

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js 18+** (Node 20 recommended)
- **npm** or **yarn**

### 1. **Setup & Start Backend**
```bash
cd backend
npm install
npm run download-models
npm run dev
```
*Backend runs on `http://localhost:4000`*

### 2. **Setup & Start Frontend**
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🛠️ Stack & Technologies

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Framer Motion, HTML5 Canvas API |
| **Backend** | Node.js, Express.js, Multer |
| **AI / Machine Learning** | `@vladmandic/face-api` (TensorFlow.js backend) |
| **Database** | MongoDB & Mongoose |
| **Containerization** | Docker (`node:20-slim` + `libcairo2-dev`, `libgif-dev`, `pango`) |

---

## ⚠️ Notes & Requirements
- **Webcam HTTPS Rule:** Modern web browsers require HTTPS (or `localhost`) to access webcam video streams. Cloud services like Render automatically provide SSL certificates.
- **Canvas Binaries:** The provided [`Dockerfile`](Dockerfile) takes care of installing native C++ libraries required by `canvas` and TensorFlow on Linux environments.

---

## 👨‍💻 Author

Developed by **RAHUL CHANDRA**
- 🐙 **GitHub:** [@rahulae1616-rgb](https://github.com/rahulae1616-rgb)

---

## 📜 License

Distributed under the **MIT License**.
