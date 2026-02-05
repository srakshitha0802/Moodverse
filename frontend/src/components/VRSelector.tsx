import React, { useState, useEffect } from "react";
import VRExperience from "./VRExperience";
import { validateImage as validateImageUtil, validateVideo as validateVideoUtil } from '../utils/vrValidation';

// Reliable 360° scenes from verified sources
const VR_SCENES = [
  { 
    name: "Sechelt Beach", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Zen Park", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/park.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Bridge View", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/bridge.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Yokohama City", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/yokohama.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Christmas Village", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/christmas.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Creative Cubes", 
    file: "https://cdn.aframe.io/360-image-gallery-boilerplate/img/cubes.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Alpine Mountains", 
    file: "https://pannellum.org/images/alma.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Cerro Toco", 
    file: "https://pannellum.org/images/cerro-toco.jpg",
    isEquirectangular: true 
  },
  { 
    name: "Starfield", 
    file: generateStarfield(),
    isEquirectangular: true 
  },
  { 
    name: "Ocean Sunset", 
    file: generateOceanScene(),
    isEquirectangular: true 
  },
  { 
    name: "Forest Stream", 
    file: generateForestScene(),
    isEquirectangular: true 
  },
  { 
    name: "Zen Garden", 
    file: generateZenScene(),
    isEquirectangular: true 
  }
];

function generateStarfield() {
  const stars = Array.from({length: 500}).map((_, i) => {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 1000);
    const r = Math.random() * 2;
    const opacity = 0.3 + Math.random() * 0.7;
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${opacity}" />`;
  }).join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs><radialGradient id="g" cx="50%" cy="50%"><stop offset="0%" stop-color="#1a1a2e"/><stop offset="100%" stop-color="#0d0d1a"/></radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#g)"/>${stars}
    <text x="1000" y="550" font-family="Arial" font-size="40" fill="#6BD3C7" text-anchor="middle">Peaceful Starfield</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateOceanScene() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff7e5f"/><stop offset="50%" stop-color="#feb47b"/></linearGradient>
    <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0077be"/><stop offset="100%" stop-color="#004477"/></linearGradient></defs>
    <rect width="100%" height="600" fill="url(#sky)"/><circle cx="1800" cy="200" r="60" fill="#ffdd55"/>
    <rect y="600" width="100%" height="400" fill="url(#ocean)"/>
    <text x="1000" y="300" font-family="Arial" font-size="40" fill="#fff" text-anchor="middle">Breathe and Relax</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateForestScene() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs><linearGradient id="forest-sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#E0F0FF"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#forest-sky)"/>
    <rect y="650" width="100%" height="350" fill="#228B22"/>
    ${Array.from({length: 15}).map((_, i) => {
      const cx = 100 + i * 130;
      const shades = ['#006400', '#008000', '#228B22', '#2E8B57'];
      return `<ellipse cx="${cx}" cy="${650 + Math.random() * 50}" rx="${60 + Math.random() * 40}" ry="${80 + Math.random() * 60}" fill="${shades[Math.floor(Math.random() * shades.length)]}"/>`;
    }).join('')}
    <text x="1000" y="200" font-family="Arial" font-size="40" fill="#006400" text-anchor="middle">Forest Stream</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function generateZenScene() {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs><linearGradient id="zen-bg" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#f5f5dc"/><stop offset="100%" stop-color="#e8e8c8"/></linearGradient></defs>
    <rect width="100%" height="100%" fill="url(#zen-bg)"/>
    <circle cx="1000" cy="500" r="350" fill="#c9c9a0" stroke="#a0a080" stroke-width="8"/>
    <circle cx="1000" cy="500" r="250" fill="#d4d4b0"/>
    <circle cx="1000" cy="500" r="150" fill="#dedeba"/>
    <text x="1000" y="950" font-family="Arial" font-size="30" fill="#6B8E23" text-anchor="middle">Find Your Inner Peace</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default function VRSelector({ initial }: { initial?: string }) {
  const [current, setCurrent] = useState(initial ?? VR_SCENES[0].file);
  const [status, setStatus] = useState<{state: string, message?: string}>({state: 'idle'});
  const [urlInput, setUrlInput] = useState('');

  const handleLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    validateAndSet(URL.createObjectURL(f));
  };

  const loadUrl = () => {
    if (!urlInput) return;
    validateAndSet(urlInput);
    setUrlInput('');
  };

  async function validateAndSet(url: string) {
    setStatus({state: 'loading', message: 'Loading environment...'});
    try {
      if (url.startsWith('data:') || url.startsWith('blob:')) {
        setCurrent(url);
        setStatus({state: 'ok'});
        return;
      }
      if (url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm')) {
        try { await validateVideoUtil(url); } catch {}
        setCurrent(url);
        setStatus({state: 'ok'});
        return;
      }
      setCurrent(url);
      setStatus({state: 'ok'});
    } catch {
      setCurrent(url);
      setStatus({state: 'ok'});
    }
  }

  useEffect(() => {
    if (initial) validateAndSet(initial);
  }, [initial]);

  useEffect(() => {
    if (!initial) validateAndSet(VR_SCENES[0].file);
  }, []);

  return (
    <div className="vr-selector-container">
      <div className="scene-buttons-grid">
        {VR_SCENES.map((scene, i) => (
          <button
            key={i}
            className={`scene-btn ${current === scene.file ? 'active' : ''}`}
            onClick={() => validateAndSet(scene.file)}
          >
            {scene.name}
          </button>
        ))}
      </div>
      <div className="vr-controls-row">
        <label className="upload-btn">
          Upload 360° Image
          <input type="file" accept="image/*" onChange={handleLocal} hidden />
        </label>
        <div className="url-input-group">
          <input
            type="text"
            placeholder="Paste 360° image URL..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && loadUrl()}
          />
          <button onClick={loadUrl}>Load</button>
        </div>
        <div className="vr-status">
          {status.state === 'loading' && <span>Loading...</span>}
          {status.state === 'ok' && <span>Ready</span>}
          <a href={current} target="_blank" rel="noreferrer">Open</a>
          <button onClick={() => validateAndSet(VR_SCENES[0].file)}>Reset</button>
        </div>
      </div>
      <div className="vr-experience-wrapper">
        <VRExperience scene={current} />
        {status.message && <div className="status-message">{status.message}</div>}
      </div>
    </div>
  );
}

