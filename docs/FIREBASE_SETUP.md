# 🔥 Firebase Setup Guide

## Project Information

| Property | Value |
|----------|-------|
| **Project Name** | Restaurant-management-growtez |
| **Project ID** | `restaurant-management-growtez` |
| **Region** | asia-south1 (Mumbai) |
| **Console URL** | [Firebase Console](https://console.firebase.google.com/project/restaurant-management-growtez) |

---

## 📋 Firebase Configuration Values

### Shared Configuration (All Apps)

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAvJMgP10wio8If-oE1LhJ588WdPaYjJig",
  authDomain: "restaurant-management-growtez.firebaseapp.com",
  projectId: "restaurant-management-growtez",
  storageBucket: "restaurant-management-growtez.firebasestorage.app",
  messagingSenderId: "802832672428",
  measurementId: "G-VT8NXGTW56"
};
```

### App-Specific App IDs

| Application | App ID |
|-------------|--------|
| **customer-web** | `1:802832672428:web:c85df57f4ca39ecef26109` |
| **restaurant-admin** | `1:802832672428:web:50767ad0e425af31f26109` |
| **super-admin** | `1:802832672428:web:592ea2967e2bea6bf26109` |
| **delivery-app** | `1:802832672428:web:9760ba4756f982e7f26109` |

---

## ✅ Services Enabled

| Service | Status | Notes |
|---------|--------|-------|
| **Firestore Database** | ✅ Enabled | asia-south1 (Mumbai) |
| **Authentication** | ✅ Enabled | Email/Password + Google Sign-in |
| **Storage** | ⚠️ Requires Upgrade | Needs Blaze plan (pay-as-you-go) |

---

## 🚀 Quick Setup for Each App

### 1. Customer Web (`apps/customer-web`)

Create `.env` file in `apps/customer-web/`:

```env
VITE_FIREBASE_API_KEY=AIzaSyAvJMgP10wio8If-oE1LhJ588WdPaYjJig
VITE_FIREBASE_AUTH_DOMAIN=restaurant-management-growtez.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=restaurant-management-growtez
VITE_FIREBASE_STORAGE_BUCKET=restaurant-management-growtez.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=802832672428
VITE_FIREBASE_APP_ID=1:802832672428:web:c85df57f4ca39ecef26109
VITE_FIREBASE_MEASUREMENT_ID=G-VT8NXGTW56
VITE_USE_EMULATORS=false
```

### 2. Restaurant Admin (`apps/restaurant-admin`)

Create `.env` file in `apps/restaurant-admin/`:

```env
VITE_FIREBASE_API_KEY=AIzaSyAvJMgP10wio8If-oE1LhJ588WdPaYjJig
VITE_FIREBASE_AUTH_DOMAIN=restaurant-management-growtez.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=restaurant-management-growtez
VITE_FIREBASE_STORAGE_BUCKET=restaurant-management-growtez.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=802832672428
VITE_FIREBASE_APP_ID=1:802832672428:web:50767ad0e425af31f26109
VITE_FIREBASE_MEASUREMENT_ID=G-VT8NXGTW56
VITE_USE_EMULATORS=false
```

### 3. Super Admin (`apps/super-admin`)

Create `.env` file in `apps/super-admin/`:

```env
VITE_FIREBASE_API_KEY=AIzaSyAvJMgP10wio8If-oE1LhJ588WdPaYjJig
VITE_FIREBASE_AUTH_DOMAIN=restaurant-management-growtez.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=restaurant-management-growtez
VITE_FIREBASE_STORAGE_BUCKET=restaurant-management-growtez.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=802832672428
VITE_FIREBASE_APP_ID=1:802832672428:web:592ea2967e2bea6bf26109
VITE_FIREBASE_MEASUREMENT_ID=G-VT8NXGTW56
VITE_USE_EMULATORS=false
```

### 4. React Native Apps (customer-app, delivery-app)

For React Native apps, you need to:

1. **Download `google-services.json`** from Firebase Console:
   - Go to Project Settings → General
   - Scroll to "Your apps" section
   - Click on the Android app (add one if needed)
   - Download `google-services.json`

2. **Place the file** in:
   - `apps/customer-app/android/app/google-services.json`
   - `apps/delivery-app/android/app/google-services.json`

3. **Install dependencies**:
   ```bash
   npm install @react-native-firebase/app @react-native-firebase/firestore @react-native-firebase/auth
   ```

---

## 📁 Firestore Database Structure

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: string
│       ├── displayName: string
│       ├── phone: string
│       ├── photoURL: string
│       ├── role: "customer" | "driver" | "restaurant_admin" | "super_admin"
│       ├── createdAt: timestamp
│       └── addresses/
│           └── {addressId}/
│               ├── label: string
│               ├── address: string
│               ├── city: string
│               ├── pincode: string
│               └── isDefault: boolean
│
├── restaurants/
│   └── {restaurantId}/
│       ├── name: string
│       ├── description: string
│       ├── cuisine: string[]
│       ├── rating: number
│       ├── reviewCount: number
│       ├── priceRange: string
│       ├── deliveryTime: string
│       ├── address: object
│       ├── imageUrl: string
│       ├── isActive: boolean
│       ├── ownerId: string
│       └── menu/
│           └── {itemId}/
│               ├── name: string
│               ├── description: string
│               ├── price: number
│               ├── category: string
│               ├── imageUrl: string
│               ├── isVeg: boolean
│               └── isAvailable: boolean
│
├── orders/
│   └── {orderId}/
│       ├── userId: string
│       ├── restaurantId: string
│       ├── driverId: string (optional)
│       ├── items: array
│       ├── subtotal: number
│       ├── deliveryFee: number
│       ├── tax: number
│       ├── total: number
│       ├── status: "pending" | "confirmed" | "preparing" | "ready" | "picked_up" | "delivered" | "cancelled"
│       ├── deliveryAddress: object
│       ├── paymentMethod: string
│       ├── paymentStatus: "pending" | "completed" | "failed"
│       ├── createdAt: timestamp
│       └── updatedAt: timestamp
│
├── drivers/
│   └── {driverId}/
│       ├── userId: string
│       ├── vehicleType: string
│       ├── vehicleNumber: string
│       ├── isOnline: boolean
│       ├── isAvailable: boolean
│       ├── currentLocation: geopoint
│       ├── rating: number
│       ├── totalDeliveries: number
│       └── earnings: object
│
└── favorites/
    └── {favoriteId}/
        ├── userId: string
        ├── restaurantId: string
        └── createdAt: timestamp
```

