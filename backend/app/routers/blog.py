from typing import List, Optional
from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query, status
from app.db.mongodb import get_database
from app.models.blog import BlogPostSchema, BlogPostCreateSchema, BlogPostUpdateSchema

router = APIRouter(prefix="/api/blog", tags=["Blog"])

@router.get("", response_model=List[BlogPostSchema])
async def list_blog_posts(tag: Optional[str] = Query(None, description="Filter by tag")):
    """
    List all published blog posts.
    """
    db = get_database()
    query = {}
    if tag:
        query["tags"] = tag

    cursor = db["blog"].find(query).sort("published_date", -1)
    posts = await cursor.to_list(length=100)
    return posts

@router.get("/{slug_or_id}", response_model=BlogPostSchema)
async def get_blog_post(slug_or_id: str):
    """
    Get single blog post by slug or ObjectId string.
    """
    db = get_database()
    post = await db["blog"].find_one({"slug": slug_or_id})

    if not post and ObjectId.is_valid(slug_or_id):
        post = await db["blog"].find_one({"_id": ObjectId(slug_or_id)})

    if not post:
        raise HTTPException(status_code=404, detail=f"Blog post '{slug_or_id}' not found.")

    return post

@router.post("", response_model=BlogPostSchema, status_code=201)
async def create_blog_post(post: BlogPostCreateSchema):
    """
    Create a new blog post.
    """
    db = get_database()
    existing = await db["blog"].find_one({"slug": post.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A blog post with this slug already exists.")

    post_dict = post.model_dump()
    result = await db["blog"].insert_one(post_dict)
    created = await db["blog"].find_one({"_id": result.inserted_id})
    return created

@router.put("/{post_id}", response_model=BlogPostSchema)
async def update_blog_post(post_id: str, post_update: BlogPostUpdateSchema):
    """
    Update a blog post by ID.
    """
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    update_dict = {k: v for k, v in post_update.model_dump().items() if v is not None}

    if not update_dict:
        raise HTTPException(status_code=400, detail="No fields provided for update.")

    result = await db["blog"].update_one({"_id": ObjectId(post_id)}, {"$set": update_dict})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found.")

    updated = await db["blog"].find_one({"_id": ObjectId(post_id)})
    return updated

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog_post(post_id: str):
    """
    Delete a blog post by ID.
    """
    if not ObjectId.is_valid(post_id):
        raise HTTPException(status_code=400, detail="Invalid MongoDB ObjectId string.")

    db = get_database()
    result = await db["blog"].delete_one({"_id": ObjectId(post_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found.")
    return None
