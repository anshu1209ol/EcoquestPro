# EcoMentor AI Setup Guide

## Gemini AI Integration Setup

EcoMentor is powered by Google Gemini AI. To enable the AI features, you need to set up your API key.

### Step 1: Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root directory of the project
2. Add the following line:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your actual API key from Step 1

### Step 3: Restart Development Server

After adding the API key, restart your development server:
```bash
npm run dev
```

### Troubleshooting

- **Error: "Gemini API key is not configured"**
  - Make sure you created `.env.local` (not `.env`)
  - Make sure the file is in the root directory
  - Make sure the variable name is exactly `GEMINI_API_KEY`
  - Restart the development server after adding the key

- **Error: "Failed to generate response"**
  - Check if your API key is valid
  - Make sure you have internet connection
  - Check the browser console for detailed error messages

### Features

Once configured, EcoMentor can:
- Answer questions about environmental topics
- Help with ECO Quest platform features
- Provide educational information about sustainability
- Assist with general queries about the platform

Enjoy using EcoMentor! 🌿🤖

