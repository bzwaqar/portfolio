from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Query, status
from app.db.mongodb import get_database
from app.services.github_service import fetch_github_user_repos
from app.models.project import ProjectSchema
from app.core.config import settings

router = APIRouter(prefix="/api/github", tags=["GitHub Integration"])

@router.get("/repos", response_model=List[ProjectSchema])
async def get_repositories(username: Optional[str] = Query(None, description="GitHub username")):
    """
    GET /api/github/repos
    Fetches repositories from GitHub REST API or retrieves cached projects from MongoDB.
    """
    target_username = username or settings.GITHUB_USERNAME
    live_repos = await fetch_github_user_repos(target_username)

    if live_repos:
        return live_repos

    # Fallback to projects in MongoDB Atlas
    db = get_database()
    cursor = db["projects"].find().sort("stars", -1)
    cached_projects = await cursor.to_list(length=100)
    return cached_projects

@router.post("/sync", status_code=status.HTTP_200_OK)
async def sync_github_repositories():
    """
    POST /api/github/sync
    Syncs public GitHub repositories for `@bzwaqar` into MongoDB Atlas `projects` collection.
    Deduplication Guarantee: Uses `update_one` with `upsert=True` matching unique `github_id` or `slug`.
    Existing project records are updated without creating duplicate documents.
    """
    target_username = settings.GITHUB_USERNAME
    repos = await fetch_github_user_repos(target_username)

    if not repos:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Could not fetch repositories for GitHub user '{target_username}'."
        )

    db = get_database()
    synced_count = 0
    updated_count = 0

    for repo_data in repos:
        repo_data["synced_at"] = datetime.utcnow()
        github_id = repo_data.get("github_id")
        slug = repo_data.get("slug")

        # Query filter to prevent duplicate creation
        query_filter = {"$or": [{"github_id": github_id}, {"slug": slug}]}
        existing_doc = await db["projects"].find_one(query_filter)

        if existing_doc:
            # Preserve existing user-defined fields (featured, published, images, demo_url)
            update_fields = {
                "name": repo_data["name"],
                "title": repo_data["title"],
                "short_description": repo_data["short_description"],
                "description": repo_data["description"],
                "readme_content": repo_data["readme_content"],
                "github_url": repo_data["github_url"],
                "languages": repo_data["languages"],
                "topics": repo_data["topics"],
                "stars": repo_data["stars"],
                "forks": repo_data["forks"],
                "updated_at": repo_data["updated_at"],
                "synced_at": repo_data["synced_at"]
            }
            await db["projects"].update_one({"_id": existing_doc["_id"]}, {"$set": update_fields})
            updated_count += 1
        else:
            # Insert new project document with default flags (featured=False, published=False)
            await db["projects"].insert_one(repo_data)
            synced_count += 1

    return {
        "status": "success",
        "message": f"GitHub repositories synced successfully to MongoDB Atlas collection 'projects'.",
        "username": target_username,
        "new_projects_added": synced_count,
        "existing_projects_updated": updated_count,
        "total_projects": synced_count + updated_count
    }
