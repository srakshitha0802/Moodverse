import React, { useState } from 'react';

const COLORS = ['#6EE7B7','#93C5FD','#FDE68A','#FDBA74','#FBCFE8'];

export default function ColorMatch(){
  const [target] = useState(COLORS[Math.floor(Math.random()*COLORS.length)]);
  const [attempts, setAttempts] = useState(0);
  const [won, setWon] = useState(false);

  const pick = (c:string)=>{
    setAttempts(a=>a+1);
    if(c===target) setWon(true);
  }

  return (
    <div className="card card-sm">
      <h4 style={{marginTop:0}}>Color Match</h4>
      <p className="muted">Pick the color that matches the target — a calm visual focus.</p>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        {COLORS.map((c,i)=> (
          <button key={i} onClick={()=>pick(c)} style={{width:48,height:48,background:c,border:'none',borderRadius:6,cursor:'pointer'}} aria-label={`color-${i}`}></button>
        ))}
      </div>
      <div style={{marginTop:8}}>{won ? <strong>Nice! You found it in {attempts} attempts.</strong> : <span className="muted">Attempts: {attempts}</span>}</div>
    </div>
  )
}