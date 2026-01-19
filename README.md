# Firebase + FastAPI + Next.js + React + TypeScript + Tailwind Template

A modern, production-ready full-stack template combining the best of backend and frontend technologies.

## 🚀 Tech Stack

### Backend
- **FastAPI** - High-performance Python web framework
- **Firebase Admin SDK** - Backend Firebase integration
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase SDK** - Client-side Firebase integration

## 📋 Prerequisites

- Python 3.8+ 
- Node.js 18+
- npm or yarn
- (Optional) Firebase project

## 🛠️ Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd fastapi_nextjs_firebase_tmp
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env
# Edit .env with your configuration

# Run the server
python run.py
```

The API will be available at http://localhost:8000
- API Documentation: http://localhost:8000/docs

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment (optional)
cp .env.local.example .env.local
# Edit .env.local with your Firebase configuration

# Run the development server
npm run dev
```

The app will be available at http://localhost:3000

## 🔥 Firebase Configuration (Optional)

### Backend (Python)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Go to Project Settings → Service Accounts
4. Click "Generate New Private Key"
5. Save the JSON file as `backend/firebase-credentials.json`
6. Update `backend/.env`:
   ```
   FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
   ```

### Frontend (Next.js)

1. In Firebase Console, go to Project Settings → General
2. Scroll down to "Your apps" and click the web icon (</>)
3. Register your app and copy the configuration
4. Update `frontend/.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

## 📁 Project Structure

```
.
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI app entry point
│   │   ├── config.py       # Configuration management
│   │   ├── routes.py       # API routes
│   │   └── firebase.py     # Firebase integration
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example       # Environment template
│   └── run.py             # Application runner
│
└── frontend/               # Next.js frontend
    ├── app/
    │   ├── layout.tsx     # Root layout
    │   └── page.tsx       # Home page
    ├── components/        # React components
    │   ├── UserList.tsx
    │   └── StatusCard.tsx
    ├── lib/              # Utilities
    │   ├── firebase.ts   # Firebase client config
    │   └── api.ts        # API client
    ├── package.json
    └── .env.local.example
```

## 🔌 API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/users` - Get users list
- `POST /api/users` - Create a user
- `GET /api/firebase-status` - Check Firebase status

## 🎨 Features

### Backend
- ✅ FastAPI with automatic API documentation
- ✅ Firebase Admin SDK integration
- ✅ CORS configuration
- ✅ Environment-based configuration
- ✅ Health check endpoint
- ✅ Modular structure

### Frontend
- ✅ Next.js App Router
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Firebase client SDK
- ✅ API integration layer
- ✅ Responsive design
- ✅ Modern React components

## 🧪 Development

### Backend Development

```bash
cd backend
source venv/bin/activate
python run.py
```

The server runs with hot-reload enabled in development mode.

### Frontend Development

```bash
cd frontend
npm run dev
```

Next.js runs with Fast Refresh for instant feedback.

## 📦 Production Build

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋 Support

For issues and questions, please open an issue in the repository.
