import React, { useEffect, useState } from 'react';

export default function CalmTap(){
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [running, setRunning] = useState(false);

  useEffect(()=>{
    let t: number | undefined;
    if(running && timeLeft>0){
      t = window.setTimeout(()=> setTimeLeft(timeLeft-1), 1000);
    }

    if(timeLeft===0) setRunning(false);
    return ()=> { if(t) window.clearTimeout(t); }
  },[running,timeLeft]);

  const tap = ()=>{ if(!running) return; setScore(s=>s+1); }
  const start = ()=>{ setScore(0); setTimeLeft(15); setRunning(true); }

  return (
    <div className="card card-sm">
      <h4 style={{marginTop:0}}>Calm Tap</h4>
      <p className="muted">Tap the button gently as many times as you can in 15s — focus on steady breathing.</p>
      <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
        <button className="btn" onClick={tap} disabled={!running}>Tap</button>
        <div style={{marginLeft:12}}>Score: <strong>{score}</strong></div>
        <div style={{marginLeft:'auto'}}>Time: {timeLeft}s</div>
      </div>
      <div style={{marginTop:8}}>
        <button className="btn" onClick={start}>Start</button>
      </div>
    </div>
  )
}