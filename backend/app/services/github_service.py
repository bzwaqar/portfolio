import logging
import base64
from typing import List, Dict, Any, Optional
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

GITHUB_API_BASE = "https://api.github.com"

def format_title_from_name(name: str) -> str:
    """Format repository slug/name into a human-readable title (e.g. 'ai-model-runner' -> 'Ai Model Runner')."""
    return name.replace("-", " ").replace("_", " ").title()

async def fetch_github_repo_readme(username: str, repo_name: str, headers: Dict[str, str]) -> str:
    """
    Fetch raw README markdown content for a specific repository.
    """
    url = f"{GITHUB_API_BASE}/repos/{username}/{repo_name}/readme"
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            response = await client.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            # If content is base64 encoded by GitHub API
            if data.get("encoding") == "base64" and data.get("content"):
                decoded_bytes = base64.b64decode(data["content"])
                return decoded_bytes.decode("utf-8", errors="ignore")
            elif "download_url" in data:
                # Fetch raw file content from download_url
                raw_resp = await client.get(data["download_url"])
                if raw_resp.status_code == 200:
                    return raw_resp.text
        return ""
    except Exception as e:
        logger.warning(f"Could not fetch README for {username}/{repo_name}: {e}")
        return ""

async def fetch_github_user_repos(username: Optional[str] = None) -> List[Dict[str, Any]]:
    """
    Fetch public repositories for a GitHub user and enrich with README content.
    Student Note:
    Asynchronously queries GitHub's REST API using `httpx`.
    Sets sensible defaults: featured=False, published=False, images=[], demo_url="".
    """
    target_username = username or settings.GITHUB_USERNAME
    url = f"{GITHUB_API_BASE}/users/{target_username}/repos?sort=updated&per_page=100"

    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "FastAPI-Portfolio-App"
    }

    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"token {settings.GITHUB_TOKEN}"

    logger.info(f"Fetching GitHub repositories for user: '{target_username}'...")

    try:
        async with httpx.AsyncClient(timeout=12.0) as client:
            response = await client.get(url, headers=headers)

        if response.status_code != 200:
            logger.error(f"GitHub API error {response.status_code}: {response.text}")
            return []

        raw_repos = response.json()
        normalized_projects = []

        for repo in raw_repos:
            repo_name = repo.get("name", "")
            if not repo_name:
                continue

            # Fetch README content for repository
            readme_text = await fetch_github_repo_readme(target_username, repo_name, headers)
            
            primary_lang = repo.get("language")
            languages_list = [primary_lang] if primary_lang else []

            # Normalize project dictionary matching MongoDB Project model
            project_doc = {
                "github_id": repo.get("id"),
                "name": repo_name,
                "title": format_title_from_name(repo_name),
                "slug": repo_name.lower(),
                "short_description": repo.get("description") or "GitHub repository project.",
                "description": repo.get("description") or "GitHub repository project.",
                "readme_content": readme_text,
                "github_url": repo.get("html_url", f"https://github.com/{target_username}/{repo_name}"),
                "demo_url": "",
                "languages": languages_list,
                "topics": repo.get("topics", []),
                "stars": repo.get("stargazers_count", 0),
                "forks": repo.get("forks_count", 0),
                "created_at": repo.get("created_at", ""),
                "updated_at": repo.get("updated_at", ""),
                "featured": False,
                "published": False,
                "images": []
            }

            normalized_projects.append(project_doc)

        logger.info(f"Successfully processed {len(normalized_projects)} repositories for '{target_username}'.")
        return normalized_projects

    except Exception as e:
        logger.error(f"Failed to fetch repositories from GitHub API: {e}")
        return []
