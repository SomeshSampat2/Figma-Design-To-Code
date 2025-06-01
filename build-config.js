const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

// Get the API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
  console.error('❌ Error: GEMINI_API_KEY not found in environment variables.');
  console.error('Please:');
  console.error('1. Copy env.example to .env: cp env.example .env');
  console.error('2. Edit .env and add your actual Gemini API key');
  console.error('3. Run npm run build again');
  process.exit(1);
}

// Read the UI template file
const uiTemplatePath = path.join(__dirname, 'ui.html');
let uiContent = fs.readFileSync(uiTemplatePath, 'utf8');

// Store original content with placeholder
const originalPlaceholder = 'const GEMINI_API_KEY = \'PLACEHOLDER_API_KEY_TO_BE_REPLACED\';';
const injectedKey = `const GEMINI_API_KEY = '${apiKey}';`;

// Replace the API key placeholder in the UI file
uiContent = uiContent.replace(originalPlaceholder, injectedKey);

// Write the updated UI file for build
fs.writeFileSync(uiTemplatePath, uiContent);

console.log('✅ API key injected directly into ui.html');
console.log('🔒 API key loaded from environment variables');

// Add cleanup function for development
process.on('exit', () => {
  // Only restore placeholder if this is a dev build (not production)
  if (process.env.NODE_ENV !== 'production') {
    try {
      let resetContent = fs.readFileSync(uiTemplatePath, 'utf8');
      resetContent = resetContent.replace(injectedKey, originalPlaceholder);
      fs.writeFileSync(uiTemplatePath, resetContent);
      console.log('🧹 Placeholder restored in ui.html');
    } catch (error) {
      // Silently fail - not critical
    }
  }
}); 