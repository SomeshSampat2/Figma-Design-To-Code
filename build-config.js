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

// Replace the API key placeholder in the UI file
uiContent = uiContent.replace(
  'const GEMINI_API_KEY = window.FIGMA_TO_CODE_CONFIG?.GEMINI_API_KEY;',
  `const GEMINI_API_KEY = '${apiKey}';`
);

// Write the updated UI file
fs.writeFileSync(uiTemplatePath, uiContent);

console.log('✅ API key injected directly into ui.html');
console.log('🔒 API key loaded from environment variables'); 