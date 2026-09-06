import { useEffect } from "react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function VideoCall() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.JitsiMeetExternalAPI("meet.jit.si", {
        roomName: "MoodverseTherapyRoom",
        parentNode: document.getElementById("jitsi-container"),
        width: "100%",
        height: 500,
      });
    };
  }, []);

  return <div id="jitsi-container" aria-live="polite" />;
}
