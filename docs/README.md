# Restaurant SaaS - Complete Application Documentation

## 📚 Table of Contents

1. [Project Overview](#project-overview)
2. [Application Architecture](#application-architecture)
3. [Shared Design System](#shared-design-system)
4. [App Documentation Links](#app-documentation-links)
5. [Development Workflow](#development-workflow)
6. [Future Roadmap](#future-roadmap)

---

## 🎯 Project Overview

This is a **Restaurant SaaS (Software as a Service)** platform that enables restaurants to manage their delivery and dine-in operations. The platform consists of multiple applications serving different user roles.

### Business Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SUPER ADMIN                                   │
│                  (Platform Owner/You)                                │
│          Manages all restaurants on the platform                     │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    RESTAURANT ADMIN                                  │
│                 (Restaurant Owners)                                  │
│     Each restaurant has their own admin panel                        │
└─────────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌───────────────────┐ ┌───────────────┐ ┌───────────────────┐
│   CUSTOMER APP    │ │ CUSTOMER WEB  │ │   DELIVERY APP    │
│  (Mobile - RN)    │ │  (React SPA)  │ │  (Mobile - RN)    │
│  Food ordering    │ │ Food ordering │ │ Order delivery    │
└───────────────────┘ └───────────────┘ └───────────────────┘
```

### User Roles

| Role | Description | Application |
|------|-------------|-------------|
| **Super Admin** | Platform owner who manages all restaurants | `super-admin/` |
| **Restaurant Admin** | Restaurant owner managing menu, orders, staff | `restaurant-admin/` |
| **Customer** | End-user who orders food | `customer-app/`, `customer-web/` |
| **Delivery Partner** | Driver who delivers orders | `delivery-app/` |

---

## 🏗️ Application Architecture

### Directory Structure

```
s:/growtez/3.Restaurant-web_app/
├── apps/
│   ├── customer-app/        # React Native mobile app for customers
│   ├── customer-web/        # React web app for customers
│   ├── delivery-app/        # React Native mobile app for drivers
│   ├── restaurant-admin/    # React web admin panel for restaurants
│   └── super-admin/         # React web admin for platform owner
├── docs/                    # Documentation
├── firebase.json            # Firebase hosting configuration
└── package.json             # Root monorepo configuration
```

### Technology Stack

| Layer | Technology |
|-------|------------|
| **Mobile Apps** | React Native 0.83, React Navigation 7 |
| **Web Apps** | React 18/19, Vite, React Router |
| **Styling** | CSS Variables, StyleSheet (RN) |
| **Icons** | Lucide React (web), react-native-vector-icons (mobile) |
| **Backend** | Firebase (Firestore, Auth, Storage) |
| **Hosting** | Firebase Hosting |

---

## 🎨 Shared Design System

### Color Palette

All apps share a consistent color system using CSS variables (web) and theme context (mobile):

#### Customer Apps (customer-app, customer-web)
```javascript
// Primary: Gold/Amber accent
primary: '#d9b550'

// Dark Theme
background: '#212121'
card: '#2D2D2D'
text: '#FFFFFF'
textMuted: '#888888'

// Light Theme
background: '#F5F5F5'
card: '#FFFFFF'
text: '#212121'
textMuted: '#999999'
```

#### Delivery App
```javascript
// Primary: Green (distinguishes from customer app)
primary: '#4CAF50'

// Same dark/light theme structure
```

### Theme Implementation

#### Mobile Apps (React Native)
```
src/
├── context/
│   └── ThemeContext.js      # Theme state management
├── theme.js                  # Color definitions
└── screens/
    └── SettingsScreen.js     # Theme toggle UI
```

#### Web Apps
```
src/
├── context/
│   └── ThemeContext.js      # Theme with CSS variables
├── index.css                 # CSS variable definitions
└── pages/
    └── settings.jsx          # Theme toggle UI
```

### Spacing & Typography

```javascript
// Consistent spacing across all apps
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Font: Poppins (Google Fonts)
```

---

## 📱 App Documentation Links

| App | Documentation | Purpose |
|-----|---------------|---------|
| [Customer App](./CUSTOMER_APP.md) | Mobile app for ordering | End-user food ordering |
| [Customer Web](./CUSTOMER_WEB.md) | Web app for ordering | Browser-based ordering |
| [Delivery App](./DELIVERY_APP.md) | Mobile app for drivers | Order delivery management |
| [Restaurant Admin](./RESTAURANT_ADMIN.md) | Web admin panel | Restaurant management |
| [Super Admin](./SUPER_ADMIN.md) | Platform admin | Multi-restaurant management |

---

## 💻 Development Workflow

### Prerequisites

- Node.js 20+
- npm 10+
- Android Studio (for mobile apps)
- JDK 17
- Firebase CLI

### Running Each App

#### Customer Web
```bash
cd apps/customer-web
npm install
npm run dev          # Start development server
# Opens at http://localhost:3002
```

#### Customer App (Mobile)
```bash
cd apps/customer-app
npm install
npx react-native run-android
# Metro bundler starts on port 8081
```

#### Delivery App (Mobile)
```bash
cd apps/delivery-app
npm install
npx react-native run-android
# Note: Close other Metro bundlers first
```

#### Restaurant Admin
```bash
cd apps/restaurant-admin
npm install
npm run dev
# Opens at http://localhost:5173
```

### Building for Production

#### Android APK
```bash
cd apps/customer-app
cd android
./gradlew assembleRelease
# APK at: android/app/build/outputs/apk/release/
```

#### Web Build
```bash
cd apps/customer-web
npm run build
# Output in: dist/
```

---

## 🔗 How Apps Are Connected

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     FIREBASE BACKEND                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Firestore  │  │    Auth     │  │      Storage        │  │
│  │  (Database) │  │   (Users)   │  │  (Images/Files)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         │                  │                    │
         ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                    ALL APPLICATIONS                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │ Customer │ │ Customer │ │ Delivery │ │  Restaurant  │   │
│  │   App    │ │   Web    │ │   App    │ │    Admin     │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Order Lifecycle

```
1. CUSTOMER places order (customer-app or customer-web)
   └─▶ Order created in Firestore

2. RESTAURANT receives notification (restaurant-admin)
   └─▶ Restaurant accepts/prepares order
   └─▶ Order status: "preparing"

3. DELIVERY PARTNER receives order (delivery-app)
   └─▶ Driver accepts order
   └─▶ Driver picks up from restaurant
   └─▶ Order status: "on_the_way"

4. DELIVERY completed
   └─▶ Order status: "delivered"
   └─▶ Customer can rate & review
```

### Shared Collections (Firestore)

| Collection | Used By | Description |
|------------|---------|-------------|
| `restaurants` | All apps | Restaurant profiles |
| `menus` | Customer, Restaurant | Menu items |
| `orders` | All apps | Order data |
| `users` | All apps | User profiles |
| `drivers` | Delivery, Super Admin | Driver profiles |

---

## 🚀 Future Roadmap

### Phase 1: Core Features ✅
- [x] Customer app with ordering
- [x] Customer web with ordering
- [x] Delivery app with order management
- [x] Dark/Light theme system
- [x] Location services

### Phase 2: Backend Integration
- [ ] Firebase Authentication
- [ ] Firestore database setup
- [ ] Real-time order updates
- [ ] Push notifications

### Phase 3: Advanced Features
- [ ] Payment gateway integration
- [ ] GPS tracking for deliveries
- [ ] Analytics dashboard
- [ ] Multi-language support

### Phase 4: Scaling
- [ ] Restaurant onboarding flow
- [ ] Driver verification system
- [ ] Admin analytics
- [ ] Performance optimization

---

## 📞 Support

For questions about this project, contact the development team or refer to the individual app documentation files.
