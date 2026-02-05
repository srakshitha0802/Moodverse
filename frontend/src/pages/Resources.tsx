import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Resources(){
  const [list, setList] = useState<any[]>([]);
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get('/api/resources');
        setList(res.data.resources || []);
      }catch(err){console.error(err)}
    }
    fetch();
  },[]);

  return (
    <div className="container">
      <h2>Mental Health Resources</h2>
      <p className="muted">Local helplines and support organisations. If you're in immediate danger, call your emergency number first.</p>

      <div style={{marginTop:12}}>
        <div className="card-grid">
          {list.map(r=> (
            <div key={r.id} className="card card-md" style={{marginBottom:8}}>
              <div style={{fontWeight:700}}>{r.name} — {r.region}</div>
              <div style={{color:'#64748b'}}>{r.phone} {r.url && <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}