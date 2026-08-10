from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class GitHubRepoSchema(BaseModel):
    """
    GitHub Repository Model Schema.
    Collection Name: `repositories`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    github_id: int = Field(..., example=12345678)
    name: str = Field(..., example="ai-vision-tracker")
    full_name: str = Field(..., example="bzwaqar/ai-vision-tracker")
    html_url: str = Field(..., example="https://github.com/bzwaqar/ai-vision-tracker")
    description: Optional[str] = Field(default="", example="Computer vision object tracking pipeline.")
    language: Optional[str] = Field(default="Python", example="Python")
    stargazers_count: int = Field(default=0, example="12")
    forks_count: int = Field(default=0, example="3")
    topics: List[str] = Field(default_factory=list, example=["computer-vision", "pytorch", "python"])
    is_fork: bool = Field(default=False)
    updated_at: Optional[str] = Field(default="", example="2026-08-10T12:00:00Z")
    synced_at: Optional[datetime] = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}
