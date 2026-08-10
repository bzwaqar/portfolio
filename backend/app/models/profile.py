from typing import Optional
from pydantic import BaseModel, Field
from app.models.common import PyObjectId

class SocialLinks(BaseModel):
    github: Optional[str] = "https://github.com/bzwaqar"
    linkedin: Optional[str] = "https://linkedin.com/in/waqar-khan-9a7016321"

class ProfileSchema(BaseModel):
    """
    Developer Profile Model Schema.
    Collection Name: `profile`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(..., example="Waqar Khan")
    title: str = Field(..., example="Machine Learning Engineer")
    secondary_title: Optional[str] = Field(default="Full Stack Engineer", example="Full Stack Engineer")
    specialization: Optional[str] = Field(default="Computer Vision Enthusiast", example="Computer Vision Enthusiast")
    location: str = Field(default="Islamabad, Pakistan", example="Islamabad, Pakistan")
    email: str = Field(default="bbzwaqar@gmail.com", example="bbzwaqar@gmail.com")
    phone: str = Field(default="0343-0577768", example="0343-0577768")
    bio: str = Field(..., example="Machine Learning Engineer and Full Stack Engineer...")
    profile_image_url: Optional[str] = Field(default="/avatar-placeholder.svg", example="/avatar-placeholder.svg")
    social_links: SocialLinks = Field(default_factory=SocialLinks)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str}

class ProfileUpdateSchema(BaseModel):
    name: Optional[str] = None
    title: Optional[str] = None
    secondary_title: Optional[str] = None
    specialization: Optional[str] = None
    location: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    profile_image_url: Optional[str] = None
    social_links: Optional[SocialLinks] = None
