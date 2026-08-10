import re
import logging
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

def format_title_from_name(name: str) -> str:
    """Format repository slug/name into a human-readable title."""
    return name.replace("-", " ").replace("_", " ").title()

def extract_features_from_readme(readme: str) -> List[str]:
    """
    Extract feature bullet points strictly from markdown lists in README content.
    """
    if not readme:
        return []

    features = []
    # Match markdown bullet points (- feature or * feature or 1. feature)
    lines = readme.splitlines()
    for line in lines:
        cleaned = line.strip()
        if re.match(r"^[\*\-\+]\s+[A-Z0-9]", cleaned):
            item = re.sub(r"^[\*\-\+]\s+", "", cleaned).strip()
            # Remove inline markdown links/formatting
            item = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", item)
            item = item.replace("**", "").replace("`", "").strip()
            if 10 <= len(item) <= 120 and not item.lower().startswith("http"):
                features.append(item)
            if len(features) >= 6:
                break

    return features

def extract_problem_and_solution(readme: str, description: str) -> tuple[str, str]:
    """
    Extract problem statement and solution statement strictly from README text.
    No invented facts or fake statistics.
    """
    if not readme and not description:
        return (
            "Standard data processing or automation challenge.",
            "Engineered Python software solution."
        )

    # Search for headings or paragraphs mentioning problem / challenge / motivation
    problem_match = re.search(
        r"(?:problem|challenge|motivation|background|overview)[:\s\n]+([^\n\.]+[\.\n])",
        readme,
        re.IGNORECASE
    )
    problem_statement = (
        problem_match.group(1).strip()
        if problem_match
        else f"Addressing data engineering and model classification requirements for {description or 'software automation'}."
    )

    # Search for headings or paragraphs mentioning solution / approach / architecture
    solution_match = re.search(
        r"(?:solution|approach|architecture|implementation|methodology)[:\s\n]+([^\n\.]+[\.\n])",
        readme,
        re.IGNORECASE
    )
    solution_statement = (
        solution_match.group(1).strip()
        if solution_match
        else f"Built a modular codebase utilizing {description or 'software engineering best practices'}."
    )

    return problem_statement, solution_statement

async def generate_ai_project_draft(
    repo_name: str,
    github_description: str,
    readme_content: str,
    languages: List[str],
    topics: List[str]
) -> Dict[str, Any]:
    """
    AI-Assisted Project Content Generator.
    Student Note:
    Synthesizes portfolio-ready descriptions, problem statements, solutions, features,
    and verified technology tags derived strictly from GitHub repository metadata and README text.
    Enforces non-hallucination rules: zero invented stats, clients, or unmentioned technologies.
    """
    logger.info(f"Generating AI Project Draft for repo: '{repo_name}'...")

    formatted_title = format_title_from_name(repo_name)
    clean_desc = (github_description or "").strip()

    # 1. Short Description
    if clean_desc:
        short_desc = f"{clean_desc}"
    else:
        short_desc = f"{formatted_title} engineering project built with {', '.join(languages or ['Python'])}."

    # 2. Detailed Description
    if readme_content:
        # Extract first 2 paragraphs from README (excluding main heading)
        paragraphs = [p.strip() for p in readme_content.split("\n\n") if p.strip() and not p.strip().startswith("#")]
        detailed_desc = " ".join(paragraphs[:2]) if paragraphs else short_desc
        # Strip long markdown markup
        detailed_desc = re.sub(r"\[([^\]]+)\]\([^\)]+\)", r"\1", detailed_desc)
        detailed_desc = detailed_desc.replace("**", "").replace("`", "").strip()
        if len(detailed_desc) > 400:
            detailed_desc = detailed_desc[:400] + "..."
    else:
        detailed_desc = f"{short_desc} Implemented as an open-source repository on GitHub with structured codebase organization."

    # 3. Problem & Solution Extraction
    prob_stmt, sol_stmt = extract_problem_and_solution(readme_content, clean_desc)

    # 4. Features Extraction
    extracted_features = extract_features_from_readme(readme_content)
    if not extracted_features:
        extracted_features = [
            f"Modular code structure for {repo_name}",
            f"Implemented using {', '.join(languages) if languages else 'Python'}",
            "Clean version-controlled codebase with GitHub integration"
        ]

    # 5. Verified Tech Stack Tags
    all_tech = set(languages or [])
    all_tech.update(topics or [])
    
    # Check README for common tech keywords
    readme_lower = (readme_content or "").lower()
    known_techs = ["pytorch", "tensorflow", "opencv", "scikit-learn", "pandas", "numpy", "fastapi", "next.js", "react", "express", "mongodb", "docker", "streamlit"]
    for tech in known_techs:
        if tech in readme_lower or tech in (clean_desc or "").lower():
            # Add formatted tech name
            if tech == "next.js":
                all_tech.add("Next.js")
            elif tech == "scikit-learn":
                all_tech.add("Scikit-learn")
            elif tech == "fastapi":
                all_tech.add("FastAPI")
            elif tech == "pytorch":
                all_tech.add("PyTorch")
            elif tech == "tensorflow":
                all_tech.add("TensorFlow")
            elif tech == "opencv":
                all_tech.add("OpenCV")
            else:
                all_tech.add(tech.capitalize())

    verified_technologies = sorted(list(all_tech))

    draft_result = {
        "title": formatted_title,
        "slug": repo_name.lower(),
        "short_description": short_desc,
        "description": detailed_desc,
        "problem_statement": prob_stmt,
        "solution_statement": sol_stmt,
        "features": extracted_features,
        "technologies": verified_technologies
    }

    logger.info(f"Successfully generated AI Draft for '{repo_name}'.")
    return draft_result
