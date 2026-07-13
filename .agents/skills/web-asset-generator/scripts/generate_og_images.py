import sys
import os
import argparse
from PIL import Image, ImageDraw, ImageFont

def generate_og_images(output_dir, image_path=None, text=None, bg_color="#1E3A27", text_color="white", validate=False):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    targets = {
        "og-image.png": (1200, 630),
        "twitter-image.png": (1200, 675),
        "og-square.png": (1200, 1200)
    }
    
    logo_img = None
    if image_path and os.path.exists(image_path):
        try:
            logo_img = Image.open(image_path)
        except Exception as e:
            print(f"Error opening image {image_path}: {e}")
            
    for filename, size in targets.items():
        out_path = os.path.join(output_dir, filename)
        
        # Create background canvas
        canvas = Image.new("RGBA", size, bg_color)
        draw = ImageDraw.Draw(canvas)
        
        # If we have a logo image and no text, just place logo centered and scaled
        if logo_img and not text:
            # Scale logo to fit 50% of canvas height/width
            logo_aspect = logo_img.width / logo_img.height
            max_h = int(size[1] * 0.5)
            max_w = int(size[0] * 0.5)
            
            if logo_aspect > 1: # wider
                logo_w = min(max_w, int(max_h * logo_aspect))
                logo_h = int(logo_w / logo_aspect)
            else: # taller
                logo_h = min(max_h, int(max_w / logo_aspect))
                logo_w = int(logo_h * logo_aspect)
                
            logo_resized = logo_img.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
            
            # Centered position
            pos_x = (size[0] - logo_w) // 2
            pos_y = (size[1] - logo_h) // 2
            
            if logo_resized.mode == 'RGBA':
                canvas.alpha_composite(logo_resized, (pos_x, pos_y))
            else:
                canvas.paste(logo_resized, (pos_x, pos_y))
            
        elif text:
            # Draw text
            text_pos_x = 100
            text_pos_y = size[1] // 2
            draw.text((text_pos_x, text_pos_y), text, fill=text_color)
            
            if logo_img:
                logo_resized = logo_img.resize((150, 150), Image.Resampling.LANCZOS)
                pos_x = size[0] - 250
                pos_y = size[1] // 2 - 75
                if logo_resized.mode == 'RGBA':
                    canvas.alpha_composite(logo_resized, (pos_x, pos_y))
                else:
                    canvas.paste(logo_resized, (pos_x, pos_y))
        else:
            pass
            
        final_canvas = canvas.convert("RGB")
        final_canvas.save(out_path, format="PNG")
        print(f"Generated {filename} ({size[0]}x{size[1]})")
        
    if validate:
        print("\nRunning validation checks...")
        all_passed = True
        for filename, size in targets.items():
            path = os.path.join(output_dir, filename)
            if os.path.exists(path) and os.path.getsize(path) > 0:
                print(f"  [OK] {filename} generated and verified ({os.path.getsize(path)} bytes)")
            else:
                print(f"  [FAIL] {filename} verification failed")
                all_passed = False
        if all_passed:
            print("All OG image validations passed!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate Open Graph images.")
    parser.add_argument("output_dir", help="Path to output directory")
    parser.add_argument("--image", help="Path to source image/logo")
    parser.add_argument("--text", help="Text/slogan to overlay")
    parser.add_argument("--bg-color", default="#1E3A27", help="Background color hex")
    parser.add_argument("--text-color", default="white", help="Text color hex")
    parser.add_argument("--validate", action="store_true", help="Validate output files")
    
    args = parser.parse_args()
    generate_og_images(args.output_dir, args.image, args.text, args.bg_color, args.text_color, args.validate)
