import Chatbot from "../components/Chatbot";
import CommunityBoard from "../components/CommunityBoard";

export default function Community() {
  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Community</h1>
      <p className="muted">Connect with others and our AI assistant below.</p>

      <div style={{marginTop:12}} className="grid-2">
        <div>
          <Chatbot />
        </div>

        <div>
          <div className="card card-md">
            <h3 style={{marginTop:0}}>Latest Posts</h3>
            <CommunityBoard />
          </div>
        </div>
      </div>
    </div>
  );
}
