# Frontend - Next.js + React + TypeScript + Tailwind CSS

This is a [Next.js](https://nextjs.org) project with TypeScript, Tailwind CSS, and Firebase integration.

## Features

- ⚛️ **React 19** - Latest React features
- 🔷 **Next.js 15** - App Router, Server Components
- 📘 **TypeScript** - Full type safety
- 🎨 **Tailwind CSS** - Utility-first styling
- 🔥 **Firebase** - Authentication and Firestore
- 📡 **API Integration** - Connected to FastAPI backend

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
- Add Firebase credentials (optional)
- Set `NEXT_PUBLIC_API_URL` if backend is not on `http://localhost:8000`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── UserList.tsx    # User list component
│   └── StatusCard.tsx  # Status display component
├── lib/               # Utilities
│   ├── firebase.ts    # Firebase configuration
│   └── api.ts         # API client functions
└── public/            # Static assets
```

## Components

### UserList
Displays users fetched from the FastAPI backend. Includes loading states and error handling.

### StatusCard
Shows system status for backend API and Firebase connections.

## API Integration

The frontend communicates with the FastAPI backend through the API client in `lib/api.ts`:

- `getUsers()` - Fetch users list
- `createUser()` - Create a new user
- `checkHealth()` - Backend health check
- `getFirebaseStatus()` - Firebase connection status

## Firebase Setup (Optional)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Register a web app in your Firebase project
3. Copy the configuration to `.env.local`
4. Enable Authentication and Firestore in Firebase Console

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

You can also deploy to:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Self-hosted with Docker

Make sure to set environment variables in your deployment platform.
