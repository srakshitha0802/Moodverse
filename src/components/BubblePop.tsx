import React, { useEffect, useRef, useState } from 'react';

function rand(min:number,max:number){return Math.random()*(max-min)+min}

export default function BubblePop(){
  const [bubbles, setBubbles] = useState<{id:number,x:number,y:number,r:number}[]>([]);
  const idRef = useRef(1);
  useEffect(()=>{
    const t = setInterval(()=>{
      setBubbles(prev=> {
        const next = prev.filter(b=> b.r>0);
        if(next.length<6){
          next.push({id:idRef.current++, x:rand(10,90), y:rand(10,80), r:rand(20,60)})
        }
        return next;
      })
    }, 900);
    return ()=>clearInterval(t);
  },[]);

  const pop = (id:number)=>{
    setBubbles(prev=> prev.map(b=> b.id===id?{...b,r:0}:b))
  }

  return (
    <div style={{position:'relative',height:260,background:'#f8fafc',borderRadius:8,overflow:'hidden'}}>
      {bubbles.map(b=> (
        <div key={b.id} onClick={()=>pop(b.id)} style={{position:'absolute',left:`${b.x}%`,top:`${b.y}%`,width:b.r,height:b.r,borderRadius:'50%',background:'rgba(124,58,237,0.2)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
          <div style={{fontSize:12,color:'#7c3aed'}}>pop</div>
        </div>
      ))}
      {bubbles.length===0 && <div style={{padding:12}}>No bubbles yet — wait a moment.</div>}
    </div>
  )
}