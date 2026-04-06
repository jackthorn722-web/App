# Signal - Personalized News Aggregator

A real-time news aggregator app that cuts through information overload. Select hyper-specific interests and receive an ultra-fast, accurate feed with AI-powered summaries.

## Tech Stack

- **Frontend**: React Native with Expo (SDK 54), expo-router, zustand
- **Backend**: Node.js with Express + TypeScript
- **APIs**: NewsAPI.org + Claude API for 3-sentence AI summaries

## Getting Started

### Frontend (Expo)

```bash
npm install
npm start
```

### Backend

```bash
cd backend
cp .env.example .env   # Add your API keys
npm install
npm run dev
```

## Project Structure

```
app/              # Expo Router screens (onboarding, tabs)
components/       # Reusable UI components
store/            # Zustand state management
services/         # API client
constants/        # Topics catalog, theme colors
types/            # Shared TypeScript types
backend/          # Express API server
  src/routes/     # API endpoints (news, summary, user)
  src/services/   # External API wrappers
```
