// Firebase Services for Customer Web
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

// ============================================
// RESTAURANT SERVICES
// ============================================

/**
 * Get all active restaurants
 */
export const getRestaurants = async () => {
    const q = query(
        collection(db, 'restaurants'),
        where('status', '==', 'active'),
        orderBy('name')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Get restaurant by ID
 */
export const getRestaurant = async (restaurantId) => {
    const docRef = doc(db, 'restaurants', restaurantId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};

// ============================================
// MENU SERVICES
// ============================================

/**
 * Get menu items for a restaurant
 */
export const getMenuItems = async (restaurantId) => {
    const q = query(
        collection(db, 'restaurants', restaurantId, 'menu'),
        where('isAvailable', '==', true),
        orderBy('category'),
        orderBy('name')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Get menu items by category
 */
export const getMenuByCategory = async (restaurantId, category) => {
    const q = query(
        collection(db, 'restaurants', restaurantId, 'menu'),
        where('category', '==', category),
        where('isAvailable', '==', true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// ============================================
// ORDER SERVICES
// ============================================

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
    const ordersRef = collection(db, 'orders');
    const order = {
        ...orderData,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(ordersRef, order);
    return { id: docRef.id, ...order };
};

/**
 * Get orders for a customer
 */
export const getCustomerOrders = async (customerId) => {
    const q = query(
        collection(db, 'orders'),
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc'),
        limit(20)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

/**
 * Subscribe to order updates (real-time)
 */
export const subscribeToOrder = (orderId, callback) => {
    const orderRef = doc(db, 'orders', orderId);
    return onSnapshot(orderRef, (doc) => {
        if (doc.exists()) {
            callback({ id: doc.id, ...doc.data() });
        }
    });
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
        status,
        updatedAt: serverTimestamp(),
    });
};

// ============================================
// USER SERVICES
// ============================================

/**
 * Get or create user profile
 */
export const getUserProfile = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, data) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
        ...data,
        updatedAt: serverTimestamp(),
    });
};

/**
 * Save user address
 */
export const saveUserAddress = async (userId, address) => {
    const addressRef = collection(db, 'users', userId, 'addresses');
    const docRef = await addDoc(addressRef, {
        ...address,
        createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...address };
};

/**
 * Get user addresses
 */
export const getUserAddresses = async (userId) => {
    const q = query(collection(db, 'users', userId, 'addresses'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// ============================================
// FAVORITES SERVICES
// ============================================

/**
 * Add item to favorites
 */
export const addToFavorites = async (userId, itemId, restaurantId) => {
    const favRef = collection(db, 'users', userId, 'favorites');
    await addDoc(favRef, {
        itemId,
        restaurantId,
        addedAt: serverTimestamp(),
    });
};

/**
 * Remove from favorites
 */
export const removeFromFavorites = async (userId, favoriteId) => {
    const favRef = doc(db, 'users', userId, 'favorites', favoriteId);
    await deleteDoc(favRef);
};

/**
 * Get user favorites
 */
export const getUserFavorites = async (userId) => {
    const q = query(collection(db, 'users', userId, 'favorites'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};
