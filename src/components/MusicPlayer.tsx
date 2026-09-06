import React, { useRef, useState, useCallback, useEffect } from 'react';
import { requestAudioPermission as sharedRequestAudioPermission } from '../hooks/useCrossBrowserCompatibility';

/**
 * Check if URL is a YouTube video
 */
function isYouTube(url?: string): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return (
    lowerUrl.includes('youtube.com') || 
    lowerUrl.includes('youtu.be') || 
    lowerUrl.includes('/embed/') ||
    lowerUrl.includes('vimeo.com')
  );
}

/**
 * Convert YouTube URL to embed format
 */
function toEmbed(url: string): string {
  if (url.toLowerCase().includes('/embed/')) return url;
  
  // YouTube: watch?v=... -> embed
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=0&rel=0`;
  
  // YouTube: youtu.be/... -> embed
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (short) return `https://www.youtube.com/embed/${short[1]}?autoplay=0&rel=0`;
  
  return url;
}

/**
 * Convert Vimeo URL to embed format
 */
function vimeoToEmbed(url: string): string {
  if (url.includes('/embed/')) return url;
  
  // Vimeo: vimeo.com/123456789 -> embed
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) return `https://player.vimeo.com/video/${match[1]}?autoplay=0&title=0&byline=0&portrait=0`;
  
  return url;
}

/**
 * Check if running in secure context (required for audio autoplay)
 */
function isSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext || 
         location.protocol === 'https:' || 
         location.hostname === 'localhost' ||
         location.hostname === '127.0.0.1';
}

