from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routes import api_router

app = FastAPI(
    title="FastAPI + Firebase Template",
    description="A template API using FastAPI and Firebase",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {
        "message": "Welcome to FastAPI + Firebase Template",
        "docs": "/docs",
        "api": "/api"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
