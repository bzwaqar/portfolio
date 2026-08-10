from typing import Optional
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class SkillSchema(BaseModel):
    """
    Skill Model Schema.
    Collection Name: `skills`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(..., example="PyTorch & TensorFlow")
    category: str = Field(..., example="AI & Machine Learning")
    level: str = Field(default="Advanced", example="Advanced")

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class SkillCreateSchema(BaseModel):
    name: str
    category: str
    level: Optional[str] = "Proficient"

class SkillUpdateSchema(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    level: Optional[str] = None
