import React, { useEffect, useRef, useState } from "react";

// Basic mood mapping to advice + yoga steps
const MOOD_MAP: Record<string, { label: string; advice: string; yoga: string[] }> = {
  happy: {
    label: "Happy",
    advice: "Great! Keep nourishing what makes you smile — keep a gratitude note.",
    yoga: ["Sun Salutation (Surya Namaskar) - 5 rounds", "Gentle heart-opening poses: Cobra, Bridge (30s each)"]
  },
  sad: {
    label: "Sad",
    advice: "It's okay to feel low — try grounding with a short walk and breathing.",
    yoga: ["Child's Pose (Balasana) - 1-2 min", "Seated Forward Fold (1 min)"]
  },
  angry: {
    label: "Angry",
    advice: "Take a step back and breathe — count slow breaths to cool down.",
    yoga: ["Standing Forward Fold (5 breaths)", "Bridge pose with deep breathing (1 min)"]
  },
  neutral: {
    label: "Calm",
    advice: "You're balanced — some light movement or a short meditation can help keep it up.",
    yoga: ["Easy seated breathing (5 min)", "Neck rolls and soft twists"]
  },
  surprised: {
    label: "Surprised",
    advice: "Nice to notice something new — take a breath and reflect on it.",
    yoga: ["Standing Mountain Pose (Tadasana) - grounding breaths", "Gentle shoulder rolls (10 each side)"]
  }
};

function randomMood() {
  const keys = Object.keys(MOOD_MAP);
  return keys[Math.floor(Math.random() * keys.length)];
}

export default function MoodDetector() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [permission, setPermission] = useState<"pending" | "granted" | "denied">("pending");
  const [detected, setDetected] = useState<{ mood: string; confidence: number } | null>(null);
  const intervalRef = useRef<number | null>(null);

  const [running, setRunning] = useState(true);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setPermission("granted");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          const maybePromise = videoRef.current.play();
          if (maybePromise && typeof (maybePromise as any).catch === 'function') {
            (maybePromise as any).catch(() => {});
          }
        } catch (e) {
          // older JSDOM/play implementations may throw; ignore
        }
      }

      // Simple demo detector: sample a "mood" every 3 seconds (replaceable with face-api when desired)
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        const mood = randomMood();
        setDetected({ mood, confidence: Math.round((0.5 + Math.random() * 0.5) * 100) / 100 });
      }, 3000);
      setRunning(true);
    } catch (err) {
      console.warn("Camera permission denied or not available", err);
      setPermission("denied");
      setRunning(false);
    }
  }

  function stopCamera() {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const stream = (videoRef.current?.srcObject as MediaStream | null);
    const tracks = stream?.getTracks?.() || [];
    tracks.forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setRunning(false);
  }

  function toggleCamera(){
    if(running) stopCamera(); else startCamera();
  }

  useEffect(() => {
    // start on mount if possible
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const moodKey = detected?.mood ?? "neutral";
  const moodEntry = MOOD_MAP[moodKey] ?? MOOD_MAP.neutral;

  return (
    <div className="card card-md">
      <h3>Live Mood Scanner</h3>
      {permission === "pending" && <p className="muted">Requesting camera access…</p>}
      {permission === "denied" && (
        <div>
          <p className="muted">Camera access denied. Use the demo detector.</p>
          <button className="btn" onClick={() => startCamera()}>Try again</button>
        </div>
      )}

      <div style={{display:'flex',gap:16,marginTop:12,alignItems:'flex-start'}}>
        <div style={{flex:'0 0 320px'}}>
          <video ref={videoRef} width={320} height={240} style={{borderRadius:8,background:'#000'}} muted playsInline />
          <div style={{marginTop:8,display:'flex',gap:8}}>
            <button className="btn" onClick={toggleCamera}>
              {running ? 'Turn camera off' : 'Turn camera on'}
            </button>
            <button className="btn secondary" onClick={() => {
              const mood = randomMood();
              setDetected({ mood, confidence: Math.round((0.5 + Math.random() * 0.5) * 100) / 100 });
            }}>Sample Mood</button>
          </div>
        </div>
        <div style={{flex:1}}>
          <div style={{padding:12,background:'#f8fafc',borderRadius:8}}>
            <div style={{fontSize:18,fontWeight:700}}>{moodEntry.label}</div>
            <div className="muted">Confidence: {detected ? `${Math.round(detected.confidence*100)}%` : "—"}</div>
            <p style={{marginTop:10}}>{moodEntry.advice}</p>
            <h4>Suggested Yoga</h4>
            <ul>
              {moodEntry.yoga.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
            <div style={{marginTop:10}}>
              <button className="btn" onClick={() => {
                // simple positive affirmation via speech synthesis
                const msg = new SpeechSynthesisUtterance(`Here's a short affirmation: You are doing your best and that is enough.`);
                msg.lang = 'en-US';
                window.speechSynthesis.speak(msg);
              }}>Play Affirmation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}