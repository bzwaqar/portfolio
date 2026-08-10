from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr
from app.models.common import PyObjectId

class ContactMessageSchema(BaseModel):
    """
    Contact Message Form Submission Model Schema.
    Collection Name: `contact_messages`
    """
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    name: str = Field(..., example="Alex Mercer")
    email: EmailStr = Field(..., example="alex@example.com")
    subject: Optional[str] = Field(default="Portfolio Inquiry", example="Web Dev Project")
    message: str = Field(..., example="Hi Waqar, I would like to discuss a project.")
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {PyObjectId: str, datetime: lambda dt: dt.isoformat()}

class ContactMessageCreateSchema(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = "Portfolio Inquiry"
    message: str
