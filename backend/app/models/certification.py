from typing import Optional
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class CertificationSchema(BaseModel):
    """
    Certification Model Schema.
    Collection Name: `certifications`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    title: str = Field(..., example="Agentic AI Bootcamp")
    issuer: str = Field(..., example="COMSATS University Islamabad")
    platform: Optional[str] = Field(default="", example="Coursera")
    date: Optional[str] = Field(default="", example="2026")

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class CertificationCreateSchema(BaseModel):
    title: str
    issuer: str
    platform: Optional[str] = ""
    date: Optional[str] = ""

class CertificationUpdateSchema(BaseModel):
    title: Optional[str] = None
    issuer: Optional[str] = None
    platform: Optional[str] = None
    date: Optional[str] = None
