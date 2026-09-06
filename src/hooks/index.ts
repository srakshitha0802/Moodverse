/**
 * Cross-Browser Compatibility Hooks
 * 
 * This module provides utilities for handling cross-browser compatibility issues:
 * - Audio autoplay policies
 * - Device orientation permissions (iOS 13+)
 * - Fallback controls for motion-unavailable devices
 * - HTTPS detection for secure context requirements
 */

export {
  useCrossBrowserCompatibility,
  isDeviceOrientationSupported,
  isDeviceMotionSupported,
  isSecureContext,
  requestOrientationPermission,
  requestAudioPermission,
  createBrowserSafeAudio,
  playAudioWithGesture,
  formatOrientation,
  type DeviceOrientationState,
  type PermissionState,
  type FallbackControls
} from './useCrossBrowserCompatibility';


