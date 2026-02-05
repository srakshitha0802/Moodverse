import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CommunityBoard(){
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");

  const fetchPosts = async ()=>{
    try{
      const res = await axios.get('/api/posts');
      setPosts(res.data.posts);
    }catch(err){console.error(err)}
  }

  const submit = async ()=>{
    if(!content.trim()) return;
    try{
      await axios.post('/api/posts', { content });
      setContent("");
      fetchPosts();
    }catch(err){console.error(err)}
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