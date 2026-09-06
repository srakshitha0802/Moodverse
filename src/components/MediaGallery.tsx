import React from "react";

const images = [
  "/assets/photo1.jpg",
  "https://images.unsplash.com/photo-1505765057760-85561c6b0573?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
];

export default function MediaGallery() {
  return (
    <div className="media-grid">
      <div className="media-left">
        <img src={images[0]} alt="peace" />
      </div>
      <div className="media-right">
        <div className="media-row">
          <img src={images[1]} alt="calm"/>
          <img src={images[2]} alt="focus"/>
        </div>
        <div className="media-controls">
          <audio controls src="/assets/sample-audio.mp3" />
          <video controls width={320} src="/assets/sample-video.mp4" />
        </div>
      </div>
    </div>
  );
}
