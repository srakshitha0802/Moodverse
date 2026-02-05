# 🌈 Moodverse

> **A Comprehensive Mental Health & Wellness Platform with Immersive VR Experiences**

[![GitHub](https://img.shields.io/badge/GitHub-Moodverse-blue?logo=github)](https://github.com/srakshitha0802/Moodverse)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Moodverse is an innovative, AI-powered mental health and wellness platform designed to provide personalized emotional support, immersive VR experiences, and a vibrant community for users seeking mental wellness. With a combination of cutting-edge technology and compassionate design, Moodverse helps users understand, manage, and improve their emotional well-being.

---

## ✨ Key Features

### 🧠 Intelligent Mood Detection & Analysis
- **Advanced Mood Detector**: AI-powered emotion recognition using machine learning
- **Mood Tracking**: Track emotional patterns over time with visual analytics
- **Personalized Insights**: Receive AI-generated recommendations based on your mood patterns
- **Mood Check-ins**: Quick daily emotional assessments

### 🎮 Immersive VR Experiences
- **A-Frame Integration**: Interactive 3D virtual environments
- **VR Meditation Rooms**: Calming immersive spaces for meditation and relaxation
- **Multiple VR Scenarios**: Diverse environments tailored to different emotional needs
- **Fallback Support**: Seamless experience even without VR hardware

### 🎵 Media & Entertainment
- **Music Player**: Curated playlists for different moods and activities
- **Meditation Guides**: Professional guided meditation sessions
- **Yoga Instructions**: Video-guided yoga for mental and physical wellness
- **Games & Activities**: Engaging games (Bubble Pop, Color Match, Calm Tap) for stress relief
- **Video Calls**: Connect with therapists or support group members

### 💬 Community & Support
- **Community Board**: Share experiences and support fellow users
- **AI Chatbot**: 24/7 conversational support with local and backend integration
- **Feedback System**: Provide feedback to improve your experience
- **Safety Enforcement**: Built-in safety checks and crisis resources

### 📚 Educational Resources
- **Mental Health Library**: Curated articles and resources on various mental health topics
- **Therapy Articles**: Professional guidance on therapeutic techniques
- **Contact Resources**: Quick access to mental health professionals and emergency services
- **Journal Feature**: Private space to document your thoughts and feelings

### ♿ Accessibility & Personalization
- **Accessibility Toggle**: High contrast mode and text customization
- **Consent Management**: Full control over data usage and privacy
- **Activity Recommendations**: Personalized suggestions based on your mood and preferences
- **Session Management**: Track and manage your wellness sessions

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool and dev server
- **A-Frame** - WebXR framework for immersive 3D experiences
- **CSS3** - Advanced styling with animations and responsive design
- **Playwright** - End-to-end testing automation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - RESTful API framework
- **OpenAI API** - AI-powered chatbot and mood analysis
- **RESTful Architecture** - Clean API design patterns

### Development Tools
- **npm** - Package management
- **Git** - Version control
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Static type checking

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Git
- Modern web browser (Chrome, Firefox, Safari, Edge)
- OpenAI API key (optional, for chatbot features)

### Installation & Setup

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
🌐 Frontend will be available at: `http://localhost:3000`

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Add your OPENAI_API_KEY to .env if you have one
npm run dev
```
⚙️ Backend API will run on: `http://localhost:3001`

### Environment Configuration
Create a `.env` file in the backend directory:
```env
OPENAI_API_KEY=your_api_key_here
PORT=3001
NODE_ENV=development
```

> ⚠️ **Security Note**: Never commit real API keys. Use `.env` and ensure it's in `.gitignore`. If you accidentally exposed an API key, revoke and rotate it immediately.

---

## 📁 Project Structure

```
Moodverse/
├── frontend/                    # React TypeScript frontend application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── VRExperience.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   ├── MoodDetector.tsx
│   │   │   └── ...
│   │   ├── pages/               # Page components (routing)
│   │   │   ├── Home.tsx
│   │   │   ├── VRLibrary.tsx
│   │   │   ├── Music.tsx
│   │   │   └── ...
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API and service integration
│   │   ├── utils/               # Utility functions
│   │   ├── types/               # TypeScript type definitions
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── public/                  # Static assets
│   │   ├── models/              # 3D models for VR
│   │   └── assets/
│   ├── e2e/                     # End-to-end tests with Playwright
│   └── package.json
│
├── backend/                     # Node.js Express backend
│   ├── routes/                  # API route definitions
│   │   ├── chat.js              # Chatbot API
│   │   ├── posts.js             # Community board API
│   │   └── resources.js         # Resources API
│   ├── controllers/             # Request handlers
│   ├── server.js                # Express server setup
│   ├── .env.example             # Environment template
│   └── package.json
│
├── design.md                    # Design specifications
├── requirements.md              # Project requirements
├── README.md                    # This file
└── package.json                 # Root package configuration
```

---

## 🎯 Core Functionality

### Mood Detection & Analysis
Moodverse uses advanced algorithms to analyze user emotional states and provide personalized recommendations for mental wellness activities.

### VR Immersion
Escape to calming virtual environments designed to reduce anxiety and promote relaxation. Compatible with both VR headsets and regular screens.

### AI-Powered Chatbot
Talk to our intelligent chatbot anytime for emotional support, coping strategies, and mental health information.

### Community Connection
Join a supportive community where users share experiences and inspire each other on their wellness journey.

---

## 🔧 Development Commands

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run lint         # Check code quality
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript (if applicable)
npm test             # Run tests
```

---

## 🤝 Contributing

We welcome contributions to Moodverse! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Guidelines
- Follow the existing code style and conventions
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting a PR

---

## 📋 Testing

### End-to-End Testing
```bash
cd frontend
npm run test:e2e
```

### Unit Testing
```bash
npm run test
```

---

## 🔐 Security & Privacy

- All user data is treated with utmost confidentiality
- API keys are managed securely through environment variables
- No sensitive data is stored in version control
- Regular security audits and updates
- GDPR-compliant data handling

---

## 📦 Dependencies

### Key Frontend Packages
- react, react-dom
- typescript
- vite
- a-frame
- chart.js, react-chartjs-2
- axios (for HTTP requests)

### Key Backend Packages
- express
- openai
- dotenv
- cors
- body-parser

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in configuration or kill existing process
# Frontend: Check vite.config.ts
# Backend: Check .env PORT variable
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Ensure backend is running on `http://localhost:3001`
- Check CORS configuration
- Verify environment variables are set correctly

### VR Not Loading
- Ensure browser supports WebGL
- Check that 3D model files are properly loaded
- Try the fallback scene option

---

## 📞 Support & Contact

- **GitHub Issues**: Report bugs or suggest features
- **Email**: [Your Contact Email]
- **Documentation**: See `design.md` and `requirements.md` for detailed specifications

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by the need for accessible mental health support
- Built with love for the global wellness community
- Special thanks to all contributors and users

---

## 🚦 Status & Roadmap

### ✅ Completed Features
- Core mood detection and tracking
- VR experience framework
- Chatbot integration
- Community board
- Media hub (music, yoga, meditation)
- User profiles and sessions

### 🔄 In Progress
- Enhanced mood prediction algorithms
- Mobile app development
- Integration with wearable devices
- Therapist marketplace

### 🎯 Future Features
- Real-time video therapy sessions
- Group meditation events
- Peer support groups
- Mental health progress reports
- Integration with health APIs

---

**Made with ❤️ for mental wellness**
