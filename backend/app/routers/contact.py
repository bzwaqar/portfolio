from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.contact import ContactMessageSchema, ContactMessageCreateSchema

router = APIRouter(tags=["Contact"])

@router.post("/api/contact", response_model=ContactMessageSchema, status_code=201)
@router.post("/contact", response_model=ContactMessageSchema, status_code=201)
async def submit_contact_form(message_data: ContactMessageCreateSchema):
    """
    POST /contact or POST /api/contact
    Save contact form submission from Next.js portfolio website into MongoDB `contact_messages` collection.
    """
    db = get_database()
    doc_dict = message_data.model_dump()
    result = await db["contact_messages"].insert_one(doc_dict)
    created = await db["contact_messages"].find_one({"_id": result.inserted_id})
    return created

@router.get("/api/contact", response_model=List[ContactMessageSchema])
async def list_contact_messages():
    """
    List all submitted contact messages.
    """
    db = get_database()
    cursor = db["contact_messages"].find().sort("submitted_at", -1)
    messages = await cursor.to_list(length=100)
    return messages

@router.delete("/api/contact/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact_message(message_id: str):
    """
    Delete a contact message submission by ID.
    """
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["contact_messages"].delete_one({"_id": ObjectId(message_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact message not found.")
    return None
