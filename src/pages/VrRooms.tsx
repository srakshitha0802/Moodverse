/**
 * VrRooms.tsx - Main VR Rooms Page
 * 
 * This page serves as the entry point for the VR Relaxation Rooms feature.
 * It uses the secure VRRoom component for rendering immersive 360° environments.
 */

import React from 'react';
import VRRoom from '../components/VRRoom';
import './VrRooms.css';

export default function VrRooms() {
  return (
    <div className="vr-rooms-page">
      <VRRoom />
    </div>
  );
}

