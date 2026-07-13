import sys
import os
import argparse
from PIL import Image

def generate_favicons(source_path, output_dir, validate=False):
    if not os.path.exists(source_path):
        print(f"Error: Source image not found: {source_path}")
        sys.exit(1)
        
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    try:
        img = Image.open(source_path)
    except Exception as e:
        print(f"Error opening image {source_path}: {e}")
        sys.exit(1)
        
    # Sizes definition
    sizes = {
        "favicon-16x16.png": (16, 16),
        "favicon-32x32.png": (32, 32),
        "favicon-96x96.png": (96, 96),
        "apple-touch-icon.png": (180, 180),
        "android-chrome-192x192.png": (192, 192),
        "android-chrome-512x512.png": (512, 512)
    }
    
    for filename, size in sizes.items():
        out_path = os.path.join(output_dir, filename)
        resized_img = img.resize(size, Image.Resampling.LANCZOS)
        resized_img.save(out_path, format="PNG")
        print(f"Generated {filename} ({size[0]}x{size[1]})")
        
    # Generate favicon.ico (containing 16x16, 32x32, 48x48)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = []
    for size in ico_sizes:
        ico_images.append(img.resize(size, Image.Resampling.LANCZOS))
        
    ico_path = os.path.join(output_dir, "favicon.ico")
    ico_images[0].save(ico_path, format="ICO", sizes=ico_sizes, append_images=ico_images[1:])
    print("Generated favicon.ico (multi-resolution)")
    
    if validate:
        print("\nRunning validation checks...")
        all_passed = True
        for filename in list(sizes.keys()) + ["favicon.ico"]:
            path = os.path.join(output_dir, filename)
            if os.path.exists(path) and os.path.getsize(path) > 0:
                print(f"  [OK] {filename} generated and verified ({os.path.getsize(path)} bytes)")
            else:
                print(f"  [FAIL] {filename} verification failed")
                all_passed = False
        if all_passed:
            print("All favicon validations passed!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate favicons and app icons.")
    parser.add_argument("source_image", help="Path to source image")
    parser.add_argument("output_dir", help="Path to output directory")
    parser.add_argument("icon_type", nargs="?", default="all", help="Type of icons ('favicon', 'app', or 'all')")
    parser.add_argument("--validate", action="store_true", help="Validate output files")
    
    args = parser.parse_args()
    generate_favicons(args.source_image, args.output_dir, args.validate)
