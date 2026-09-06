import React, { useEffect, useRef, useState, useCallback } from "react";
import { requestAudioPermission, requestOrientationPermission, isDeviceOrientationSupported, isDeviceMotionSupported } from '../hooks/useCrossBrowserCompatibility';

/**
 * Generate a unique ID for assets
 */
function makeId(s: string): string {
  return 'asset-' + btoa(s).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
}

/**
 * Check if WebGL is supported in the browser
 * Cross-browser compatible WebGL detection
 */
function isWebGLSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const canvas = document.createElement('canvas');
    // Check for standard WebGL 1.0
    const hasWebGL1 = !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    // Check for WebGL 2.0 (better performance)
    const hasWebGL2 = !!(canvas.getContext('webgl2'));
    
    return hasWebGL1 || hasWebGL2;
  } catch {
    return false;
  }
}

/**
 * Check if device is a mobile/touch device
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0 ||
         (navigator as any).msMaxTouchPoints > 0;
}

/**
 * Responsive sizing is handled by CSS (mobile-first).
 * Use CSS `aspect-ratio`, `vh`/`vw`, and media queries to scale the VR canvas across devices.
 * Avoid hard-coded pixel heights in JS so styles remain portable across browsers and platforms.
 */

/**
 * Detect if content is an image (for VR)
 */
function isImageUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    url.startsWith('data:image') ||
    url.startsWith('blob:') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.png') ||
    lower.endsWith('.gif') ||
    lower.endsWith('.webp')
  );
}

/**
 * Detect if content is a video (for VR)
 */
function isVideoUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    url.startsWith('blob:video') ||
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.ogg') ||
    lower.includes('.mp4') ||
    lower.includes('.webm')
  );
}

/**
 * Detect if content is a 3D model
 */
function isModelUrl(url: string): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  return (
    lower.endsWith('.glb') ||
    lower.endsWith('.gltf') ||
    lower.endsWith('.obj') ||
    lower.endsWith('.fbx')
  );
}

/**
 * Get responsive aspect ratio for embeds
 */
function getResponsiveAspectRatio(): string {
  if (typeof window === 'undefined') return '16/9';
  const width = window.innerWidth;
  if (width <= 480) return '4/3';
  if (width <= 768) return '16/10';
  return '16/9';
}

interface VRExperienceProps {
  scene: string;
}

import ErrorBoundary from './ErrorBoundary';
import useGlobalErrorHandler from '../hooks/useGlobalErrorHandler';

