import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Therapy from "./pages/Therapy";
import Community from "./pages/Community";
import MoodScanner from "./pages/MoodScanner";
import VrRooms from "./pages/VrRooms";
import VRLibrary from "./pages/VRLibrary";
import Journal from "./pages/Journal";
import Dashboard from "./pages/Dashboard";
import VideoCall from "./components/VideoCall";
import Memes from "./pages/Memes";
import Music from "./pages/Music";
import Games from "./pages/Games";
import Books from "./pages/Books";
import Layout from "./components/Layout";
import Meditation from "./pages/Meditation";
import Yoga from "./pages/Yoga";
import Resources from "./pages/Resources";
import { SessionProvider, useSession } from "./components/SessionManager";
import ConsentManager from "./components/ConsentManager";
import MainExperience from "./pages/MainExperience";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import GamingRoom from "./pages/GamingRoom";
import { useState, useEffect } from "react";

function AppContent() {
  const { hasConsent } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Temporarily set to true for testing
  const [userData, setUserData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    loginTime: new Date().toISOString()
  });

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('moodverse_user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (data: any) => {
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem('moodverse_user', JSON.stringify(data));
  };

  const handleLogout = () => {
    setUserData(null);
    setIsAuthenticated(false);
    localStorage.removeItem('moodverse_user');
  };

  // Temporarily bypass authentication for testing
  // if (!isAuthenticated) {
  //   return <LoginPage onLogin={handleLogin} />;
  // }

  return (
    <>
      <ConsentManager />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout userData={userData} onLogout={handleLogout} />}>
            <Route index element={<Home />} />
            <Route path="mood" element={<MoodScanner />} />
            <Route path="mood-scanner" element={<MoodScanner />} />
            <Route path="meditation" element={<Meditation />} />
            <Route path="yoga" element={<Yoga />} />
            <Route path="therapy" element={<Therapy />} />
            <Route path="vr" element={<VrRooms />} />
            <Route path="vr-rooms" element={<VrRooms />} />
            <Route path="vr-library" element={<VRLibrary />} />
            <Route path="books" element={<Books />} />
            <Route path="community" element={<Community />} />
            <Route path="journal" element={<Journal />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="memes" element={<Memes />} />
            <Route path="music" element={<Music />} />
            <Route path="games" element={<Games />} />
            <Route path="gaming-room" element={<GamingRoom />} />
            <Route path="resources" element={<Resources />} />
            <Route path="call" element={<VideoCall />} />
            <Route path="experience" element={<MainExperience />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="chat" element={<MainExperience />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
}
