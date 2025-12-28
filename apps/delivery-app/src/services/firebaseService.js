// Firebase Services for Delivery App
// Using @react-native-firebase packages
//
// Firebase App ID: 1:802832672428:android:32cff2f398fb7f96f26109
// Android Package: com.deliveryapp

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// ============================================
// AUTH SERVICES
// ============================================

/**
 * Sign in driver with email and password
 */
export const signInDriver = async (email, password) => {
    try {
        console.log('🔐 Signing in driver...');
        const userCredential = await auth().signInWithEmailAndPassword(email, password);

        // Verify driver role
        const driverDoc = await firestore()
            .collection('drivers')
            .doc(userCredential.user.uid)
            .get();

        if (!driverDoc.exists) {
            await auth().signOut();
            throw new Error('Not authorized as a delivery driver');
        }

        console.log('✅ Driver signed in:', userCredential.user.email);
        return {
            user: userCredential.user,
            driver: { id: driverDoc.id, ...driverDoc.data() }
        };
    } catch (error) {
        console.error('❌ Sign in error:', error);
        throw error;
    }
};

/**
 * Sign out driver
 */
export const signOutDriver = async () => {
    try {
        await auth().signOut();
        console.log('✅ Driver signed out');
    } catch (error) {
        console.error('❌ Sign out error:', error);
        throw error;
    }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
    return auth().currentUser;
};

/**
 * Subscribe to auth state changes
 */
export const onAuthStateChanged = (callback) => {
    return auth().onAuthStateChanged(callback);
};

// ============================================
// DRIVER PROFILE SERVICES
// ============================================

/**
 * Get driver profile
 */
export const getDriverProfile = async (driverId) => {
    try {
        const doc = await firestore().collection('drivers').doc(driverId).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error fetching driver profile:', error);
        return null;
    }
};

/**
 * Update driver online/offline status
 */
export const updateDriverStatus = async (driverId, isOnline) => {
    try {
        await firestore().collection('drivers').doc(driverId).update({
            isOnline,
            lastSeenAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('✅ Driver status updated:', isOnline ? 'online' : 'offline');
    } catch (error) {
        console.error('Error updating driver status:', error);
        throw error;
    }
};

/**
 * Update driver's current location
 */
export const updateDriverLocation = async (driverId, location) => {
    try {
        await firestore().collection('drivers').doc(driverId).update({
            currentLocation: new firestore.GeoPoint(location.latitude, location.longitude),
            locationUpdatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('📍 Driver location updated');
    } catch (error) {
        console.error('Error updating driver location:', error);
        throw error;
    }
};

// ============================================
// ORDER SERVICES
// ============================================

/**
 * Get available orders for pickup (not assigned to any driver)
 */
export const getAvailableOrders = async () => {
    try {
        console.log('🔥 Fetching available orders...');
        const snapshot = await firestore()
            .collection('orders')
            .where('status', '==', 'ready')
            .where('driverId', '==', null)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();

        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        }));

        console.log(`✅ Found ${orders.length} available orders`);
        return orders;
    } catch (error) {
        console.error('Error fetching available orders:', error);
        return getMockAvailableOrders();
    }
};

/**
 * Get driver's current/active orders
 */
export const getDriverOrders = async (driverId, status = 'active') => {
    try {
        let query = firestore()
            .collection('orders')
            .where('driverId', '==', driverId);

        if (status === 'active') {
            query = query.where('status', 'in', ['accepted', 'picked_up', 'on_the_way']);
        } else {
            query = query
                .where('status', '==', 'delivered')
                .orderBy('deliveredAt', 'desc')
                .limit(20);
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        }));
    } catch (error) {
        console.error('Error fetching driver orders:', error);
        return [];
    }
};

/**
 * Accept an order
 */
