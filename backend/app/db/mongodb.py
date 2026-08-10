import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

logger = logging.getLogger(__name__)

class DatabaseManager:
    """
    MongoDB Database Connection Manager.
    Student Note:
    Motor is the official asynchronous MongoDB driver for Python.
    Using async operations prevents the FastAPI application from blocking
    while waiting for database network calls to MongoDB Atlas.
    """
    client: AsyncIOMotorClient = None

db_manager = DatabaseManager()

async def connect_to_mongo():
    """Establish async connection pool to MongoDB Atlas on application startup."""
    logger.info("Connecting to MongoDB Atlas...")
    try:
        db_manager.client = AsyncIOMotorClient(
            settings.MONGODB_URI,
            serverSelectionTimeoutMS=5000  # 5-second connection timeout
        )
        # Test connection ping
        await db_manager.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB Atlas!")
    except Exception as e:
        logger.warning(f"Could not connect to MongoDB Atlas at {settings.MONGODB_URI}. Error: {e}")

async def close_mongo_connection():
    """Close MongoDB connection pool on application shutdown."""
    if db_manager.client:
        db_manager.client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    """Helper function to retrieve the active MongoDB database instance."""
    if db_manager.client is None:
        # Fallback for offline testing if client not connected yet
        db_manager.client = AsyncIOMotorClient(settings.MONGODB_URI)
    return db_manager.client[settings.DB_NAME]
