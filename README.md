# FastAPI + Next.js + Firebase Full-Stack Application

A modern full-stack web application built with FastAPI (Python backend), Next.js (React frontend), and Firebase (authentication & database).

## Features

- 🔐 **Firebase Authentication** - Email/password and Google sign-in
- 🚀 **FastAPI Backend** - High-performance Python REST API
- ⚛️ **Next.js Frontend** - Modern React framework with TypeScript
- 🔥 **Firestore Database** - Real-time NoSQL database
- 🐳 **Docker Support** - Easy deployment with Docker Compose
- 🔒 **Protected Routes** - Secure authentication flow
- 📱 **CRUD Operations** - Complete item management

## Project Structure

```
fastapi_nextjs_firebase_tmp/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main FastAPI application
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Backend Docker configuration
│   ├── .env.example        # Environment variables template
│   └── .gitignore
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js app directory
│   │   │   ├── page.tsx   # Home page
│   │   │   ├── login/     # Login page
│   │   │   └── dashboard/ # Dashboard page
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts (Auth)
│   │   └── lib/           # Utilities (Firebase, API)
│   ├── package.json       # Node dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── Dockerfile         # Frontend Docker configuration
│   └── .env.local.example # Environment variables template
├── docker-compose.yml     # Docker Compose configuration
├── FIREBASE_SETUP.md      # Firebase setup instructions
└── README.md              # This file
```

## Prerequisites

- Python 3.12+
- Node.js 20+
- Firebase project ([Create one here](https://console.firebase.google.com/))
- Docker (optional, for containerized deployment)

## Setup Instructions

### 1. Firebase Configuration

Follow the detailed instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) to:
- Create a Firebase project
- Enable Authentication and Firestore
- Get your credentials

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Add your Firebase service account key to backend/serviceAccountKey.json
# (Download from Firebase Console)

# Run the backend
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your Firebase credentials

# Run the frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### 4. Docker Setup (Alternative)

```powershell
# Ensure you have:
# - backend/serviceAccountKey.json
# - frontend/.env.local

# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

## API Endpoints

### Health & Info
- `GET /` - API information
- `GET /health` - Health check

### User Management
- `GET /users/me` - Get current user info (requires auth token)

### Items (CRUD)
- `GET /items` - Get all items for authenticated user
- `POST /items` - Create a new item
- `GET /items/{item_id}` - Get a specific item
- `PUT /items/{item_id}` - Update an item
- `DELETE /items/{item_id}` - Delete an item

All item endpoints require authentication token as query parameter.

## Frontend Routes

- `/` - Home (redirects to login or dashboard)
- `/login` - Login/Sign up page
- `/dashboard` - Protected dashboard with item management

## Authentication Flow

1. User signs up/in via the frontend
2. Firebase Authentication creates a user and returns an ID token
3. Frontend stores the token and includes it in API requests
4. Backend verifies the token with Firebase Admin SDK
5. Backend performs authorized operations

## Environment Variables

### Backend (.env)
```
FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json
```

### Frontend (.env.local)
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

### Backend Development
```powershell
cd backend
.venv\Scripts\Activate.ps1
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Development
```powershell
cd frontend
npm run dev
```

### Access API Documentation
FastAPI automatically generates interactive API docs:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Firebase Admin SDK** - Server-side Firebase integration
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type-safe JavaScript
- **Firebase SDK** - Client-side Firebase integration
- **Axios** - HTTP client

### Database & Auth
- **Firebase Authentication** - User management
- **Cloud Firestore** - NoSQL database

## Security Notes

⚠️ **Important**: 
- Never commit `serviceAccountKey.json` or `.env` files
- Use proper Firestore security rules in production
- Implement rate limiting for production APIs
- Use HTTPS in production
- Keep Firebase credentials secure

## Troubleshooting

### Backend won't start
- Ensure `serviceAccountKey.json` exists in `backend/`
- Check Python version (3.12+)
- Verify all dependencies are installed

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS settings in `backend/main.py`

### Authentication issues
- Verify Firebase credentials are correct
- Check Firebase Authentication is enabled
- Ensure Firestore security rules allow access

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