export const acceptOrder = async (orderId, driverId) => {
    try {
        await firestore().collection('orders').doc(orderId).update({
            driverId,
            status: 'accepted',
            acceptedAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('✅ Order accepted:', orderId);
        return { success: true };
    } catch (error) {
        console.error('Error accepting order:', error);
        throw error;
    }
};

/**
 * Update order status (picked_up, on_the_way, delivered)
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const update = {
            status,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        };

        if (status === 'picked_up') {
            update.pickedUpAt = firestore.FieldValue.serverTimestamp();
        } else if (status === 'delivered') {
            update.deliveredAt = firestore.FieldValue.serverTimestamp();
        }

        await firestore().collection('orders').doc(orderId).update(update);
        console.log('✅ Order status updated:', orderId, status);
        return { success: true };
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

/**
 * Subscribe to active orders (real-time updates)
 */
export const subscribeToOrders = (driverId, callback) => {
    return firestore()
        .collection('orders')
        .where('driverId', '==', driverId)
        .where('status', 'in', ['accepted', 'picked_up', 'on_the_way'])
        .onSnapshot(snapshot => {
            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            callback(orders);
        }, error => {
            console.error('Error subscribing to orders:', error);
        });
};

/**
 * Subscribe to available orders (real-time)
 */
export const subscribeToAvailableOrders = (callback) => {
    return firestore()
        .collection('orders')
        .where('status', '==', 'ready')
        .where('driverId', '==', null)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .onSnapshot(snapshot => {
            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            callback(orders);
        }, error => {
            console.error('Error subscribing to available orders:', error);
        });
};

// ============================================
// EARNINGS SERVICES
// ============================================

/**
 * Get driver earnings summary
 */
export const getDriverEarnings = async (driverId) => {
    try {
        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get this week's start
        const weekStart = new Date(today);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());

        // Get this month's start
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

        // Fetch delivered orders
        const snapshot = await firestore()
            .collection('orders')
            .where('driverId', '==', driverId)
            .where('status', '==', 'delivered')
            .where('deliveredAt', '>=', monthStart)
            .get();

        let todayEarnings = 0;
        let weekEarnings = 0;
        let monthEarnings = 0;
        let todayDeliveries = 0;

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            const deliveredAt = data.deliveredAt?.toDate();
            const earning = data.deliveryFee || 0;

            if (deliveredAt >= today) {
                todayEarnings += earning;
                todayDeliveries++;
            }
            if (deliveredAt >= weekStart) {
                weekEarnings += earning;
            }
            monthEarnings += earning;
        });

        return {
            today: todayEarnings,
            thisWeek: weekEarnings,
            thisMonth: monthEarnings,
            totalDeliveries: todayDeliveries,
        };
    } catch (error) {
        console.error('Error fetching earnings:', error);
        return {
            today: 0,
            thisWeek: 0,
            thisMonth: 0,
            totalDeliveries: 0,
        };
    }
};

/**
 * Get earnings history
 */
export const getEarningsHistory = async (driverId, limit = 20) => {
    try {
        const snapshot = await firestore()
            .collection('orders')
            .where('driverId', '==', driverId)
            .where('status', '==', 'delivered')
            .orderBy('deliveredAt', 'desc')
            .limit(limit)
            .get();

        return snapshot.docs.map((doc, index) => {
            const data = doc.data();
            return {
                id: index + 1,
                type: 'delivery',
                description: `Order #${doc.id.slice(-6).toUpperCase()} Delivered`,
                amount: data.deliveryFee || 0,
                time: data.deliveredAt?.toDate()?.toLocaleString() || 'Recently',
            };
        });
    } catch (error) {
        console.error('Error fetching earnings history:', error);
        return [];
    }
};

// ============================================
// MOCK DATA (Fallback when Firestore is empty)
// ============================================

const getMockAvailableOrders = () => [
    {
        id: 'ORD001',
        restaurant: 'Pizza Palace',
        restaurantAddress: '123 Restaurant Street',
        customerName: 'Rahul Kumar',
        address: '456 Customer Street, Mumbai',
        items: 3,
        distance: '2.5 km',
        earning: 75,
        status: 'ready',
        createdAt: new Date(),
    },
    {
        id: 'ORD002',
        restaurant: 'Burger Joint',
        customerName: 'Priya Sharma',
        address: '789 Park Avenue, Mumbai',
        items: 2,
        distance: '3.8 km',
        earning: 95,
        status: 'ready',
        createdAt: new Date(),
    },
];

export default {
    // Auth
    signInDriver,
    signOutDriver,
    getCurrentUser,
    onAuthStateChanged,

    // Driver Profile
    getDriverProfile,
    updateDriverStatus,
    updateDriverLocation,

    // Orders
    getAvailableOrders,
    getDriverOrders,
    acceptOrder,
    updateOrderStatus,
    subscribeToOrders,
    subscribeToAvailableOrders,

    // Earnings
    getDriverEarnings,
    getEarningsHistory,
};
