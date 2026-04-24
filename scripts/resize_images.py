#!/usr/bin/env python3
import os
from pathlib import Path
from PIL import Image

# Define target sizes (width, height)
TARGET_PORTRAIT = (600, 800)   # portrait orientation (width x height)
TARGET_LANDSCAPE = (621, 288)  # landscape size matching product display

PUBLIC_DIR = Path('/home/priyanka/Documents/inveh_website/public')

# Supported image extensions
EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}

def resize_image(img_path: Path):
    try:
        with Image.open(img_path) as im:
            w, h = im.size
            # Determine orientation
            if h >= w:  # portrait or square
                target = TARGET_PORTRAIT
            else:
                target = TARGET_LANDSCAPE
            # Preserve aspect ratio, fit within target dimensions
            im.thumbnail(target, Image.LANCZOS)
            # Save back, preserving original format
            im.save(img_path)
            print(f"Resized {img_path} to {im.size}")
    except Exception as e:
        print(f"Failed {img_path}: {e}")

def main():
    if not PUBLIC_DIR.is_dir():
        print(f"Public directory {PUBLIC_DIR} not found")
        return
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            p = Path(root) / file
            if p.suffix.lower() in EXTENSIONS:
                resize_image(p)

if __name__ == '__main__':
    main()
