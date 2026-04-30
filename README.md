# VoteSmart AI – Interactive Election Guide 🗳️

## Problem Statement
Understanding the election process can often be confusing and overwhelming for first-time voters or the general public. There is a lack of centralized, interactive, and beginner-friendly platforms that guide citizens through voter registration, polling day procedures, and the overall democratic process.

## Solution
**VoteSmart AI** is a full-stack, AI-powered web application designed to educate users about the election process in a simple, engaging, and step-by-step way. It leverages modern web technologies, gamification, and AI assistance to empower voters and increase democratic participation.

## Features
- **🤖 AI Chat Assistant**: A smart chatbot powered by Gemini API to answer any questions regarding elections, eligibility, and voting procedures.
- **🗺️ Step-by-Step Election Guide**: An interactive timeline visualizer guiding users from Voter Registration to Results.
- **✅ Eligibility Checker**: A quick and easy tool to verify if a user meets the basic age requirements to vote.
- **🎮 Gamified Quiz**: Test your knowledge about elections with a fun, interactive multiple-choice quiz.
- **🌐 Multi-language Support**: A simple toggle interface to switch between languages (e.g., English and Hindi).
- **📱 Responsive & Modern UI**: Built with Tailwind CSS and Framer Motion for smooth animations, accessible on all devices.

## Tech Stack
- **Frontend**: React.js (Vite), React Router v6
- **Styling**: Tailwind CSS v3
- **Icons & Animations**: Lucide React, Framer Motion
- **AI Integration**: Google Gemini API via `@google/genai` (mock fallback included)

## How to Run Locally

1. **Clone or Download the Repository**
2. **Install Dependencies**:
   Open a terminal in the project root and run:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
5. **Open in Browser**:
   Navigate to `http://localhost:5173` to see the application running.

## Demo Instructions
- **Home**: Try the Eligibility Checker by entering an age. See the welcome layout.
- **Guide**: Navigate to the "Guide" tab and click through the interactive timeline to expand each step.
- **Chatbot**: Go to the "Chatbot" tab. Ask "How do I vote?" (Requires API key for dynamic responses, otherwise a smart mock provides a fallback).
- **Quiz**: Head to the "Quiz" tab to take a 5-question test and see your final score with an interactive results screen.

## Deployment
This project is fully ready to be deployed on Vercel or Render. Simply link the repository, set the build command to `npm run build`, the output directory to `dist`, and add the `VITE_GEMINI_API_KEY` in the environment variables settings of your hosting provider.
