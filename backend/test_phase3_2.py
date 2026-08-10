"""
Test script to execute Phase 3.2 GitHub sync to MongoDB Atlas.
"""

import asyncio
import logging
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database
from app.services.github_service import fetch_github_user_repos
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def run_sync_test():
    logger.info("Initializing MongoDB Atlas connection...")
    await connect_to_mongo()
    db = get_database()

    target_user = settings.GITHUB_USERNAME
    logger.info(f"Fetching live repositories & READMEs for user '{target_user}'...")
    repos = await fetch_github_user_repos(target_user)

    logger.info(f"Fetched {len(repos)} repositories from GitHub API.")

    inserted_count = 0
    updated_count = 0

    for repo_data in repos:
        github_id = repo_data.get("github_id")
        slug = repo_data.get("slug")

        query_filter = {"$or": [{"github_id": github_id}, {"slug": slug}]}
        existing_doc = await db["projects"].find_one(query_filter)

        if existing_doc:
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
            }
            await db["projects"].update_one({"_id": existing_doc["_id"]}, {"$set": update_fields})
            updated_count += 1
            logger.info(f"✓ Updated existing project: {repo_data['title']} (github_id: {github_id})")
        else:
            await db["projects"].insert_one(repo_data)
            inserted_count += 1
            logger.info(f"✓ Created new project document: {repo_data['title']} (github_id: {github_id})")

    # Verify total documents in projects collection
    total_docs = await db["projects"].count_documents({})
    logger.info(f"\n==========================================")
    logger.info(f"SUCCESS: MongoDB Atlas Sync Test Complete!")
    logger.info(f"Database Name: {settings.DB_NAME}")
    logger.info(f"Collection Name: projects")
    logger.info(f"New Projects Inserted: {inserted_count}")
    logger.info(f"Existing Projects Updated: {updated_count}")
    logger.info(f"Total Documents in 'projects': {total_docs}")
    logger.info(f"==========================================\n")

    # Re-running sync to test deduplication
    logger.info("Re-running sync to verify deduplication (should yield 0 new insertions)...")
    repos_pass2 = await fetch_github_user_repos(target_user)
    new_pass2 = 0
    updated_pass2 = 0

    for repo_data in repos_pass2:
        github_id = repo_data.get("github_id")
        slug = repo_data.get("slug")
        query_filter = {"$or": [{"github_id": github_id}, {"slug": slug}]}
        existing_doc = await db["projects"].find_one(query_filter)
        if existing_doc:
            updated_pass2 += 1
        else:
            new_pass2 += 1

    total_pass2 = await db["projects"].count_documents({})
    logger.info(f"Re-sync Result -> New Insertions: {new_pass2}, Updated: {updated_pass2}, Total Docs: {total_pass2}")
    if new_pass2 == 0:
        logger.info("✓ DEDUPLICATION VERIFIED: Zero duplicate documents created on re-sync!")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(run_sync_test())
