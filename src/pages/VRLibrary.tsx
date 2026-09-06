import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Check if running in secure context (required for device orientation and audio)
 */
function isSecureContext(): boolean {
  return window.isSecureContext || 
         location.protocol === 'https:' || 
         location.hostname === 'localhost' ||
         location.hostname === '127.0.0.1';
}

/**
 * Validate file extension with case-insensitive comparison
 * Handles case-sensitive file systems like Linux
 */
function validateFileExtension(url: string, extensions: string[]): boolean {
  const lowerUrl = url.toLowerCase();
  return extensions.some(ext => lowerUrl.endsWith(ext.toLowerCase()));
}

/**
 * Validate URL is accessible (basic check)
 */
function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:' || 
           parsed.protocol === 'data:' || parsed.protocol === 'blob:';
  } catch {
    return false;
  }
}

const RESOURCES = [
   {
    id: 'pixabay',
    title: 'Pixabay – Free 360° VR Videos',
    description: 'Over 40+ free 360° immersive videos you can download and use in any project (royalty-free). Filter for Forest, Beach, Mountain, Countryside scenes.',
    url: 'https://pixabay.com/videos/search/360-degree/',
    note: 'Royalty-free collection; check license per clip.',
    thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '360rtc',
    title: '360RTC – Free 360° VR Footage',
    description: 'Nature & outdoor 360° VR footage: beaches, forests, and scenic walks.',
    url: 'https://360rtc.com/en/',
    note: 'Download free clips for use in VR experiences.',
    thumb: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'dareful',
    title: 'Dareful – Free VR 360 Nature Clips',
    description: 'High-quality 4K / HD 360 clips; credit site where required.',
    url: 'https://dareful.com/videos/vr/',
    note: 'Great for nature backdrops.',
    thumb: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'nasa',
    title: 'NASA – 360° Space & Planetary Visuals',
    description: "NASA's VR/360° multimedia (public domain) — excellent for meditative star/planet scenes.",
    url: 'https://informal.jpl.nasa.gov/museum/360-video',
    note: 'Public domain — no copyright restrictions.',
    thumb: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'pixabay-immersive',
    title: 'Pixabay – Immersive 360 Collection',
    description: 'Broader set of immersive scenes (forest, landscape, streets).',
    url: 'https://pixabay.com/videos/search/immersive%20360%20degree%20virtual%20tours/',
    note: 'Filter for calm scenes.',
    thumb: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=1200&auto=format&fit=crop'
  }
];

