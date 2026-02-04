# Moodverse - Requirements & Dependencies

This document outlines all system requirements, dependencies, and environment configurations needed to run the Moodverse application.

---

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Frontend Dependencies](#frontend-dependencies)
3. [Backend Dependencies](#backend-dependencies)
4. [Environment Variables](#environment-variables)
5. [Browser Compatibility](#browser-compatibility)
6. [VR Hardware Requirements](#vr-hardware-requirements)
7. [Optional Services](#optional-services)

---

## System Requirements

### Minimum Requirements

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| **Operating System** | macOS 10.15+ / Windows 10+ / Linux (Ubuntu 20.04+) | Latest stable |
| **Node.js** | v18.0.0 or higher | v20.x LTS |
| **npm** | v9.0.0 or higher | v10.x |
| **RAM** | 4 GB | 8 GB+ |
| **Storage** | 500 MB free | 1 GB+ free |
| **Processor** | Dual-core | Quad-core |
| **Graphics** | Integrated graphics | Dedicated GPU (for VR) |

### Recommended Development Environment

- **OS**: macOS 14+ or Windows 11 with WSL2
- **Node.js**: v20.x LTS (using nvm for version management)
- **IDE**: VS Code with extensions:
  - ESLint
  - Prettier
  - TypeScript Hero
  - React Developer Tools

---

## Frontend Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.11.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "axios": "^1.13.2",
    "aframe": "^1.4.0",
    "chart.js": "^4.5.1",
    "react-chartjs-2": "^5.3.1",
    "face-api.js": "^0.22.2",
    "@types/react-router-dom": "^5.3.3"
  }
}
```

### Dependency Details

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | ^18.2.0 | Core UI framework |
| **react-dom** | ^18.2.0 | DOM rendering |
| **react-router-dom** | ^7.11.0 | Client-side routing |
| **typescript** | ^5.0.0 | Type safety |
| **vite** | ^5.0.0 | Build tool & dev server |
| **axios** | ^1.13.2 | HTTP client for API calls |
| **aframe** | ^1.4.0 | WebVR/WebXR framework |
| **face-api.js** | ^0.22.2 | Face detection & emotion recognition |
| **chart.js** | ^4.5.1 | Data visualization |
| **react-chartjs-2** | ^5.3.1 | React wrapper for Chart.js |

### Development Dependencies

```json
{
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "vitest": "^4.0.16",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/user-event": "^14.4.3",
    "jsdom": "^22.1.0",
    "@playwright/test": "^1.57.0"
  }
}
```

### Frontend Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **@vitejs/plugin-react** | ^4.0.0 | Vite React plugin |
| **@types/react** | ^18.0.0 | React TypeScript types |
| **@types/react-dom** | ^18.0.0 | React DOM TypeScript types |
| **vitest** | ^4.0.16 | Unit testing framework |
| **@testing-library/react** | ^14.0.0 | React component testing |
| **@testing-library/jest-dom** | ^6.0.0 | Jest DOM matchers |
| **@testing-library/user-event** | ^14.4.3 | User event simulation |
| **jsdom** | ^22.1.0 | DOM emulation for testing |
| **@playwright/test** | ^1.57.0 | E2E testing framework |

### Frontend Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview --port 5173

# Run unit tests
npm run test

# Watch mode for tests
npm run test:watch

# UI mode for tests
npm run test:ui

# End-to-end tests
npm run e2e
```

---

## Backend Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "helmet": "^8.1.0",
    "xss-clean": "^0.1.4",
    "express-rate-limit": "^8.2.1",
    "morgan": "^1.10.1",
    "openai": "^4.3.1"
  }
}
```

### Backend Dependency Details

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | ^4.18.0 | Web framework |
| **cors** | ^2.8.5 | Cross-origin resource sharing |
| **dotenv** | ^16.0.0 | Environment variable management |
| **helmet** | ^8.1.0 | Security headers |
| **xss-clean** | ^0.1.4 | XSS protection middleware |
| **express-rate-limit** | ^8.2.1 | API rate limiting |
| **morgan** | ^1.10.1 | HTTP request logging |
| **openai** | ^4.3.1 | OpenAI API client |

### Backend Dev Dependencies

```json
{
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
```

### Backend Scripts

```bash
# Production start
npm start

# Development with auto-reload
npm run dev
```

---

## Environment Variables

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3001/api

# Optional: Analytics
VITE_ANALYTICS_ID=your_analytics_id

# Optional: Feature Flags
VITE_ENABLE_VR=true
VITE_ENABLE_MOOD_DETECTION=true
```

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OpenAI API (Optional - for AI chatbot)
OPENAI_API_KEY=sk-your_openai_api_key_here

# CORS Origins
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=200

# Security
SESSION_SECRET=your_session_secret_here
```

### Required vs Optional Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 3001 | Backend server port |
| `NODE_ENV` | No | development | Environment mode |
| `OPENAI_API_KEY` | No | - | For AI chatbot features |
| `ALLOWED_ORIGINS` | No | localhost:3000,localhost:5173 | CORS origins |
| `VITE_API_URL` | No | http://localhost:3001/api | API endpoint |

---

## Browser Compatibility

### Desktop Browsers

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| **Chrome** | 90+ | ✅ Full Support | Best experience, WebXR support |
| **Firefox** | 90+ | ✅ Full Support | Good WebXR support |
| **Safari** | 15+ | ⚠️ Partial | No WebXR, basic features work |
| **Edge** | 90+ | ✅ Full Support | Chromium-based, WebXR |
| **Opera** | 75+ | ✅ Full Support | Chromium-based |

### Mobile Browsers

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| **Chrome (Android)** | 90+ | ✅ Full Support | VR via Cardboard |
| **Safari (iOS)** | 15+ | ⚠️ Partial | No WebXR, basic features |
| **Firefox (Mobile)** | 90+ | ✅ Full Support | VR support |
| **Samsung Internet** | 16+ | ✅ Full Support | Chromium-based |

### Feature Support Matrix

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| **React 18** | ✅ | ✅ | ✅ | ✅ |
| **WebXR/VR** | ✅ | ✅ | ❌ | ✅ |
| **face-api.js** | ✅ | ✅ | ✅ | ✅ |
| **MediaDevices** | ✅ | ✅ | ✅ | ✅ |
| **Web Audio API** | ✅ | ✅ | ✅ | ✅ |
| **Service Workers** | ✅ | ✅ | ✅ | ✅ |
| **WebGL** | ✅ | ✅ | ✅ | ✅ |

---

## VR Hardware Requirements

### Meta Quest Series

| Device | Status | Notes |
|--------|--------|-------|
| **Meta Quest 2** | ✅ Full Support | Native WebXR |
| **Meta Quest 3** | ✅ Full Support | Native WebXR |
| **Meta Quest Pro** | ✅ Full Support | Native WebXR |

### PC VR Headsets

| Device | Status | Notes |
|--------|--------|-------|
| **HTC Vive** | ✅ Supported | Via Link or browser |
| **HTC Vive Pro** | ✅ Supported | Via Link or browser |
| **Valve Index** | ✅ Supported | Browser-based |
| **Windows Mixed Reality** | ✅ Supported | Chromium-based |
| **Pico Neo** | ⚠️ Limited | May require specific browser |

### Mobile VR

| Device | Status | Notes |
|--------|--------|-------|
| **Google Cardboard** | ✅ Supported | iOS and Android |
| **Samsung Gear VR** | ⚠️ Limited | Discontinued |
| **Daydream** | ⚠️ Limited | Discontinued |

### Desktop VR Requirements

For VR on desktop (without headset):

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **Browser** | Chrome 90+ / Edge 90+ | Latest Chrome |
| **WebGL** | 2.0 | 2.0 |
| **RAM** | 4 GB | 8 GB |
| **GPU** | Integrated | Dedicated GPU |
| **Mouse** | Required | For look controls |

---

## Optional Services

### OpenAI API (AI Chatbot)

**Status**: Optional

The AI chatbot feature requires an OpenAI API key for full functionality. Without it, the chatbot uses a local fallback with limited responses.

```bash
# Get API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your_key_here
```

**Pricing**: Pay-per-use (~$0.01-0.06 per 1K tokens)

### Analytics (Optional)

**Status**: Optional

Google Analytics or similar can be integrated for usage tracking.

```env
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

### External APIs

| Service | Purpose | Required | Cost |
|---------|---------|----------|------|
| **OpenAI** | AI chatbot | No | Pay-per-use |
| **Pannellum** | 360° panoramas | No | Free CDN |
| **PolyHaven** | HDRI lighting | No | Free |
| **A-Frame CDN** | WebXR framework | No | Free |

---

## Installation Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ or yarn installed
- [ ] Clone the repository
- [ ] Frontend: `cd frontend && npm install`
- [ ] Backend: `cd backend && npm install`
- [ ] Backend: Copy `.env.example` to `.env`
- [ ] Backend: Add `OPENAI_API_KEY` (optional)
- [ ] Frontend: `npm run dev`
- [ ] Backend: `npm run dev` (in separate terminal)

---

## Troubleshooting

### Common Issues

#### Node.js Version Mismatch
```bash
# Check Node version
node --version

# If using nvm
nvm use 18
```

#### Port Already in Use
```bash
# Find process using port
lsof -i :5173
lsof -i :3001

# Kill process
kill -9 <PID>
```

#### npm Install Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### VR Not Working
1. Check browser compatibility
2. Enable WebXR in browser settings
3. Ensure HTTPS (required for WebXR)
4. Check console for CSP errors

---

## Version Information

| Component | Version | Last Updated |
|-----------|---------|--------------|
| **React** | 18.2.0 | 2024 |
| **TypeScript** | 5.0.0 | 2024 |
| **Vite** | 5.0.0 | 2024 |
| **A-Frame** | 1.4.0 | 2024 |
| **Express** | 4.18.0 | 2024 |
| **Node.js** | 18.x LTS | 2024 |

---

*Last updated: 2024*
*For questions, see README.md for support information*

