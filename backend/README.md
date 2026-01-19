# Backend - Python/FastAPI

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your Firebase credentials path
```

4. (Optional) Add Firebase credentials:
   - Download your Firebase service account key from Firebase Console
   - Save it as `firebase-credentials.json` in the backend directory
   - Update `FIREBASE_CREDENTIALS_PATH` in `.env`

## Running the API

```bash
python run.py
```

The API will be available at http://localhost:8000

- API Documentation: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check
- `GET /api/users` - Get users list
- `POST /api/users` - Create a user
- `GET /api/firebase-status` - Check Firebase status

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py         # FastAPI application
│   ├── config.py       # Configuration settings
│   ├── routes.py       # API routes
│   └── firebase.py     # Firebase integration
├── requirements.txt    # Python dependencies
├── .env.example       # Environment variables template
└── run.py            # Application entry point
```
