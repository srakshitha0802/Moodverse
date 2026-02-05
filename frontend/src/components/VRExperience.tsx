import React, { useEffect, useRef, useState } from "react";
import "aframe";

function makeId(s: string) {
  return 'asset-' + btoa(s).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20);
}

export default function VRExperience({ scene }: { scene: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Reset previous video when scene changes
  const [isEquirect, setIsEquirect] = useState<boolean>(false);
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      try { v.pause(); v.src = ''; } catch(e){}
    }
    setLoading(true);
    // determine if an image is equirectangular (approx. 2:1 aspect ratio)
    if(scene && (scene.startsWith('data:') || scene.startsWith('blob:') || scene.endsWith('.jpg') || scene.endsWith('.jpeg') || scene.endsWith('.png'))){
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const ratio = img.width / Math.max(1, img.height);
        setIsEquirect(ratio > 1.7 && ratio < 2.3);
      };
      img.onerror = () => setIsEquirect(false);
      img.src = scene;
    } else {
      setIsEquirect(false);
    }

    const t = setTimeout(()=>setLoading(false), 800);
    return ()=> clearTimeout(t);
  }, [scene]);

  const isImage = !!scene && (scene.startsWith('data:') || scene.startsWith('blob:') || scene.endsWith('.jpg') || scene.endsWith('.jpeg') || scene.endsWith('.png'));
  const isModel = !!scene && (scene.endsWith('.glb') || scene.endsWith('.gltf'));
  const isVideo = !!scene && (scene.startsWith('blob:') || scene.endsWith('.mp4') || scene.endsWith('.webm') || scene.includes('.mp4'));

  const assetId = makeId(scene || 'default');
  const videoAssetId = `video-${assetId}`;
  const sceneKey = assetId; // force a-scene remount when scene changes

  // expose a friendly debug message if resource is not ideal for full 360 playback
  const [resourceOk, setResourceOk] = useState<boolean | null>(null);

  useEffect(()=>{
    // try to detect quickly whether image is equirectangular based on aspect ratio
    if(isImage && scene && !scene.startsWith('data:') && !scene.startsWith('blob:')){
      const img = new Image(); img.crossOrigin = 'anonymous';
      img.onload = () => { setResourceOk((img.width/Math.max(1,img.height)) > 1.7 && (img.width/Math.max(1,img.height)) < 2.3 ); };
      img.onerror = () => setResourceOk(false);
      img.src = scene;
    } else if(isVideo){
      // optimistic for videos
      setResourceOk(true);
    } else if(scene && scene.startsWith('data:')){
      setResourceOk(true);
    } else {
      setResourceOk(null);
    }
  },[scene]);

  return (
    <div>
      {/* simple controls for video scenes */}
      {isVideo && (
        <div style={{marginBottom:8,display:'flex',gap:8}}>
          <button className="btn" onClick={() => { const v = document.getElementById(videoAssetId) as HTMLVideoElement | null; if(v){ v.muted = false; v.play().catch(()=>{}); } }}>Play</button>
          <button className="btn secondary" onClick={() => { const v = document.getElementById(videoAssetId) as HTMLVideoElement | null; v?.pause(); }}>Pause</button>
        </div>
      )}

      <a-scene key={sceneKey} embedded vr-mode-ui="enabled: true" style={{ height: '600px' }}>
        <a-assets>
          {isImage && <img id={assetId} src={scene} crossOrigin="anonymous" onError={() => {
            const fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000"><rect width="100%" height="100%" fill="#000"/><text x="50%" y="50%" fill="#fff" font-size="48" text-anchor="middle">Image failed to load</text></svg>');
            const el = document.getElementById(assetId) as HTMLImageElement | null;
            if(el) el.src = fallback;
          }} />}

          {isVideo && (
            <video id={videoAssetId} ref={videoRef} src={scene} crossOrigin="anonymous" playsInline loop muted style={{width:0,height:0,position:'absolute'}} controls onError={() => {
              const fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="2000" height="1000"><rect width="100%" height="100%" fill="#000"/><text x="50%" y="50%" fill="#fff" font-size="48" text-anchor="middle">Video failed to load</text></svg>');
              const img = document.createElement('img');
              img.id = assetId + '-fallback';
              img.src = fallback;
              document.querySelector('a-assets')?.appendChild(img);
              const vs = document.querySelector('a-videosphere');
              if(vs){ (vs as Element).setAttribute('src', `#${img.id}`); }
            }} />
          )}
        </a-assets>

        {/* Image sky or plane fallback */}
        {isImage && isEquirect && <a-sky src={`#${assetId}`}></a-sky>}
        {isImage && !isEquirect && (
          <>
            <a-entity geometry="primitive: plane; width: 3; height: 1.8" material={`shader: flat; src: #${assetId}`} position="0 1.6 -2"></a-entity>
            <a-entity text={`value: Image preview; align: center`} position="0 0.4 -2"/>
          </>
        )}

        {/* Video sphere */}
        {isVideo && <a-videosphere src={`#${videoAssetId}`}></a-videosphere>}

        {/* 3D GLB Models */}
        {isModel && (
          <a-entity
            gltf-model={scene}
            position="0 0 -4"
            animation-mixer
          ></a-entity>
        )}

        {/* Camera + Cursor */}
        <a-camera position="0 1.6 0">
          <a-cursor color="#1E90FF"></a-cursor>
        </a-camera>
      </a-scene>
    </div>
  );
}
