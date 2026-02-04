# VR Rooms Architecture Documentation

## Overview

This document explains the correct architecture for rendering 360° VR environments in the Moodverse mental health application. It covers the technical differences between panorama images and HDRI lighting files, why previous approaches failed, and how to properly implement VR experiences.

---

## Table of Contents

1. [Why Your Previous Approach Failed](#why-your-previous-approach-failed)
2. [Understanding File Types](#understanding-file-types)
3. [Correct VR Rendering Architecture](#correct-vr-rendering-architecture)
4. [Audio Handling (Browser Compliance)](#audio-handling-browser-compliance)
5. [Security Implementation](#security-implementation)
6. [Device Compatibility](#device-compatibility)
7. [Data Model](#data-model)

---

## Why Your Previous Approach Failed

### Root Cause Analysis

Your previous implementation had several critical issues that prevented proper VR rendering:

#### 1. **Using `<img>` Tags for VR Backgrounds**

```tsx
// ❌ WRONG - This is just a flat image, NOT VR
<img src="360_panorama.jpg" alt="360 view" />

// ✅ CORRECT - A-Frame skybox for true 360° rendering
<a-scene>
  <a-sky src="#panorama-texture"></a-sky>
</a-scene>
```

**Why it fails:**
- `<img>` tags display 2D flat images
- No 360° navigation or head tracking
- No depth perception or immersion
- Cannot be viewed in VR headsets

#### 2. **Treating HDR Files as Viewable Images**

```tsx
// ❌ WRONG - HDR files cannot be displayed in <img> tags
<img src="environment.hdr" alt="HDRI" />

// ✅ CORRECT - HDRI used only for lighting, not display
<a-scene>
  <a-assets>
    <img id="panorama" src="beach_360.jpg">  <!-- For skybox -->
  </a-assets>
  <a-sky src="#panorama"></a-sky>
  <!-- HDRI processed internally by Three.js for lighting -->
</a-scene>
```

**Why it fails:**
- Browsers cannot decode `.hdr` files natively
- HDR requires special WebGL shaders for tone mapping
- HDR is a lighting format, not an image format
- Only equirectangular JPG/PNG can be used as skybox

#### 3. **Assuming Audio Autoplay Works**

```tsx
// ❌ WRONG - Browsers block autoplaying audio
useEffect(() => {
  audioRef.current?.play(); // Will fail silently
}, []);
```

**Why it fails:**
- Modern browsers block audio without user gesture
- Chrome, Safari, Firefox all enforce this policy
- Meta Quest browser is even more restrictive
- User MUST click to enable audio

---

## Understanding File Types

### Panorama Images (JPG/PNG)

**Purpose:** Display as 360° background skybox

**Requirements:**
- Equirectangular projection (2:1 aspect ratio)
- Resolution: Minimum 2048x1024, recommended 4096x2048
- Format: JPG (for size) or PNG (for quality)
- File extension: `.jpg` or `.png`

**Example URLs:**
```
https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg
https://pannellum.org/images/alma.jpg
```

### HDRI Files (HDR/EXR)

**Purpose:** Image-Based Lighting (IBL) for realistic illumination

**Requirements:**
- High dynamic range values (> 1.0)
- Requires tone mapping for display
- Processed by Three.js internally
- NOT displayed directly

**Example Sources:**
```
https://polyhaven.com/hdri/forest
https://polyhaven.com/hdri/beach_sunset
```

### Video 360 (MP4/WebM)

**Purpose:** 360° video backgrounds

**Requirements:**
- Equirectangular projection
- High bitrate for quality
- File extension: `.mp4` or `.webm`

---

## Correct VR Rendering Architecture

### A-Frame Scene Structure

```tsx
import React, { useRef, useState, useCallback } from 'react';

interface VRPanorama {
  id: string;
  name: string;
  panoramaUrl: string;  // JPG/PNG for skybox
  hdriUrl?: string;     // HDR for lighting (optional)
  audioUrl?: string;    // Ambient audio
}

function AFrameScene({ panorama, audioEnabled }: Props) {
  return (
    <a-scene
      embedded
      vr-mode-ui="enabled: true"
      renderer="colorManagement: true"
    >
      {/* Asset Management */}
      <a-assets>
        <img 
          id="panorama-texture"
          src={panorama.panoramaUrl}
          crossOrigin="anonymous"
        />
        {panorama.audioUrl && (
          <audio
            id="ambient-audio"
            src={panorama.audioUrl}
            loop
            preload="none"
          />
        )}
      </a-assets>

      {/* 
        CRITICAL: Panorama as <a-sky>, NOT <img>
        This creates the 360° immersive background
      */}
      <a-sky src="#panorama-texture" rotation="0 -90 0" />

      {/* Camera Rig with Controls */}
      <a-entity id="rig" position="0 1.6 0">
        <a-camera
          look-controls="pointerLockEnabled: false"
          wasd-controls="enabled: true"
        >
          <a-cursor color="#6BD3C7" />
        </a-camera>
      </a-entity>

      {/* Ambient Lighting from HDRI (if provided) */}
      {panorama.hdriUrl && (
        <a-entity environment={`
          preset: none;
          hdri: ${panorama.hdriUrl};
          lighting: point;
        `} />
      )}
    </a-scene>
  );
}
```

### Key Components Explained

| Component | Purpose | Why It's Correct |
|-----------|---------|------------------|
| `<a-scene>` | Main A-Frame scene container | Initializes Three.js with WebXR support |
| `<a-assets>` | Asset preloading system | Prevents texture pop-in |
| `<a-sky>` | 360° background sphere | Proper equirectangular mapping |
| `<a-camera>` | View camera with controls | Supports mouse, touch, VR input |
| `<a-cursor>` | VR interaction pointer | Works on desktop and VR controllers |

---

## Audio Handling (Browser Compliance)

### The Problem

Modern browsers enforce strict autoplay policies:

| Browser | Policy |
|---------|--------|
| Chrome | Audio blocked until user interaction |
| Safari | Strict autoplay blocking |
| Firefox | User gesture required |
| Meta Quest | Even stricter policies |

### Correct Implementation

```tsx
function VRSession({ audioUrl }: Props) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = useCallback(async () => {
    if (!audioEnabled) {
      // User clicked - this is allowed
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.crossOrigin = 'anonymous';
          audioRef.current.loop = true;
          audioRef.current.volume = 0.5;
        }
        
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        setAudioEnabled(true);
      } catch (err) {
        console.error('Audio play failed:', err);
      }
    } else {
      audioRef.current?.pause();
      setAudioEnabled(false);
    }
  }, [audioEnabled, audioUrl]);

  return (
    <>
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      <a-scene>...</a-scene>
      
      {/* UI Button - Audio can only start after user clicks */}
      <button onClick={toggleAudio}>
        {audioEnabled ? '🔊 Disable Audio' : '🔇 Enable Audio'}
      </button>
    </>
  );
}
```

### Best Practices

1. **Always require user gesture** - Don't attempt autoplay
2. **Show clear UI** - Indicate audio is off until enabled
3. **Handle errors gracefully** - Some users block audio
4. **Respect user choice** - Remember audio state
5. **Volume limits** - Start at 50% volume

---

## Security Implementation

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

```tsx
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')        // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '')     // Remove event handlers
    .trim();
}
```

### URL Validation

```tsx
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

### Clickjacking Protection

```tsx
// In index.html script
if (top !== self) {
  top.location = self.location;
}
```

---

## Device Compatibility

### Desktop Browsers

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Best WebXR support |
| Firefox | ✅ Full | Good performance |
| Safari | ⚠️ Limited | No WebXR, basic 360 works |
| Edge | ✅ Full | Chromium-based |

### Mobile Devices

| Device | Support | Notes |
|--------|---------|-------|
| iOS Safari | ⚠️ Limited | No WebXR |
| Android Chrome | ✅ Full | Good VR support |
| Meta Quest Browser | ✅ Full | Native WebXR |

### VR Headsets

| Headset | Support | Notes |
|---------|---------|-------|
| Meta Quest 2/3 | ✅ Full | Native WebXR |
| HTC Vive | ✅ Full | Via Link or browser |
| Valve Index | ✅ Full | Browser-based |
| Apple Vision Pro | ⚠️ Experimental | Early support |

---

## Data Model

### Panorama Type Definition

```typescript
interface VRPanorama {
  // Required fields
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'urban' | 'space' | 'indoor' | 'abstract';
  mood: string[];
  
  // 360° equirectangular panorama (JPG/PNG only!)
  panoramaUrl: string;
  thumbnailUrl: string;
  
  // Optional audio for immersion
  audioUrl?: string;
  
  // HDRI for realistic lighting (separate file)
  hdriUrl?: string;
  
  // Position in 3D space
  position?: { x: number; y: number; z: number };
}
```

### Example Configuration

```typescript
const CURATED_ENVIRONMENTS: VRPanorama[] = [
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

## Summary

### Key Takeaways

1. **Panoramas ≠ HDRI**
   - Panoramas (JPG/PNG) → Displayed as `<a-sky>`
   - HDRI (HDR/EXR) → Used for lighting only

2. **VR Requires WebGL**
   - A-Frame/Three.js are required
   - `<img>` tags cannot create VR

3. **Audio Needs User Gesture**
   - Always require a click to start audio
   - Handle autoplay blocking gracefully

4. **Security is Critical**
   - Validate all URLs
   - Sanitize all inputs
   - Use strict CSP

5. **Test on Multiple Devices**
   - Desktop browsers
   - Mobile devices
   - VR headsets

### File Checklist

| Your File | Correct Usage |
|-----------|---------------|
| `beach_360.jpg` | ✅ Panorama skybox |
| `forest_360.jpg` | ✅ Panorama skybox |
| `environment.hdr` | ⚠️ Lighting only, not displayed |
| `meditation_room.glb` | ✅ 3D model, not background |

---

## Resources

- [A-Frame Documentation](https://aframe.io/docs/1.4.0/)
- [A-Frame Environment Component](https://github.com/c-frame/aframe-environment-component)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [PolyHaven HDRI](https://polyhaven.com/hdri)
- [CSP Reference](https://content-security-policy.com/)

---

*Last updated: 2024*
*Moodverse VR Rooms v2.0*

