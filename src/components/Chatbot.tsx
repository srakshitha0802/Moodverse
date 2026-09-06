import { useEffect, useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>(() => {
    try {
      const raw = localStorage.getItem("moodverse_chat");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("moodverse_chat", JSON.stringify(messages));
  }, [messages]);

  const send = async (text?: string) => {
    const toSend = text ?? input;
    if (!toSend || !String(toSend).trim()) return;
    const userText = String(toSend).trim();

    // optimistic UI
    setMessages(prev => [...prev, { from: "You", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: userText }, { timeout: 15000 });
      if (res?.data?.reply) {
        setMessages(prev => [...prev, { from: "AI", text: res.data.reply }]);
      } else {
        throw new Error('No reply');
      }
    } catch (err) {
      // local fallback supportive reply when backend unavailable
      console.warn('Chat send error', err);
      const fallback = `Thanks for sharing — I hear you. Can you tell me a bit more about "${userText.slice(0,120)}"? I'm not a clinician, but I'm here to listen.`;
      setMessages(prev => [...prev, { from: "AI", text: fallback }]);
    } finally {
      setLoading(false);
    }
  };

  const QUICK = [
    "I feel anxious — any tips?",
    "Help me sleep",
    "I’m feeling low",
    "Breathing exercise please"
  ];

  const clearConversation = () => { setMessages([]); localStorage.removeItem('moodverse_chat'); };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="card card-md">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3 style={{marginTop:0}}>Chat Support</h3>
        <div>
          <button className="btn secondary" onClick={clearConversation} title="Clear conversation">Clear</button>
        </div>
      </div>

      <div className="chat-window" style={{minHeight:140}}>
        {messages.length === 0 && <p className="muted">Say hi to start a conversation</p>}
        {messages.map((m, i) => (
          <div key={i} className={"chat-msg " + (m.from === "You" ? "chat-user" : "chat-ai") }>
            <div style={{fontSize:12,color:'#64748b'}}>{m.from}</div>
            <div style={{marginTop:4}}>{m.text}</div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
        {QUICK.map((q,i)=> <button key={i} className="btn secondary" onClick={()=>send(q)}>{q}</button>)}
      </div>

      <div className="chat-controls" style={{marginTop:8}}>
        <input aria-label="Chat message" value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKeyDown} placeholder="Type a message (Enter to send)" />
        <button className="btn" onClick={()=>send()} disabled={loading} aria-busy={loading}>{loading ? "…" : "Send"}</button>
      </div>
    </div>
  );
}
