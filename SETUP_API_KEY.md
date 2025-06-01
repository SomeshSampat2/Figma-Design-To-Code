# 🔑 API Key Setup Guide

This guide explains how to add your Gemini API key to make the plugin work for all users.

## 🚀 Quick Setup

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Step 2: Add the API Key to the Plugin

1. Open the `ui.html` file in your code editor
2. Find this line (around line 262):
   ```javascript
   const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   const GEMINI_API_KEY = 'AIzaSyD...your-actual-key-here';
   ```
4. Save the file

### Step 3: Rebuild the Plugin

```bash
npm run build
```

### Step 4: Test the Plugin

1. Install the plugin in Figma (Development mode)
2. Select any component in Figma
3. Choose an output format
4. Click "Generate Code"
5. Verify that code is generated successfully

## 💡 Important Considerations

### Cost Management
- **API Usage**: All plugin users will consume your API quota
- **Rate Limits**: Gemini API has rate limits that will be shared across all users
- **Monitoring**: Consider monitoring usage through Google Cloud Console

### Security Notes
- **API Key Visibility**: The API key will be visible in the plugin's source code
- **Client-Side**: The key is used client-side in the browser
- **Distribution**: Anyone with access to the plugin can see the key

### Recommended Approach for Production

For a production plugin that serves many users, consider:

1. **Backend Proxy**: Create a backend service that proxies requests to Gemini
2. **Rate Limiting**: Implement per-user rate limiting
3. **Usage Tracking**: Monitor and log API usage
4. **Cost Control**: Set spending limits and alerts

Example backend proxy structure:
```
Your Backend API
    ↓
Google Gemini API
```

This way, you can:
- Hide your API key from clients
- Implement authentication and rate limiting
- Monitor usage per user
- Control costs more effectively

## 🛡️ Alternative Setup (More Secure)

If you want a more secure setup, you can create a simple backend:

### Option 1: Simple Express.js Proxy

```javascript
// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/api/generate', async (req, res) => {
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

Then update the plugin to call your backend instead of Gemini directly.

### Option 2: Serverless Function (Vercel/Netlify)

Deploy a serverless function that proxies the requests:

```javascript
// api/generate.js (Vercel) or netlify/functions/generate.js (Netlify)
export default async function handler(req, res) {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });
  
  const data = await response.json();
  res.json(data);
}
```

## 📊 Usage Monitoring

To monitor your API usage:

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Click on your API key to see usage statistics
4. Set up billing alerts to avoid unexpected costs

## 🎯 Current Setup Status

- ✅ Plugin structure ready
- ✅ UI built and functional  
- ✅ Code generation logic implemented
- ⏳ **API key needs to be added** (see Step 2 above)
- ⏳ Plugin ready for testing after API key setup

---

**Once you add your API key, the plugin will be ready for all users! 🚀** 