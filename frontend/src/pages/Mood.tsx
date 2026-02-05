import React from 'react';
import MoodDetector from '../components/MoodDetector';

export default function Mood(){
  return (
    <div className="container">
      <h2>Mood Detection</h2>
      <p className="muted">Private, on-device mood scanning — try the live scanner below.</p>
      <div style={{marginTop:12}}>
        <MoodDetector />
      </div>
    </div>
  )
}