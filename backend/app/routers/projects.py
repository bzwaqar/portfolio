from typing import List, Optional
from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query, status
from app.db.mongodb import get_database
from app.models.project import ProjectSchema, ProjectCreateSchema, ProjectUpdateSchema
from app.services.ai_service import generate_ai_project_draft

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[ProjectSchema])
async def list_projects(
    category: Optional[str] = Query(None, description="Filter by category or language"),
    published_only: Optional[bool] = Query(False, description="Return only published projects for public portfolio view")
):
    """
    List portfolio projects from MongoDB Atlas.
    """
    db = get_database()
    query = {}

    if published_only:
        query["published"] = True

    if category and category.lower() != "all":
        query["$or"] = [
            {"category": category},
            {"languages": category},
            {"topics": category}
        ]

    cursor = db["projects"].find(query).sort([("featured", -1), ("updated_at", -1)])
    projects = await cursor.to_list(length=100)
    return projects

@router.get("/{slug_or_id}", response_model=ProjectSchema)
async def get_project(slug_or_id: str):
    """
    Retrieve single project by slug or MongoDB ObjectId string.
    """
    db = get_database()
    
    project = await db["projects"].find_one({"slug": slug_or_id})

    if not project and ObjectId.is_valid(slug_or_id):
        project = await db["projects"].find_one({"_id": ObjectId(slug_or_id)})

    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Project '{slug_or_id}' not found.")

    return project

@router.post("/{project_id}/generate-ai", status_code=status.HTTP_200_OK)
async def generate_ai_draft(project_id: str):
    """
    POST /api/projects/{project_id}/generate-ai
    Generates an AI-assisted project content DRAFT using existing GitHub metadata and README text.
    Human-in-the-Loop: Does NOT automatically publish or commit to DB until admin approves in UI.
    """
    db = get_database()
    query_filter = {}

    if ObjectId.is_valid(project_id):
        query_filter = {"_id": ObjectId(project_id)}
    else:
        query_filter = {"slug": project_id}

    project = await db["projects"].find_one(query_filter)
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found.")

    # Call AI generation service
    draft = await generate_ai_project_draft(
        repo_name=project.get("name") or project.get("slug") or "project",
        github_description=project.get("description") or project.get("short_description") or "",
        readme_content=project.get("readme_content") or "",
        languages=project.get("languages") or [],
        topics=project.get("topics") or []
    )

    return {
        "status": "success",
        "project_id": str(project.get("_id") or project_id),
        "draft": draft
    }

@router.post("", response_model=ProjectSchema, status_code=201)
async def create_project(project: ProjectCreateSchema):
    """
    Create a new project entry manually.
    """
    db = get_database()

    existing = await db["projects"].find_one({"slug": project.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A project with this slug already exists.")

    project_dict = project.model_dump()
    result = await db["projects"].insert_one(project_dict)
    created_project = await db["projects"].find_one({"_id": result.inserted_id})
    return created_project

@router.put("/{project_id}", response_model=ProjectSchema)
async def update_project(project_id: str, project_update: ProjectUpdateSchema):
    """
    Update an existing project by MongoDB ObjectId string or GitHub slug.
    Allows saving approved AI draft fields or manual updates.
    """
    db = get_database()
    query_filter = {}

    if ObjectId.is_valid(project_id):
        query_filter = {"_id": ObjectId(project_id)}
    else:
        query_filter = {"slug": project_id}

    existing_doc = await db["projects"].find_one(query_filter)
    if not existing_doc:
        raise HTTPException(status_code=404, detail=f"Project '{project_id}' not found.")

    update_dict = {k: v for k, v in project_update.model_dump().items() if v is not None}

    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    await db["projects"].update_one({"_id": existing_doc["_id"]}, {"$set": update_dict})
    updated_project = await db["projects"].find_one({"_id": existing_doc["_id"]})
    return updated_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(project_id: str):
    """
    Delete a project entry by MongoDB ObjectId string or slug.
    """
    db = get_database()
    query_filter = {}

    if ObjectId.is_valid(project_id):
        query_filter = {"_id": ObjectId(project_id)}
    else:
        query_filter = {"slug": project_id}

    result = await db["projects"].delete_one(query_filter)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found.")
    return None
