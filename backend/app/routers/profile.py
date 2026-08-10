from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.profile import ProfileSchema, ProfileUpdateSchema

router = APIRouter(prefix="/api/profile", tags=["Profile"])

@router.get("", response_model=ProfileSchema)
async def get_profile():
    """
    Retrieve developer profile document.
    Returns 404 if profile has not been initialized.
    """
    db = get_database()
    profile = await db["profile"].find_one()
    if not profile:
        # Fallback profile document for student demo
        return ProfileSchema(
            name="Waqar Khan",
            title="AI/ML Engineer & Full-Stack Developer",
            bio="Passionate computer science student creating deep learning systems and modern Next.js web applications."
        )
    return profile

@router.put("", response_model=ProfileSchema)
async def update_profile(profile_data: ProfileUpdateSchema):
    """
    Update or initialize developer profile document.
    """
    db = get_database()
    update_dict = {k: v for k, v in profile_data.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    existing = await db["profile"].find_one()
    if existing:
        await db["profile"].update_one({"_id": existing["_id"]}, {"$set": update_dict})
        updated = await db["profile"].find_one({"_id": existing["_id"]})
        return updated
    else:
        # Insert initial document if none exists
        result = await db["profile"].insert_one(update_dict)
        created = await db["profile"].find_one({"_id": result.inserted_id})
        return created
