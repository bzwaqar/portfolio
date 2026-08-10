from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.certification import CertificationSchema, CertificationCreateSchema, CertificationUpdateSchema

router = APIRouter(prefix="/api/certifications", tags=["Certifications"])

@router.get("", response_model=List[CertificationSchema])
async def list_certifications():
    """
    List all certifications.
    """
    db = get_database()
    cursor = db["certifications"].find()
    records = await cursor.to_list(length=100)
    return records

@router.post("", response_model=CertificationSchema, status_code=201)
async def create_certification(item: CertificationCreateSchema):
    """
    Create a new certification entry.
    """
    db = get_database()
    doc = item.model_dump()
    result = await db["certifications"].insert_one(doc)
    created = await db["certifications"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{cert_id}", response_model=CertificationSchema)
async def update_certification(cert_id: str, update_data: CertificationUpdateSchema):
    """
    Update a certification entry by ID.
    """
    if not ObjectId.is_valid(cert_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in update_data.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["certifications"].update_one({"_id": ObjectId(cert_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Certification record not found.")

    updated = await db["certifications"].find_one({"_id": ObjectId(cert_id)})
    return updated

@router.delete("/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_certification(cert_id: str):
    """
    Delete a certification record by ID.
    """
    if not ObjectId.is_valid(cert_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["certifications"].delete_one({"_id": ObjectId(cert_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Certification record not found.")
    return None
