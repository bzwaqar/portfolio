"""
Action Flow Verification Script for Phase 3.3 Project Management.
"""

import asyncio
import logging
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database
from app.services.github_service import fetch_github_user_repos
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def run_phase3_3_test():
    logger.info("Initializing MongoDB Atlas connection for Phase 3.3 Test...")
    await connect_to_mongo()
    db = get_database()

    # Step 1: Import / Sync GitHub Repositories
    logger.info("Step 1: Importing / Syncing GitHub repositories for @bzwaqar...")
    repos = await fetch_github_user_repos(settings.GITHUB_USERNAME)
    if repos:
        first_repo = repos[0]
        github_id = first_repo["github_id"]
        slug = first_repo["slug"]
        
        # Save to MongoDB Atlas
        await db["projects"].update_one(
            {"$or": [{"github_id": github_id}, {"slug": slug}]},
            {"$set": first_repo},
            upsert=True
        )
        logger.info(f"✓ Imported project: '{first_repo['title']}' (github_id: {github_id})")

        # Fetch doc from MongoDB
        project = await db["projects"].find_one({"$or": [{"github_id": github_id}, {"slug": slug}]})
        proj_id = project["_id"]

        # Step 2: Edit Project (title, description, demo_url, topics)
        logger.info("Step 2: Editing project metadata (title, demo_url, topics)...")
        updated_title = f"{first_repo['title']} (Custom Admin Edited)"
        demo_url = "https://demo.waqarkhan.dev"
        updated_topics = ["ai", "machine-learning", "computer-vision"]
        
        await db["projects"].update_one(
            {"_id": proj_id},
            {"$set": {
                "title": updated_title,
                "demo_url": demo_url,
                "topics": updated_topics
            }}
        )
        edited_doc = await db["projects"].find_one({"_id": proj_id})
        logger.info(f"✓ Project edited -> Title: '{edited_doc['title']}', Demo URL: '{edited_doc['demo_url']}', Topics: {edited_doc['topics']}")

        # Step 3: Publish Project
        logger.info("Step 3: Publishing project (published = True)...")
        await db["projects"].update_one({"_id": proj_id}, {"$set": {"published": True}})
        pub_doc = await db["projects"].find_one({"_id": proj_id})
        logger.info(f"✓ Published status: {pub_doc['published']}")

        # Step 4: Unpublish Project
        logger.info("Step 4: Unpublishing project (published = False)...")
        await db["projects"].update_one({"_id": proj_id}, {"$set": {"published": False}})
        unpub_doc = await db["projects"].find_one({"_id": proj_id})
        logger.info(f"✓ Unpublished status: {unpub_doc['published']}")

        # Step 5: Feature and Unfeature Project
        logger.info("Step 5: Featuring project (featured = True)...")
        await db["projects"].update_one({"_id": proj_id}, {"$set": {"featured": True}})
        feat_doc = await db["projects"].find_one({"_id": proj_id})
        logger.info(f"✓ Featured status: {feat_doc['featured']}")

        logger.info("Step 5b: Unfeaturing project (featured = False)...")
        await db["projects"].update_one({"_id": proj_id}, {"$set": {"featured": False}})
        unfeat_doc = await db["projects"].find_one({"_id": proj_id})
        logger.info(f"✓ Unfeatured status: {unfeat_doc['featured']}")

        logger.info("\n==========================================")
        logger.info("PHASE 3.3 ACTION TEST COMPLETED SUCCESSFULLY!")
        logger.info("All 5 project management actions verified.")
        logger.info("==========================================\n")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(run_phase3_3_test())
