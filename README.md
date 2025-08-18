# Interactive Portfolio Terminal

An interactive web portfolio featuring a terminal-style interface with 3D model visualization, built with HTML, CSS, JavaScript, and Three.js.

## 🚀 Features

- **Interactive Terminal Interface**: Command-line style interaction with typing animations
- **3D Model Visualization**: Interactive 3D models using Three.js with GLB file support
- **Responsive Design**: Grid-based layout that adapts to different screen sizes
- **Splash Screen**: Animated startup sequence
- **Portfolio Information**: Personal details, education, and project showcase
- **Modern UI**: Cyberpunk-inspired design with green terminal aesthetics

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js (v0.129.0)
- **3D Models**: GLB format with GLTFLoader
- **Styling**: Custom CSS with Grid layout
- **Animations**: Custom typing animations and 3D model animations

## 📁 Project Structure

```
web/
├── index.html          # Main HTML file
├── style.css           # Custom styling
├── script.js           # Terminal logic and commands
├── model.js            # Three.js 3D visualization
├── model/              # 3D model assets
│   ├── code.glb       # Main 3D model
│   └── layla.glb      # Additional 3D model
└── README.md           # This file
```

## 🚀 Installation

1. Clone or download the project files
2. Ensure all files are in the same directory structure
3. Open `index.html` in a modern web browser
4. No build process or dependencies installation required

## 💻 Usage

### Terminal Commands

The portfolio features an interactive terminal with the following commands:

- `help` - Display available commands
- `welcome` - Show welcome message
- `about` - Personal information
- `education` - Educational background
- `projects` - Portfolio projects showcase
- `contact` - Contact information
- `clear` - Clear terminal screen

### 3D Model Interaction

- **Mouse Controls**: Click and drag to rotate the 3D model
- **Zoom**: Scroll to zoom in/out
- **Pan**: Right-click and drag to pan the view

## 🎨 Design Features

- **Color Scheme**: Black background with green (#0f0) accents
- **Typography**: Monospace font for terminal authenticity
- **Layout**: Grid-based responsive design
- **Animations**: Smooth typing effects and 3D model animations
- **Borders**: Subtle green borders for cyberpunk aesthetic

## 🔧 Customization

### Adding New Commands

To add new terminal commands, modify the `commands` object in `script.js`:

```javascript
const commands = {
  // ... existing commands
  newcommand: () => "Your new command response here"
};
```

### Changing 3D Models

Replace the GLB files in the `model/` directory and update the file path in `model.js`:

```javascript
loader.load(
  "model/your-new-model.glb", // Update this path
  // ... rest of the loader code
);
```

### Styling Modifications

Edit `style.css` to customize colors, layout, and visual elements.

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern browsers with WebGL support

## 📱 Responsive Design

The portfolio uses CSS Grid for responsive layout:
- Terminal and 3D model sections adapt to screen size
- Maintains aspect ratios across devices
- Optimized for desktop and tablet viewing

## 🎯 Project Showcase

The portfolio highlights several projects:
- **SaveBite**: Food management application (Laravel + React + Golang)
- **Management Freezer**: Freezer inventory system (React Native + Golang)
- **WebSocket Chat Anonymous**: Real-time anonymous chat (Golang + WebSocket)

## 👨‍💻 Developer

**Mahdi Jamaludin**
- Student at BINUS @ Malang
- Computer Science major
- Specializes in web development, Go backend, and AI experimentation

## 📄 License

© 2024 Mahdi Jamaludin. All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, please contact the developer directly.

---

*Built with ❤️ using modern web technologies*
