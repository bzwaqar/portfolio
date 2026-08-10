from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class ExperienceSchema(BaseModel):
    """
    Experience Model Schema.
    Collection Name: `experience`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    company: str = Field(..., example="Neural Compute Labs")
    role: str = Field(..., example="AI / ML Engineer Intern")
    start_date: str = Field(..., example="Jan 2026")
    end_date: str = Field(default="Present", example="Present")
    description: str = Field(..., example="Developed computer vision and NLP pipelines.")
    highlights: List[str] = Field(default_factory=list)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class ExperienceCreateSchema(BaseModel):
    company: str
    role: str
    start_date: str
    end_date: Optional[str] = "Present"
    description: str
    highlights: List[str] = []

class ExperienceUpdateSchema(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[List[str]] = None
