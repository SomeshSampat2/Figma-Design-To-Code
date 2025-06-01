# 🚀 Quick Start - Figma to Code Plugin

## Step 1: Setup Environment
```bash
# The .env file is already created for you!
# Edit .env and replace YOUR_GEMINI_API_KEY_HERE with your actual API key
```

## Step 2: Get Your API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

## Step 3: Add API Key to .env
Edit the `.env` file in this directory:
```bash
# Before (in .env file)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# After (replace with your actual key)
GEMINI_API_KEY=AIzaSyD_your_actual_api_key_here
```

## Step 4: Build the Plugin
```bash
npm run build
```

## Step 5: Install in Figma
1. Open Figma Desktop
2. Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. Select `manifest.json` from this folder
4. Done! Plugin is ready to use

## ✅ Current Status
- ✅ Project structure ready
- ✅ Environment variables configured
- ✅ Build system ready
- ⏳ **Add your API key to .env and run `npm run build`**

---

**After adding your API key, all users can use the plugin without any setup! 🎉** 