export default function VRExperience({ scene }: VRExperienceProps) {
  useGlobalErrorHandler();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEquirect, setIsEquirect] = useState<boolean>(false);
  const [resourceOk, setResourceOk] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchEnabled, setTouchEnabled] = useState(false);
  const [permissionMessage, setPermissionMessage] = useState<string | null>(null);
  const [showPermissionOverlay, setShowPermissionOverlay] = useState(false);

  // Responsive sizing is handled entirely by CSS (mobile-first). No JS-based pixel sizing required.

  // Check WebGL support and touch capability on mount
  useEffect(() => {
    const webglOk = isWebGLSupported();
    setWebglSupported(webglOk);
    setTouchEnabled(isTouchDevice());
    
    if (!webglOk) {
      setError('WebGL is not supported in this browser. Please use Chrome, Firefox, Edge, or Safari.');
    }
  }, []);

  // Reset and load scene when it changes
  useEffect(() => {
    if (!webglSupported || !scene) return;
    
    // Reset state
    setLoading(true);
    setError(null);
    setIsPlaying(false);
    setResourceOk(null);
    
    // Reset previous video
    const v = videoRef.current;
    if (v) {
      try {
        v.pause();
        v.src = '';
        v.load();
      } catch (e) {
        // Ignore errors during cleanup
      }
    }
    
    // Check if it's an image and determine if equirectangular
    if (isImageUrl(scene)) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Equirectangular images typically have 2:1 aspect ratio
        const ratio = img.width / Math.max(1, img.height);
        setIsEquirect(ratio > 1.7 && ratio < 2.3);
        setResourceOk(ratio > 1.7 && ratio < 2.3);
        setLoading(false);
      };
      img.onerror = () => {
        setIsEquirect(false);
        setResourceOk(false);
        setError('Failed to load the VR scene image.');
        setLoading(false);
      };
      img.src = scene;
    } else if (isVideoUrl(scene)) {
      // For videos, assume they're suitable for VR
      setIsEquirect(true);
      setResourceOk(true);
      setLoading(false);
    } else if (isModelUrl(scene)) {
      setIsEquirect(false);
      setResourceOk(true);
      setLoading(false);
    } else {
      setIsEquirect(false);
      setResourceOk(null);
      setLoading(false);
    }

    // Timeout to clear loading state
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [scene, webglSupported]);

  // Video play handler with cross-browser support
  const handlePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) {
      // Try to find video element by ID
      const videoAssetId = `video-${makeId(scene)}`;
      const foundVideo = document.getElementById(videoAssetId) as HTMLVideoElement | null;
      if (foundVideo) {
        try {
          await foundVideo.play();
          setIsPlaying(true);
        } catch (playError) {
          console.warn('[VRExperience] Video play failed:', playError);
          setError('Unable to play video. Please tap on the video to start playback.');
        }
      }
      return;
    }
    
    try {
      // Ensure video is not muted for audio
      v.muted = false;
      await v.play();
      setIsPlaying(true);
      setError(null);
    } catch (playError: any) {
      console.warn('[VRExperience] Video play failed:', playError);
      
      // Try with muted autoplay (some browsers require this)
      try {
        v.muted = true;
        await v.play();
        setIsPlaying(true);
        setError(null);
      } catch (mutedError) {
        setError('Unable to play video. Please tap on the video to start playback.');
      }
    }
  }, [scene]);

  // Video pause handler
  const handlePause = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  // Generate fallback SVG for failed media
  const getFallbackSvg = (message: string): string => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000" viewBox="0 0 2000 1000">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="1000" y="500" font-family="Arial, sans-serif" font-size="48" fill="#94a3b8" text-anchor="middle">${message}</text>
    </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  // Fallback content for unsupported browsers
  if (!webglSupported) {
    return (
      <div className="vr-fallback-container" role="alert" aria-live="polite">
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h3 style={{ margin: '0 0 12px 0', color: '#fef2f2', fontSize: '1.25rem' }}>VR Not Supported</h3>
        <p style={{ margin: '0 0 16px 0', color: '#94a3b8', maxWidth: '400px', lineHeight: '1.5' }}>
          {error || 'Your browser does not support WebGL, which is required for VR experiences.'}
        </p>
        <div style={{ fontSize: '14px', color: '#64748b', textAlign: 'left' }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Supported browsers:</p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '4px' }}>• Chrome 56+</li>
            <li style={{ marginBottom: '4px' }}>• Firefox 52+</li>
            <li style={{ marginBottom: '4px' }}>• Edge 79+</li>
            <li style={{ marginBottom: '4px' }}>• Safari 15+</li>
            <li>• Brave (latest)</li>
          </ul>
        </div>
      </div>
    );
  }

  // Permission overlay (only visible when relevant and on gesture)
  const shouldShowOverlay = showPermissionOverlay && (isDeviceOrientationSupported() || isDeviceMotionSupported());

  const handleGrantPermissions = async () => {
    setPermissionMessage('Requesting permissions...');

    try {
      const audioResult = await requestAudioPermission();
      const orientationResult = await requestOrientationPermission();

      setPermissionMessage(`Audio: ${audioResult} • Motion: ${orientationResult}`);

      // If orientation isn't granted, fall back to touch/mouse controls
      if (orientationResult !== 'granted') {
        setTouchEnabled(true);
      } else {
        setTouchEnabled(false);
      }

      setShowPermissionOverlay(false);
    } catch (err) {
      setPermissionMessage('Permission request failed. Please try again from the overlay.');
      setShowPermissionOverlay(false);
    }
  };


  const isImage = isImageUrl(scene);
  const isVideo = isVideoUrl(scene);
  const isModel = isModelUrl(scene);
  const assetId = makeId(scene || 'default');
  const videoAssetId = `video-${assetId}`;
  const sceneKey = assetId;

  return (
    <ErrorBoundary>
      <div 
        className="vr-experience-wrapper"
        style={{ 
          width: '100%',
          maxWidth: '100%'
        }}
      >
      {/* Error display */}
      {error && (
        <div 
          className="vr-error-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            marginBottom: '16px',
            color: '#dc2626',
            fontSize: '14px',
            flexWrap: 'wrap',
            gap: '8px'
          }}
          role="alert"
        >
          <span>{error}</span>
          <button 
            onClick={() => setError(null)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '12px',
              opacity: 0.7,
              color: '#dc2626'
            }}
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {/* Resource warning */}
      {resourceOk === false && (
        <div 
          className="vr-warning-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: '#fefce8',
            border: '1px solid #fef08a',
            borderRadius: '8px',
            marginBottom: '16px',
            color: '#ca8a04',
            fontSize: '14px'
          }}
          role="alert"
        >
          <span>⚠️ This resource may not be optimal for 360° viewing.</span>
        </div>
      )}

      {/* Video controls */}
      {isVideo && (
        <div 
          style={{ 
            marginBottom: '12px', 
            display: 'flex', 
            gap: '8px',
            flexWrap: 'wrap'
          }}
          role="group"
          aria-label="Video playback controls"
        >
          <button 
            className="btn"
            onClick={handlePlay}
            aria-label="Play video"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: isPlaying ? '#ef4444' : '#6BD3C7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '44px'
            }}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button 
            className="btn secondary"
            onClick={handlePause}
            aria-label="Pause video"
            style={{
              padding: '8px 16px',
              background: '#f1f5f9',
              color: '#475569',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              minHeight: '44px'
            }}
          >
            Stop
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="vr-loading-container">
          <div 
            className="vr-loading-spinner"
            style={{
              width: '48px',
              height: '48px',
              border: '3px solid rgba(107, 211, 199, 0.3)',
              borderTopColor: '#6BD3C7',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
            role="status"
            aria-label="Loading VR scene"
          />
          <p style={{ marginTop: '16px', opacity: 0.8, fontSize: '14px' }}>Loading VR experience...</p>
        </div>
      )}

      {/* A-Frame Scene Container */}
      {!loading && (
        <div className="aframe-scene-container">
          <a-scene 
            key={sceneKey} 
            embedded 
            vr-mode-ui="enabled: true"
            style={{ width: '100%', height: '100%' }}
            renderer="antialias: true; colorManagement: true; physicallyCorrectLights: true; sortObjects: true"
            loading-screen="enabled: false"
            device-orientation-permission-ui="enabled: true"
          >
            <a-assets>
              {isImage && (
                <img 
                  id={assetId} 
                  src={scene} 
                  crossOrigin="anonymous"
                  alt="VR 360° scene"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = getFallbackSvg('Image failed to load');
                  }}
                />
              )}

              {isVideo && (
                <video 
                  id={videoAssetId} 
                  ref={videoRef}
                  src={scene} 
                  crossOrigin="anonymous"
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  className="vr-hidden-video"
                  controls={false}
                  onError={(e) => {
                    console.warn('[VRExperience] Video load error');
                    setError('Failed to load video. Please try a different source.');
                  }}
                />
              )}
            </a-assets>

            {/* Image sky for equirectangular images */}
            {isImage && isEquirect && (
              <a-sky src={`#${assetId}`}></a-sky>
            )}
            
            {/* Fallback plane for non-equirectangular images */}
            {isImage && !isEquirect && (
              <a-entity>
                <a-plane
                  position="0 1.6 -2"
                  width="3"
                  height="1.8"
                  material={{ shader: 'flat', src: `#${assetId}` }}
                ></a-plane>
                <a-text
                  value="Image Preview"
                  position="0 0.4 -2"
                  align="center"
                  color="#94a3b8"
                ></a-text>
              </a-entity>
            )}

            {/* Video sphere for video content */}
            {isVideo && (
              <a-videosphere src={`#${videoAssetId}`}></a-videosphere>
            )}

            {/* 3D Models */}
            {isModel && (
              <a-entity
                gltf-model={scene}
                position="0 0 -4"
                animation-mixer="timeScale: 1"
                scale="1 1 1"
              ></a-entity>
            )}

            {/* Camera with touch and mouse controls */}
            <a-camera
              position="0 1.6 0"
              look-controls={touchEnabled ? "touchEnabled: true; mouseEnabled: true" : "enabled: true"}
              wasd-controls="enabled: true"
            >
              <a-cursor
                color="#1E90FF"
                fuse="false"
                raycaster="objects: .clickable"
              ></a-cursor>
            </a-camera>
          </a-scene>

          {showPermissionOverlay && (isDeviceOrientationSupported() || isDeviceMotionSupported()) && (
            <div className="vr-permission-overlay" role="dialog" aria-modal="true">
              <div className="vr-permission-card">
                <div className="permission-icon">🔒</div>
                <h3>Enable Motion & Sound</h3>
                <p>To use device motion and audio in this experience, we need permission from your browser. This action must be started by tapping the button below.</p>
                <div className="vr-permission-actions">
                  <button className="btn" onClick={handleGrantPermissions}>Allow</button>
                  <button className="btn secondary" onClick={() => { setShowPermissionOverlay(false); setTouchEnabled(true); setPermissionMessage('Using touch/mouse controls (motion not enabled)'); }}>Use touch/mouse</button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

        <div className="vr-controls-hint">
          <p style={{ margin: '4px 0', opacity: 0.9 }}>
            {touchEnabled ? '💡 Mobile: Swipe to look around • Double-tap to interact' : '💡 Desktop: Click and drag to look around • Use WASD keys to move'}
          </p>
          <p style={{ margin: '4px 0', opacity: 0.7, fontSize: '12px' }}>
            For full VR experience, use a VR headset with a compatible browser
          </p>

          {/* Open permission overlay (explicit gesture required) */}
          {!permissionMessage && (
            <div style={{ marginTop: '12px' }}>
              <button
                className="btn"
                onClick={() => setShowPermissionOverlay(true)}
              >Enable Motion & Sound</button>
            </div>
          )}

          {permissionMessage && (
            <div className="permission-status" role="status" style={{ marginTop: '12px', color: '#94a3b8' }}>{permissionMessage}</div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

