#!/usr/bin/env python3
"""
Standalone Dancing Goblin GIF Viewer
A completely self-contained executable with embedded GIF data
"""

import tkinter as tk
from PIL import Image, ImageTk
import sys
import os
import base64
import io
from pathlib import Path

# Base64 encoded GIF data - we'll inject this after creation
EMBEDDED_GIF_DATA = None

def get_embedded_gif_data():
    """Get the base64 encoded GIF data"""
    # Read the GIF file and convert to base64
    gif_path = Path(__file__).parent / 'gobelino-chef.gif'
    if gif_path.exists():
        with open(gif_path, 'rb') as f:
            gif_data = f.read()
        return base64.b64encode(gif_data).decode()
    return None

class DancingGoblinViewer:
    def __init__(self):
        self.root = tk.Tk()
        self.setup_window()
        self.frames = []
        self.current_frame = 0
        self.load_gif()
        
    def setup_window(self):
        """Configure the main window"""
        self.root.title("Dancing Goblin Chef")
        self.root.configure(bg='black')
        self.root.resizable(False, False)
        
        # Center the window on screen
        self.root.update_idletasks()
        width = 400
        height = 400
        x = (self.root.winfo_screenwidth() // 2) - (width // 2)
        y = (self.root.winfo_screenheight() // 2) - (height // 2)
        self.root.geometry(f'{width}x{height}+{x}+{y}')
        
        # Add close button functionality
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        
    def load_gif(self):
        """Load the dancing goblin GIF from embedded data"""
        try:
            # Get embedded GIF data
            gif_data_b64 = EMBEDDED_GIF_DATA or get_embedded_gif_data()
            
            if not gif_data_b64:
                self.create_error_message("No GIF data found!")
                return
            
            # Decode base64 to bytes
            gif_bytes = base64.b64decode(gif_data_b64)
            
            # Create PIL Image from bytes
            gif_io = io.BytesIO(gif_bytes)
            self.gif = Image.open(gif_io)
            
            # Extract all frames
            frame_count = 0
            try:
                while True:
                    # Copy current frame and convert to PhotoImage
                    frame = self.gif.copy()
                    # Resize if needed (maintain aspect ratio)
                    frame = self.resize_frame(frame)
                    photo_frame = ImageTk.PhotoImage(frame)
                    self.frames.append(photo_frame)
                    
                    frame_count += 1
                    self.gif.seek(frame_count)
                    
            except EOFError:
                # End of frames reached
                pass
            
            print(f"Loaded {len(self.frames)} frames from embedded GIF data")
            
        except Exception as e:
            print(f"Error loading embedded GIF: {e}")
            self.create_error_message(f"Could not load embedded GIF data:\n{str(e)}")
            return
        
        if not self.frames:
            self.create_error_message("No frames loaded from embedded data")
            return
            
        # Create label to display the animation
        self.label = tk.Label(self.root, bg='black', bd=0)
        self.label.pack(expand=True)
        
        # Start animation
        self.animate()
    
    def resize_frame(self, frame, max_size=(350, 350)):
        """Resize frame to fit window while maintaining aspect ratio"""
        frame.thumbnail(max_size, Image.Resampling.LANCZOS)
        return frame
    
    def create_error_message(self, message):
        """Create an error message display"""
        error_label = tk.Label(
            self.root, 
            text=message,
            fg='white',
            bg='black',
            font=('Arial', 12),
            justify=tk.CENTER
        )
        error_label.pack(expand=True)
        
        # Add instruction to close
        close_label = tk.Label(
            self.root,
            text="\nPress ESC or close window to exit",
            fg='gray',
            bg='black',
            font=('Arial', 10)
        )
        close_label.pack()
        
        # Bind ESC key to close
        self.root.bind('<Escape>', lambda e: self.root.quit())
        self.root.focus_set()
    
    def animate(self):
        """Animate the goblin frames"""
        if not self.frames:
            return
            
        # Display current frame
        self.label.configure(image=self.frames[self.current_frame])
        
        # Move to next frame
        self.current_frame = (self.current_frame + 1) % len(self.frames)
        
        # Schedule next frame (adjust delay as needed - lower = faster)
        self.root.after(200, self.animate)  # 200ms delay = 5 FPS
    
    def on_closing(self):
        """Handle window close event"""
        self.root.quit()
        self.root.destroy()
    
    def run(self):
        """Start the application"""
        print("Dancing Goblin Chef is dancing!")
        print("Close the window or press ESC to stop the dance.")
        
        # Bind ESC key to close (if frames loaded successfully)
        if hasattr(self, 'label'):
            self.root.bind('<Escape>', lambda e: self.on_closing())
            self.root.focus_set()
        
        try:
            self.root.mainloop()
        except KeyboardInterrupt:
            print("\nDance interrupted!")
        finally:
            print("Thanks for watching the goblin dance!")

def main():
    """Main function"""
    print("Starting Standalone Dancing Goblin Viewer...")
    
    try:
        app = DancingGoblinViewer()
        app.run()
    except Exception as e:
        print(f"Error starting application: {e}")
        input("Press Enter to exit...")

if __name__ == "__main__":
    main()