/**
 * Check if device is mobile/touch
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || 
         navigator.maxTouchPoints > 0 ||
         (navigator as any).msMaxTouchPoints > 0;
}


interface MusicPlayerProps {
  src?: string;
  title?: string;
}

import ErrorBoundary from './ErrorBoundary';
import useGlobalErrorHandler from '../hooks/useGlobalErrorHandler';

export default function MusicPlayer({ src, title }: MusicPlayerProps) {
  useGlobalErrorHandler();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isHttps, setIsHttps] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const resolvedSrc = src ?? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const isVideoPlatform = isYouTube(resolvedSrc);
  const touchEnabled = isTouchDevice();

  // Detect secure context, viewport, and initialize audio
  useEffect(() => {
    setIsHttps(isSecureContext());
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (isVideoPlatform) return; // Skip for embeds
    
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      // Event listeners
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('[MusicPlayer] Audio error:', e);
        setError('Unable to load audio file. Please check the source URL.');
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
    }
    
    audioRef.current.src = resolvedSrc;
    audioRef.current.load();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [resolvedSrc, isVideoPlatform]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, [volume]);

  /**
   * Calculate responsive iframe dimensions
   */
  const getIframeDimensions = useCallback((): { width: number; height: number } => {
    const maxWidth = Math.min(windowWidth - 32, 800);
    const aspectRatio = 16 / 9;
    const width = Math.max(280, maxWidth);
    const height = Math.max(158, width / aspectRatio);
    
    return { width, height };
  }, [windowWidth]);

  /**
   * Initialize audio element with proper settings
   */
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = 'anonymous';
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('ended', () => {
        setPlaying(false);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error('[MusicPlayer] Audio error:', e);
        setError('Unable to load audio file');
      });
    }
  }, [volume]);

  /**
   * Request permission and play audio
   * This handles browser autoplay policies
   */
  const requestAndPlay = useCallback(async (): Promise<boolean> => {
    // Use shared permission logic which can signal 'prompt' when a user gesture is required
    if (!permissionRequested) {
      const result = await sharedRequestAudioPermission();
      if (result === 'granted') {
        setPermissionRequested(true);
      } else if (result === 'prompt') {
        setPermissionRequested(true);
        setError('Audio requires user interaction — please click the play button again to enable sound.');
        return false;
      } else if (result === 'unavailable') {
        setError('Audio is unavailable in this environment.');
        setPermissionRequested(true);
        return false;
      } else {
        setError('Audio permission denied or blocked.');
        setPermissionRequested(true);
        return false;
      }
    }

    initAudio();
    
    if (audioRef.current) {
      try {
        audioRef.current.muted = false;
        await audioRef.current.play();
        setPlaying(true);
        setAudioEnabled(true);
        setError(null);
        return true;
      } catch (e: any) {
        console.warn('[MusicPlayer] Play error:', e);
        if (e.name === 'NotAllowedError') {
          setError('Audio playback blocked by browser. Please click the play button again to enable sound.');
        } else {
          setError('Playback failed — try opening the source in a new tab');
        }
        return false;
      }
    }
    return false;
  }, [permissionRequested, initAudio]);

  /**
   * Toggle play/pause with proper permission handling
   */
  const toggle = async () => {
    if (isVideoPlatform) {
      // For embeds, just toggle playing state
      setPlaying(!playing);
      return;
    }

    if (playing) {
      // Pause
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlaying(false);
    } else {
      // Play (with permission check)
      const success = await requestAndPlay();
      if (!success) {
        // Error state is set in requestAndPlay
      }
    }
  };

  /**
   * Handle volume change
   */
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  /**
   * Format time as MM:SS
   */
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // YouTube/Vimeo embed - fully responsive
  if (isVideoPlatform) {
    let embedUrl = toEmbed(resolvedSrc);
    if (resolvedSrc.toLowerCase().includes('vimeo')) {
      embedUrl = vimeoToEmbed(resolvedSrc);
    }
    
    const { width, height } = getIframeDimensions();
    
    return (
      <div 
        className="music-player" 
        role="region" 
        aria-label={title ?? 'Video player'}
        style={{
          padding: '16px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          maxWidth: '100%'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <div style={{ fontWeight: '700', fontSize: '16px' }}>
            {title ?? (resolvedSrc.includes('youtube') ? 'YouTube Video' : 'Video')}
          </div>
          
          {/* Responsive video iframe */}
          <div 
            style={{
              width: '100%',
              maxWidth: `${width}px`,
              aspectRatio: '16/9',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#0f172a'
            }}
          >
            <iframe
              title={title || 'Video player'}
              src={embedUrl}
              width={width}
              height={height}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          </div>
          
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <a 
              className="btn" 
              href={resolvedSrc} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                background: '#6BD3C7',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                minHeight: '44px'
              }}
            >
              Open in {resolvedSrc.includes('youtube') ? 'YouTube' : 'New Tab'} ↗
            </a>
            {playing && (
              <button 
                className="btn secondary"
                onClick={() => setPlaying(false)}
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
                Pause
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Native audio player - fully responsive
  return (
    <ErrorBoundary>
    <div 
      className="music-player" 
      role="region" 
      aria-label={title ?? 'Music player'}
      style={{
        padding: '16px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        maxWidth: '100%'
      }}
    >
      {/* HTTPS Security Warning */}
      {!isHttps && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '6px',
            marginBottom: '12px',
            fontSize: '13px',
            color: '#92400e'
          }}
          role="alert"
        >
          <span>🔒</span>
          <span>Not secure - audio features may be limited without HTTPS</span>
        </div>
      )}

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        alignItems: 'flex-start'
      }}>
        {/* Hidden audio element */}
        <audio 
          ref={audioRef} 
          src={resolvedSrc} 
          loop
          onError={() => setError('Unable to load audio')}
          style={{ display: 'none' }}
        />
        
        <div style={{ fontWeight: '700', fontSize: '16px' }}>
          {title ?? 'Background Music'}
        </div>
        
        {/* Error Display */}
        {error && (
          <div 
            style={{
              padding: '10px 12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              color: '#dc2626',
              fontSize: '13px',
              width: '100%'
            }}
            role="alert"
          >
            {error}
          </div>
        )}
        
        {/* Progress bar (for visual feedback) */}
        {duration > 0 && (
          <div 
            style={{
              width: '100%',
              height: '4px',
              background: '#e2e8f0',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                width: `${(currentTime / duration) * 100}%`,
                height: '100%',
                background: '#6BD3C7',
                transition: 'width 0.1s'
              }}
            />
          </div>
        )}
        
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginTop: '8px',
          width: '100%'
        }}>
          <button 
            onClick={toggle} 
            className="btn"
            aria-pressed={playing}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: touchEnabled ? '12px 20px' : '10px 18px',
              background: playing ? '#ef4444' : '#6BD3C7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '44px'
            }}
          >
            {playing ? '⏸ Pause' : '▶ Play'}
          </button>
          
          <a 
            className="btn secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: touchEnabled ? '12px 20px' : '10px 18px',
              background: '#f1f5f9',
              color: '#475569',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '44px'
            }}
            href={resolvedSrc} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Open Source ↗
          </a>
        </div>
        
        {/* Inline permission hint for autoplay policies */}
        {!permissionRequested && (
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }} role="status">
            Tip: Your browser blocks autoplay. Tap <strong>Play</strong> to enable audio.
          </div>
        )}

        {/* Volume control */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '8px 0'
          }}
        >
          <span style={{ fontSize: '14px', color: '#64748b' }}>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              flex: 1,
              height: '4px',
              cursor: 'pointer'
            }}
            aria-label="Volume"
          />
          <span style={{ fontSize: '12px', color: '#64748b', minWidth: '35px' }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
        
        {/* Audio Status */}
        {audioEnabled && (
          <div style={{
            padding: '6px 10px',
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#16a34a',
            marginTop: '4px'
          }}>
            ✓ Audio enabled
          </div>
        )}
        
        {/* Duration display */}
        {duration > 0 && (
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginTop: '4px'
          }}>
            Duration: {formatTime(duration)}
          </div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}

