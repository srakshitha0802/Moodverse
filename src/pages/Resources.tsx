import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DEFAULT_RESOURCES = [
  {
    id: 'res-1',
    name: '988 Suicide & Crisis Lifeline',
    region: 'United States & Canada',
    phone: 'Call or text 988 (Available 24/7, Free & Confidential)',
    url: 'https://988lifeline.org'
  },
  {
    id: 'res-2',
    name: 'Crisis Text Line',
    region: 'US, UK, Canada',
    phone: 'Text HOME to 741741',
    url: 'https://www.crisistextline.org'
  },
  {
    id: 'res-3',
    name: 'The Trevor Project (LGBTQ Youth)',
    region: 'United States',
    phone: 'Call 1-866-488-7386 or text START to 678-678',
    url: 'https://www.thetrevorproject.org'
  },
  {
    id: 'res-4',
    name: 'Veterans Crisis Line',
    region: 'United States',
    phone: 'Dial 988 then press 1, or text 838255',
    url: 'https://www.veteranscrisisline.net'
  },
  {
    id: 'res-5',
    name: 'SAMHSA National Helpline',
    region: 'United States',
    phone: '1-800-662-HELP (4357)',
    url: 'https://www.samhsa.gov/find-help/national-helpline'
  },
  {
    id: 'res-6',
    name: 'Befrienders Worldwide',
    region: 'Global / International',
    phone: 'Confidential emotional support worldwide',
    url: 'https://www.befrienders.org'
  }
];

export default function Resources(){
  const [list, setList] = useState<any[]>(DEFAULT_RESOURCES);
  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await axios.get('/api/resources', { timeout: 3000 });
        if (res.data?.resources && res.data.resources.length > 0) {
          setList(res.data.resources);
        }
      }catch(_err){
        // Silently preserve verified curated resources when API server is absent
      }
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