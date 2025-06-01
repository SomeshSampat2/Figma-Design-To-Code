# 🎬 Demo Guide - Figma to Code Plugin

This guide demonstrates how to test the Figma to Code plugin with various component types.

## 🚀 Quick Demo Steps

### 1. Setup
1. Install the plugin in Figma (see README.md)
2. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Open or create a new Figma file

### 2. Create Test Components

#### Demo Component 1: Simple Button
1. Create a rectangle (160x48px)
2. Set fill color to #007AFF (blue)
3. Set corner radius to 12px
4. Add text "Get Started" (white, 16px, center-aligned)
5. Name the component "Primary Button"

#### Demo Component 2: User Card
1. Create a frame (300x120px)
2. Add background color #FFFFFF with shadow
3. Set corner radius to 16px
4. Add:
   - Circle for avatar (60x60px, gray fill)
   - Text "John Doe" (18px, bold)
   - Text "Product Designer" (14px, gray)
   - Text "San Francisco, CA" (12px, light gray)

#### Demo Component 3: Input Field
1. Create a frame (280x56px)
2. Set border 1px solid #E5E5E5
3. Set corner radius to 8px
4. Add placeholder text "Enter your email"
5. Add label text "Email Address" above

### 3. Test Code Generation

#### Test 1: Button → Jetpack Compose
1. Select the button component
2. Run the plugin
3. Enter your API key
4. Select "Jetpack Compose"
5. Click "Generate Code"

**Expected Output:**
```kotlin
@Composable
fun PrimaryButton() {
    Button(
        onClick = { /* TODO: Add click handler */ },
        modifier = Modifier.size(width = 160.dp, height = 48.dp),
        colors = ButtonDefaults.buttonColors(
            containerColor = Color(0xFF007AFF)
        ),
        shape = RoundedCornerShape(12.dp)
    ) {
        Text(
            text = "Get Started",
            color = Color.White,
            fontSize = 16.sp
        )
    }
}
```

#### Test 2: Card → SwiftUI
1. Select the user card component
2. Choose "SwiftUI" format
3. Generate code

**Expected Output:**
```swift
struct UserCard: View {
    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(Color.gray.opacity(0.3))
                .frame(width: 60, height: 60)
            
            VStack(alignment: .leading, spacing: 4) {
                Text("John Doe")
                    .font(.headline)
                    .fontWeight(.bold)
                
                Text("Product Designer")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                Text("San Francisco, CA")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding(16)
        .background(Color.white)
        .cornerRadius(16)
        .shadow(radius: 4)
        .frame(maxWidth: 300, maxHeight: 120)
    }
}
```

#### Test 3: Input → HTML/CSS
1. Select the input field component
2. Choose "HTML/CSS" format
3. Generate code

**Expected Output:**
```html
<div class="input-group">
    <label for="email" class="input-label">Email Address</label>
    <input 
        type="email" 
        id="email" 
        class="input-field" 
        placeholder="Enter your email"
    />
</div>

<style>
.input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 280px;
}

.input-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
}

.input-field {
    width: 100%;
    height: 56px;
    padding: 16px;
    border: 1px solid #E5E5E5;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    outline: none;
    transition: border-color 0.2s ease;
}

.input-field:focus {
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}
</style>
```

## 🧪 Advanced Testing Scenarios

### Complex Layout Testing
Create more complex components to test advanced features:

1. **Navigation Bar**
   - Frame with multiple buttons
   - Logo/title text
   - Search input
   - User avatar

2. **Product Card**
   - Image placeholder
   - Title and description
   - Price and rating
   - Action buttons

3. **Dashboard Widget**
   - Chart placeholder
   - Multiple data points
   - Header with actions
   - Nested containers

### Framework-Specific Testing

#### React Native Features
- Test with components that should use `StyleSheet`
- Verify proper component structure
- Check for platform-specific code

#### Flutter Features
- Test Material Design widget usage
- Verify proper widget hierarchy
- Check for responsive behavior

#### XML Layouts
- Test ViewGroup structures
- Verify constraint-based layouts
- Check Material Design components

## 🎯 Testing Checklist

### ✅ Basic Functionality
- [ ] Plugin loads in Figma
- [ ] UI displays correctly
- [ ] API key input works
- [ ] Component selection detected
- [ ] All 6 formats selectable
- [ ] Code generation works
- [ ] Copy functionality works

### ✅ Component Types
- [ ] Rectangles/shapes
- [ ] Text elements
- [ ] Frames/containers
- [ ] Groups
- [ ] Components
- [ ] Complex nested structures

### ✅ Design Properties
- [ ] Colors (fills, strokes)
- [ ] Typography (font, size, weight)
- [ ] Dimensions (width, height)
- [ ] Positioning (x, y coordinates)
- [ ] Corner radius
- [ ] Shadows/effects

### ✅ Code Quality
- [ ] Syntactically correct code
- [ ] Framework best practices
- [ ] Proper naming conventions
- [ ] Clean structure
- [ ] Commented explanations

### ✅ Error Handling
- [ ] Invalid API key
- [ ] No component selected
- [ ] Network errors
- [ ] Complex/unsupported components
- [ ] API rate limits

## 🐛 Known Limitations

1. **Complex Gradients**: May not translate perfectly to all frameworks
2. **Custom Fonts**: Generated code might need font import adjustments
3. **Animations**: Static design conversion only
4. **Images**: Placeholder content used
5. **Interactions**: Click handlers need manual implementation

## 📈 Success Metrics

A successful demo should show:
- ✅ Fast generation (< 10 seconds)
- ✅ Accurate design translation (80%+ match)
- ✅ Compilable code output
- ✅ Framework-appropriate patterns
- ✅ Clean, readable code structure

## 🎉 Demo Tips

1. **Start Simple**: Begin with basic shapes and text
2. **Build Complexity**: Gradually test more complex components
3. **Compare Outputs**: Try the same component in different frameworks
4. **Test Edge Cases**: Try unusual component structures
5. **Document Issues**: Note any discrepancies or errors

---

**Ready to Demo! 🚀**

Share your results and help improve the plugin by reporting any issues or suggestions. 