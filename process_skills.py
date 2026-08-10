import os
import glob
from PIL import Image
from pymongo import MongoClient
import re

def process_skills():
    print("Processing Skills...")
    in_dir = os.path.abspath("project_Images/Skills")
    out_dir = os.path.abspath("public/images/skills")
    os.makedirs(out_dir, exist_ok=True)
    
    images = glob.glob(os.path.join(in_dir, "*.*"))
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
            print(f"Converted skill {filename} to {webp_filename}")
        else:
            print(f"{webp_filename} already exists.")

if __name__ == "__main__":
    process_skills()
