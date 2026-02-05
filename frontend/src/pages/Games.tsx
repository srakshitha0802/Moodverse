import React from 'react';
import BreathingVisualizer from '../components/BreathingVisualizer';
import BubblePop from '../components/BubblePop';
import CalmTap from '../components/CalmTap';
import ColorMatch from '../components/ColorMatch';

export default function Games(){
  return (
    <div className="container">
      <h2>Mini Games</h2>
      <p className="muted">Simple calming games and exercises.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:12}}>
        <div>
          <h3>Breathing Exercise</h3>
          <div className="card card-md"><BreathingVisualizer /></div>
        </div>

        <div>
          <h3>Bubble Pop</h3>
          <div className="card card-md"><BubblePop /></div>
        </div>

        <div>
          <h3>Calm Tap</h3>
          <CalmTap />
        </div>

        <div>
          <h3>Color Match</h3>
          <ColorMatch />
        </div>
      </div>
    </div>
  )
}