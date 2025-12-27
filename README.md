# 🍽️ Restaurant SaaS Platform

[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()
[![React Native](https://img.shields.io/badge/React%20Native-0.83-blue.svg)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-orange.svg)](https://firebase.google.com/)

A complete **multi-tenant Restaurant SaaS platform** enabling restaurants to manage their delivery and dine-in operations. Built with React Native, React, and Firebase.

---

## 🎯 Overview

This platform provides a complete ecosystem for food delivery businesses:

| Application | Type | Description |
|-------------|------|-------------|
| **Customer App** | React Native Mobile | Food ordering for customers |
| **Customer Web** | React Web | Browser-based ordering |
| **Delivery App** | React Native Mobile | Order delivery for drivers |
| **Restaurant Admin** | React Web | Restaurant management panel |
| **Super Admin** | React Web | Platform-wide administration |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SUPER ADMIN (You)                             │
│                 Platform owner - manages all restaurants             │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      RESTAURANT ADMINS                               │
│               Each restaurant has their own panel                    │
└─────────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  CUSTOMER APP   │  │  CUSTOMER WEB   │  │  DELIVERY APP   │
│  (Mobile)       │  │  (Browser)      │  │  (Mobile)       │
│  Order food     │  │  Order food     │  │  Deliver orders │
└─────────────────┘  └─────────────────┘  └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │    FIREBASE     │
                    │  Firestore/Auth │
                    └─────────────────┘
```

---

## 📁 Project Structure

```
Restaurant-management/
├── apps/
│   ├── customer-app/        # 📱 React Native - Customer ordering
│   ├── customer-web/        # 🌐 React - Customer ordering
│   ├── delivery-app/        # 📱 React Native - Delivery drivers
│   ├── restaurant-admin/    # 🌐 React - Restaurant management
│   └── super-admin/         # 🌐 React - Platform administration
├── docs/                    # 📚 Documentation
├── firebase.json            # 🔥 Firebase configuration
└── package.json             # Root configuration
```

---

## ✨ Features

### Customer Apps (Mobile & Web)
- 🛒 Browse restaurant menus
- 🛍️ Add items to cart with customizations
- 📍 GPS location for delivery
- 📦 Real-time order tracking
- 🌙 Dark/Light theme support
- ⭐ Ratings and reviews
- 💰 Multiple payment options

### Delivery App
- 📡 Online/Offline toggle
- 📬 Receive new orders
- 🗺️ Navigate to addresses
- 📊 Earnings dashboard
- 📈 Weekly/Monthly analytics
- 🔔 Push notifications

### Restaurant Admin
- 📋 Menu management (CRUD)
- 📦 Real-time order management
- 👥 Staff management
- 📊 Analytics & reports
- ⚙️ Restaurant settings

### Super Admin
- 🏪 Multi-restaurant management
- 🚗 Driver verification
- 👤 Customer management
- 💵 Commission settings
- 📈 Platform analytics

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **React Native 0.83** | Mobile apps |
| **React 19** | Web apps |
| **Vite** | Web app bundling |
| **React Navigation 7** | Mobile navigation |
| **React Router** | Web routing |
| **Firebase** | Backend (Firestore, Auth, Storage) |
| **Lucide React** | Web icons |
| **react-native-vector-icons** | Mobile icons |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm 10+
- Android Studio (for mobile apps)
- JDK 17

### Running the Apps

#### Customer Web
```bash
cd apps/customer-web
npm install
npm run dev
# Opens at http://localhost:3002
```

#### Customer App (Mobile)
```bash
cd apps/customer-app
npm install
npx react-native run-android
```

#### Delivery App (Mobile)
```bash
cd apps/delivery-app
npm install
npx react-native run-android
```

#### Restaurant Admin
```bash
cd apps/restaurant-admin
npm install
npm run dev
```

---

## 🎨 Design System

### Color Palette

| App | Primary Color | Accent |
|-----|---------------|--------|
| Customer Apps | `#d9b550` (Gold) | Food/Ordering theme |
| Delivery App | `#4CAF50` (Green) | Delivery/Driver theme |
| Admin Panels | `#2196F3` (Blue) | Management theme |

### Theme Support

All apps support **Dark** and **Light** themes with smooth transitions.

```javascript
// Dark Theme
background: '#212121'
card: '#2D2D2D'
text: '#FFFFFF'

// Light Theme
background: '#F5F5F5'
card: '#FFFFFF'
text: '#212121'
```

---

## 📖 Documentation

Detailed documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [README.md](docs/README.md) | Project overview & architecture |
| [QUICK_START.md](docs/QUICK_START.md) | New developer onboarding |
| [CUSTOMER_APP.md](docs/CUSTOMER_APP.md) | Customer mobile app docs |
| [CUSTOMER_WEB.md](docs/CUSTOMER_WEB.md) | Customer web app docs |
| [DELIVERY_APP.md](docs/DELIVERY_APP.md) | Delivery app docs |
| [RESTAURANT_ADMIN.md](docs/RESTAURANT_ADMIN.md) | Restaurant admin docs |
| [SUPER_ADMIN.md](docs/SUPER_ADMIN.md) | Super admin docs |
| [FIREBASE_SYSTEM_ARCHITECTURE.md](docs/FIREBASE_SYSTEM_ARCHITECTURE.md) | Backend architecture |

---

## 📱 Screenshots

### Customer App
| Home | Menu | Cart |
|------|------|------|
| Browse offers & popular items | Full menu with categories | Cart management |

### Delivery App
| Dashboard | Orders | Earnings |
|-----------|--------|----------|
| Online toggle & stats | Active/Completed orders | Weekly earnings chart |

---

## 🗺️ Roadmap

### ✅ Phase 1: Core Features (Completed)
- [x] Customer app with ordering
- [x] Customer web with ordering
- [x] Delivery app with order management
- [x] Dark/Light theme system
- [x] Location services

### 🔄 Phase 2: Backend Integration (In Progress)
- [ ] Firebase Authentication
- [ ] Firestore database setup
- [ ] Real-time order updates
- [ ] Push notifications

### 📋 Phase 3: Advanced Features
- [ ] Payment gateway (Razorpay/Stripe)
- [ ] GPS tracking for deliveries
- [ ] Analytics dashboard
- [ ] Multi-language support

### 🚀 Phase 4: Scaling
- [ ] Restaurant onboarding flow
- [ ] Driver verification system
- [ ] Admin analytics
- [ ] Performance optimization

---

## 👥 Team

Built by **Growtez**

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Acknowledgements

- [React Native](https://reactnative.dev/)
- [React](https://react.dev/)
- [Firebase](https://firebase.google.com/)
- [Lucide Icons](https://lucide.dev/)
