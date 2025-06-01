# 📖 Figma to Code - Usage Guide

This guide will walk you through using the Figma to Code plugin to convert your designs into code.

## 🚀 Quick Start

### Step 1: Install the Plugin
1. Open Figma Desktop
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Select the `manifest.json` file from this project
4. The plugin is now available in your Figma

### Step 2: Use the Plugin - No Setup Required!
1. Open any Figma file with components
2. Run the plugin: `Plugins` → `Development` → `Figma-To-Code`
3. Select a component in Figma
4. Choose your target framework
5. Click "Generate Code"
6. Copy and use the generated code!

**That's it! No API keys, no configuration needed! 🎉**

## 💡 Examples

### Example 1: Converting a Button Component

**Figma Component:**
- Rectangle with rounded corners
- Text label "Click Me"
- Blue background (#007AFF)
- White text color
- 16px corner radius

**Generated Jetpack Compose:**
```kotlin
@Composable
fun ClickMeButton() {
    Button(
        onClick = { /* TODO: Add click handler */ },
        modifier = Modifier
            .fillMaxWidth()
            .height(48.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color(0xFF007AFF)
        ),
        shape = RoundedCornerShape(16.dp)
    ) {
        Text(
            text = "Click Me",
            color = Color.White,
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium
        )
    }
}
```

### Example 2: Converting a Card Layout

**Figma Component:**
- Frame with multiple text elements
- Image placeholder
- Padding and spacing
- Shadow effect

**Generated SwiftUI:**
```swift
struct ContentCard: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Rectangle()
                .fill(Color.gray.opacity(0.3))
                .frame(height: 200)
                .cornerRadius(8)
            
            VStack(alignment: .leading, spacing: 8) {
                Text("Card Title")
                    .font(.headline)
                    .fontWeight(.semibold)
                
                Text("Card description goes here...")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .lineLimit(3)
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 16)
        }
        .background(Color.white)
        .cornerRadius(12)
        .shadow(radius: 4)
    }
}
```

## 🎯 Best Practices

### 1. Component Organization
- **Use descriptive names** for your Figma components
- **Group related elements** in frames
- **Maintain consistent spacing** between elements
- **Use proper text styles** and colors

### 2. Design Guidelines
- **Create reusable components** in Figma
- **Use consistent color styles** throughout your design
- **Apply proper constraints** for responsive behavior
- **Include all visual states** (default, hover, pressed, etc.)

### 3. Code Generation Tips
- **Start with simple components** to understand the output
- **Review generated code** for accuracy and best practices
- **Test generated code** in your development environment
- **Use semantic component names** for better AI understanding

## 🔧 Advanced Usage

### Custom Framework Support

Developers can add support for new frameworks by modifying the plugin:

1. **Add Format Button** in `ui.html`:
```html
<div class="format-button" data-format="vue">
  <div class="format-icon">🟢</div>
  <div>Vue.js</div>
</div>
```

2. **Update Format Instructions**:
```javascript
'vue': 'Generate Vue.js single file component with proper template, script, and style sections...'
```

### Prompt Customization

Developers can modify the prompt generation in `ui.html` to include:
- Specific design system requirements
- Accessibility considerations
- Performance optimizations
- Framework-specific patterns

```javascript
function createPrompt(nodeData, format) {
  return `Convert this Figma component to ${format}.
  
  Design System Requirements:
  - Use Material Design 3 principles
  - Include accessibility attributes
  - Optimize for performance
  - Follow ${format} best practices
  
  Component Data: ${JSON.stringify(nodeData)}`;
}
```

## 🎨 Supported Design Elements

### Typography
- ✅ Font families and weights
- ✅ Font sizes and line heights
- ✅ Text colors and alignment
- ✅ Text decorations (bold, italic)

### Layout
- ✅ Positioning (absolute, relative)
- ✅ Dimensions (width, height)
- ✅ Padding and margins
- ✅ Flexbox and Grid layouts

### Styling
- ✅ Background colors and gradients
- ✅ Border radius and borders
- ✅ Shadows and effects
- ✅ Opacity and blending

### Components
- ✅ Buttons and interactive elements
- ✅ Cards and containers
- ✅ Lists and grids
- ✅ Navigation elements

## 🚨 Troubleshooting

### Common Issues

**"No selection" error:**
- Make sure you've clicked on a component in Figma
- Try selecting a frame or group instead of individual elements

**"API key not configured" error:**
- This means the plugin developer hasn't set up their API key yet
- Contact the plugin provider for assistance

**Poor code quality:**
- Try simpler components first
- Use consistent naming in Figma
- Provide clear component structure

**Plugin not responding:**
- Check that the plugin is properly installed
- Try refreshing Figma and restarting the plugin
- Ensure you have a stable internet connection

### Getting Better Results

1. **Organize Your Design:**
   - Use semantic naming for layers
   - Group related elements
   - Apply consistent styles

2. **Optimize Component Structure:**
   - Minimize deeply nested groups
   - Use auto-layout when possible
   - Define clear component boundaries

3. **Provide Context:**
   - Include component variants
   - Add descriptive component names
   - Use consistent design tokens

## 📚 Framework-Specific Tips

### Jetpack Compose
- Generated code uses Material Design 3 components
- Includes proper state management patterns
- Follows Compose best practices for performance

### SwiftUI
- Uses native SwiftUI components and modifiers
- Includes proper view hierarchy structure
- Follows iOS design guidelines

### React Native
- Uses StyleSheet for optimal performance
- Includes proper component structure
- Follows React patterns and conventions

### Flutter
- Uses Material Design widgets
- Includes proper widget composition
- Follows Dart and Flutter conventions

### HTML/CSS
- Generates semantic HTML structure
- Uses modern CSS features (Grid, Flexbox)
- Includes responsive design patterns

## 🤝 Contributing

Want to improve the plugin? Here's how:

1. **Report Issues:** Use GitHub issues for bugs and feature requests
2. **Submit PRs:** Fork the repo and submit pull requests
3. **Share Examples:** Add your successful conversions to this guide
4. **Improve Prompts:** Help optimize AI prompts for better code generation

## 💡 For Developers

If you're setting up your own version of this plugin:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Replace `YOUR_GEMINI_API_KEY_HERE` in `ui.html` with your actual key
3. Consider the cost implications of providing free API access to users
4. Monitor usage and implement rate limiting if needed

---

**Happy designing and coding! 🎨✨** 