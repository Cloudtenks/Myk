# 🧌 Dancing Goblin Executable Builder

## Prerequisites

1. **Install Python** (if not already installed):
   - Download from https://python.org
   - Make sure to check "Add Python to PATH" during installation

2. **Install Required Packages**:
   ```bash
   pip install -r requirements.txt
   ```
   
   Or install individually:
   ```bash
   pip install Pillow pyinstaller
   ```

## Setting Up Your GIF

1. **Save your dancing goblin GIF** as one of these names in the same folder:
   - `dancing_goblin.gif` (recommended)
   - `goblin.gif`
   - `dancing_chef.gif`
   - `chef_goblin.gif`

2. **Test the script first**:
   ```bash
   python dancing_goblin.py
   ```

## Building the Executable

### Option 1: Simple Executable (Recommended)
```bash
pyinstaller --onefile --windowed dancing_goblin.py
```

### Option 2: Include GIF in Executable
```bash
pyinstaller --onefile --windowed --add-data "dancing_goblin.gif;." dancing_goblin.py
```

### Option 3: Custom Icon (if you have a .ico file)
```bash
pyinstaller --onefile --windowed --icon=goblin.ico dancing_goblin.py
```

## After Building

1. **Find your executable**:
   - Look in the `dist/` folder
   - File will be named `dancing_goblin.exe` (Windows) or `dancing_goblin` (Mac/Linux)

2. **For distribution**:
   - Copy the `.exe` file and your GIF file together
   - Or use Option 2 above to embed the GIF in the executable

## Troubleshooting

### "No module named PIL"
```bash
pip install Pillow
```

### "GIF not found" error
- Make sure your GIF file is in the same folder as the executable
- Check the filename matches one of the expected names

### Executable too large
- Use `--exclude-module` to remove unused modules:
```bash
pyinstaller --onefile --windowed --exclude-module matplotlib dancing_goblin.py
```

### Antivirus blocking
- Some antivirus programs flag PyInstaller executables as suspicious
- You may need to add an exception or use code signing

## Customization Options

Edit `dancing_goblin.py` to customize:
- **Animation speed**: Change the `200` in `self.root.after(200, self.animate)`
- **Window size**: Modify `width` and `height` in `setup_window()`
- **Window behavior**: Uncomment `self.root.attributes('-topmost', True)` to make it stay on top
- **Window title**: Change the title in `self.root.title()`

## Fun Pranking Tips 😈

1. **Rename the executable** to something innocent like `important_document.exe`
2. **Add to startup folder** (Windows):
   - Press `Win + R`, type `shell:startup`, press Enter
   - Copy your executable there
3. **Use Task Scheduler** to run at specific times
4. **Create desktop shortcut** with a different icon

Remember: Only use this for harmless fun with friends who will appreciate the joke! 🧌👨‍🍳