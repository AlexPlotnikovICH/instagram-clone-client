# ICHGRAM - Frontend (React / Vite)

UI part of the social network clone. The project features a modern interface utilizing global state management, responsive design, and AI integration.

🌐 **Live Demo:** [ichgram-alexp.vercel.app](https://ichgram-alexp.vercel.app/)  
⚡ **Quick Preview:** Click the **"Demo User"** button on the login screen for instant 1-click access (no registration needed).  
🔗 **Backend Repository:** [instagram-clone-api](https://github.com/AlexPlotnikovICH/instagram-clone-api)

🌍 Read this in: [Deutsch](README.de.md) | [Русский](README.ru.md)

## 🚀 Quick Start

**1. Installing Dependencies**  
Make sure you have Node.js installed (v18+ recommended).
```bash
npm install

2. Environment Configuration

The project is pre-configured with an automatic fallback to the local backend (http://localhost:3333/api), so creating a .env file is optional for a basic local run.

However, for production deployment or custom configuration, create a .env file in the project root and specify:

VITE_API_URL=http://localhost:3333/api

3. Running the Project
npm run dev

The project will be available at: http://localhost:5173

🛠 Tech Stack
Bundler: Vite (blazing fast HMR)

Core: React 18 (Hooks)

Styling: Tailwind CSS v4 (with typography overridden to global Roboto)

Routing: React Router DOM v6

State Management: Zustand (lightweight architecture for global notifications)

Icons: Lucide React

API Client: Axios with configured interceptors for automatic JWT token transmission

AI Integration: Groq API (llama-3.1-8b-instant model) via backend

Media Storage: Cloudinary (optimized image pipeline)

🏗 Architecture & Implemented Features
Global Feed (Home): Rendering posts from the database with placeholders for likes. Mobile-first adaptive design.

AI Business Assistant: A built-in chat interface powered by Groq (llama-3.1-8b-instant) acting as an SMM expert and copywriter.

Optimized Media Uploads: Forms designed to handle image uploads efficiently, which are then processed and stored in Cloudinary via the backend.

Search Drawer: Implemented using the Debounce pattern (500ms) to avoid spamming the backend with requests on every keystroke.

Notifications (Zustand Store): Global state management. The unread messages indicator (red dot) turns off when opening the drawer, using optimistic UI updates.

Direct Messages: Mocked for MVP. To save resources and prepare for Serverless deployment, real-time WebSocket chats have been frozen (a UI block with an explanation is implemented).

⚠️ Important Note for Reviewers
For the application to work correctly, start the backend first and run the database seeding script (node seed.js), as described in the backend repository's README.md. Without this, the feed interface will be empty since the database is initially blank.