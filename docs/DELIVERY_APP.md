# Delivery App Documentation

## 🚚 Overview

The **Delivery App** is a React Native mobile application designed for delivery partners (drivers). It enables them to receive orders, navigate to pickup/drop locations, update order status, and track their earnings.

### Key Features
- Online/Offline toggle
- Accept new orders
- Real-time order tracking
- Status updates (Picked up → On the way → Delivered)
- Navigate to addresses
- Earnings dashboard
- Dark/Light theme support

---

## 🏗️ Project Structure

```
apps/delivery-app/
├── android/                    # Android native code
├── ios/                        # iOS native code (if needed)
├── src/
│   ├── context/
│   │   └── ThemeContext.js     # Theme state management
│   ├── navigation/
│   │   └── AppNavigator.js     # Navigation configuration
│   ├── screens/
│   │   ├── HomeScreen.js       # Dashboard with online toggle
│   │   ├── OrdersScreen.js     # Active & completed orders
│   │   ├── EarningsScreen.js   # Earnings & transactions
│   │   ├── ProfileScreen.js    # Driver profile & settings
│   │   ├── OrderDetailScreen.js # Order details & actions
│   │   └── SettingsScreen.js   # Theme & preferences
│   └── theme.js                # Color definitions
├── App.tsx                     # Root component
├── package.json                # Dependencies
└── metro.config.js             # Metro bundler config
```

---

## 🎨 Theming System

### Color Palette

The delivery app uses **Green** as the primary color to distinguish it from the customer app:

```javascript
// Delivery App Colors
{
  primary: '#4CAF50',      // Green - Delivery accent
  primaryDark: '#388E3C',
  success: '#4CAF50',
  online: '#4CAF50',       // Online status
  offline: '#9E9E9E',      // Offline status
  warning: '#FF9800',
  error: '#FF4444',
}

// Dark Theme
{
  background: '#212121',
  card: '#2D2D2D',
  text: '#FFFFFF',
  textMuted: '#888888',
}

// Light Theme
{
  background: '#F5F5F5',
  card: '#FFFFFF',
  text: '#212121',
  textMuted: '#999999',
}
```

### Using Theme in Screens

```javascript
import {useTheme} from '../context/ThemeContext';

const MyScreen = () => {
  const {theme, isDark, toggleTheme} = useTheme();
  const colors = theme.colors;

  return (
    <View style={{backgroundColor: colors.background}}>
      <Text style={{color: colors.text}}>Hello Driver!</Text>
      <View style={{backgroundColor: colors.primary}}>
        <Text>Online</Text>
      </View>
    </View>
  );
};
```

---

## 🧭 Navigation Structure

### Tab Navigation (Bottom Bar)

| Tab | Screen | Icon | Purpose |
|-----|--------|------|---------|
| Home | HomeScreen | home | Dashboard & new orders |
| Orders | OrdersScreen | package | Active/Completed orders |
| Earnings | EarningsScreen | dollar-sign | Earnings & transactions |
| Profile | ProfileScreen | user | Profile & settings |

### Stack Navigation

```
MainApp (Tabs)
├── Home
├── Orders
├── Earnings
└── Profile
    └── Settings (push)

Additional Screens:
├── OrderDetail (push) - Order management
└── Settings (push) - Theme & preferences
```

### Adding a New Screen

1. Create screen in `src/screens/NewScreen.js`
2. Add to `AppNavigator.js`:
```javascript
import NewScreen from '../screens/NewScreen';

// Inside Stack.Navigator
<Stack.Screen name="NewScreen" component={NewScreen} />
```

3. Navigate:
```javascript
navigation.navigate('NewScreen', { param: value });
```

---

## 📱 Key Screens Reference

### HomeScreen.js

**Purpose**: Main dashboard for delivery partners

**Key Features**:
- Online/Offline toggle switch
- Today's summary stats
- New orders (when online)
- Offline message (when offline)

**State Variables**:
```javascript
const [isOnline, setIsOnline] = useState(false);

const todayStats = {
  deliveries: 12,
  earnings: 1850,
  distance: 45.5,
  hours: 6.5,
};
```

