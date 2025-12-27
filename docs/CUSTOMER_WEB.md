# Customer Web Documentation

## 🌐 Overview

The **Customer Web** is a React web application that provides the same ordering experience as the mobile app but accessible via any web browser. It's built with Vite and React, featuring a mobile-first responsive design.

### Key Features
- Browse restaurant menus
- Add items to cart
- Place orders
- Dark/Light theme toggle
- QR code ordering for dine-in
- Responsive mobile-first design

---

## 🏗️ Project Structure

```
apps/customer-web/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   └── hamburger.jsx       # Hamburger menu component
│   ├── context/
│   │   └── ThemeContext.js     # Theme state with CSS variables
│   ├── pages/
│   │   ├── home.jsx            # Main home page
│   │   ├── home.css            # Home page styles
│   │   ├── menu.jsx            # Menu page
│   │   ├── menu.css            # Menu styles
│   │   ├── my_order.jsx        # Cart/Orders page
│   │   ├── my_order.css        # Orders styles
│   │   ├── profile.jsx         # Profile page
│   │   ├── profile.css         # Profile styles
│   │   ├── settings.jsx        # Settings page
│   │   ├── settings.css        # Settings styles
│   │   ├── likes.jsx           # Favorites page
│   │   ├── popular.jsx         # Most popular items
│   │   ├── recent.jsx          # Recent orders
│   │   ├── offers.jsx          # Offers & rewards
│   │   ├── login.jsx           # Login page
│   │   ├── onboarding.jsx      # Onboarding flow
│   │   └── qr/                 # QR ordering pages
│   │       ├── menu.jsx        # QR menu
│   │       ├── cart.jsx        # QR cart
│   │       └── order_success.jsx
│   ├── App.js                  # Main app with router
│   ├── App.css                 # Global app styles
│   └── index.css               # CSS variables & base styles
├── index.html                  # HTML entry point
├── package.json                # Dependencies
└── vite.config.js              # Vite configuration
```

---

## 🎨 Theming System

### How It Works

1. **ThemeContext.js** manages theme state
2. CSS variables are set on `:root` element
3. All CSS files use `var(--color-name)` syntax
4. Theme changes apply instantly across all pages

### CSS Variables

```css
:root {
  --color-primary: #d9b550;
  --color-background: #212121;      /* Dark mode */
  --color-card: #2D2D2D;
  --color-text: #FFFFFF;
  --color-text-muted: #888888;
  --color-border: #333333;
  /* Light mode: These update dynamically */
}
```

### Using Theme in Components

```jsx
import { useTheme } from '../context/ThemeContext';

const MyComponent = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <div style={{ backgroundColor: theme.background }}>
      <h1 style={{ color: theme.text }}>Hello</h1>
      <button onClick={() => toggleTheme(isDark ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### Using Theme in CSS

```css
.my-container {
  background-color: var(--color-background);
  color: var(--color-text);
}

.my-card {
  background-color: var(--color-card);
  border: 1px solid var(--color-border);
}

.my-button {
  background-color: var(--color-primary);
  color: #1a1a1a;
}
```

---

## 🧭 Routing Structure

### Main Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | HomePage | Main home with offers |
| `/menu` | MenuPage | Full menu |
| `/orders` | MyOrdersPage | Cart & order history |
| `/profile` | ProfilePage | User profile |
| `/settings` | SettingsPage | Theme & preferences |
| `/likes` | LikesPage | Favorite items |
| `/popular` | MostPopularPage | Popular items |
| `/recent` | RecentOrdersPage | Recent orders |
| `/offers` | OffersPage | Offers & rewards |
| `/login` | LoginPage | Authentication |
| `/onboarding` | OnboardingPage | New user flow |

### QR Ordering Routes (Dine-in)

| Route | Description |
|-------|-------------|
| `/r/:restaurantSlug` | QR menu for restaurant |
| `/r/:restaurantSlug/table/:tableNumber` | Table-specific menu |
| `/r/:restaurantSlug/cart` | QR cart |
| `/r/:restaurantSlug/order-success` | Order confirmation |

### Adding a New Route

1. Create page in `src/pages/`:
```jsx
// src/pages/new_page.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './new_page.css';

const NewPage = () => {
  const { theme } = useTheme();

  return (
    <div className="new-container" style={{ backgroundColor: theme.background }}>
      <h1 style={{ color: theme.text }}>New Page</h1>
    </div>
  );
};

export default NewPage;
```

2. Create CSS file `src/pages/new_page.css`

3. Add to `App.js`:
```jsx
import NewPage from './pages/new_page';

