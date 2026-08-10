from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.experience import ExperienceSchema, ExperienceCreateSchema, ExperienceUpdateSchema

router = APIRouter(prefix="/api/experience", tags=["Experience"])

@router.get("", response_model=List[ExperienceSchema])
async def list_experience():
    """
    List all work and academic experience entries.
    """
    db = get_database()
    cursor = db["experience"].find()
    experience = await cursor.to_list(length=100)
    return experience

@router.post("", response_model=ExperienceSchema, status_code=201)
async def create_experience(item: ExperienceCreateSchema):
    """
    Add a new experience entry.
    """
    db = get_database()
    item_dict = item.model_dump()
    result = await db["experience"].insert_one(item_dict)
    created = await db["experience"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{exp_id}", response_model=ExperienceSchema)
async def update_experience(exp_id: str, item_update: ExperienceUpdateSchema):
    """
    Update an existing experience entry by ID.
    """
    if not ObjectId.is_valid(exp_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in item_update.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["experience"].update_one({"_id": ObjectId(exp_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Experience entry not found.")

    updated = await db["experience"].find_one({"_id": ObjectId(exp_id)})
    return updated

@router.delete("/{exp_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_experience(exp_id: str):
    """
    Delete an experience entry by ID.
    """
    if not ObjectId.is_valid(exp_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["experience"].delete_one({"_id": ObjectId(exp_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Experience entry not found.")
    return None
