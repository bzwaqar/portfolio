from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class BlogPostSchema(BaseModel):
    """
    Blog Post Model Schema.
    Collection Name: `blog`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str = Field(..., example="Fine-Tuning Open-Source LLMs")
    slug: str = Field(..., example="fine-tuning-llms-for-domain-specific-codebases")
    content: str = Field(..., example="Markdown formatted article content...")
    published_date: str = Field(default_factory=lambda: datetime.utcnow().strftime("%Y-%m-%d"))
    tags: List[str] = Field(default_factory=list, example=["AI", "PyTorch", "LLM"])
    author: str = Field(default="Waqar Khan", example="Waqar Khan")

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class BlogPostCreateSchema(BaseModel):
    title: str
    slug: str
    content: str
    published_date: Optional[str] = None
    tags: List[str] = []
    author: Optional[str] = "Waqar Khan"

class BlogPostUpdateSchema(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    published_date: Optional[str] = None
    tags: Optional[List[str]] = None
    author: Optional[str] = None
