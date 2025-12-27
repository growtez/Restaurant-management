# Firebase Setup Guide

## 🔥 Overview

This guide walks you through connecting Firebase to all applications in the Restaurant SaaS platform.

---

## 📋 Prerequisites

1. **Firebase Account**: Create one at [firebase.google.com](https://firebase.google.com)
2. **Firebase CLI**: Install it globally
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

---

## 🚀 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it: `restaurant-saas` (or your preferred name)
4. Enable/disable Google Analytics as needed
5. Click **"Create project"**

---

## 🌐 Step 2: Setup Web Apps (customer-web, restaurant-admin, super-admin)

### 2.1 Register Web App

1. In Firebase Console, click the **Web icon** (</>)
2. App nickname: `customer-web`
3. Check **"Also set up Firebase Hosting"**
4. Click **"Register app"**
5. Copy the `firebaseConfig` object

### 2.2 Add Configuration

Create `.env` file in `apps/customer-web/`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
VITE_USE_EMULATORS=false
```

### 2.3 Repeat for Other Web Apps

Create similar `.env` files for:
- `apps/restaurant-admin/.env`
- `apps/super-admin/.env`

---

## 📱 Step 3: Setup Mobile Apps (customer-app, delivery-app)

### 3.1 Register Android App

1. In Firebase Console, click **"Add app"** → **Android**
2. Package name: `com.customerapp` (for customer-app)
3. App nickname: `Customer App Android`
4. Download `google-services.json`

### 3.2 Add google-services.json

Place the file in:
```
apps/customer-app/android/app/google-services.json
```

### 3.3 Update Android Build Files

**android/build.gradle** (project-level):
```gradle
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

**android/app/build.gradle** (add at the bottom):
```gradle
apply plugin: 'com.google.gms.google-services'
```

### 3.4 Install React Native Firebase

```bash
cd apps/customer-app
npm install @react-native-firebase/app
npm install @react-native-firebase/firestore
npm install @react-native-firebase/auth
npm install @react-native-firebase/storage
```

### 3.5 Repeat for Delivery App

- Package name: `com.deliveryapp`
- Place `google-services.json` in `apps/delivery-app/android/app/`
- Apply same build.gradle changes

---

## 🗄️ Step 4: Setup Firestore Database

### 4.1 Create Database

1. Go to Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select location closest to your users

### 4.2 Security Rules

Replace `firestore.rules` with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isDriver() {
      return get(/databases/$(database)/documents/drivers/$(request.auth.uid)).data.status == 'active';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && isOwner(userId);
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isAuthenticated() && isOwner(userId);
      
      match /addresses/{addressId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
      
      match /favorites/{favoriteId} {
        allow read, write: if isAuthenticated() && isOwner(userId);
      }
    }
    
    // Restaurants collection
    match /restaurants/{restaurantId} {
      allow read: if true;  // Public read
      allow write: if isAdmin();
      
      match /menu/{itemId} {
        allow read: if true;
        allow write: if isAdmin();
      }
      
      match /orders/{orderId} {
        allow read: if isAuthenticated();
        allow create: if isAuthenticated();
        allow update: if isAdmin() || isDriver();
      }
    }
    
    // Orders collection (top-level for cross-restaurant queries)
    match /orders/{orderId} {
      allow read: if isAuthenticated() && 
        (resource.data.customerId == request.auth.uid || 
         resource.data.driverId == request.auth.uid ||
         isAdmin());
      allow create: if isAuthenticated();
      allow update: if isDriver() || isAdmin();
    }
    
    // Drivers collection
    match /drivers/{driverId} {
      allow read: if isAuthenticated() && (isOwner(driverId) || isAdmin());
      allow write: if isAdmin();
      allow update: if isOwner(driverId);
    }
  }
}
```

Deploy rules:
```bash
firebase deploy --only firestore:rules
```

---

## 🔐 Step 5: Setup Authentication

### 5.1 Enable Auth Methods

1. Go to Firebase Console → **Authentication**
2. Click **"Get started"**
3. Enable providers:
   - **Email/Password** ✅
   - **Google** ✅ (optional)
   - **Phone** ✅ (optional for OTP)

### 5.2 Configure Google Sign-In (Web)

1. Get the **Web client ID** from Google Cloud Console
2. Add it to your `.env`:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   ```

### 5.3 Configure Google Sign-In (Android)

1. Add SHA-1 fingerprint to Firebase
   ```bash
   cd apps/customer-app/android
   ./gradlew signingReport
   ```
2. Copy SHA1 from `debug` variant
3. Add to Firebase → Project Settings → Your Apps → SHA certificate fingerprints

---

## 📦 Step 6: Setup Cloud Storage

### 6.1 Enable Storage

1. Go to Firebase Console → **Storage**
2. Click **"Get started"**
3. Choose location

### 6.2 Storage Rules

Replace `storage.rules` with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Restaurant images
    match /restaurants/{restaurantId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Menu item images
    match /menu/{restaurantId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Deploy:
```bash
firebase deploy --only storage:rules
```

---

## 🧪 Step 7: Local Development with Emulators

### 7.1 Start Emulators

```bash
firebase emulators:start
```

### 7.2 Use in Development

Set in `.env`:
```env
VITE_USE_EMULATORS=true
```

### 7.3 Emulator Ports

| Service | Port |
|---------|------|
| Auth | 9099 |
| Firestore | 8080 |
| Storage | 9199 |
| Functions | 5001 |
| Hosting | 5000 |
| Emulator UI | 4000 |

---

## 📊 Step 8: Initial Data Setup

### 8.1 Create Collections

Run this script to create initial collections:

```javascript
// scripts/setupFirestore.js
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

async function setup() {
  // Create sample restaurant
  await db.collection('restaurants').doc('demo-restaurant').set({
    name: 'Demo Restaurant',
    description: 'A sample restaurant for testing',
    status: 'active',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 40,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Create sample menu items
  const menuItems = [
    { name: 'Margherita Pizza', price: 299, category: 'Main Course', isAvailable: true },
    { name: 'Pepperoni Pizza', price: 349, category: 'Main Course', isAvailable: true },
    { name: 'Caesar Salad', price: 199, category: 'Starters', isAvailable: true },
  ];

  for (const item of menuItems) {
    await db.collection('restaurants').doc('demo-restaurant').collection('menu').add({
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log('Setup complete!');
}

setup();
```

---

## ✅ Verification Checklist

- [ ] Firebase project created
- [ ] Web apps registered and configured
- [ ] Android apps registered with google-services.json
- [ ] Firestore database created
- [ ] Security rules deployed
- [ ] Authentication enabled
- [ ] Storage enabled
- [ ] Emulators working
- [ ] Sample data created

---

## 🔧 Troubleshooting

### Firebase module not found
```bash
npm install firebase
# or for React Native
npm install @react-native-firebase/app
```

### Auth not working on Android
- Check SHA-1 is added to Firebase
- Ensure google-services.json is up to date

### Firestore permission denied
- Check security rules
- Verify user is authenticated

### Emulators not connecting
- Check ports are not in use
- Verify `VITE_USE_EMULATORS=true`

---

## 📞 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Console](https://console.firebase.google.com)
