"""
============================================================================
MONGODB SEED DATA SCRIPT (seed_data.py) - PHASE 2 AUTHORITATIVE DATA
============================================================================
Student & Developer Note:
Run this script to seed or reset your MongoDB Atlas database collections
with exact portfolio data for Waqar Khan.

Usage:
    python seed_data.py
"""

import asyncio
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

INITIAL_PROFILE = {
    "name": "Waqar Khan",
    "title": "Machine Learning Engineer",
    "secondary_title": "Full Stack Engineer",
    "specialization": "Computer Vision Enthusiast",
    "location": "Islamabad, Pakistan",
    "email": "bbzwaqar@gmail.com",
    "phone": "0343-0577768",
    "bio": "Machine Learning Engineer and Full Stack Engineer with experience in AI-driven applications, Computer Vision, Generative AI, and modern web development. Professional focus includes building intelligent systems and integrating AI capabilities into full-stack applications.",
    "profile_image_url": "/avatar-placeholder.svg",
    "social_links": {
        "github": "https://github.com/bzwaqar",
        "linkedin": "https://linkedin.com/in/waqar-khan-9a7016321"
    }
}

INITIAL_EDUCATION = [
    {
        "degree": "Bachelor of Science in Artificial Intelligence",
        "institution": "COMSATS University Islamabad",
        "duration": "2024 – Present",
        "location": "Islamabad, Pakistan",
        "details": "Focusing on Machine Learning, Deep Learning, Computer Vision, Generative AI, and Software Engineering."
    }
]

INITIAL_CERTIFICATIONS = [
    {
        "title": "Agentic AI Bootcamp",
        "issuer": "COMSATS University Islamabad",
        "platform": "",
        "date": ""
    },
    {
        "title": "Beyond Chatbots: The Age of AI Agents",
        "issuer": "Youth Insight",
        "platform": "",
        "date": ""
    },
    {
        "title": "Python Essentials for MLOps",
        "issuer": "Duke University",
        "platform": "Coursera",
        "date": ""
    },
    {
        "title": "AI for Everyone",
        "issuer": "DeepLearning.AI",
        "platform": "Coursera",
        "date": ""
    },
    {
        "title": "Social Media & Digital Marketing",
        "issuer": "ILC COMSATS",
        "platform": "",
        "date": ""
    }
]

INITIAL_EXPERIENCE = [
    {
        "company": "Sectem Technologies",
        "role": "Full Stack Engineer Intern",
        "start_date": "Jul 2026",
        "end_date": "Present",
        "description": "Developing full-stack applications using React.js, Node.js, MongoDB, and REST APIs. Integrating AI-powered automation into web solutions.",
        "highlights": [
            "Developing full-stack applications using React.js, Node.js, MongoDB, and REST APIs.",
            "Integrating AI-powered automation into modern web solutions.",
            "Collaborating on scalable software development."
        ]
    },
    {
        "company": "ITSimplera",
        "role": "Machine Learning Intern",
        "start_date": "Jul 2026",
        "end_date": "Aug 2026",
        "description": "Worked on Machine Learning and Generative AI projects.",
        "highlights": [
            "Worked on Machine Learning and Generative AI projects.",
            "Applied Python, TensorFlow, and Scikit-learn on real-world datasets."
        ]
    },
    {
        "company": "Decode Labs",
        "role": "Artificial Intelligence Intern",
        "start_date": "Jun 2026",
        "end_date": "Jul 2026",
        "description": "Developed AI solutions through mentor-guided Machine Learning projects.",
        "highlights": [
            "Developed AI solutions through mentor-guided Machine Learning projects.",
            "Collaborated in Agile teams and delivered project milestones."
        ]
    },
    {
        "company": "Arch Technologies Pakistan",
        "role": "Machine Learning Intern",
        "start_date": "Dec 2025",
        "end_date": "Jan 2026",
        "description": "Built ML models using preprocessing and feature engineering.",
        "highlights": [
            "Built ML models using preprocessing and feature engineering.",
            "Improved prediction accuracy through experimentation."
        ]
    },
    {
        "company": "Devsinc",
        "role": "Devstranaut 3.0 (Campus Ambassador)",
        "start_date": "2026",
        "end_date": "2027",
        "description": "Official Devsinc Campus Ambassador representing Devsinc at COMSATS University Islamabad.",
        "highlights": [
            "Representing Devsinc as the official Campus Ambassador at COMSATS University Islamabad (Batch 2026–2027).",
            "Organizing technical workshops, developer meetups, and hackathons to foster software engineering culture.",
            "Serving as a liaison between Devsinc engineering initiatives and student developer communities on campus."
        ]
    }
]

