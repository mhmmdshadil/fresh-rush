# Fresh Rush - Quick Start Guide

## 🚀 Get Started in 5 Minutes!

### Prerequisites
- Node.js installed
- Google account for Firebase
- Web browser

---

## Step-by-Step Setup

### 1️⃣ Install Dependencies (30 seconds)
```bash
npm install
```

### 2️⃣ Create Firebase Project (2 minutes)

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Click "Add Project"

2. **Project Setup**
   - Name: `fresh-rush-app` (or any name)
   - Disable Google Analytics (optional)
   - Click "Create Project"

3. **Enable Authentication**
   - Go to: **Build** → **Authentication** → **Get Started**
   - Click **Email/Password** → Enable → Save
   - Click **Google** → Enable → Save

4. **Create Firestore Database**
   - Go to: **Build** → **Firestore Database** → **Create Database**
   - Select: **Start in test mode**
   - Choose location: (your nearest region)
   - Click **Enable**

### 3️⃣ Get Your Firebase Config (1 minute)

1. **Register Web App**
   - Click the **gear icon** (⚙️) → **Project Settings**
   - Scroll to "Your apps"
   - Click the **Web icon** (`</>`)
   - App nickname: `FreshRush Web`
   - Click **Register app**

2. **Copy Config**
   - You'll see a `firebaseConfig` object
   - Copy the entire object

### 4️⃣ Update Firebase Config (30 seconds)

1. Open: `src/config/firebase.js`
2. Replace this:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

3. With your actual config from Firebase Console

### 5️⃣ Run the App! (10 seconds)
```bash
npm run dev
```

Open: http://localhost:5173

---

## 🎉 You're Done!

### First Time Use:
1. **Sign Up** - Create your account
2. **Add Produce** - Click "Register Produce"
3. **View Buyers** - See matched buyers automatically
4. **Accept Offers** - Click to accept buyer offers

---

## 🔥 Features You Can Use Right Now

✅ **Sign Up/Login** - Email or Google  
✅ **Add Produce** - Register fresh produce  
✅ **Cancel Orders** - Mark as cancelled  
✅ **View Buyers** - Auto-loaded sample buyers  
✅ **Accept Offers** - Click to accept  
✅ **Real-time Updates** - Live sync  
✅ **Notifications** - Toast alerts  
✅ **Logout** - Sign out anytime  

---

## 🆘 Troubleshooting

### "Firebase not configured" error
→ Make sure you updated `src/config/firebase.js` with your actual config

### Can't sign in
→ Check that Email/Password is enabled in Firebase Console

### No buyers showing
→ They auto-seed on first login. Refresh the page.

### Port already in use
→ Run: `npm run dev -- --port 3000`

---

## 📚 More Help

- **Full Setup Guide**: See `FIREBASE_SETUP.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Firebase Docs**: https://firebase.google.com/docs

---

## 🎯 What's Next?

After setup, you can:
- Add your own produce
- Customize buyer data
- Deploy to production
- Add more features

**Enjoy your Fresh Rush app!** 🚀🌿