**Online Toggle Implementation**:
```javascript
<View style={styles.onlineCard}>
  <View style={styles.onlineInfo}>
    <View style={[styles.statusDot, {
      backgroundColor: isOnline ? colors.online : colors.offline
    }]} />
    <Text>{isOnline ? 'You are Online' : 'You are Offline'}</Text>
  </View>
  <Switch
    value={isOnline}
    onValueChange={setIsOnline}
    trackColor={{false: colors.border, true: colors.primary + '50'}}
    thumbColor={isOnline ? colors.primary : colors.textMuted}
  />
</View>
```

### OrdersScreen.js

**Purpose**: View active and completed orders

**Key Features**:
- Tab navigation (Active / Completed)
- Order status badges
- Order cards with details
- Navigate to order detail

**Order Status Colors**:
```javascript
const getStatusColor = (status) => {
  switch (status) {
    case 'picked_up': return colors.warning;    // Orange
    case 'on_the_way': return colors.primary;   // Green
    case 'delivered': return colors.success;    // Green
    default: return colors.textMuted;
  }
};
```

### EarningsScreen.js

**Purpose**: Track earnings and view transactions

**Key Sections**:
- Today's earnings card (large display)
- Summary cards (week, month, total deliveries)
- Weekly bar chart
- Recent transactions list

**Earnings Data Structure**:
```javascript
const weeklyEarnings = [
  {day: 'Mon', amount: 450},
  {day: 'Tue', amount: 680},
  // ...
];

const recentTransactions = [
  {
    id: 1,
    type: 'delivery',      // or 'bonus', 'incentive'
    description: 'Order #ORD003 Delivered',
    amount: 65,
    time: '10 mins ago',
  },
];
```

### OrderDetailScreen.js

**Purpose**: Manage individual order delivery

**Key Features**:
- Status progress tracker
- Restaurant pickup info
- Customer delivery info
- Navigate button (opens Google Maps)
- Call customer button
- Update status button

**Status Flow**:
```
accepted → picked_up → on_the_way → delivered
```

**Status Update Logic**:
```javascript
const statusSteps = [
  {id: 'accepted', label: 'Order Accepted'},
  {id: 'picked_up', label: 'Picked Up'},
  {id: 'on_the_way', label: 'On The Way'},
  {id: 'delivered', label: 'Delivered'},
];

const handleUpdateStatus = () => {
  const nextIndex = currentStepIndex + 1;
  if (nextIndex < statusSteps.length) {
    setOrderStatus(statusSteps[nextIndex].id);
    // Update in backend
  }
};
```

