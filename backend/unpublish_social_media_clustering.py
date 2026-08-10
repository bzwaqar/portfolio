"""
Script to unpublish Social Media Engagement Clustering project from MongoDB Atlas.
"""

import asyncio
import logging
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def unpublish_social_media_clustering():
    logger.info("Connecting to MongoDB Atlas...")
    await connect_to_mongo()
    db = get_database()

    # Search for social media clustering project by slug or name
    query = {
        "$or": [
            {"slug": {"$regex": "social-media", "$options": "i"}},
            {"name": {"$regex": "social-media", "$options": "i"}},
            {"title": {"$regex": "Social Media", "$options": "i"}}
        ]
    }

    project = await db["projects"].find_one(query)

    if project:
        # Update published=False and clear images
        await db["projects"].update_one(
            {"_id": project["_id"]},
            {"$set": {
                "published": False,
                "images": [],
                "image": None
            }}
        )
        logger.info(f"✓ Successfully UNPUBLISHED project: '{project.get('title')}' (slug: '{project.get('slug')}')")
        logger.info(f"✓ Set published=False and cleared image references.")
    else:
        logger.warning("No project matching 'social media clustering' found in MongoDBAtlas.")

    # Print remaining published projects
    published_cursor = db["projects"].find({"published": True})
    published_projects = await published_cursor.to_list(length=100)
    logger.info(f"\nRemaining Published Projects Count: {len(published_projects)}")
    for p in published_projects:
        logger.info(f"  - {p.get('title')} ({p.get('slug')})")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(unpublish_social_media_clustering())