// Inside Routes
<Route path="/new-page" element={<NewPage />} />
```

---

## 📜 Key Pages Reference

### home.jsx

**Purpose**: Main landing page with featured content

**Key Sections**:
- Header with hamburger menu
- Delivery location indicator
- Search bar
- Featured offers carousel with slider dots
- "Most Popular" section with items
- "Recent Orders" section
- Bottom navigation bar
- Item detail modal

**State Variables**:
```jsx
const [searchTerm, setSearchTerm] = useState('');
const [favorites, setFavorites] = useState([]);
const [cart, setCart] = useState([]);
const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
const [selectedItem, setSelectedItem] = useState(null);
const [showItemModal, setShowItemModal] = useState(false);
```

### menu.jsx

**Purpose**: Full menu with category filtering

**Key Features**:
- Category tabs
- Search filter
- Menu items grid
- Add to cart functionality
- Item modal

### my_order.jsx

**Purpose**: Cart management and order history

**Key Features**:
- Tab navigation (Cart / History)
- Quantity controls
- Order summary calculation
- Place order button
- Past orders list

### profile.jsx

**Purpose**: User profile and quick settings

**Key Features**:
- Avatar and user info
- Quick theme toggle
- Stats cards (orders, favorites, points)
- Menu items (History, Favorites, Settings)
- Logout button

### settings.jsx

**Purpose**: Full settings page

**Key Features**:
- Theme selection (Dark/Light/System)
- Radio button selection
- Other preferences
- App version info

---

## 🎯 Component Patterns

### Bottom Navigation

Every page includes bottom navigation:

```jsx
<nav className="bottom-nav" style={{ backgroundColor: theme.card, borderTopColor: theme.border }}>
  <NavLink to="/" className="nav-btn">
    <Home size={24} color={theme.textMuted} />
  </NavLink>
  <NavLink to="/menu" className="nav-btn">
    <ShoppingBag size={24} color={theme.textMuted} />
  </NavLink>
  <NavLink to="/orders" className="nav-btn">
    <ShoppingCart size={24} color={theme.textMuted} />
  </NavLink>
  <NavLink to="/profile" className="nav-btn active">
    <User size={24} color={theme.text} />
  </NavLink>
</nav>
```

### Card Component Pattern

```jsx
<div className="food-item" style={{ backgroundColor: theme.card }}>
  <img src={item.image} alt={item.name} className="food-image" />
  <div className="food-info">
    <h3 style={{ color: theme.text }}>{item.name}</h3>
    <p style={{ color: theme.textMuted }}>{item.description}</p>
  </div>
  <span className="food-price" style={{ backgroundColor: theme.primary }}>
    ₹{item.price}
  </span>
</div>
```

### Modal Pattern

```jsx
{showModal && (
  <div className="modal-overlay">
    <div className="modal-backdrop" onClick={() => setShowModal(false)} />
    <div className="modal-content" style={{ backgroundColor: theme.card }}>
      {/* Modal content */}
      <button onClick={() => setShowModal(false)}>Close</button>
    </div>
  </div>
)}
```

---

## 🔧 CSS Conventions

### File Organization

Each page has its own CSS file:
- `home.jsx` → `home.css`
- `menu.jsx` → `menu.css`

### Naming Convention

```css
/* Container for the page */
.home-container { }

/* Section within page */
.home-container .header { }
.home-container .main-title { }

/* Component classes */
.food-item { }
.food-item .food-image { }
.food-item .food-info { }
```

### CSS Variable Usage

All colors should use CSS variables:
```css
/* ✅ Correct - Uses variable */
.my-element {
  background-color: var(--color-background);
  color: var(--color-text);
}

/* ❌ Avoid - Hardcoded color */
.my-element {
  background-color: #212121;
  color: #FFFFFF;
}
```

---

## 📦 Dependencies

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `react-dom` | DOM rendering |
| `react-router-dom` | Routing |
| `lucide-react` | Icons |
| `vite` | Build tool |

### Adding a Dependency

```bash
cd apps/customer-web
npm install <package-name>
```

---

## 🚀 Running the App

### Development

```bash
cd apps/customer-web

# Install dependencies
npm install

# Start development server
npm run dev

# Opens at http://localhost:3002
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Output in dist/ folder
```

### Deploying to Firebase

```bash
# From root directory
firebase deploy --only hosting:customer-web
```

---

## 🔗 API Integration (Future)

### Fetching Menu Data

```jsx
import { useEffect, useState } from 'react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/restaurants/restaurant-id/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data));
  }, []);

  return (
    <div>
      {menuItems.map(item => (
        <FoodItem key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### Placing an Order

```jsx
const placeOrder = async (cart) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: cart,
      address: selectedAddress,
      total: calculateTotal(cart),
    }),
  });
  return response.json();
};
```

---

## 📝 Common Modifications

### Change Primary Color

1. Edit `src/index.css`:
```css
:root {
  --color-primary: #NEW_COLOR;
}
```

2. Update `src/context/ThemeContext.js`:
```javascript
const themes = {
  dark: {
    primary: '#NEW_COLOR',
    // ...
  },
  light: {
    primary: '#NEW_COLOR',
    // ...
  },
};
```

### Add New Menu Category

In `menu.jsx`:
```jsx
const categories = ['Starters', 'Main Course', 'Drinks', 'Desserts', 'NEW_CATEGORY'];

const menuData = {
  'NEW_CATEGORY': [
    { id: 1, name: 'New Item', price: 200, image: '...' },
  ],
};
```

### Add Quick Action Button

In any page:
```jsx
<button
  className="action-btn"
  style={{ backgroundColor: theme.primary }}
  onClick={handleAction}
>
  Action Text
</button>
```

---

## ⚠️ Troubleshooting

### Page not updating with theme
- Ensure CSS uses `var(--color-name)` variables
- Check if ThemeContext is wrapping the App

### Slow builds
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### 404 on refresh
- Ensure `vite.config.js` has proper base path
- For Firebase hosting, add rewrite rules