INITIAL_SKILLS = [
    # Programming Languages
    {"name": "Python", "category": "Programming Languages", "level": "Advanced"},
    {"name": "Java", "category": "Programming Languages", "level": "Proficient"},
    {"name": "JavaScript", "category": "Programming Languages", "level": "Advanced"},
    {"name": "C++", "category": "Programming Languages", "level": "Proficient"},
    
    # AI & Machine Learning
    {"name": "Machine Learning", "category": "AI & Machine Learning", "level": "Advanced"},
    {"name": "Deep Learning", "category": "AI & Machine Learning", "level": "Advanced"},
    {"name": "Computer Vision", "category": "AI & Machine Learning", "level": "Advanced"},
    {"name": "Generative AI", "category": "AI & Machine Learning", "level": "Proficient"},
    {"name": "LLMs", "category": "AI & Machine Learning", "level": "Proficient"},
    {"name": "Retrieval-Augmented Generation (RAG)", "category": "AI & Machine Learning", "level": "Proficient"},
    {"name": "Feature Engineering", "category": "AI & Machine Learning", "level": "Advanced"},
    {"name": "Predictive Analytics", "category": "AI & Machine Learning", "level": "Proficient"},
    {"name": "Data Analysis", "category": "AI & Machine Learning", "level": "Advanced"},

    # Web Development
    {"name": "React.js", "category": "Web Development", "level": "Advanced"},
    {"name": "Node.js", "category": "Web Development", "level": "Advanced"},
    {"name": "Express.js", "category": "Web Development", "level": "Advanced"},
    {"name": "REST APIs", "category": "Web Development", "level": "Advanced"},
    {"name": "HTML", "category": "Web Development", "level": "Advanced"},
    {"name": "CSS", "category": "Web Development", "level": "Advanced"},
    {"name": "JavaScript", "category": "Web Development", "level": "Advanced"},

    # Libraries / Frameworks
    {"name": "TensorFlow", "category": "Libraries / Frameworks", "level": "Advanced"},
    {"name": "Scikit-learn", "category": "Libraries / Frameworks", "level": "Advanced"},
    {"name": "OpenCV", "category": "Libraries / Frameworks", "level": "Advanced"},
    {"name": "Pandas", "category": "Libraries / Frameworks", "level": "Advanced"},
    {"name": "NumPy", "category": "Libraries / Frameworks", "level": "Advanced"},
    {"name": "Matplotlib", "category": "Libraries / Frameworks", "level": "Proficient"},

    # Databases
    {"name": "SQL", "category": "Databases", "level": "Proficient"},
    {"name": "MongoDB", "category": "Databases", "level": "Advanced"},
    {"name": "SQLite", "category": "Databases", "level": "Proficient"},

    # Tools
    {"name": "Git", "category": "Tools", "level": "Advanced"},
    {"name": "GitHub", "category": "Tools", "level": "Advanced"},
    {"name": "VS Code", "category": "Tools", "level": "Advanced"},
    {"name": "Jupyter Notebook", "category": "Tools", "level": "Advanced"},
    {"name": "Google Colab", "category": "Tools", "level": "Advanced"},
    {"name": "Streamlit", "category": "Tools", "level": "Proficient"}
]

INITIAL_SERVICES = [
    {
        "title": "Machine Learning Development",
        "description": "Designing predictive models, data preprocessing pipelines, and custom machine learning algorithms.",
        "icon": "brain",
        "deliverables": ["Model selection & data analysis", "Pipeline training & evaluation"]
    },
    {
        "title": "Computer Vision Solutions",
        "description": "Building image classification, object detection, and visual inspection algorithms with OpenCV and deep learning.",
        "icon": "code",
        "deliverables": ["Image preprocessing & feature extraction", "Visual model deployment"]
    },
    {
        "title": "Generative AI Applications",
        "description": "Implementing LLM integration, prompt engineering workflows, and Retrieval-Augmented Generation (RAG).",
        "icon": "lightning",
        "deliverables": ["LLM application design", "RAG vector retrieval setup"]
    },
    {
        "title": "Full-Stack Development",
        "description": "Developing responsive web user interfaces and robust server applications using React.js, Node.js, and Express.",
        "icon": "server",
        "deliverables": ["Responsive React frontend", "Node/Express backend"]
    },
    {
        "title": "AI-Powered Web Applications",
        "description": "Seamlessly embedding machine learning endpoints and AI functionality into end-user web applications.",
        "icon": "brain",
        "deliverables": ["AI backend integration", "Real-time model inference UI"]
    },
    {
        "title": "API Development",
        "description": "Creating RESTful API endpoints for server-client communication and microservice integrations.",
        "icon": "server",
        "deliverables": ["REST API specifications", "FastAPI / Node endpoints"]
    }
]

async def seed_database():
    logger.info(f"Connecting to MongoDB database at: {settings.MONGODB_URI}")
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    db = client[settings.DB_NAME]

    # Seed Profile
    logger.info("Seeding profile collection...")
    await db["profile"].delete_many({})
    await db["profile"].insert_one(INITIAL_PROFILE)

    # Seed Education
    logger.info("Seeding education collection...")
    await db["education"].delete_many({})
    await db["education"].insert_many(INITIAL_EDUCATION)

    # Seed Certifications
    logger.info("Seeding certifications collection...")
    await db["certifications"].delete_many({})
    await db["certifications"].insert_many(INITIAL_CERTIFICATIONS)

    # Seed Experience
    logger.info("Seeding experience collection...")
    await db["experience"].delete_many({})
    await db["experience"].insert_many(INITIAL_EXPERIENCE)

    # Seed Skills
    logger.info("Seeding skills collection...")
    await db["skills"].delete_many({})
    await db["skills"].insert_many(INITIAL_SKILLS)

    # Seed Services
    logger.info("Seeding services collection...")
    await db["services"].delete_many({})
    await db["services"].insert_many(INITIAL_SERVICES)

    logger.info("✓ Phase 2 MongoDB database seeding completed successfully!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
