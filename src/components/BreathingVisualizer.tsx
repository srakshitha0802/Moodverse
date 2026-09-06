import React, { useEffect, useState } from 'react';

export default function BreathingVisualizer(){
  const [phase, setPhase] = useState(0);

  useEffect(()=>{
    const id = setInterval(()=>{
      setPhase(p=> (p+1)%100);
    }, 200);
    return ()=>clearInterval(id);
  },[]);

  const scale = 0.75 + 0.25 * Math.sin((phase/100)*Math.PI*2);

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:12}}>
      <div style={{width:200,height:200,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{width:120,height:120,borderRadius:'50%',background:'linear-gradient(180deg,#e0f2fe,#bae6fd)',transform:`scale(${scale})`,transition:'transform 180ms',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontSize:18,fontWeight:700}}>Breathe</div>
        </div>
      </div>
      <div className="muted">Follow the circle: inhale as it grows, exhale as it shrinks.</div>
    </div>
  )
}
