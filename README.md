# Restaurant SaaS Platform 🍽️

A multi-tenant restaurant management SaaS built with Firebase.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   ADMIN WEBSITES                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   🔷 Super Admin Panel          🟠 Restaurant Admin Panel       │
│   apps/super-admin              apps/restaurant-admin            │
│   Port: 3000                    Port: 3001                       │
│                                                                  │
│   - Manage all restaurants      - Manage menu & categories       │
│   - Subscriptions & billing     - Orders & tables                │
│   - Platform analytics          - Staff & delivery agents        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       🔥 FIREBASE                               │
│   Auth │ Firestore │ Storage │ Functions │ FCM │ Hosting       │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   WEB APP       │  │  MOBILE APP     │  │  MOBILE APP     │
│                 │  │                 │  │                 │
│ 🟣 Customer Web │  │ 🟢 Customer App │  │ 🟡 Delivery App │
│ (QR Ordering)   │  │ (Online Order)  │  │ (Driver App)    │
│                 │  │                 │  │                 │
│ - QR dine-in    │  │ - Browse menu   │  │ - View orders   │
│ - No login      │  │ - Order online  │  │ - Get location  │
│ - Table orders  │  │ - Share GPS ────│──│ - Navigate      │
│                 │  │ - Track order   │  │ - Update status │
│                 │  │                 │  │                 │
│ React + Vite    │  │ React Native    │  │ React Native    │
│ Port: 3002      │  │ Android         │  │ (Future)        │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## 📁 Monorepo Structure

```
restaurant-saas/
│
├── apps/
│   │
│   │  ════════════ WEBSITES ════════════
│   ├── super-admin/              # SaaS Platform Admin (React + Vite)
│   │   └── Port: 3000
│   │
│   ├── restaurant-admin/         # Restaurant Owner Panel (React + Vite)
│   │   └── Port: 3001
│   │
│   │  ════════════ WEB APPS ════════════
│   ├── customer-web/             # Customer Web App + QR Ordering
│   │   ├── src/pages/            # Regular & QR pages
│   │   └── Port: 3002
│   │
│   │  ════════════ MOBILE APPS ════════════
│   └── customer-app/             # 📱 Customer Mobile App (React Native)
│       ├── src/screens/          # All mobile screens
│       ├── src/navigation/       # React Navigation setup
│       └── android/              # Android build (after init)
│
├── packages/
│   ├── types/                    # Shared TypeScript types
│   └── firebase/                 # Firebase config & services
│
├── firebase.json
├── firestore.rules
└── storage.rules
```

## 🎯 Apps Overview

| App | Type | Tech | Users | Port/Platform |
|-----|------|------|-------|--------------|
| **Super Admin** | Website | React + Vite | SaaS Owner | Port 3000 |
| **Restaurant Admin** | Website | React + Vite + TS | Restaurant Owners | Port 3001 |
| **Customer Web** | Web App | React + Vite | Customers (QR) | Port 3002 |
| **Customer App** | Mobile App | React Native | Customers (Delivery) | Android |

## 🚀 Quick Start

### Web Apps

```bash
# Install dependencies
npm install

# Start Admin Websites
npm run dev:super-admin        # Port 3000
npm run dev:restaurant-admin   # Port 3001

# Start Customer Web (includes QR ordering)
npm run dev:customer-app       # Port 3002
```

### Mobile App (Customer App)

```bash
# Navigate to customer-app
cd apps/customer-app

# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on Android (requires Android Studio & emulator)
npm run android
```

## 📱 Customer App Features

| Feature | Description |
|---------|-------------|
| **Browse Menu** | View restaurant menu with categories |
| **Add to Cart** | Add items with quantity controls |
| **Delivery Address** | Save & manage multiple addresses |
| **GPS Location** | Share location for delivery |
| **Order Tracking** | Real-time order status & driver location |
| **Order History** | View past orders & reorder |
| **User Profile** | Manage account settings |

## 📍 Location Flow (Delivery)

```
Customer App                        Delivery App (Future)
     │                                   │
     │ 1. Place delivery order           │
     │ 2. Share GPS location             │
     │    └───────────────────────────▶  │ 3. Get customer location
     │                                   │ 4. Navigate to customer
     │ ◀───────────────────────────────  │ 5. Update status: "On the way"
     │ 6. Real-time tracking             │
     │ ◀───────────────────────────────  │ 7. Mark as "Delivered"
```

## 💰 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **QR Only** | ₹999/month | QR dine-in ordering only |
| **Delivery** | ₹1,499/month | QR + Online delivery + Customer App |
| **Owned App** | Contact Team | Fully custom branded app |

## 🛠️ Build Commands

### Web Apps
```bash
npm run build:all              # Build all web apps
firebase deploy                # Deploy to Firebase Hosting
```

### Customer App (Android)
```bash
cd apps/customer-app
npm run android -- --variant=release   # Build release APK
```

## 🗑️ Cleanup

Delete old folders after verifying:
```powershell
Remove-Item -Recurse -Force admin_panel, web_app
```

## 📄 License

Proprietary - All rights reserved.

---

**Built with ❤️ by GrowTez**
