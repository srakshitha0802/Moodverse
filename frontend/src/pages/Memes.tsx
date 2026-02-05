import React, { useEffect, useState } from 'react';

const FALLBACK = [
  {id:'f1', url:'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif', title:'Hilarious Dog'},
  {id:'f2', url:'https://media.giphy.com/media/3oEduQAsYcJKQH2XsI/giphy.gif', title:'Silly Dance'},
  {id:'f3', url:'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif', title:'Cat Typing'},
  {id:'f4', url:'https://media.giphy.com/media/1BXa2alBjrCXC/giphy.gif', title:'Surprised Cat'},
  {id:'f5', url:'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', title:'Funny Wink'},
  {id:'f6', url:'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif', title:'Joyful'}
];

export default function Memes(){
  // start with curated, truly funny memes; user can save favorites
  const [memes, setMemes] = useState<{id:string;url:string;title?:string}[]>(FALLBACK.slice());

  // likes persisted per meme
  const [likes, setLikes] = useState<Record<string,number>>(() => {
    try{ return JSON.parse(localStorage.getItem('moodverse_meme_likes')||'{}') }catch{return {} as Record<string,number>};
  });
  const [saved, setSaved] = useState<Record<string,boolean>>(() => {
    try{ const s = JSON.parse(localStorage.getItem('moodverse_saved_memes')||'[]'); return (s || []).reduce((acc:any,id:string)=>{acc[id]=true;return acc},{}) }catch{return {} as Record<string,boolean>} ;
  });

  useEffect(()=>{ localStorage.setItem('moodverse_meme_likes', JSON.stringify(likes)); },[likes]);
  useEffect(()=>{ const arr = Object.keys(saved).filter(k=>saved[k]); localStorage.setItem('moodverse_saved_memes', JSON.stringify(arr)); },[saved]);

  useEffect(()=>{
    // Augment with recent 'funny' gifs from Tenor (if available) to keep content fresh
    const fetchTenor = async ()=>{
      try{
        const resp = await fetch('https://tenor.googleapis.com/v2/search?q=hilarious%20meme&key=LIVDSRZULELA&limit=12');
        if(!resp.ok) throw new Error('tenor failed');
        const data = await resp.json();
        const urls = data.results?.map((r:any)=> r.media_formats?.gif?.url || r.media_formats?.mediumgif?.url).filter(Boolean);
        if(urls && urls.length){
          const mapped = urls.slice(0,12).map((u:string,i:number)=>({ id: 't' + Date.now() + '-' + i, url: u, title: 'Gif' }));
          setMemes(prev => [...mapped, ...prev]);
        }
      }catch(err){
        console.warn('Tenor fetch failed, using curated list', err);
      }
    }
    fetchTenor();
  },[]);

  const [featured, setFeatured] = useState<string | null>(null);

  const surprise = () => {
    if(memes.length===0) return;
    const idx = Math.floor(Math.random()*memes.length);
    setFeatured(memes[idx].url);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  return (
    <div className="container">
      <h2>Meme Corner</h2>
      <p className="muted">Curated light-hearted images & GIFs to boost your mood.</p>

      <div style={{marginTop:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="btn" onClick={surprise}>Surprise me</button>
          <button className="btn secondary" onClick={()=>{navigator.clipboard.writeText(JSON.stringify(memes)); alert('Copied meme list to clipboard')}}>Copy list</button>
        </div>
      </div>

      {featured && (
        <div className="card card-md" style={{marginTop:12,textAlign:'center'}}>
          <img src={featured} alt="featured" style={{width:'100%',maxHeight:420,objectFit:'contain',borderRadius:8}}/>
        </div>
      )}

      <div className="card-grid" style={{marginTop:12}}>
        {memes.map((m, i)=> (
          <div key={m.id} className="card card-sm">
            <img src={m.url} alt={m.title||`meme-${i}`} style={{width:'100%',height:180,objectFit:'cover',borderRadius:6}}/>
            <div style={{display:'flex',gap:8,alignItems:'center',marginTop:8}}>
              <button className="btn" onClick={()=>{ setLikes(prev=>({ ...prev, [m.id]:(prev[m.id]||0)+1 })); }} aria-label={`Like ${m.title || 'meme'}`}>❤ {likes[m.id]||0}</button>
              <button className="btn secondary" onClick={()=>{ setSaved(prev=>({ ...prev, [m.id]: !prev[m.id] })); }} aria-pressed={!!saved[m.id]}>{saved[m.id] ? 'Saved' : 'Save'}</button>
              <button className="btn" onClick={()=>{ navigator.clipboard.writeText(m.url); alert('Link copied') }}>Copy link</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}