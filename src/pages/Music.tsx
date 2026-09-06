import React from 'react';
import MusicPlayer from '../components/MusicPlayer';

const DEFAULT_TRACKS = [
  { title: 'Soft Ambient Piano', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { title: 'Gentle Waves (Ambient)', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { title: 'Peaceful Strings', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { title: 'Peaceful Piano (YouTube)', src: 'https://www.youtube.com/embed/2OEL4P1Rz04' },
  { title: 'Deep Ambient Waves (YouTube)', src: 'https://www.youtube.com/embed/lE6vYIf5dCI' }
];

export default function Music(){
  function isYouTube(url?: string){
    if(!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('/embed/');
  }
  function toEmbed(url: string){
    if(url.includes('/embed/')) return url;
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if(watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if(short) return `https://www.youtube.com/embed/${short[1]}`;
    return url;
  }
  const [tracks, setTracks] = React.useState(() => {
    try{ return JSON.parse(localStorage.getItem('moodverse_tracks') || 'null') || DEFAULT_TRACKS }catch{return DEFAULT_TRACKS}
  });
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [message, setMessage] = React.useState<string|null>(null);

  React.useEffect(()=>{ localStorage.setItem('moodverse_tracks', JSON.stringify(tracks)); },[tracks]);

  function addTrack(){
    if(!url || !title) { setMessage('Please provide a title and a valid URL'); setTimeout(()=>setMessage(null),2000); return; }
    setTracks(prev => [{ title, src: url }, ...prev]);
    setTitle(''); setUrl(''); setMessage('Track added'); setTimeout(()=>setMessage(null),2000);
  }

  const meditation = tracks.slice(0,3);
  const relaxing = tracks;

  return (
    <div className="container">
      <h2>Music</h2>
      <p className="muted">Curated calming tracks suitable for yoga, meditation, and restful focus.</p>

      {message && <div className="card mt-sm">{message}</div>}

      <div className="card card-md mt-sm">
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Track title" value={title} onChange={e=>setTitle(e.target.value)} className="input-full" />
          <input placeholder="Track URL (MP3 or YouTube)" value={url} onChange={e=>setUrl(e.target.value)} className="input-full ml-2" />
          <button className="btn" onClick={addTrack}>Add</button>
        </div>
        <p className="muted mt-sm">Tip: add a hosted MP3 (public URL) or a YouTube link; embedded YouTube tracks will show an inline player.</p>
      </div>

      <div style={{marginTop:12}}>
        <h4>Quick play</h4>
        <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
          {tracks.slice(0,3).map((t,i)=> <MusicPlayer key={i} src={t.src} title={t.title} />)}
        </div>
      </div>

      <section style={{marginTop:16}}>
        <h3>Meditation Tracks</h3>
        <div className="card-grid mt-sm" style={{marginTop:12}}>
          {meditation.map((t,i)=> (
            <div key={i} className="card card-sm">
              <div style={{fontWeight:700}}>{t.title}</div>
              <div className="muted">Meditation</div>
              {isYouTube(t.src) ? (
                <div style={{marginTop:8}}>
                  <iframe title={t.title} src={toEmbed(t.src)} width="100%" height={170} style={{border:0,borderRadius:8}} allowFullScreen />
                </div>
              ) : (
                <audio controls src={t.src} style={{width:'100%',marginTop:8}} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop:16}}>
        <h3>Other Relaxing Tracks</h3>
        <div className="card-grid mt-sm" style={{marginTop:12}}>
          {relaxing.map((t,i)=> (
            <div key={i} className="card card-sm">
              <div style={{fontWeight:700}}>{t.title}</div>
              {isYouTube(t.src) ? (
                <div style={{marginTop:8}}>
                  <iframe title={t.title} src={toEmbed(t.src)} width="100%" height={170} style={{border:0,borderRadius:8}} allowFullScreen />
                </div>
              ) : (
                <audio controls src={t.src} style={{width:'100%',marginTop:8}} />
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}