**Navigation to Maps**:
```javascript
import {Linking} from 'react-native';

const openMaps = () => {
  const address = encodeURIComponent(order.address);
  Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${address}`);
};
```

### ProfileScreen.js

**Purpose**: Driver profile and quick settings

**Key Features**:
- Driver info card with avatar
- Rating display
- Vehicle info with verified badge
- Theme toggle card
- Menu items (Edit Profile, Documents, Settings)
- Logout button

### SettingsScreen.js

**Purpose**: App settings and theme selection

**Key Features**:
- Theme options (Dark/Light/System)
- Radio button selection
- Other preferences

---

## 🔧 Order Management Flow

### Order States

| State | Description | Color |
|-------|-------------|-------|
| `pending` | New order, not accepted | Yellow |
| `accepted` | Driver accepted order | Blue |
| `picked_up` | Order picked from restaurant | Orange |
| `on_the_way` | Driver is delivering | Green |
| `delivered` | Order completed | Green |

### Order Object Structure

```javascript
const order = {
  id: 'ORD001',
  status: 'accepted',
  restaurant: 'Pizza Palace',
  restaurantAddress: '123 Restaurant Street',
  customerName: 'Rahul Kumar',
  customerPhone: '+919876543210',
  address: '456 Customer Street, Mumbai',
  items: 3,
  distance: '2.5 km',
  earning: 75,
  time: '5 mins ago',
};
```

### Updating Order Status (Future API)

```javascript
const updateOrderStatus = async (orderId, newStatus) => {
  // API call
  await fetch(`/api/orders/${orderId}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });

  // Update local state
  setOrderStatus(newStatus);
};
```

---

## 📦 Dependencies

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `react-native` | Mobile framework |
| `@react-navigation/native` | Navigation |
| `@react-navigation/native-stack` | Stack navigation |
| `@react-navigation/bottom-tabs` | Tab navigation |
| `react-native-screens` | Native screen optimization |
| `react-native-safe-area-context` | Safe area handling |
| `react-native-vector-icons` | Icons |
| `react-native-geolocation-service` | GPS location |
| `react-native-maps` | Maps (future) |

---

## 🚀 Running the App

### Development

```bash
cd apps/delivery-app

# Install dependencies
npm install

# Start development
npx react-native run-android
```

**Note**: If customer-app Metro is running, stop it first:
```bash
# Kill all Node processes
taskkill /F /IM node.exe

# Then start delivery-app
npx react-native run-android
```

### Building Release APK

```bash
cd apps/delivery-app/android

./gradlew assembleRelease

# APK at: android/app/build/outputs/apk/release/app-release.apk
```

---

## 🔗 Integration Points

### Real-time Order Updates (Future)

```javascript
import firestore from '@react-native-firebase/firestore';

// Listen for new orders
useEffect(() => {
  if (!isOnline) return;

  const unsubscribe = firestore()
    .collection('orders')
    .where('status', '==', 'pending')
    .where('restaurantArea', '==', driverArea)
    .onSnapshot(snapshot => {
      const newOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingOrders(newOrders);
    });

  return () => unsubscribe();
}, [isOnline]);
```

### Push Notifications (Future)

```javascript
import messaging from '@react-native-firebase/messaging';

// Request permission
await messaging().requestPermission();

// Get FCM token
const token = await messaging().getToken();
// Save to driver profile

// Handle incoming messages
messaging().onMessage(async remoteMessage => {
  // Show notification
  // Update orders list
});
```

---

## 📝 Common Modifications

### Change Primary Color (Green → Another)

1. Edit `src/theme.js`:
```javascript
export const darkColors = {
  primary: '#NEW_COLOR',
  primaryDark: '#DARKER_SHADE',
  // ...
};
```

### Add New Stat to Dashboard

In `HomeScreen.js`:
```javascript
const todayStats = {
  deliveries: 12,
  earnings: 1850,
  distance: 45.5,
  hours: 6.5,
  tips: 250,  // New stat
};

// In render
<View style={styles.statCard}>
  <Icon name="gift" size={24} color={colors.primary} />
  <Text style={styles.statValue}>₹{todayStats.tips}</Text>
  <Text style={styles.statLabel}>Tips</Text>
</View>
```

### Add New Order Action

In `OrderDetailScreen.js`:
```javascript
// Add new action button
<TouchableOpacity
  style={styles.actionBtn}
  onPress={handleNewAction}
>
  <Icon name="icon-name" size={18} color={colors.primary} />
  <Text>New Action</Text>
</TouchableOpacity>
```

---

## 🗺️ Maps Integration (Future)

### Google Maps Setup

1. Get API key from Google Cloud Console
2. Add to `AndroidManifest.xml`:
```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_API_KEY"/>
```

3. Use in screen:
```javascript
import MapView, {Marker} from 'react-native-maps';

<MapView
  style={{flex: 1}}
  initialRegion={{
    latitude: 19.0760,
    longitude: 72.8777,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker
    coordinate={{latitude: restaurant.lat, longitude: restaurant.lng}}
    title="Pickup"
  />
  <Marker
    coordinate={{latitude: customer.lat, longitude: customer.lng}}
    title="Drop"
  />
</MapView>
```

---

## ⚠️ Troubleshooting

### App crashes on launch
```bash
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### Metro port conflict
```bash
# Kill all Metro instances
taskkill /F /IM node.exe

# Start with specific port
npx react-native start --port 8082
```

### Icons not showing
```bash
# Rebuild after installing vector icons
npx react-native run-android
```
