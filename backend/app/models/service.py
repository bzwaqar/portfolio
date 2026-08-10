from typing import Optional, List
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class ServiceSchema(BaseModel):
    """
    Service Model Schema.
    Collection Name: `services`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str = Field(..., example="Custom AI & ML Model Development")
    description: str = Field(..., example="Tailored neural networks and LLM fine-tuning.")
    icon: str = Field(default="brain", example="brain")
    deliverables: List[str] = Field(default_factory=list)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class ServiceCreateSchema(BaseModel):
    title: str
    description: str
    icon: Optional[str] = "code"
    deliverables: List[str] = []

class ServiceUpdateSchema(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    deliverables: Optional[List[str]] = None
