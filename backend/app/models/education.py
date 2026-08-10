from typing import Optional
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class EducationSchema(BaseModel):
    """
    Education Model Schema.
    Collection Name: `education`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    degree: str = Field(..., example="Bachelor of Science in Artificial Intelligence")
    institution: str = Field(..., example="COMSATS University Islamabad")
    duration: str = Field(..., example="2024 – Present")
    location: str = Field(..., example="Islamabad, Pakistan")
    details: Optional[str] = Field(default="", example="Focusing on ML, Deep Learning, and Computer Vision.")

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class EducationCreateSchema(BaseModel):
    degree: str
    institution: str
    duration: str
    location: str
    details: Optional[str] = ""

class EducationUpdateSchema(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    duration: Optional[str] = None
    location: Optional[str] = None
    details: Optional[str] = None
