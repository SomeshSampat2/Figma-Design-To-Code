# 🎨 Figma to Code - AI-Powered Code Generation Plugin

Convert your Figma designs into production-ready code using AI! This plugin leverages Google's Gemini API to generate code in multiple formats including Jetpack Compose, XML, SwiftUI, React Native, Flutter, and HTML/CSS.

**✨ No Setup Required for Users - Just Install and Use! ✨**

## ✨ Features

- **Zero Configuration for Users**: No API keys or setup required - just install and start converting!
- **Multiple Output Formats**: Support for 6 different code formats
  - 🤖 Jetpack Compose (Android)
  - 📄 Android XML
  - 🍎 SwiftUI (iOS)
  - ⚛️ React Native
  - 🐦 Flutter/Dart
  - 🌐 HTML/CSS

- **AI-Powered Generation**: Uses Google Gemini API for intelligent code generation
- **Beautiful UI**: Modern, responsive interface that matches Figma's design system
- **Smart Component Analysis**: Extracts design properties, colors, typography, and layout information
- **One-Click Copy**: Easy code copying with visual feedback
- **Real-time Selection**: Automatically detects component selection changes

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Figma Desktop App
- Google Gemini API Key

### Quick Start
1. **Clone the repository**
   ```bash
   git clone https://github.com/SomeshSampat2/Figma-Design-To-Code.git
   cd Figma-Design-To-Code
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup API Key (Secure)**
   ```bash
   npm run setup
   # Edit the .env file with your actual Gemini API key
   ```

4. **Build the plugin**
   ```bash
   npm run build
   ```

5. **Install in Figma**
   - Open Figma Desktop App
   - Go to Plugins → Development → Import plugin from manifest
   - Select the `manifest.json` file from this project
   - Run the plugin!

### 🔒 Security Features
- **No hardcoded API keys** - Uses environment variables only
- **Automatic cleanup** - Build process restores placeholders after injection
- **Clean script** - `npm run clean` removes any injected keys from source code
- **Git-safe** - Only placeholders are committed to repository

## 🚀 Quick Setup for Developers

### 1. Clone and Install Dependencies

```bash
git clone [your-repo-url]
cd Figma-To-Code
npm install
```

### 2. Configure API Key

```bash
# Create .env file from template
npm run setup

# Edit .env file and add your Gemini API key
# Replace YOUR_GEMINI_API_KEY_HERE with your actual API key
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Build the Plugin

```bash
npm run build
```

### 4. Install in Figma

1. Open Figma Desktop App
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Navigate to this project folder and select `manifest.json`
4. The plugin is now ready to use!

## 📖 How to Use (For End Users)

### 1. Launch the Plugin

1. Open your Figma file
2. Go to `Plugins` → `Development` → `Figma-To-Code` (or search for it in the plugin menu)
3. The plugin UI will open in a side panel

### 2. Convert Your Design

1. **Select a Component**: Click on any frame, component, or element in your Figma design
2. **Choose Output Format**: Select your desired code format from the 6 available options
3. **Generate Code**: Click the "Generate Code" button
4. **Copy and Use**: The AI-generated code will appear in the output panel. Click "Copy" to copy it to your clipboard

That's it! No API keys, no configuration for users - just design to code in seconds! 🚀

## 🛠️ Development Scripts

```bash
# Setup environment file
npm run setup

# Build the plugin
npm run build

# Build and get ready for development
npm run dev

# Watch for changes (auto-rebuild)
npm run watch

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## 🔧 Project Structure

```
Figma-To-Code/
├── manifest.json      # Plugin configuration
├── code.ts           # Main plugin logic (TypeScript)
├── code.js           # Compiled JavaScript (generated)
├── ui.html           # Plugin user interface
├── build-config.js   # Build script for environment variables
├── config.js         # Generated config file (ignored by git)
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── env.example       # Environment variables template
├── .env              # Your API key (created by npm run setup)
└── .gitignore        # Git ignore rules
```

## 🔐 Environment Variables

The plugin uses environment variables for secure API key management:

- **`.env`**: Contains your actual API key (never committed to git)
- **`env.example`**: Template showing required environment variables
- **`config.js`**: Auto-generated during build (contains the API key for the plugin)

### Setting up your API Key:

1. **Run setup command**:
   ```bash
   npm run setup
   ```

2. **Edit the .env file**:
   ```bash
   # .env file content
   GEMINI_API_KEY=your-actual-api-key-here
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```

The build process will:
- Read your API key from `.env`
- Generate `config.js` with the API key
- Compile TypeScript to JavaScript
- Make the plugin ready for Figma

## 🎯 Code Generation Process

1. **Component Analysis**: The plugin extracts comprehensive data from selected components:
   - Dimensions and positioning
   - Colors and fills
   - Typography properties
   - Border radius and strokes
   - Nested children structure

2. **Prompt Engineering**: Creates detailed prompts for the AI that include:
   - Component specifications
   - Framework-specific requirements
   - Best practices guidelines
   - Responsive design considerations

3. **AI Generation**: Sends prompts to Gemini API with optimized parameters:
   - Temperature: 0.3 (balanced creativity/consistency)
   - Max tokens: 2048
   - Top-p: 0.95 for diverse outputs

4. **Code Output**: Returns clean, production-ready code with:
   - Proper styling that matches the design
   - Framework-specific best practices
   - Commented explanations
   - Responsive/adaptive layouts where applicable

## 🔧 Customization

### Adding New Output Formats

To add support for new frameworks:

1. Add a new format button in `ui.html`:
   ```html
   <div class="format-button" data-format="your-framework">
     <div class="format-icon">🎯</div>
     <div>Your Framework</div>
   </div>
   ```

2. Update the `formatInstructions` object in the `createPrompt` function:
   ```javascript
   'your-framework': 'Generate code for Your Framework. Use specific guidelines...'
   ```

### Modifying AI Behavior

Adjust the Gemini API parameters in the `callGeminiAPI` function:

```javascript
generationConfig: {
  temperature: 0.3,    // Creativity level (0-1)
  topK: 40,           // Top-k sampling
  topP: 0.95,         // Top-p sampling
  maxOutputTokens: 2048, // Maximum response length
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Build and test the plugin (`npm run build`)
5. Submit a pull request

## 🆘 Troubleshooting

### For Developers

**"GEMINI_API_KEY not found" Error**:
```bash
# Run the setup command
npm run setup

# Edit the .env file with your API key
# Then rebuild
npm run build
```

**Build Errors**:
```bash
# Reinstall dependencies
npm install

# Make sure .env file exists and has your API key
# Then build again
npm run build
```

### For End Users

**"API key not configured" Error**:
- Contact the plugin developer to set up their API key
- The developer needs to run `npm run setup` and configure their `.env` file

**Plugin Not Loading**:
- Make sure the plugin was built properly (`npm run build`)
- Check that `manifest.json` and `code.js` exist in the project folder

## 💡 Security Notes

- **Environment Variables**: API keys are stored in `.env` files (not committed to git)
- **Build Process**: Keys are injected into the plugin during build time
- **Client-Side**: The final plugin contains the API key (visible to users)
- **Production**: Consider using a backend proxy for production deployments

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🚀**
