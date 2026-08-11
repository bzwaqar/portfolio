"""
MongoDB Project Image Mapping & Atlas Sync Script (Phase 3.5).
"""

import asyncio
import logging
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Map project slugs or keywords to WebP image URLs and natural alt texts
IMAGE_MAPPINGS = [
    {
        "keywords": ["artwork", "retrieval"],
        "url": "/images/projects/ai-artwork-retrieval.webp",
        "alt": "AI Artwork Retrieval project preview"
    },
    {
        "keywords": ["tech-stack", "recommender"],
        "url": "/images/projects/ai-tech-stack-recommender.webp",
        "alt": "AI Tech Stack Recommender project preview"
    },
    {
        "keywords": ["amazon", "review-intelligence"],
        "url": "/images/projects/amazon-review-intelligence.webp",
        "alt": "Amazon Review Intelligence project preview"
    },
    {
        "keywords": ["breast_cancer", "breast-cancer"],
        "url": "/images/projects/breast_cancer_prediction.webp",
        "alt": "Breast Cancer Prediction ML project preview"
    },
    {
        "keywords": ["ocr", "vision-pipeline"],
        "url": "/images/projects/ocr-vision-pipeline.webp",
        "alt": "OCR Vision Pipeline project preview"
    },
    {
        "keywords": ["pixsearch"],
        "url": "/images/projects/artificial-intelligence-computer-vision-image-search.webp",
        "alt": "AI image search and computer vision project"
    },
    {
        "keywords": ["credit-card-fraud", "fraud"],
        "url": "/images/projects/credit-card-fraud-cybersecurity-digital-payment.webp",
        "alt": "Credit card fraud detection and cybersecurity concept"
    },
    {
        "keywords": ["fifa", "match-predictor"],
        "url": "/images/projects/fifa-match-prediction.webp",
        "alt": "Football match analytics and prediction project"
    },
    {
        "keywords": ["facial_recognition", "facial", "face"],
        "url": "/images/projects/facial-recognition-security-camera-technology.webp",
        "alt": "Facial recognition and biometric security technology"
    },
    {
        "keywords": ["ai-bookstore", "bookstore"],
        "url": "/images/projects/online-bookstore-technology-books-computer.webp",
        "alt": "Online bookstore software application concept"
    },
    {
        "keywords": ["books-toscrape", "toscrape", "scraper"],
        "url": "/images/projects/web-scraping-programming-data-extraction.webp",
        "alt": "Web scraping and automated data extraction project"
    },
    {
        "keywords": ["retailpulse", "retail"],
        "url": "/images/projects/business-analytics-dashboard-data-visualization.webp",
        "alt": "Retail business data analytics and visualization"
    },
    {
        "keywords": ["kmeans", "customer-segmentation", "segmentation"],
        "url": "/images/projects/customer-analytics-business-data-segmentation.webp",
        "alt": "Customer analytics and business data segmentation"
    },
    {
        "keywords": ["social-media", "clustering"],
        "url": "/images/projects/social-media-engagement-clustering.webp",
        "alt": "Social media engagement analytics and data clustering"
    },
    {
        "keywords": ["bbc-news", "nlp"],
        "url": "/images/projects/news-media-artificial-intelligence-natural-language-processing.webp",
        "alt": "Natural language processing and news media analytics"
    },
    {
        "keywords": ["knn-data", "classification-pipeline"],
        "url": "/images/projects/software-developer-technology-programming-artificial-intelligence.webp",
        "alt": "Machine learning data classification pipeline"
    },
    {
        "keywords": ["supportdesk"],
        "url": "/images/projects/document-fraud-detection-scanning-documents.webp",
        "alt": "Support desk and automated document processing system"
    },
    {
        "keywords": ["business-data-semantic", "semantic"],
        "url": "/images/projects/business-intelligence-data-analytics-artificial-intelligence.webp",
        "alt": "Business intelligence and semantic data analytics"
    },
    {
        "keywords": ["steel-energy", "steel-industry"],
        "url": "/images/projects/traffic-surveillance-camera-road-safety.webp",
        "alt": "Industrial data analytics and energy consumption analysis"
    },
    {
        "keywords": ["healthcare", "diabetes"],
        "url": "/images/projects/healthcare-data-analysis-artificial-intelligence.webp",
        "alt": "Healthcare data analysis and medical artificial intelligence"
    }
]

async def map_images_to_mongodb_projects():
    logger.info("Connecting to MongoDB Atlas...")
    await connect_to_mongo()
    db = get_database()

    cursor = db["projects"].find()
    projects = await cursor.to_list(length=100)
    logger.info(f"Found {len(projects)} total projects in MongoDB 'projects' collection.")

    mapped_count = 0
    unmapped_count = 0

    for project in projects:
        slug = (project.get("slug") or project.get("name") or "").lower()
        title = (project.get("title") or project.get("name") or "").lower()

        matched_image = None
        for mapping in IMAGE_MAPPINGS:
            if any(kw in slug or kw in title for kw in mapping["keywords"]):
                matched_image = mapping
                break

        if matched_image:
            image_doc = {
                "url": matched_image["url"],
                "alt": matched_image["alt"]
            }
            
            # Update MongoDB project with image reference and mark published=True
            await db["projects"].update_one(
                {"_id": project["_id"]},
                {"$set": {
                    "images": [image_doc["url"]],
                    "image": image_doc,
                    "published": True
                }}
            )
            mapped_count += 1
            logger.info(f"[OK] Mapped '{project.get('title')}' -> {matched_image['url']} (published=True)")
        else:
            unmapped_count += 1
            logger.info(f"[NO IMAGE] '{project.get('title')}' has no matching local image (published remains {project.get('published', False)})")

    logger.info(f"\n==========================================")
    logger.info(f"SUMMARY OF IMAGE MAPPING TO MONGODB:")
    logger.info(f"Total Projects in MongoDB: {len(projects)}")
    logger.info(f"Projects Mapped with WebP Images: {mapped_count}")
    logger.info(f"Projects Without Images: {unmapped_count}")
    logger.info(f"==========================================\n")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(map_images_to_mongodb_projects())
