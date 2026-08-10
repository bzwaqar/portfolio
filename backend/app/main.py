"""
============================================================================
FASTAPI MAIN ENTRY POINT (app/main.py) - PHASE 3.1
============================================================================
Student Note:
- GitHub Router: Connects `/api/github/repos` and `/api/github/sync` endpoints.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.routers import (
    profile,
    projects,
    experience,
    skills,
    education,
    certifications,
    services,
    blog,
    contact,
    github
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event context manager for MongoDB connection setup & cleanup."""
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="Backend API powering Waqar Khan's Machine Learning Engineer & Full Stack Portfolio.",
    lifespan=lifespan
)

# Enable CORS Middleware for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(experience.router)
app.include_router(skills.router)
app.include_router(education.router)
app.include_router(certifications.router)
app.include_router(services.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(github.router)

@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify backend API server status.
    """
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION
    }

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint redirect / summary.
    """
    return {
        "message": "Welcome to Waqar Khan Portfolio API (Phase 3.1 GitHub Connected)",
        "docs_url": "/docs",
        "health_check": "/health",
        "github_user": settings.GITHUB_USERNAME
    }
