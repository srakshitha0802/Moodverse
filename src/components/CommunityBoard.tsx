import React, { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_POSTS = [
  {
    id: 'post-1',
    content: 'Box breathing exercises really helped me overcome an afternoon panic spike today. Grateful for this space!',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'post-2',
    content: 'Remember to drink water and take 5 deep breaths. You are doing much better than you think.',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'post-3',
    content: 'The Sukhasana pose with a 3-minute timer relaxed my tight lower back completely.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'post-4',
    content: 'Sending positive vibes to anyone feeling overwhelmed right now. Step by step, breath by breath.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export default function CommunityBoard(){
  const [posts, setPosts] = useState<any[]>(() => {
    try {
      const stored = localStorage.getItem('moodverse_community_posts');
      return stored ? JSON.parse(stored) : DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });
  const [content, setContent] = useState("");

  const fetchPosts = async ()=>{
    try{
      const res = await axios.get('/api/posts', { timeout: 2000 });
      if (res.data?.posts && Array.isArray(res.data.posts)) {
        setPosts(res.data.posts);
      }
    }catch(_err){
      // Use local storage / default fallback
    }
  }

  const submit = async ()=>{
    if(!content.trim()) return;
    const newPost = {
      id: 'post-' + Date.now(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('moodverse_community_posts', JSON.stringify(updated));
    } catch {}
    setContent("");

    try{
      await axios.post('/api/posts', { content: content.trim() }, { timeout: 2000 });
    }catch(_err){
      // Post stored locally
    }
  }

  useEffect(()=>{fetchPosts()},[]);

  return (
    <div>
      <h3>Community Board</h3>
      <p className="muted">Anonymous posts — moderators reserve the right to remove inappropriate content.</p>
      <textarea value={content} onChange={e=>setContent(e.target.value)} rows={4} style={{width:'100%',padding:8}} />
      <div style={{marginTop:8}}>
        <button onClick={submit} className="btn">Post</button>
      </div>

      <div style={{marginTop:12}}>
        {posts.map((p)=> (
          <div key={p.id} className="card card-sm" style={{marginBottom:8}}>
            <div style={{fontSize:12,color:'#64748b'}}>{new Date(p.createdAt).toLocaleString()}</div>
            <div>{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}