#!/usr/bin/env python3
"""
Script to embed GIF data into the standalone dancing goblin viewer
"""

import base64
from pathlib import Path

def embed_gif_data():
    """Embed the GIF data into the standalone script"""
    
    # Read the GIF file
    gif_path = Path('gobelino-chef.gif')
    if not gif_path.exists():
        print("Error: gobelino-chef.gif not found!")
        return False
    
    print(f"Reading GIF file: {gif_path}")
    with open(gif_path, 'rb') as f:
        gif_data = f.read()
    
    # Convert to base64
    print("Converting to base64...")
    gif_b64 = base64.b64encode(gif_data).decode()
    
    print(f"GIF data size: {len(gif_data)} bytes")
    print(f"Base64 data size: {len(gif_b64)} characters")
    
    # Read the standalone script
    script_path = Path('dancing_goblin_standalone.py')
    if not script_path.exists():
        print("Error: dancing_goblin_standalone.py not found!")
        return False
    
    print(f"Reading script: {script_path}")
    with open(script_path, 'r', encoding='utf-8') as f:
        script_content = f.read()
    
    # Replace the EMBEDDED_GIF_DATA placeholder
    print("Embedding GIF data...")
    new_content = script_content.replace(
        'EMBEDDED_GIF_DATA = None',
        f'EMBEDDED_GIF_DATA = "{gif_b64}"'
    )
    
    # Write the new script
    output_path = Path('dancing_goblin_embedded.py')
    print(f"Writing embedded script: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("GIF data successfully embedded!")
    print(f"Output file: {output_path}")
    print("You can now build the standalone executable with:")
    print(f"   python -m PyInstaller --onefile --windowed {output_path}")
    
    return True

if __name__ == "__main__":
    print("Embedding Dancing Goblin GIF Data...")
    success = embed_gif_data()
    if not success:
        input("Press Enter to exit...")