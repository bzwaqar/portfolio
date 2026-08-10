from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.education import EducationSchema, EducationCreateSchema, EducationUpdateSchema

router = APIRouter(prefix="/api/education", tags=["Education"])

@router.get("", response_model=List[EducationSchema])
async def list_education():
    """
    List all education entries.
    """
    db = get_database()
    cursor = db["education"].find()
    records = await cursor.to_list(length=100)
    return records

@router.post("", response_model=EducationSchema, status_code=201)
async def create_education(item: EducationCreateSchema):
    """
    Create a new education record.
    """
    db = get_database()
    doc = item.model_dump()
    result = await db["education"].insert_one(doc)
    created = await db["education"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{edu_id}", response_model=EducationSchema)
async def update_education(edu_id: str, update_data: EducationUpdateSchema):
    """
    Update an education record by ID.
    """
    if not ObjectId.is_valid(edu_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["education"].update_one({"_id": ObjectId(edu_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Education record not found.")

    updated = await db["education"].find_one({"_id": ObjectId(edu_id)})
    return updated

@router.delete("/{edu_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_education(edu_id: str):
    """
    Delete an education record by ID.
    """
    if not ObjectId.is_valid(edu_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["education"].delete_one({"_id": ObjectId(edu_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Education record not found.")
    return None
