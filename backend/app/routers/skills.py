from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.skill import SkillSchema, SkillCreateSchema, SkillUpdateSchema

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=List[SkillSchema])
async def list_skills():
    """
    List all skills entries.
    """
    db = get_database()
    cursor = db["skills"].find()
    skills = await cursor.to_list(length=100)
    return skills

@router.post("", response_model=SkillSchema, status_code=201)
async def create_skill(skill: SkillCreateSchema):
    """
    Add a new skill entry.
    """
    db = get_database()
    skill_dict = skill.model_dump()
    result = await db["skills"].insert_one(skill_dict)
    created = await db["skills"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{skill_id}", response_model=SkillSchema)
async def update_skill(skill_id: str, skill_update: SkillUpdateSchema):
    """
    Update a skill entry by ID.
    """
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in skill_update.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["skills"].update_one({"_id": ObjectId(skill_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Skill entry not found.")

    updated = await db["skills"].find_one({"_id": ObjectId(skill_id)})
    return updated

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: str):
    """
    Delete a skill entry by ID.
    """
    if not ObjectId.is_valid(skill_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["skills"].delete_one({"_id": ObjectId(skill_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Skill entry not found.")
    return None
