/**
 * Cross-Browser Compatibility Hook
 * Handles device orientation permissions, audio autoplay policies, and fallback controls
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export interface DeviceOrientationState {
  alpha: number | null;  // Z-axis rotation (0-360)
  beta: number | null;   // X-axis rotation (-180 to 180)
  gamma: number | null;  // Y-axis rotation (-90 to 90)
}

export interface PermissionState {
  orientation: 'granted' | 'denied' | 'prompt' | 'unavailable';
  audio: 'granted' | 'denied' | 'prompt' | 'unavailable';
}

export interface FallbackControls {
  touch: boolean;
  mouse: boolean;
  keyboard: boolean;
  motion: boolean;
}

/**
 * Check if device supports device orientation events
 */
export function isDeviceOrientationSupported(): boolean {
  if (typeof window === 'undefined') return false;

  // Standard DeviceOrientationEvent support
  if ('DeviceOrientationEvent' in window) {
    // iOS 13+ exposes requestPermission; other platforms expose events directly
    const hasRequest = typeof (DeviceOrientationEvent as any).requestPermission === 'function';
    const hasEvent = 'ondeviceorientation' in window || typeof DeviceOrientationEvent !== 'undefined';
    return hasRequest || hasEvent;
  }

  // Newer Generic Sensor API support
  if ((window as any).AbsoluteOrientationSensor) return true;

  return false;
}

/**
 * Check if device supports device motion events
 */
export function isDeviceMotionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return ('DeviceMotionEvent' in window && typeof DeviceMotionEvent !== 'undefined') || 'ondevicemotion' in window;
}

/**
 * Check if HTTPS (required for many browser APIs)
 */
export function isSecureContext(): boolean {
  return window.isSecureContext || 
         location.protocol === 'https:' || 
         location.hostname === 'localhost' ||
         location.hostname === '127.0.0.1';
}

/**
 * Request device orientation permission (iOS 13+)
 */
export async function requestOrientationPermission(): Promise<PermissionState['orientation']> {
  // Check if we're on iOS 13+ which requires permission
  if (typeof DeviceOrientationEvent !== 'undefined' && 
      typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
    try {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      if (permission === 'granted') {
        return 'granted';
      } else if (permission === 'denied') {
        return 'denied';
      }
      return 'prompt';
    } catch (error) {
      console.warn('[CrossBrowser] Orientation permission error:', error);
      return 'unavailable';
    }
  }
  
  // Non-iOS or older iOS - check if already granted
  if ('DeviceOrientationEvent' in window) {
    // Test if we can actually receive events
    return 'granted';
  }
  
  return 'unavailable';
}

/**
 * Request audio permission by attempting to play silent audio
 */
export async function requestAudioPermission(): Promise<PermissionState['audio']> {
  try {
    if (!isSecureContext()) return 'unavailable';

    // Create silent audio context
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    
    if (!AudioContextClass) {
      return 'unavailable';
    }
    
    const audioContext = new AudioContextClass();
    
    // If suspended, resuming without a user gesture will likely fail -> indicate prompt
    if (audioContext.state === 'suspended') {
      try {
        await audioContext.resume();
      } catch (e) {
        // User gesture required
        audioContext.close();
        return 'prompt';
      }
    }
    
    // Create and play silent audio to confirm permission (mute gain)
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    gainNode.gain.value = 0; // Silent
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    
    // Stop after a tiny bit to test permission
    setTimeout(() => {
      try { oscillator.stop(); } catch (e) { /* ignore */ }
      try { gainNode.disconnect(); } catch (e) { /* ignore */ }
      try { audioContext.close(); } catch (e) { /* ignore */ }
    }, 10);
    
    return 'granted';
  } catch (error) {
    console.warn('[CrossBrowser] Audio permission error:', error);
    return 'denied';
  }
}

/**
 * Hook for cross-browser compatibility features
 */
