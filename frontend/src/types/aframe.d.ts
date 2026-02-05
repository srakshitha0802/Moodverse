/**
 * A-Frame TypeScript Definitions
 * 
 * This file provides TypeScript type definitions for A-Frame VR components
 * used in the Moodverse VR Rooms application.
 */

declare namespace JSX {
  // Core A-Frame components
  interface IntrinsicElements {
    // Scene and Assets
    'a-scene': any;
    'a-assets': any;
    'a-mixin': any;
    
    // Sky and Environment
    'a-sky': any;
    'a-environment': any;
    
    // Camera and Controls
    'a-camera': any;
    'a-entity-camera': any;
    
    // Interaction
    'a-cursor': any;
    'a-gaze-cursor': any;
    
    // Geometry
    'a-box': any;
    'a-sphere': any;
    'a-plane': any;
    'a-circle': any;
    'a-cylinder': any;
    
    // Text
    'a-text': any;
    
    // Lighting
    'a-light': any;
    
    // Models
    'a-entity': any;
    
    // Video
    'a-video': any;
    'a-videosphere': any;
    
    // Sound
    'a-sound': any;
    
    // Images
    'a-image': any;
    
    // Links
    'a-link': any;
    
    // VR Controllers
    'a-entity-controls': any;
    'a-oculus-touch-controls': any;
    'a-vive-controls': any;
    
    // Position/Rig
    'a-rig': any;
    
    // Custom components for VR Room
    'audio-player': any;
    'vr-scene': any;
  }
}

// Extend Window interface for A-Frame
interface Window {
  AFRAME: any;
  __VR_CAPABLE: boolean;
}

// Helper type for VR Panorama
interface VRPanoramaConfig {
  id: string;
  name: string;
  panoramaUrl: string;
  hdriUrl?: string;
  audioUrl?: string;
  thumbnailUrl: string;
  category: 'nature' | 'urban' | 'space' | 'indoor' | 'abstract';
  mood: string[];
  description: string;
  position?: { x: number; y: number; z: number };
}

// Helper type for HDRI Lighting
interface HDRILightingConfig {
  id: string;
  name: string;
  hdriUrl: string;
  intensity: number;
  exposure: number;
}

// Security configuration type
interface VRSecurityConfig {
  allowedDomains: string[];
  maxFileSize: number;
  allowedImageTypes: string[];
  allowedAudioTypes: string[];
  cspEnabled: boolean;
  sanitizeInput: boolean;
}

// Import meta for Vite
interface ImportMeta {
  hot?: {
    accept(): void;
  };
}

