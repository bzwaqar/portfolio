import os
import glob
from PIL import Image

def convert_project_images():
    """
    Convert downloaded project images from project_Images folder to optimized WebP format
    and save in public/images/projects for Next.js frontend serving.
    """
    source_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "project_Images"))
    target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "projects"))

    os.makedirs(target_dir, exist_ok=True)

    print(f"Source Directory: {source_dir}")
    print(f"Target Directory: {target_dir}\n")

    image_extensions = ["**/*.jpg", "**/*.jpeg", "**/*.png"]
    image_paths = []
    for ext in image_extensions:
        image_paths.extend(glob.glob(os.path.join(source_dir, ext), recursive=True))

    print(f"Found {len(image_paths)} existing images in project_Images.\n")

    converted_count = 0

    for filepath in image_paths:
        filename = os.path.basename(filepath)
        name_part, ext = os.path.splitext(filename)

        # Normalize filename: spaces to hyphens, lowercase
        clean_name = name_part.strip().lower().replace(" ", "-")
        webp_filename = f"{clean_name}.webp"
        webp_filepath = os.path.join(target_dir, webp_filename)

        orig_size = os.path.getsize(filepath)

        try:
            with Image.open(filepath) as img:
                # Convert RGBA/P to RGB if saving to WebP
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # Save as WebP at 82 quality
                img.save(webp_filepath, "WEBP", quality=82, optimize=True)

            webp_size = os.path.getsize(webp_filepath)
            savings = ((orig_size - webp_size) / orig_size) * 100
            print(f"[OK] Converted: {filename} ({orig_size / 1024:.1f} KB) -> {webp_filename} ({webp_size / 1024:.1f} KB) [{savings:.1f}% saved]")
            converted_count += 1
        except Exception as e:
            print(f"[ERROR] Error converting {filename}: {e}")

    print(f"\n==========================================")
    print(f"SUCCESS: Converted {converted_count} images to WebP in {target_dir}")
    print(f"==========================================\n")

if __name__ == "__main__":
    convert_project_images()
