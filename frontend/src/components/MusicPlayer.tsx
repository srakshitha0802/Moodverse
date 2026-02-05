import React, { useRef, useState } from 'react';

function isYouTube(url?: string){
  if(!url) return false;
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('/embed/');
}

function toEmbed(url: string){
  if(url.includes('/embed/')) return url;
  // watch?v=... -> embed
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if(watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const short = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if(short) return `https://www.youtube.com/embed/${short[1]}`;
  return url;
}

export default function MusicPlayer({ src, title }: { src?: string; title?: string }){
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolvedSrc = src ?? 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  const youtube = isYouTube(resolvedSrc);

  const toggle = async () => {
    if(!audioRef.current) return;
    try {
      if(playing){
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
        setError(null);
      }
    } catch (e:any) {
      setError('Playback blocked — try opening the source');
    }
  }

  if(youtube){
    const embed = toEmbed(resolvedSrc);
    return (
      <div className="music-player p-2" role="region" aria-label={title ?? 'YouTube music'}>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={{flex:1}}>
            <div style={{fontWeight:700}}>{title ?? 'YouTube Track'}</div>
            <div style={{marginTop:8}}>
              <iframe title={title || 'YouTube music'} src={embed} width="300" height="170" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div style={{marginTop:8}}>
              <a className="btn" href={embed} target="_blank" rel="noreferrer">Open in YouTube</a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="music-player p-2" role="region" aria-label={title ?? 'Music player'}>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <audio ref={audioRef} src={resolvedSrc} loop onError={() => setError('Unable to load audio')} controls style={{display:'none'}} />
        <div>
          <div style={{fontWeight:700}}>{title ?? 'Background Music'}</div>
          {error && <div className="muted" style={{fontSize:12,marginTop:6}}>{error}</div>}
          <div style={{marginTop:8}}>
            <button onClick={toggle} className="btn" aria-pressed={playing}>{playing ? 'Pause' : 'Play'}</button>
            <a className="btn secondary" style={{marginLeft:8}} href={resolvedSrc} target="_blank" rel="noreferrer">Open Source</a>
          </div>
        </div>
      </div>
    </div>
  )
}