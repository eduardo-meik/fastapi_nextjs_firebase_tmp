# Firebase Configuration Guide

## Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password
   - Enable Google (optional)

4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database
   - Start in test mode (remember to set proper rules later)

## Firebase Credentials

### For Backend (Admin SDK)

1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Save the JSON file as `serviceAccountKey.json` in the `backend/` directory
4. Update `backend/.env`:
   ```
   FIREBASE_CREDENTIALS_PATH=serviceAccountKey.json
   ```

### For Frontend (Client SDK)

1. Go to Project Settings > General
2. Scroll to "Your apps" section
3. Click the web icon (</>)
4. Register your app
5. Copy the configuration values
6. Create `frontend/.env.local` with these values:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Firestore Security Rules

Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /items/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.user_id;
      allow create: if request.auth != null;
    }
  }
}
```

## Important Notes

- **Never commit** `serviceAccountKey.json` or `.env` files to version control
- Use `.env.example` files as templates
- In production, use environment variables instead of local files
