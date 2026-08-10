from typing import List
from bson import ObjectId
from fastapi import APIRouter, HTTPException, status
from app.db.mongodb import get_database
from app.models.service import ServiceSchema, ServiceCreateSchema, ServiceUpdateSchema

router = APIRouter(prefix="/api/services", tags=["Services"])

@router.get("", response_model=List[ServiceSchema])
async def list_services():
    """
    List all services entries.
    """
    db = get_database()
    cursor = db["services"].find()
    services = await cursor.to_list(length=100)
    return services

@router.post("", response_model=ServiceSchema, status_code=201)
async def create_service(service: ServiceCreateSchema):
    """
    Create a new service offering.
    """
    db = get_database()
    service_dict = service.model_dump()
    result = await db["services"].insert_one(service_dict)
    created = await db["services"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{service_id}", response_model=ServiceSchema)
async def update_service(service_id: str, service_update: ServiceUpdateSchema):
    """
    Update a service entry by ID.
    """
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in service_update.model_dump().items() if v is not None}
    
    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["services"].update_one({"_id": ObjectId(service_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service entry not found.")

    updated = await db["services"].find_one({"_id": ObjectId(service_id)})
    return updated

@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_service(service_id: str):
    """
    Delete a service entry by ID.
    """
    if not ObjectId.is_valid(service_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["services"].delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service entry not found.")
    return None