---

## 🔒 Security Rules

### Firestore Rules (firestore.rules)

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
    
    function hasRole(role) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role;
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && isOwner(userId);
      allow update: if isOwner(userId);
      allow delete: if hasRole('super_admin');
      
      // User addresses
      match /addresses/{addressId} {
        allow read, write: if isOwner(userId);
      }
    }
    
    // Restaurants collection
    match /restaurants/{restaurantId} {
      allow read: if true; // Public read
      allow create: if hasRole('super_admin') || hasRole('restaurant_admin');
      allow update: if hasRole('super_admin') || 
                       (hasRole('restaurant_admin') && 
                        resource.data.ownerId == request.auth.uid);
      allow delete: if hasRole('super_admin');
      
      // Menu items
      match /menu/{itemId} {
        allow read: if true;
        allow write: if hasRole('super_admin') || 
                        (hasRole('restaurant_admin') && 
                         get(/databases/$(database)/documents/restaurants/$(restaurantId)).data.ownerId == request.auth.uid);
      }
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if isAuthenticated() && 
                    (resource.data.userId == request.auth.uid ||
                     resource.data.driverId == request.auth.uid ||
                     hasRole('restaurant_admin') ||
                     hasRole('super_admin'));
      allow create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if hasRole('super_admin');
    }
    
    // Drivers collection
    match /drivers/{driverId} {
      allow read: if isAuthenticated();
      allow create: if hasRole('super_admin');
      allow update: if isOwner(driverId) || hasRole('super_admin');
      allow delete: if hasRole('super_admin');
    }
    
    // Favorites collection
    match /favorites/{favoriteId} {
      allow read: if isAuthenticated() && resource.data.userId == request.auth.uid;
      allow create: if isAuthenticated();
      allow delete: if resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 🧪 Firebase Emulators (Development)

For local development, you can use Firebase Emulators:

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize emulators
firebase init emulators

# Start emulators
firebase emulators:start
```

Set `VITE_USE_EMULATORS=true` in your `.env` to use emulators.

---

## ⚠️ Important Notes

1. **Storage Requires Upgrade**: Firebase Storage requires the Blaze plan (pay-as-you-go). The free tier includes 5GB storage. To enable:
   - Go to Firebase Console → Upgrade → Select Blaze plan
   - Link a billing account (you won't be charged unless you exceed free limits)

2. **API Key Security**: The API key is meant to be public and is restricted by Firebase Security Rules. Additional protection can be added via:
   - App Check
   - API key restrictions in Google Cloud Console

3. **Environment Variables**: Never commit `.env` files with real credentials. Use `.env.example` as a template.

4. **Google Sign-in**: For Google authentication to work:
   - Add your domain to authorized domains in Firebase Console → Authentication → Settings

---

## 📞 Support

- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Project Console**: [Firebase Console](https://console.firebase.google.com/project/restaurant-management-growtez)
