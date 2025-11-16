# Firebase Authentication Setup Guide

## Prerequisites
- A Google account
- Node.js installed
- Next.js project set up

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "eco-quest-auth")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project console, go to "Authentication" in the left sidebar
2. Click on the "Get started" button
3. Go to the "Sign-in method" tab
4. Click on "Email/Password" provider
5. Toggle the "Enable" switch
6. Click "Save"

## Step 3: Get Firebase Configuration

1. In your Firebase project console, click on the gear icon (⚙️) → "Project settings"
2. Scroll down to "Your apps" section
3. Click on the "</>" icon to add a web app
4. Enter an app nickname (e.g., "Eco Quest Web App")
5. **Important:** Do NOT check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the configuration object (you'll need this in the next step)
8. Click "Continue to console" (skip the rest of the setup)

## Step 4: Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace the placeholder values with your actual Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC... (from apiKey)
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789 (numeric)
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

**Note:** Make sure to use the values from your Firebase config object, not the placeholders.

## Step 5: Test the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth`
3. Try registering a new account
4. Try logging in with the created account
5. Try logging out

## Features Implemented

### ✅ Authentication Features
- User registration with email/password
- User login with email/password
- Automatic session persistence
- User logout
- Real-time authentication state monitoring

### ✅ User Profile Features
- Display name
- Email address
- Avatar generation
- Extended profile data (phone, address, age, plan)
- Eco-points, level, badges tracking

## Firebase Security Rules

For a production app, you should set up Firestore security rules. Here's a basic example:

```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Add more rules as needed for your app
  }
}
```

## Next Steps (Optional Enhancements)

1. **Email Verification**: Enable email verification in Firebase Console
2. **Password Reset**: Implement forgot password functionality
3. **Social Login**: Add Google, Facebook, etc. sign-in options
4. **Firestore Integration**: Store user profiles in Firestore instead of localStorage
5. **Security Rules**: Set up proper Firestore security rules

## Troubleshooting

### Common Issues

1. **"auth/invalid-api-key" error**
   - Check that your `.env.local` file has the correct API key
   - Make sure the environment variables are prefixed with `NEXT_PUBLIC_`

2. **"auth/configuration-not-found" error**
   - Verify all Firebase config values are correct
   - Check that your Firebase project is properly set up

3. **Authentication not persisting**
   - Firebase handles persistence automatically
   - Check browser console for errors

### Debug Tips

- Check browser console for Firebase errors
- Verify Firebase project settings match your config
- Test authentication in Firebase Console → Authentication → Users

## Security Best Practices

1. Never commit `.env.local` to version control
2. Use environment variables for all sensitive config
3. Enable email verification for production
4. Set up proper Firestore security rules
5. Use Firebase Security Rules for real-time database if applicable

## Support

If you encounter issues:
1. Check Firebase documentation: https://firebase.google.com/docs/auth
2. Check Next.js with Firebase guides
3. Verify all configuration steps are completed correctly
