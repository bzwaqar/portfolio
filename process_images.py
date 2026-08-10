import os
import glob
from PIL import Image
from pymongo import MongoClient
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_best_match(img_name, projects):
    # Try exact match first
    img_slug = slugify(img_name.replace('.jpg', '').replace('.png', '').replace('.jpeg', ''))
    
    for p in projects:
        if p.get('slug') == img_slug:
            return p
            
    # Substring matches
    for p in projects:
        slug = p.get('slug', '')
        if slug and (img_slug in slug or slug in img_slug):
            return p
            
    # Specific known mappings based on words
    keywords_to_slugs = {
        'fifa': 'fifa-match-predictor-ai',
        'facial': 'facial_recognition_attendance',
        'breast_cancer': 'breast_cancer_prediction',
        'credit': 'credit-card-fraud-detection',
        'artwork': 'ai-artwork-retrieval',
        'amazon': 'amazon-review-intelligence',
        'ocr': 'ocr-vision-pipeline',
        'social': 'social-media-engagement-clustering-application',
        'tech': 'ai-tech-stack-recommender',
        'document fraud': 'supportdesk', # example fallback
    }
    
    for kw, slug in keywords_to_slugs.items():
        if kw in img_name.lower():
            for p in projects:
                if p.get('slug') == slug:
                    return p
                    
    return None

def process_images():
    print("Connecting to MongoDB...")
    client = MongoClient("mongodb+srv://bbzzwaqar47_db_user:V2QSTtv9UQy96APC@cluster0.5rmqglq.mongodb.net/")
    db = client.get_database("My_portfolio_data")
    projects_col = db.get_collection("projects")

    out_dir = os.path.abspath("public/images/projects")
    os.makedirs(out_dir, exist_ok=True)

    projects = list(projects_col.find({}))
    
    image_dir = os.path.abspath("project_Images/Projects")
    images = glob.glob(os.path.join(image_dir, "*.*"))

    for img_path in images:
        filename = os.path.basename(img_path)
        name, ext = os.path.splitext(filename)
        
        if ext.lower() not in ['.jpg', '.jpeg', '.png']:
            continue

        webp_filename = f"{name}.webp"
        webp_path = os.path.join(out_dir, webp_filename)
        
        if not os.path.exists(webp_path):
            with Image.open(img_path) as im:
                im.save(webp_path, "webp")
            print(f"Converted {filename} to {webp_filename}")
        else:
            print(f"{webp_filename} already exists, skipping conversion.")

        matched_project = get_best_match(name, projects)
        if matched_project:
            alt_text = f"{matched_project.get('title', name)} project preview"
            image_obj = {
                "url": f"/images/projects/{webp_filename}",
                "alt": alt_text
            }
            projects_col.update_one(
                {"_id": matched_project["_id"]},
                {"$set": {"image": image_obj}}
            )
            print(f"Matched {webp_filename} -> {matched_project['slug']}")
        else:
            print(f"Could not match {webp_filename} to any project.")
            
    print("Done processing images.")

if __name__ == "__main__":
    process_images()