export function useCrossBrowserCompatibility() {
  const [orientation, setOrientation] = useState<DeviceOrientationState>({
    alpha: null,
    beta: null,
    gamma: null
  });
  
  const [permissions, setPermissions] = useState<PermissionState>({
    orientation: 'prompt',
    audio: 'prompt'
  });
  
  const [fallbackControls, setFallbackControls] = useState<FallbackControls>({
    touch: false,
    mouse: false,
    keyboard: true,
    motion: false
  });
  
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHTTPS, setIsHTTPS] = useState(true);
  
  const orientationRef = useRef<DeviceOrientationState>({ alpha: null, beta: null, gamma: null });

  // Detect device type and browser
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Check for iOS
    const iOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);
    
    // Check for mobile
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    setIsMobile(mobile);
    
    // Check HTTPS
    setIsHTTPS(isSecureContext());
  }, []);

  // Request orientation permission (must be called from user gesture)
  const requestPermissions = useCallback(async () => {
    // Request audio permission first (less restrictive)
    const audioResult = await requestAudioPermission();
    
    // Then request orientation permission
    let orientationResult: PermissionState['orientation'] = 'unavailable';
    
    if (isDeviceOrientationSupported()) {
      orientationResult = await requestOrientationPermission();
    }
    
    setPermissions({
      audio: audioResult,
      orientation: orientationResult
    });

    // Update fallback controls based on permissions
    setFallbackControls(prev => ({
      ...prev,
      motion: orientationResult === 'granted',
      // If motion not available, rely on touch/mouse
      touch: isMobile || orientationResult !== 'granted',
      mouse: !isMobile || orientationResult !== 'granted'
    }));

    return { audio: audioResult, orientation: orientationResult };
  }, [isMobile]);

  // Set up device orientation listener
  useEffect(() => {
    if (!isDeviceOrientationSupported()) {
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Clamp values to prevent NaN
      orientationRef.current = {
        alpha: event.alpha !== null ? event.alpha % 360 : null,
        beta: event.beta !== null ? Math.max(-180, Math.min(180, event.beta)) : null,
        gamma: event.gamma !== null ? Math.max(-90, Math.min(90, event.gamma)) : null
      };
      
      setOrientation(orientationRef.current);
    };

    // Try to add listener
    window.addEventListener('deviceorientation', handleOrientation as any);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation as any);
    };
  }, []);

  // Set up device motion listener as fallback
  useEffect(() => {
    if (!isDeviceMotionSupported()) {
      return;
    }

    const handleMotion = (event: DeviceMotionEvent) => {
      // Use acceleration as fallback if orientation not available
      if (event.accelerationIncludingGravity) {
        const acc = event.accelerationIncludingGravity;
        // Convert acceleration to approximate orientation values
        const beta = acc.z ? Math.atan2(-acc.z, acc.x) * (180 / Math.PI) : null;
        const gamma = acc.y ? Math.atan2(acc.y, Math.sqrt(acc.x * acc.x + acc.z * acc.z)) * (180 / Math.PI) : null;
        
        if (beta !== null && gamma !== null) {
          setOrientation(prev => ({
            ...prev,
            beta: prev.beta !== null ? prev.beta : beta,
            gamma: prev.gamma !== null ? prev.gamma : gamma
          }));
        }
      }
    };

    window.addEventListener('devicemotion', handleMotion as any);
    
    return () => {
      window.removeEventListener('devicemotion', handleMotion as any);
    };
  }, []);

  return {
    orientation,
    permissions,
    fallbackControls,
    isIOS,
    isMobile,
    isHTTPS,
    requestPermissions,
    // For touch/mouse fallback controls
    updateFallbackControls: (controls: Partial<FallbackControls>) => 
      setFallbackControls(prev => ({ ...prev, ...controls }))
  };
}

/**
 * Create browser-compatible audio element with proper autoplay handling
 */
export function createBrowserSafeAudio(src?: string): { audio: HTMLAudioElement | null; ready: Promise<boolean> } {
  let audio: HTMLAudioElement | null = null;
  let resolveReady: (ready: boolean) => void;
  
  const ready = new Promise<boolean>((resolve) => {
    resolveReady = resolve;
  });

  try {
    audio = new Audio();
    
    if (src) {
      audio.src = src;
    }
    
    // Set audio to muted initially (will be unmuted on user interaction)
    audio.muted = true;
    audio.volume = 0.5;
    
    // Handle audio being ready
    audio.addEventListener('canplay', () => {
      resolveReady(true);
    }, { once: true });
    
    audio.addEventListener('error', () => {
      console.warn('[CrossBrowser] Audio load error:', audio?.error);
      resolveReady(false);
    }, { once: true });
    
  } catch (error) {
    console.warn('[CrossBrowser] Audio creation error:', error);
    resolveReady(false);
  }

  return { audio, ready };
}

/**
 * Play audio with user gesture requirement
 */
export async function playAudioWithGesture(
  audio: HTMLAudioElement, 
  onSuccess?: () => void,
  onError?: (error: Error) => void
): Promise<boolean> {
  try {
    // Ensure audio is not muted for actual playback
    audio.muted = false;
    
    // Resume audio context if suspended
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      const audioContext = new AudioContextClass();
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
    }
    
    await audio.play();
    onSuccess?.();
    return true;
  } catch (error: any) {
    // Handle autoplay policy errors
    if (error.name === 'NotAllowedError') {
      console.warn('[CrossBrowser] Audio autoplay blocked - user interaction required');
      onError?.(new Error('Audio playback requires user interaction. Please tap to enable sound.'));
    } else {
      console.warn('[CrossBrowser] Audio play error:', error);
      onError?.(error);
    }
    return false;
  }
}

/**
 * Format orientation for display/debugging
 */
export function formatOrientation(state: DeviceOrientationState): string {
  const format = (val: number | null, suffix: string) => 
    val !== null ? `${val.toFixed(1)}${suffix}` : 'N/A';
  
  return `α:${format(state.alpha, '°')} β:${format(state.beta, '°')} γ:${format(state.gamma, '°')}`;
}

