# Moodverse - Design System & Architecture

This document outlines the design system, visual language, component architecture, and technical design decisions for the Moodverse application.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Design Patterns](#design-patterns)
5. [Component Architecture](#component-architecture)
6. [VR/360° Implementation](#vr360-implementation)
7. [State Management](#state-management)
8. [API Architecture](#api-architecture)
9. [Security Architecture](#security-architecture)

---

## Design Philosophy

### Core Principles

1. **Calm & Inviting**: The design should reduce anxiety and create a sense of peace
2. **Accessible**: All users should be able to access features regardless of ability
3. **Minimalist**: Clean interfaces with purposeful elements
4. **Responsive**: Works seamlessly across all device sizes
5. **Warm**: Use warm colors and soft shapes to evoke comfort

### Design Goals

- **Reduce cognitive load** through simple, intuitive interfaces
- **Create immersion** in therapeutic VR experiences
- **Build trust** with transparent, honest design
- **Encourage engagement** through rewarding interactions

---

## Color Palette

### Primary Colors

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Primary Teal** | `#6BD3C7` | (107, 211, 199) | Main brand color, buttons, accents |
| **Deep Teal** | `#2A9D8F` | (42, 157, 143) | Darker accents, headers |
| **Soft Mint** | `#A8E6CF` | (168, 230, 207) | Light backgrounds, success states |
| **Ocean Blue** | `#457B9D` | (69, 123, 157) | Links, secondary actions |

### Neutral Colors

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Dark Slate** | `#1D3557` | (29, 53, 87) | Text, headings |
| **Charcoal** | `#264653` | (38, 70, 83) | Body text |
| **Slate Gray** | `#64748B` | (100, 116, 139) | Secondary text, borders |
| **Light Gray** | `#F1F5F9` | (241, 245, 249) | Page backgrounds |
| **White** | `#FFFFFF` | (255, 255, 255) | Cards, modals |

### Emotional Colors

| Color Name | Hex | RGB | Emotion |
|------------|-----|-----|---------|
| **Calm Blue** | `#90E0EF` | (144, 224, 239) | Serenity, trust |
| **Warm Coral** | `#FFB5A7` | (255, 181, 167) | Warmth, comfort |
| **Soft Lavender** | `#CDB4DB` | (205, 180, 219) | Calm, relaxation |
| **Sunny Yellow** | `#FDFD96` | (253, 253, 150) | Happiness, energy |
| **Nature Green** | `#B5E48C` | (181, 228, 140) | Growth, renewal |

### Status Colors

| Status | Hex | RGB | Usage |
|--------|-----|-----|-------|
| **Success** | `#10B981` | (16, 185, 129) | Success messages, completed actions |
| **Warning** | `#F59E0B` | (245, 158, 11) | Warnings, cautions |
| **Error** | `#EF4444` | (239, 68, 68) | Errors, failed actions |
| **Info** | `#3B82F6` | (59, 130, 246) | Informational messages |

### CSS Variables

```css
:root {
  /* Primary Colors */
  --color-primary: #6BD3C7;
  --color-primary-dark: #2A9D8F;
  --color-primary-light: #A8E6CF;
  --color-secondary: #457B9D;

  /* Neutrals */
  --color-dark: #1D3557;
  --color-charcoal: #264653;
  --color-slate: #64748B;
  --color-light: #F1F5F9;
  --color-white: #FFFFFF;

  /* Emotional */
  --color-calm: #90E0EF;
  --color-warm: #FFB5A7;
  --color-relax: #CDB4DB;
  --color-happy: #FDFD96;
  --color-nature: #B5E48C;

  /* Status */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;

  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;

  /* Border Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

---

## Typography

### Font Family

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Font Scale

| Level | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| **Display** | 3.5rem | 1.1 | 700 | Hero headlines |
| **H1** | 2.5rem | 1.2 | 700 | Section headers |
| **H2** | 2rem | 1.3 | 600 | Subsection headers |
| **H3** | 1.5rem | 1.4 | 600 | Card headers |
| **Body Large** | 1.125rem | 1.6 | 400 | Lead paragraphs |
| **Body** | 1rem | 1.6 | 400 | Regular text |
| **Body Small** | 0.875rem | 1.5 | 400 | Secondary text |
| **Caption** | 0.75rem | 1.4 | 400 | Labels, metadata |

### CSS Classes

```css
.text-display { font-size: 3.5rem; font-weight: 700; line-height: 1.1; }
.text-h1 { font-size: 2.5rem; font-weight: 700; line-height: 1.2; }
.text-h2 { font-size: 2rem; font-weight: 600; line-height: 1.3; }
.text-h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
.text-body-lg { font-size: 1.125rem; line-height: 1.6; }
.text-body { font-size: 1rem; line-height: 1.6; }
.text-body-sm { font-size: 0.875rem; line-height: 1.5; }
.text-caption { font-size: 0.75rem; line-height: 1.4; }
```

---

## Design Patterns

### Glassmorphism

The application uses glassmorphism for cards and overlays:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Gradient Backgrounds

```css
.gradient-bg {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-calm));
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Glow Effects

```css
.glow-effect {
  box-shadow: 0 0 20px rgba(107, 211, 199, 0.4);
}

.glow-effect:hover {
  box-shadow: 0 0 30px rgba(107, 211, 199, 0.6);
}
```

### Hover Interactions

```css
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

---

## Component Architecture

### Component Hierarchy

```
App
├── SessionProvider
│   └── AppContent
│       ├── ConsentManager
│       ├── BrowserRouter
│       └── Routes
│           └── Route (Layout)
│               ├── Navbar
│               ├── Sidebar (if applicable)
│               └── Outlet (Page content)
│                   ├── Home
│                   ├── MoodScanner
│                   ├── Meditation
│                   ├── VrRooms
│                   ├── Music
│                   ├── Journal
│                   ├── Community
│                   ├── Yoga
│                   ├── Games
│                   ├── Books
│                   ├── Therapy
│                   ├── Resources
│                   ├── Dashboard
│                   ├── LoginPage
│                   └── ContactPage
```

### Component Patterns

#### 1. Functional Components with Hooks

```tsx
// Example: Button component pattern
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false
}: ButtonProps) {
  const className = `btn ${variant} ${size} ${disabled ? 'disabled' : ''}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

#### 2. Component Composition

```tsx
// Example: Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

// Usage with composition
<Card className="glass-card hover-lift">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

#### 3. Custom Hooks

```tsx
// Example: useEmotionDetection hook
import { useState, useEffect, useCallback } from 'react';

interface EmotionResult {
  emotion: string;
  confidence: number;
}

export function useEmotionDetection() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const detectEmotion = useCallback(async (imageSource: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Face detection logic here
      const emotion = await faceapi.detectEmotion(imageSource);
      setResult(emotion);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { detectEmotion, isLoading, result, error };
}
```

---

## VR/360° Implementation

### VR Architecture

The VR system uses A-Frame for WebXR experiences with proper 360° panorama rendering.

### Component Structure

```
VRRoom/
├── VRRoom.tsx          # Main VR container component
├── VRRoom.css          # VR-specific styles
├── VRSelector.tsx      # Environment selector
├── VRLibrary.tsx       # Full VR content library
└── VrRooms.tsx         # VR rooms page wrapper
```

### VR Room Component

```tsx
// frontend/src/components/VRRoom.tsx
import React, { useRef, useState, useCallback } from 'react';
import './VRRoom.css';

interface VRPanorama {
  id: string;
  name: string;
  description: string;
  panoramaUrl: string;  // JPG/PNG for skybox ONLY
  hdriUrl?: string;     // HDR for lighting only
  audioUrl?: string;
  thumbnailUrl: string;
  category: string;
  mood: string[];
}

interface VRRoomProps {
  panorama: VRPanorama;
  onClose?: () => void;
}

export default function VRRoom({ panorama, onClose }: VRRoomProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = useCallback(async () => {
    if (!audioEnabled && panorama.audioUrl) {
      try {
        audioRef.current = new Audio();
        audioRef.current.crossOrigin = 'anonymous';
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.src = panorama.audioUrl;
        await audioRef.current.play();
        setAudioEnabled(true);
      } catch (err) {
        console.error('Audio play failed:', err);
      }
    } else {
      audioRef.current?.pause();
      setAudioEnabled(false);
    }
  }, [audioEnabled, panorama.audioUrl]);

  return (
    <div className="vr-room">
      <a-scene embedded vr-mode-ui="enabled: true">
        <a-assets>
          <img 
            id="panorama-texture"
            src={panorama.panoramaUrl}
            crossOrigin="anonymous"
          />
          {panorama.audioUrl && (
            <audio id="ambient-audio" src={panorama.audioUrl} loop preload="none" />
          )}
        </a-assets>

        <a-sky src="#panorama-texture" rotation="0 -90 0" />

        <a-entity id="rig" position="0 1.6 0">
          <a-camera look-controls="pointerLockEnabled: false" wasd-controls="enabled: true">
            <a-cursor color="#6BD3C7" />
          </a-camera>
        </a-entity>
      </a-scene>

      <div className="vr-controls">
        <button onClick={toggleAudio}>
          {audioEnabled ? '🔊 Disable Audio' : '🔇 Enable Audio'}
        </button>
        {onClose && (
          <button onClick={onClose}>Exit VR</button>
        )}
      </div>
    </div>
  );
}
```

### VR Environment Data Model

```typescript
// frontend/src/types/vr.ts
export interface VRPanorama {
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'urban' | 'space' | 'indoor' | 'abstract';
  mood: string[];
  panoramaUrl: string;      // Required: JPG/PNG for skybox
  thumbnailUrl: string;
  audioUrl?: string;        // Optional: ambient audio
  hdriUrl?: string;         // Optional: HDR for lighting
  position?: { x: number; y: number; z: number };
}

// Example environments
export const CURATED_ENVIRONMENTS: VRPanorama[] = [
  {
    id: 'sechelt-beach',
    name: 'Sechelt Beach',
    description: 'Beautiful coastal beach with ocean views',
    category: 'nature',
    mood: ['Relaxation', 'Peace', 'Calm'],
    panoramaUrl: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg',
    thumbnailUrl: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg',
    audioUrl: 'https://cdn.aframe.io/360-image-gallery-boilerplate/audio/sea.mp3',
    position: { x: 0, y: 1.6, z: 0 }
  }
];
```

---

## State Management

### Local State with useState

```tsx
// Simple component state
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<DataType | null>(null);
const [error, setError] = useState<Error | null>(null);
```

### Context API for Global State

```tsx
// Session context for user state
interface SessionContextType {
  userData: User | null;
  isAuthenticated: boolean;
  hasConsent: boolean;
  login: (data: User) => void;
  logout: () => void;
  grantConsent: () => void;
}

export const SessionContext = createContext<SessionContextType | null>(null);

// Usage in component
const { userData, login, logout } = useSession();
```

### LocalStorage for Persistence

```tsx
// Chat history persistence
const [messages, setMessages] = useState(() => {
  try {
    const raw = localStorage.getItem('moodverse_chat');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem('moodverse_chat', JSON.stringify(messages));
}, [messages]);
```

---

## API Architecture

### Backend Routes

```
backend/
├── server.js              # Express app setup
└── routes/
    ├── chat.js            # POST /api/chat
    ├── posts.js           # GET/POST /api/posts
    └── resources.js       # GET /api/resources
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/chat` | AI chatbot conversation |
| **GET** | `/api/posts` | Get community posts |
| **POST** | `/api/posts` | Create new post |
| **GET** | `/api/resources` | Get mental health resources |

### API Response Format

```typescript
// Success response
interface ApiResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

// Error response
interface ApiError {
  success: false;
  error: string;
  code: string;
  timestamp: string;
}
```

### Chat API Example

```javascript
// backend/routes/chat.js
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a supportive mental wellness companion...'
        },
        { role: 'user', content: message }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Failed to get response' });
  }
});

export default router;
```

---

## Security Architecture

### Content Security Policy (CSP)

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://aframe.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https: blob:;
  media-src 'self' data: https: blob:;
  connect-src 'self' https:;
  frame-src 'self' https://aframe.io;
" />
```

### Input Sanitization

```typescript
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')           // Remove angle brackets
    .replace(/javascript:/gi, '')     // Remove javascript: protocol
    .replace(/on\w+=/gi, '')         // Remove event handlers
    .trim();
}
```

### URL Validation

```typescript
function validateUrl(url: string): boolean {
  const allowedDomains = [
    'cdn.aframe.io',
    'pannellum.org',
    'polyhaven.com'
  ];

  try {
    const parsed = new URL(url);
    return allowedDomains.some(domain =>
      parsed.hostname === domain ||
      parsed.hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}
```

### Rate Limiting

```javascript
// backend/server.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

---

## Accessibility

### Accessibility Features

- **Keyboard navigation** support on all interactive elements
- **ARIA labels** on buttons and form inputs
- **Focus indicators** for keyboard users
- **Color contrast** meets WCAG AA standards
- **Screen reader** compatible
- **Reduced motion** support for animations

### Example: Accessible Button

```tsx
<button
  className="btn primary"
  onClick={handleClick}
  aria-label="Start mood scan"
  aria-describedby="scan-description"
>
  <span aria-hidden="true">🔍</span>
  Start Free Scan
</button>
<span id="scan-description" className="sr-only">
  Begin a free AI-powered mood analysis
</span>
```

---

## File Structure Summary

```
Moodverse/
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Route pages
│   │   ├── hooks/              # Custom hooks
│   │   ├── utils/              # Utility functions
│   │   ├── types/              # TypeScript definitions
│   │   └── styles/             # Global styles
│   └── public/                 # Static assets
│
├── backend/
│   ├── routes/                 # API routes
│   ├── controllers/            # Route handlers
│   └── middleware/             # Express middleware
│
└── docs/                        # Documentation
    ├── README.md
    ├── requirements.md
    ├── design.md               # This file
    └── VR_ARCHITECTURE.md
```

---

*Last updated: 2024*
*For implementation details, see VR_ARCHITECTURE.md*

