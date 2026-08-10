import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    """
    Application Settings configuration.
    Student Note:
    Centralizes configuration loading using python-dotenv. Environment variables
    like MONGODB_URI and GITHUB_USERNAME are loaded securely.
    """
    PROJECT_NAME: str = "Waqar Khan Portfolio API"
    PROJECT_VERSION: str = "1.0.0"
    
    # MongoDB settings
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "portfolio_db")
    
    # GitHub Integration Settings
    GITHUB_USERNAME: str = os.getenv("GITHUB_USERNAME", "bzwaqar")
    GITHUB_TOKEN: str = os.getenv("GITHUB_TOKEN", "")
    
    # CORS settings (allowed origins for Next.js frontend)
    CORS_ORIGINS: list[str] = [
        origin.strip() for origin in os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",") if origin.strip()
    ]

settings = Settings()
