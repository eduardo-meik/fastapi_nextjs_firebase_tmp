import firebase_admin
from firebase_admin import credentials, auth, firestore
from app.config import settings
from typing import Optional
import os

class FirebaseService:
    def __init__(self):
        self._initialized = False
        self._db = None
        self._initialize()
    
    def _initialize(self):
        """Initialize Firebase Admin SDK"""
        try:
            # Check if credentials file exists
            if settings.FIREBASE_CREDENTIALS_PATH and os.path.exists(settings.FIREBASE_CREDENTIALS_PATH):
                cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
                firebase_admin.initialize_app(cred)
                self._db = firestore.client()
                self._initialized = True
                print("✓ Firebase initialized successfully")
            else:
                print("⚠ Firebase credentials not found. Running without Firebase integration.")
                print(f"  Set FIREBASE_CREDENTIALS_PATH in .env to enable Firebase features.")
        except Exception as e:
            print(f"⚠ Firebase initialization failed: {str(e)}")
            self._initialized = False
    
    def is_initialized(self) -> bool:
        """Check if Firebase is initialized"""
        return self._initialized
    
    def get_db(self) -> Optional[firestore.Client]:
        """Get Firestore database instance"""
        return self._db
    
    def verify_token(self, token: str) -> Optional[dict]:
        """Verify Firebase ID token"""
        if not self._initialized:
            return None
        try:
            decoded_token = auth.verify_id_token(token)
            return decoded_token
        except Exception as e:
            print(f"Token verification failed: {str(e)}")
            return None

# Global Firebase service instance
firebase_service = FirebaseService()
