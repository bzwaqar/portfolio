# Waqar Khan Portfolio Backend API (FastAPI + MongoDB Atlas)

Clean, lightweight, asynchronous REST API powering Waqar Khan's portfolio website, built with **FastAPI**, **Motor (Async MongoDB Driver)**, and **Pydantic v2**.

---

## 📁 Project Architecture

```
backend/
├── app/
│   ├── main.py               # FastAPI entry point, CORS middleware & health check
│   ├── core/
│   │   └── config.py         # Environment configuration (MONGODB_URI, CORS settings)
│   ├── db/
│   │   └── mongodb.py        # Motor async MongoDB connection manager
│   ├── models/               # Pydantic schemas (Profile, Projects, Experience, Skills, Services, Blog, Contact)
│   └── routers/              # REST API endpoint routers for CRUD operations
├── .env.example              # Environment variable template
├── .env                      # Local environment configuration
├── requirements.txt          # Python package dependencies
├── seed_data.py              # Script to populate MongoDB Atlas with initial portfolio data
└── README.md                 # Project guide & API documentation
```

---

## 🛠️ Requirements & Prerequisites

- **Python 3.10+** installed
- **MongoDB Atlas** database cluster (or local MongoDB server instance)

---

## 🚀 Quickstart & Local Setup Guide

### Step 1: Create a Virtual Environment

Open your terminal in the `backend/` directory:

```bash
# Create virtual environment
python -m venv venv

# Activate on Windows (PowerShell)
.\venv\Scripts\Activate.ps1

# Activate on Linux/macOS
source venv/bin/activate
```

### Step 2: Install Package Dependencies

```bash
pip install -r requirements.txt
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env` and set your MongoDB Atlas connection string:

```bash
cp .env.example .env
```

Edit your `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/portfolio_db?retryWrites=true&w=majority
DB_NAME=portfolio_db
CORS_ORIGINS=http://localhost:3000
PORT=8000
HOST=0.0.0.0
```

### Step 4: Populate Initial Database Records (Seed Data)

Run the async database seed script:

```bash
python seed_data.py
```

### Step 5: Start the Development Server

Start FastAPI with hot reloading via Uvicorn:

```bash
uvicorn app.main:app --reload --port 8000
```

The server will be available at:
- **API Base URL**: `http://localhost:8000`
- **Interactive Swagger Documentation**: `http://localhost:8000/docs`
- **ReDoc API Documentation**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/health`

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check endpoint |
| `GET/PUT` | `/api/profile` | Retrieve or update developer profile |
| `GET/POST` | `/api/projects` | List all projects or create a new project |
| `GET/PUT/DELETE` | `/api/projects/{slug_or_id}` | Fetch, update, or delete project by slug or ID |
| `GET/POST` | `/api/experience` | List work history or add experience entry |
| `GET/PUT/DELETE` | `/api/experience/{id}` | Update or delete experience entry |
| `GET/POST` | `/api/skills` | List skills matrix or add skill |
| `GET/PUT/DELETE` | `/api/skills/{id}` | Update or delete skill entry |
| `GET/POST` | `/api/services` | List services offered or add service |
| `GET/PUT/DELETE` | `/api/services/{id}` | Update or delete service entry |
| `GET/POST` | `/api/blog` | List published blog posts or create post |
| `GET/PUT/DELETE` | `/api/blog/{slug_or_id}` | Fetch, update, or delete blog post |
| `POST` | `/contact` or `/api/contact` | Submit contact form message |
| `GET/DELETE` | `/api/contact` | List or delete contact form submissions |
