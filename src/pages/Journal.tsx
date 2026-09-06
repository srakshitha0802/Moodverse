import React, { useEffect, useState } from "react";

export default function Journal(){
  const [entries, setEntries] = useState<{date:string,mood:string,text:string}[]>(()=>{
    try{ const r = localStorage.getItem('moodverse_journal'); return r?JSON.parse(r):[] }catch{return []}
  });
  const [text, setText] = useState("");
  const [mood, setMood] = useState('neutral');

  useEffect(()=>{ localStorage.setItem('moodverse_journal', JSON.stringify(entries)) },[entries]);

  const save = ()=>{
    if(!text.trim()) return;
    const e = {date:new Date().toISOString(), mood, text};
    setEntries(prev=>[e,...prev]);
    setText("");
  }

  return (
    <div className="container">
      <h1>Daily Journal & Gratitude</h1>
      <div className="mt-sm">
        <div>
          <label>Mood: </label>
          <select value={mood} onChange={e=>setMood(e.target.value)}>
            <option value="happy">😊 Happy</option>
            <option value="neutral">😐 Neutral</option>
            <option value="sad">😔 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="surprised">😮 Surprised</option>
          </select>
        </div>
        <textarea value={text} onChange={e=>setText(e.target.value)} rows={6} className="input-full mt-sm" placeholder="Write about your day or things you're grateful for..." />
        <div className="mt-sm">
          <button className="btn" onClick={save}>Save Entry</button>
          <button className="ml-2" onClick={()=>{navigator.clipboard.writeText(JSON.stringify(entries));alert('Entries copied to clipboard') }}>Export JSON</button>
        </div>
      </div>

      <div className="card-grid mt-md">
        {entries.map((e, i)=>(
          <div key={i} className="card card-md mb-sm">
            <div style={{fontSize:12,color:'#64748b'}}>{new Date(e.date).toLocaleString()} — {e.mood}</div>
            <div className="mt-xs">{e.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}