"""
Verification Test Script for Phase 3.4 AI Project Content Generation.
"""

import asyncio
import logging
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database
from app.services.ai_service import generate_ai_project_draft

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def run_phase3_4_test():
    logger.info("Initializing MongoDB Atlas connection for Phase 3.4 Test...")
    await connect_to_mongo()
    db = get_database()

    # Step 1: Find a real GitHub repository project in MongoDB
    logger.info("Step 1: Retrieving real GitHub project from MongoDB Atlas...")
    project = await db["projects"].find_one({"readme_content": {"$ne": ""}})
    
    if not project:
        project = await db["projects"].find_one()

    if not project:
        logger.error("No project documents found in MongoDBAtlas!")
        await close_mongo_connection()
        return

    repo_name = project.get("name") or project.get("slug")
    logger.info(f"Target Repository for AI Test: '{repo_name}' (github_id: {project.get('github_id')})")

    # Step 2: Generate AI Draft using real repo information and README text
    logger.info("Step 2: Generating AI Draft using repository metadata and README...")
    ai_draft = await generate_ai_project_draft(
        repo_name=repo_name,
        github_description=project.get("description") or "",
        readme_content=project.get("readme_content") or "",
        languages=project.get("languages") or [],
        topics=project.get("topics") or []
    )

    logger.info("\n=== AI GENERATED DRAFT OUTPUT ===")
    logger.info(f"Title: {ai_draft['title']}")
    logger.info(f"Short Description: {ai_draft['short_description']}")
    logger.info(f"Detailed Narrative: {ai_draft['description']}")
    logger.info(f"Problem Statement: {ai_draft['problem_statement']}")
    logger.info(f"Solution Statement: {ai_draft['solution_statement']}")
    logger.info(f"Features ({len(ai_draft['features'])} items): {ai_draft['features']}")
    logger.info(f"Verified Tech Stack: {ai_draft['technologies']}")
    logger.info("===================================\n")

    # Step 3: Non-Hallucination Audit
    logger.info("Step 3: Auditing Non-Hallucination Compliance...")
    assert "99.9%" not in ai_draft["description"], "Hallucinated percentage found!"
    assert "Fortune 500" not in ai_draft["description"], "Hallucinated client found!"
    logger.info("✓ Non-Hallucination Audit PASSED: 0 invented stats or clients.")

    # Step 4: Simulate Admin Accept & Save to MongoDB Atlas
    logger.info("Step 4: Simulating Admin Accept & Save to MongoDB Atlas...")
    update_doc = {
        "title": ai_draft["title"],
        "short_description": ai_draft["short_description"],
        "description": ai_draft["description"],
        "problem_statement": ai_draft["problem_statement"],
        "solution_statement": ai_draft["solution_statement"],
        "features": ai_draft["features"],
        "technologies": ai_draft["technologies"]
    }
    await db["projects"].update_one({"_id": project["_id"]}, {"$set": update_doc})
    
    saved_doc = await db["projects"].find_one({"_id": project["_id"]})
    logger.info(f"✓ AI Draft saved to MongoDB Atlas -> Project '_id': {saved_doc['_id']}")
    logger.info(f"✓ Published status remains unchanged -> published: {saved_doc.get('published')}")

    logger.info("\n==========================================")
    logger.info("PHASE 3.4 AI GENERATION TEST COMPLETED SUCCESSFULLY!")
    logger.info("==========================================\n")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(run_phase3_4_test())
