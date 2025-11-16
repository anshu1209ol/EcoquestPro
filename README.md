# 🌿 ECO Quest - Gamified Environmental Education Platform

A modern, responsive web application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. ECO Quest gamifies environmental education through quizzes, challenges, leaderboards, and achievements.

## 🚀 Features

- **Interactive Quizzes** - Test your environmental knowledge with hints and explanations
- **Real-World Challenges** - Complete eco-friendly tasks and track your progress
- **Leaderboard & Analytics** - Compete with others and view performance charts
- **Achievement System** - Unlock badges and milestones as you progress
- **Certificates** - Earn and download certificates for your achievements
- **Learning Resources** - Access articles, guides, and educational materials
- **EcoMentor AI** - Intelligent AI chatbot powered by Google Gemini AI for answering all your queries about environmental topics, platform features, and more
- **Government Schemes** - Learn about Indian environmental initiatives
- **Environmental Data** - View real-time environmental metrics and trends
- **Documentaries** - Watch educational videos about environmental issues

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **AI Integration:** Google Gemini AI (@google/generative-ai)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add your Google Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   - Get your API key from: https://makersuite.google.com/app/apikey

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
├── app/
│   ├── about/              # About page
│   ├── achievements/        # Achievement system
│   ├── certificates/        # Certificate page
│   ├── challenges/          # Real-world challenges
│   ├── dashboard/           # User dashboard
│   ├── developer/           # Developer section
│   ├── documentaries/       # Educational videos
│   ├── downloadables/       # Downloadable resources
│   ├── ecobot/              # EcoMentor AI chatbot page (powered by Gemini AI)
│   ├── environmental-data/  # Environmental metrics
│   ├── government-schemes/  # Government initiatives
│   ├── impact/              # Impact page
│   ├── leaderboard/         # Leaderboard & analytics
│   ├── quizzes/             # Interactive quizzes
│   ├── resources/           # Learning resources
│   ├── terms/               # Terms & conditions
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Navigation header
│   └── Footer.tsx           # Footer component
└── public/                  # Static assets
```

## 🎨 Design Features

- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Eco Theme** - Green color scheme with eco-friendly icons
- **Accessibility** - Semantic HTML and keyboard navigation support

## 📱 Pages

1. **Home** - Overview and quick links
2. **Dashboard** - User profile, progress, and activity
3. **Quizzes** - Interactive environmental quizzes
4. **Challenges** - Real-world eco tasks (with add functionality)
5. **Leaderboard** - Rankings and analytics
6. **Achievements** - Badge system with progress tracking
7. **Certificates** - View and download certificates
8. **Resources** - Learning materials and articles
9. **Downloadables** - PDFs, guides, and activity sheets
10. **Documentaries** - Educational videos
11. **Environmental Data** - Real-time metrics and charts
12. **Impact** - Community impact statistics
13. **About** - Mission, vision, and contact
14. **Terms** - Terms & conditions
15. **Developer** - Project information and credits
16. **Government Schemes** - Indian environmental initiatives
17. **EcoMentor AI** - Intelligent AI chatbot powered by Google Gemini AI for all your queries

## 🎯 Key Features

### Gamification
- Points system
- Level progression
- Badges and achievements
- Streak tracking
- Leaderboard rankings

### Interactive Elements
- Animated counters
- Smooth page transitions
- Hover effects
- Modal dialogs
- Progress bars

### Data Visualization
- Bar charts
- Line charts
- Pie charts
- Area charts

## 🔧 Build for Production

```bash
npm run build
npm start
```

## 📝 Notes

- This is a **frontend application** with AI integration
- EcoMentor AI uses Google Gemini AI for intelligent responses
- All other data is dummy/mock data for demonstration
- Images use placeholder URLs (Unsplash)
- Requires GEMINI_API_KEY environment variable for AI features to work

## 🤝 Contributing

This is an educational project. Feel free to fork, modify, and use it for learning purposes.

## 📄 License

This project is open source and available for educational use.

---

Built with ❤️ for environmental education

