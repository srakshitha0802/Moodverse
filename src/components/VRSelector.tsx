import React, { useState, useEffect, useCallback, useRef } from "react";
import VRExperience from "./VRExperience";
import { validateImage as validateImageUtil, validateVideo as validateVideoUtil } from '../utils/vrValidation';

// Reliable 360° scenes from verified sources
const VR_SCENES: Array<{
  name: string;
  file: string;
  isEquirectangular: boolean;
  thumbnail?: string;
}> = [
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
    name: "Peaceful Starfield", 
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

/**
 * Generate a procedural starfield SVG
 */
function generateStarfield(): string {
  const stars = Array.from({length: 300}).map((_, i) => {
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

/**
 * Generate an ocean sunset SVG
 */
function generateOceanScene(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ff7e5f"/>
        <stop offset="50%" stop-color="#feb47b"/>
      </linearGradient>
      <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0077be"/>
        <stop offset="100%" stop-color="#004477"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="600" fill="url(#sky)"/>
    <circle cx="1800" cy="200" r="60" fill="#ffdd55"/>
    <rect y="600" width="100%" height="400" fill="url(#ocean)"/>
    <text x="1000" y="300" font-family="Arial" font-size="40" fill="#fff" text-anchor="middle">Breathe and Relax</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Generate a forest scene SVG
 */
function generateForestScene(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs>
      <linearGradient id="forest-sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#87CEEB"/>
        <stop offset="100%" stop-color="#E0F0FF"/>
      </linearGradient>
    </defs>
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

/**
 * Generate a zen garden SVG
 */
function generateZenScene(): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='2000' height='1000' viewBox='0 0 2000 1000'>
    <defs>
      <linearGradient id="zen-bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f5f5dc"/>
        <stop offset="100%" stop-color="#e8e8c8"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#zen-bg)"/>
    <circle cx="1000" cy="500" r="350" fill="#c9c9a0" stroke="#a0a080" stroke-width="8"/>
    <circle cx="1000" cy="500" r="250" fill="#d4d4b0"/>
    <circle cx="1000" cy="500" r="150" fill="#dedeba"/>
    <text x="1000" y="950" font-family="Arial" font-size="30" fill="#6B8E23" text-anchor="middle">Find Your Inner Peace</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Check if running in secure context (required for device orientation and audio)
 */
function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext || 
         location.protocol === 'https:' || 
         location.hostname === 'localhost' ||
         location.hostname === '127.0.0.1';
}

/**
 * Check if device is a mobile device
 */
function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || navigator.vendor || '';
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

/**
 * Check if device is running iOS 13+ (requires permission for device orientation)
 */
function isIOS13OrHigher(): boolean {
  if (typeof navigator === 'undefined') return false;
  const userAgent = navigator.userAgent || '';
  const iOSMatch = userAgent.match(/iPhone|iPad|iPod/i);
  if (!iOSMatch) return false;
  // iOS 13+ has specific version indicators
  return userAgent.includes('OS 13') || 
         userAgent.includes('OS 14') || 
         userAgent.includes('OS 15') ||
         userAgent.includes('OS 16') ||
         userAgent.includes('OS 17') ||
         userAgent.includes('OS 18');
}

/**
 * Check if DeviceOrientationEvent is available and requires permission
 */
function requiresOrientationPermission(): boolean {
  if (typeof DeviceOrientationEvent === 'undefined') return false;
  // iOS 13+ requires permission
  return typeof DeviceOrientationEvent.requestPermission === 'function';
}

interface VRSelectorProps {
  initial?: string;
}

export default function VRSelector({ initial }: VRSelectorProps) {
  const [current, setCurrent] = useState(initial ?? VR_SCENES[0].file);
  const [status, setStatus] = useState<{state: string, message?: string}>({state: 'idle'});
  const [urlInput, setUrlInput] = useState('');
  const [isHttps, setIsHttps] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const permissionRequestedRef = useRef(false);

  // Detect device type, secure context and viewport on mount
  useEffect(() => {
    setIsHttps(isSecureContext());
    setIsMobile(isMobileDevice());
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle initial scene loading
  useEffect(() => {
    if (initial) {
      validateAndSet(initial);
    } else {
      validateAndSet(VR_SCENES[0].file);
    }
  }, [initial]);

  // Handle local file upload
  const handleLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    validateAndSet(URL.createObjectURL(f));
  };

  // Load URL from input
  const loadUrl = () => {
    if (!urlInput.trim()) return;
    validateAndSet(urlInput.trim());
    setUrlInput('');
  };

  // Validate and set scene
  async function validateAndSet(url: string) {
    setStatus({state: 'loading', message: 'Loading environment...'});
    setPermissionError(null);
    
    try {
      if (url.startsWith('data:') || url.startsWith('blob:')) {
        setCurrent(url);
        setStatus({state: 'ok'});
        return;
      }
      
      // Use case-insensitive extension check for cross-browser compatibility
      const lowerUrl = url.toLowerCase();
      if (lowerUrl.includes('.mp4') || lowerUrl.includes('.webm')) {
        try { 
          await validateVideoUtil(url); 
        } catch (validationError) {
          console.warn('[VRSelector] Video validation warning:', validationError);
        }
        setCurrent(url);
        setStatus({state: 'ok'});
        return;
      }
      
      // For images, try validation but don't fail if it doesn't work
      if (lowerUrl.endsWith('.jpg') || lowerUrl.endsWith('.jpeg') || lowerUrl.endsWith('.png')) {
        try {
          await validateImageUtil(url);
        } catch (validationError) {
          console.warn('[VRSelector] Image validation warning:', validationError);
        }
      }
      
      setCurrent(url);
      setStatus({state: 'ok'});
    } catch {
      // Still set the URL even if validation fails - let the VRExperience handle errors
      setCurrent(url);
      setStatus({state: 'ok'});
    }
  }

  // Request device orientation permission (iOS 13+)
  const requestMotionPermission = useCallback(async () => {
    // Prevent multiple requests
    if (permissionRequestedRef.current) return;
    permissionRequestedRef.current = true;

    if (!requiresOrientationPermission()) {
      // Non-iOS 13+ devices - permission usually granted by default
      setPermissionGranted(true);
      setPermissionError(null);
      setShowPermissionModal(false);
      return;
    }

    try {
      const permission = await DeviceOrientationEvent.requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        setPermissionError(null);
        setShowPermissionModal(false);
      } else {
        setPermissionGranted(false);
        setPermissionError('Motion permission denied. You can still use touch/mouse controls to navigate.');
      }
    } catch (error) {
      console.warn('[VRSelector] Motion permission error:', error);
      setPermissionError('Unable to request motion permission. VR tilt controls may not work, but touch/mouse controls are available.');
    }
  }, []);

  // Get responsive grid columns
  const getGridColumns = (): number => {
    if (windowWidth <= 360) return 2;
    if (windowWidth <= 480) return 2;
    if (windowWidth <= 768) return 3;
    if (windowWidth <= 1024) return 4;
    return 5;
  };

  // Get responsive button size
  const getButtonSize = (): { padding: string; fontSize: string; minHeight: string } => {
    if (windowWidth <= 360) {
      return { padding: '8px 10px', fontSize: '12px', minHeight: '40px' };
    }
    if (windowWidth <= 480) {
      return { padding: '10px 12px', fontSize: '13px', minHeight: '44px' };
    }
    return { padding: '10px 16px', fontSize: '14px', minHeight: '44px' };
  };

  const buttonSize = getButtonSize();
  const gridCols = getGridColumns();

  return (
    <div 
      className="vr-selector-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        padding: '16px',
        maxWidth: '100%'
      }}
    >
      {/* HTTPS Security Banner */}
      {!isHttps && (
        <div 
          className="security-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            marginBottom: '8px',
            color: '#92400e',
            fontSize: '14px',
            flexWrap: 'wrap'
          }}
          role="alert"
        >
          <span className="security-icon">🔒</span>
          <span style={{ flex: 1 }}>
            <strong>Security Notice:</strong> This page is not secure (HTTPS). 
            Some VR features may be limited. For full functionality, use HTTPS.
          </span>
        </div>
      )}

      {/* Motion Permission Modal (iOS) */}
      {showPermissionModal && isMobile && requiresOrientationPermission() && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '16px'
          }}
          onClick={() => setShowPermissionModal(false)}
        >
          <div 
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📱</div>
            <h3 style={{ margin: '0 0 12px 0', color: '#1e293b' }}>Enable Motion Controls</h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', lineHeight: '1.5' }}>
              To use VR tilt controls on your device, we need permission to access motion sensors. 
              This will only work when you explicitly enable it.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={requestMotionPermission}
                style={{
                  padding: '12px 24px',
                  background: '#6BD3C7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  minHeight: '48px'
                }}
              >
                Allow Access
              </button>
              <button 
                onClick={() => {
                  setShowPermissionModal(false);
                  setPermissionError('Motion controls disabled. Use touch/mouse to navigate.');
                }}
                style={{
                  padding: '12px 24px',
                  background: '#f1f5f9',
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  minHeight: '48px'
                }}
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Motion Permission Banner (iOS) */}
      {isMobile && isHttps && !permissionGranted && requiresOrientationPermission() && !showPermissionModal && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            padding: '12px 16px',
            background: '#e0f2fe',
            border: '1px solid #7dd3fc',
            borderRadius: '8px',
            marginBottom: '8px',
            color: '#0369a1',
            fontSize: '14px',
            flexWrap: 'wrap'
          }}
        >
          <span>📱 Enable motion controls for mobile VR experience</span>
          <button 
            onClick={() => setShowPermissionModal(true)}
            style={{ 
              padding: '8px 16px', 
              fontSize: '14px',
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              minHeight: '40px'
            }}
          >
            Enable Motion
          </button>
        </div>
      )}

      {/* Permission Status */}
      {permissionGranted && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            color: '#16a34a',
            fontSize: '13px'
          }}
        >
          <span>✓</span>
          <span>Motion controls enabled</span>
        </div>
      )}

      {/* Permission Error Display */}
      {permissionError && (
        <div 
          style={{
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            fontSize: '14px'
          }}
          role="alert"
        >
          {permissionError}
        </div>
      )}

      {/* Scene Selection Grid - Fully Responsive */}
      <div 
        className="scene-buttons-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          gap: '8px',
          width: '100%'
        }}
        role="group"
        aria-label="VR Scene selection"
      >
        {VR_SCENES.map((scene, i) => (
          <button
            key={i}
            className={`scene-btn ${current === scene.file ? 'active' : ''}`}
            onClick={() => validateAndSet(scene.file)}
            style={{
              padding: buttonSize.padding,
              border: current === scene.file ? '2px solid #6BD3C7' : '1px solid #e2e8f0',
              borderRadius: '8px',
              background: current === scene.file ? 'rgba(107, 211, 199, 0.15)' : 'white',
              color: current === scene.file ? '#0d9488' : '#475569',
              fontWeight: '500',
              fontSize: buttonSize.fontSize,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              minHeight: buttonSize.minHeight,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
            aria-pressed={current === scene.file}
            title={scene.name}
          >
            {scene.name}
          </button>
        ))}
      </div>

      {/* Controls Row - Fully Responsive */}
      <div 
        className="vr-controls-row"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}
      >
        {/* File Upload and URL Input Row */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%'
          }}
        >
          {/* Upload Button */}
          <label 
            className="upload-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: '#6BD3C7',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              transition: 'background 0.2s ease',
              minHeight: '44px'
            }}
          >
            📤 Upload 360° Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleLocal} 
              hidden 
              aria-label="Upload 360 degree image"
            />
          </label>

          {/* URL Input Group */}
          <div 
            className="url-input-group"
            style={{
              display: 'flex',
              gap: '8px',
              width: '100%',
              flexWrap: 'wrap'
            }}
          >
            <input
              type="url"
              placeholder="Paste 360° image URL..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && loadUrl()}
              style={{
                flex: '1',
                minWidth: '200px',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minHeight: '44px'
              }}
              aria-label="URL input for 360 degree image"
            />
            <button 
              onClick={loadUrl}
              style={{
                padding: '10px 20px',
                background: '#6BD3C7',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                minHeight: '44px',
                whiteSpace: 'nowrap'
              }}
              aria-label="Load URL"
            >
              Load
            </button>
          </div>
        </div>

        {/* Status and Actions */}
        <div 
          className="vr-status"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            fontSize: '13px'
          }}
        >
          {status.state === 'loading' && (
            <span style={{ color: '#0369a1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⏳</span> Loading...
            </span>
          )}
          {status.state === 'ok' && (
            <span style={{ color: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓</span> Ready
            </span>
          )}
          {current && !current.startsWith('data:') && !current.startsWith('blob:') && (
            <a 
              href={current} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: '#6B8EF6',
                textDecoration: 'none',
                padding: '6px 12px',
                background: 'rgba(155, 142, 246, 0.1)',
                borderRadius: '6px',
                fontSize: '13px'
              }}
            >
              Open ↗
            </a>
          )}
          <button 
            onClick={() => validateAndSet(VR_SCENES[0].file)}
            style={{
              padding: '6px 12px',
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#475569',
              fontSize: '13px',
              minHeight: '36px'
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* VR Experience Container */}
      <div 
        className="vr-experience-wrapper"
        style={{
          width: '100%',
          minHeight: '300px'
        }}
      >
        <VRExperience scene={current} />
        {status.message && (
          <div 
            className="status-message"
            style={{
              marginTop: '8px',
              padding: '8px 12px',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '6px',
              color: '#16a34a',
              fontSize: '13px',
              textAlign: 'center'
            }}
          >
            {status.message}
          </div>
        )}
      </div>

      {/* Mobile tip */}
      <div 
        style={{
          padding: '12px 16px',
          background: 'rgba(107, 211, 199, 0.1)',
          border: '1px solid rgba(107, 211, 199, 0.2)',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#0f766e',
          textAlign: 'center'
        }}
      >
        💡 <strong>Mobile Tip:</strong> On iOS 13+, tap "Enable Motion" for tilt controls. 
        Otherwise, swipe to look around.
      </div>
    </div>
  );
}

