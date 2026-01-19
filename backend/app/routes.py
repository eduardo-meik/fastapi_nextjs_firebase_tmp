from fastapi import APIRouter
from app.firebase import firebase_service

api_router = APIRouter()

@api_router.get("/users")
async def get_users():
    """
    Example endpoint to demonstrate API structure
    """
    return {
        "users": [
            {"id": "1", "name": "John Doe", "email": "john@example.com"},
            {"id": "2", "name": "Jane Smith", "email": "jane@example.com"}
        ]
    }

@api_router.post("/users")
async def create_user(name: str, email: str):
    """
    Example endpoint to create a user
    """
    return {
        "id": "3",
        "name": name,
        "email": email,
        "message": "User created successfully"
    }

@api_router.get("/firebase-status")
async def firebase_status():
    """
    Check Firebase initialization status
    """
    is_initialized = firebase_service.is_initialized()
    return {
        "firebase_initialized": is_initialized,
        "message": "Firebase is initialized" if is_initialized else "Firebase not configured"
    }
