from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class ProjectSchema(BaseModel):
    """
    Project Model Schema.
    Collection Name: `projects`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    github_id: Optional[int] = Field(default=None, example=12345678)
    name: str = Field(..., example="ai-vision-tracker")
    title: str = Field(..., example="AI Vision Tracker")
    slug: str = Field(..., example="ai-vision-tracker")
    short_description: str = Field(default="", example="Computer vision object tracking system.")
    description: str = Field(default="", example="Detailed description or summary.")
    problem_statement: Optional[str] = Field(default="", example="Manual target tracking is slow...")
    solution_statement: Optional[str] = Field(default="", example="Automated computer vision algorithm...")
    readme_content: Optional[str] = Field(default="", example="# AI Vision Tracker\nFull repository README markdown...")
    github_url: str = Field(..., example="https://github.com/bzwaqar/ai-vision-tracker")
    demo_url: Optional[str] = Field(default="", example="")
    languages: List[str] = Field(default_factory=list, example=["Python", "C++"])
    topics: List[str] = Field(default_factory=list, example=["computer-vision", "pytorch"])
    features: List[str] = Field(default_factory=list, example=["Real-time tracking", "Kalman filtering"])
    technologies: List[str] = Field(default_factory=list, example=["PyTorch", "OpenCV", "Python"])
    stars: int = Field(default=0, example=12)
    forks: int = Field(default=0, example=3)
    created_at: Optional[str] = Field(default="", example="2026-01-01T00:00:00Z")
    updated_at: Optional[str] = Field(default="", example="2026-08-10T12:00:00Z")
    synced_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    featured: bool = Field(default=False)
    published: bool = Field(default=False)
    images: List[str] = Field(default_factory=list)
    image: Optional[Dict[str, Any]] = Field(default=None)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class ProjectCreateSchema(BaseModel):
    github_id: Optional[int] = None
    name: str
    title: str
    slug: str
    short_description: Optional[str] = ""
    description: Optional[str] = ""
    problem_statement: Optional[str] = ""
    solution_statement: Optional[str] = ""
    readme_content: Optional[str] = ""
    github_url: str
    demo_url: Optional[str] = ""
    languages: List[str] = []
    topics: List[str] = []
    features: List[str] = []
    technologies: List[str] = []
    stars: Optional[int] = 0
    forks: Optional[int] = 0
    created_at: Optional[str] = ""
    updated_at: Optional[str] = ""
    featured: bool = False
    published: bool = False
    images: List[str] = []
    image: Optional[Dict[str, Any]] = None

class ProjectUpdateSchema(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    problem_statement: Optional[str] = None
    solution_statement: Optional[str] = None
    readme_content: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    languages: Optional[List[str]] = None
    topics: Optional[List[str]] = None
    features: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    stars: Optional[int] = None
    forks: Optional[int] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None
    images: Optional[List[str]] = None
    image: Optional[Dict[str, Any]] = None