// Curated playable scenes (images or 360 videos where available)
const PRESET_SCENES = [
  // Working sample 360 image (equirectangular)
  { id: 'sechelt', title: 'Sechelt Beach (jpg)', url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/sechelt.jpg', source: 'A-Frame Samples', playable: true },
  { id: 'bridge', title: 'Bridge (jpg)', url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/bridge.jpg', source: 'A-Frame Samples', playable: true },
  { id: 'park', title: 'Park (jpg)', url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/park.jpg', source: 'A-Frame Samples', playable: true },
  { id: 'yokohama', title: 'Yokohama (jpg)', url: 'https://cdn.aframe.io/360-image-gallery-boilerplate/img/yokohama.jpg', source: 'A-Frame Samples', playable: true },
  // Demo sample videos (not always 360 but useful for testing play in the viewer)
  { id: 'flowers', title: 'Flower (demo video)', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', source: 'MDN sample', playable: true },
  { id: 'bunny', title: 'Big Buck Bunny (demo)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', source: 'Google Storage', playable: true },
  // Links to curated collections (visit to download true equirectangular clips)
  { id: 'pixabay', title: 'Pixabay – 360 Collection (visit)', url: 'https://pixabay.com/videos/search/360-degree/', source: 'Pixabay', playable: false, thumb: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop' },
  { id: 'dareful', title: 'Dareful – VR Clips (visit)', url: 'https://dareful.com/videos/vr/', source: 'Dareful', playable: false, thumb: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop' },
  { id: 'nasa', title: 'NASA – VR/360 (visit)', url: 'https://www.nasa.gov/360', source: 'NASA', playable: false, thumb: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=1200&auto=format&fit=crop' }
];

// Example demo videos (non-360 or sample public domain) you can load instantly in the viewer to test
const SAMPLE_VIDEOS = [
  { id: 'flowers', title: 'Flower (demo)', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', source: 'MDN (public domain sample)', playable: true },
  { id: 'bunny', title: 'Big Buck Bunny (demo)', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', source: 'Google Storage', playable: true },
  // tip: use downloaded 360 MP4s from Pixabay/360RTC for true spherical video experiences
];

export default function VRLibrary(){
  const [library, setLibrary] = React.useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('moodverse_vr_library') || '[]'); } catch { return []; }
  });
  const [urlToAdd, setUrlToAdd] = React.useState('');
  const [titleToAdd, setTitleToAdd] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [isHttps, setIsHttps] = React.useState(true);

  // Check for secure context on mount
  React.useEffect(() => {
    setIsHttps(isSecureContext());
  }, []);

  React.useEffect(() => {
    localStorage.setItem('moodverse_vr_library', JSON.stringify(library));
  }, [library]);

  // Export / import helpers for persistence
  function exportLibrary(){
    const blob = new Blob([JSON.stringify(library, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'moodverse_vr_library.json';
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  }

  function importLibrary(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]; if(!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if(Array.isArray(data)) setLibrary(data);
        setMessage('Library imported'); setTimeout(()=>setMessage(null),2200);
      } catch {
        setMessage('Import failed'); setTimeout(()=>setMessage(null),2200);
      }
    };
    reader.readAsText(f);
    e.currentTarget.value = '';
  }

  function addToLibrary(item: { id: string; title: string; url: string; type: string; thumb?: string; persisted?: boolean }){
    setLibrary(prev => [item, ...prev]);
    setMessage('Added to your library!');
    setTimeout(()=>setMessage(null),2200);
  }

  function removeFromLibrary(id: string){
    setLibrary(prev => prev.filter(i=>i.id!==id));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0];
    if(!f) return;
    const id = 'u-' + Date.now();
    const title = f.name;
    if(f.type.startsWith('image/')){
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        addToLibrary({ id, title, url: dataUrl, type: 'image', thumb: dataUrl, persisted: true });
      };
      reader.readAsDataURL(f);
    } else if(f.type.startsWith('video/')){
      // try to persist small videos as dataURL, otherwise keep objectURL for session
      if(f.size < 2 * 1024 * 1024){
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          addToLibrary({ id, title, url: dataUrl, type: 'video', thumb: '', persisted: true });
        };
        reader.readAsDataURL(f);
      } else {
        const url = URL.createObjectURL(f);
        addToLibrary({ id, title, url, type: 'video', thumb: '', persisted: false });
        setMessage('Video added for this session (file too large to persist).');
        setTimeout(()=>setMessage(null),3000);
      }
    } else {
      const url = URL.createObjectURL(f);
      addToLibrary({ id, title, url, type: 'page', thumb: '', persisted: false });
    }
    // reset input
    e.currentTarget.value = '';
  }

  function handleAddUrl(){
    if(!urlToAdd) return;
    
    // Validate URL
    if (!isValidUrl(urlToAdd)) {
      setMessage('Invalid URL format');
      setTimeout(()=>setMessage(null), 2200);
      return;
    }

    const id = 'r-' + Date.now();
    // Use case-insensitive file extension validation
    let type = 'page';
    if (validateFileExtension(urlToAdd, ['.jpg', '.jpeg', '.png'])) type = 'image';
    if (validateFileExtension(urlToAdd, ['.mp4', '.webm'])) type = 'video';
    const title = titleToAdd || urlToAdd.split('/').slice(-1)[0] || 'Remote 360';
    addToLibrary({ id, title, url: urlToAdd, type, thumb: urlToAdd, persisted: true });
    setUrlToAdd(''); setTitleToAdd('');
  }

  function savePreset(s: any){
    const id = 'p-' + s.id + '-' + Date.now();
    addToLibrary({ id, title: s.title, url: s.url, type: s.playable ? (s.url.endsWith('.mp4') ? 'video' : 'image') : 'page', thumb: s.url, persisted: true });
  }

  return (
    <div className="container">
      {/* HTTPS Warning Banner */}
      {!isHttps && (
        <div style={{ 
          background: '#fef3c7', 
          border: '1px solid #f59e0b', 
          borderRadius: 8, 
          padding: 12, 
          marginBottom: 16 
        }}>
          <strong>⚠️ Security Notice:</strong> This page is not running in a secure context (HTTPS). 
          Some VR features like device orientation and audio playback may be limited. 
          For full functionality, please access this site via HTTPS.
        </div>
      )}

      <h2>360° VR Library</h2>
      <p className="muted">Curated sources for free 360° VR videos and immersive collections you can use in Moodverse.</p>

      {message && <div className="card mt-sm">{message}</div>}

      <div className="card-grid mt-sm">
        <div className="card card-md">
          <h3 style={{marginTop:0}}>Add to My Library</h3>
          <p className="muted">Upload a 360 image/video (small files persist) or paste a direct URL to add to your personal library.</p>
          <div className="flex-gap-8 mt-sm">
            <input aria-label="Upload 360 file" type="file" accept="image/*,video/*" onChange={handleUpload} />
            <div style={{flex:1}}>
              <input placeholder="Remote file URL (jpg/png/mp4)" value={urlToAdd} onChange={e=>setUrlToAdd(e.target.value)} className="input-full" />
              <input placeholder="Optional title" value={titleToAdd} onChange={e=>setTitleToAdd(e.target.value)} className="input-full mt-xs" />
              <div className="mt-sm" style={{display:'flex',gap:8}}>
                <button className="btn" onClick={handleAddUrl}>Add URL to library</button>
                <button className="btn secondary" onClick={exportLibrary}>Export</button>
                <label className="btn" style={{display:'inline-block'}} htmlFor="import-lib">Import</label>
                <input id="import-lib" type="file" accept="application/json" onChange={importLibrary} className="hidden" />
              </div>
            </div>
          </div>
        </div>

        <div className="card card-md">
          <h3 style={{marginTop:0}}>Library Tips</h3>
          <p className="muted">For full 360 playback, prefer equirectangular images (JPG/PNG) and MP4/WebM equirectangular videos. Large videos (&gt;2MB) will be available for the session only (browser object URL), and small files will be persisted in localStorage.</p>
        </div>
      </div>

      <h3 className="mt-20">My Library</h3>
      <div className="card-grid mt-sm">
        {library.length===0 && <div className="card">No items saved yet — add one above.</div>}
        {library.map(item => (
          <div key={item.id} className="card card-md">
            {item.thumb ? <img src={item.thumb} alt={item.title} className="img-cover"/> : <div style={{height:160,display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:6}}>No preview</div>}
            <div style={{fontWeight:700,marginTop:8}}>{item.title}</div>
            <div className="muted mt-xs">{item.type}{item.persisted===false ? ' · session-only' : ''}</div>
            <div style={{display:'flex',gap:8}} className="mt-sm">
              {item.type !== 'page' ? (
                <a className="btn" href={`/vr?scene=${encodeURIComponent(item.url)}`}>Open in VR</a>
              ) : (
                <a className="btn" href={item.url} target="_blank" rel="noreferrer">Open</a>
              )}
              <button className="btn secondary" onClick={()=>removeFromLibrary(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{marginTop:24}}>Sources & Presets</h3>

      <div style={{marginTop:16}} className="vr-grid">
        {RESOURCES.map(r => (
          <div key={r.id} className="vr-card card card-md">
            {r.thumb ? (
              <img src={r.thumb} alt={r.title} style={{width:'100%',height:120,objectFit:'cover',borderRadius:6}} />
            ) : (
              <div className="vr-badge">📚</div>
            )}
            <div style={{fontWeight:700,marginTop:8}}>{r.title}</div>
            <p className="muted">{r.description}</p>
            <div style={{display:'flex',gap:8,marginTop:8}}>
              <a className="btn" href={r.url} target="_blank" rel="noreferrer">Visit</a>
              <Link className="btn secondary" to="/vr">Open VR</Link>
            </div>
          </div>
        ))}

        {PRESET_SCENES.map(s => (
          <div key={s.id} className="vr-card card card-md">
            <div className="vr-badge">🌅</div>
            {s.thumb || (s.url && (s.url.endsWith('.jpg') || s.url.endsWith('.png'))) ? (
              <img src={s.thumb || s.url} alt={s.title} style={{width:'100%',height:120,objectFit:'cover',borderRadius:6}} />
            ) : (
              <div style={{height:120,display:'flex',alignItems:'center',justifyContent:'center',background:'#f3f4f6',borderRadius:6}}>No preview</div>
            )}
            <div style={{fontWeight:700,marginTop:8}}>{s.title}</div>
            <div className="muted">{s.source}</div>
            <div style={{marginTop:8,display:'flex',gap:8}}>
              {s.playable ? (
                <a className="btn" href={`/vr?scene=${encodeURIComponent(s.url)}`}>Open in VR</a>
              ) : (
                <a className="btn" href={s.url} target="_blank" rel="noreferrer">Visit</a>
              )}
              <button className="btn secondary" onClick={()=>savePreset(s)}>Save to My Library</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
