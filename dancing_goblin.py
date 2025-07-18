#!/usr/bin/env python3
"""
Dancing Goblin GIF Viewer
A simple executable that displays a dancing goblin GIF in a window
"""

import tkinter as tk
from PIL import Image, ImageTk
import sys
import os
from pathlib import Path

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
        
        # Make window stay on top (optional - can be annoying)
        # self.root.attributes('-topmost', True)
        
        # Add close button functionality
        self.root.protocol("WM_DELETE_WINDOW", self.on_closing)
        
    def find_gif_file(self):
        """Find the goblin GIF file in various locations"""
        possible_names = [
            'gobelino-chef.gif',
            'dancing_goblin.gif',
            'goblin.gif',
            'dancing_chef.gif',
            'chef_goblin.gif'
        ]
        
        possible_paths = [
            Path.cwd(),  # Current directory
            Path(__file__).parent,  # Script directory
            Path.cwd() / 'assets',  # Assets folder
            Path.cwd() / 'images',  # Images folder
        ]
        
        for path in possible_paths:
            for name in possible_names:
                gif_path = path / name
                if gif_path.exists():
                    return str(gif_path)
        
        return None
    
    def create_fallback_frames(self):
        """Create simple fallback animation if no GIF is found"""
        # Create a simple dancing goblin using text/symbols
        fallback_frames = [
            "🧌\n👨‍🍳\n🍴",
            "🧌\n👨‍🍳\n  🍴",
            "🧌\n👨‍🍳\n🍴  "
        ]
        
        for text in fallback_frames:
            # Create a simple image with text
            img = Image.new('RGB', (200, 200), 'black')
            # Note: This is a simplified fallback - you'd need PIL font support for text
            frame = ImageTk.PhotoImage(img)
            self.frames.append(frame)
    
    def load_gif(self):
        """Load the dancing goblin GIF"""
        gif_path = self.find_gif_file()
        
        if gif_path and os.path.exists(gif_path):
            try:
                # Load the GIF file
                self.gif = Image.open(gif_path)
                
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
                
                print(f"Loaded {len(self.frames)} frames from {gif_path}")
                
            except Exception as e:
                print(f"Error loading GIF: {e}")
                self.create_error_message("Could not load GIF file")
                return
        else:
            print("No GIF file found - creating fallback")
            self.create_error_message("Dancing Goblin GIF not found!\n\nPlace your GIF file as:\n'dancing_goblin.gif'\nin the same folder as this program")
            return
        
        if not self.frames:
            self.create_error_message("No frames loaded")
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
    print("Starting Dancing Goblin Viewer...")
    
    try:
        app = DancingGoblinViewer()
        app.run()
    except Exception as e:
        print(f"Error starting application: {e}")
        input("Press Enter to exit...")

if __name__ == "__main__":
    main()