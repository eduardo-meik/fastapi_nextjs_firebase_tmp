from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import firebase_admin
from firebase_admin import credentials, auth, firestore
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK
cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS_PATH", "serviceAccountKey.json"))
firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

app = FastAPI(
    title="FastAPI + Firebase API",
    description="Backend API with Firebase integration",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class User(BaseModel):
    uid: str
    email: str
    display_name: Optional[str] = None

class Item(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    user_id: str

class CreateItem(BaseModel):
    name: str
    description: str

# Dependency to verify Firebase token
async def verify_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid authentication token")

@app.get("/")
async def root():
    return {
        "message": "FastAPI + Firebase API",
        "status": "running",
        "endpoints": ["/users/me", "/items", "/items/{item_id}"]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/users/me", response_model=User)
async def get_current_user(token: str):
    """Get current user information from Firebase token"""
    decoded_token = await verify_token(token)
    try:
        user = auth.get_user(decoded_token['uid'])
        return User(
            uid=user.uid,
            email=user.email,
            display_name=user.display_name
        )
    except Exception as e:
        raise HTTPException(status_code=404, detail="User not found")

@app.get("/items", response_model=List[Item])
async def get_items(token: str, limit: int = 10):
    """Get all items for the authenticated user"""
    decoded_token = await verify_token(token)
    user_id = decoded_token['uid']
    
    try:
        items_ref = db.collection('items').where('user_id', '==', user_id).limit(limit)
        items = []
        for doc in items_ref.stream():
            item_data = doc.to_dict()
            item_data['id'] = doc.id
            items.append(Item(**item_data))
        return items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/items", response_model=Item)
async def create_item(item: CreateItem, token: str):
    """Create a new item"""
    decoded_token = await verify_token(token)
    user_id = decoded_token['uid']
    
    try:
        item_data = {
            "name": item.name,
            "description": item.description,
            "user_id": user_id
        }
        doc_ref = db.collection('items').add(item_data)
        item_data['id'] = doc_ref[1].id
        return Item(**item_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/items/{item_id}", response_model=Item)
async def get_item(item_id: str, token: str):
    """Get a specific item by ID"""
    decoded_token = await verify_token(token)
    user_id = decoded_token['uid']
    
    try:
        doc = db.collection('items').document(item_id).get()
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Item not found")
        
        item_data = doc.to_dict()
        if item_data['user_id'] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        item_data['id'] = doc.id
        return Item(**item_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/items/{item_id}", response_model=Item)
async def update_item(item_id: str, item: CreateItem, token: str):
    """Update an existing item"""
    decoded_token = await verify_token(token)
    user_id = decoded_token['uid']
    
    try:
        doc_ref = db.collection('items').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Item not found")
        
        if doc.to_dict()['user_id'] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        update_data = {
            "name": item.name,
            "description": item.description
        }
        doc_ref.update(update_data)
        
        item_data = doc_ref.get().to_dict()
        item_data['id'] = item_id
        return Item(**item_data)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/items/{item_id}")
async def delete_item(item_id: str, token: str):
    """Delete an item"""
    decoded_token = await verify_token(token)
    user_id = decoded_token['uid']
    
    try:
        doc_ref = db.collection('items').document(item_id)
        doc = doc_ref.get()
        
        if not doc.exists:
            raise HTTPException(status_code=404, detail="Item not found")
        
        if doc.to_dict()['user_id'] != user_id:
            raise HTTPException(status_code=403, detail="Access denied")
        
        doc_ref.delete()
        return {"message": "Item deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
