/**
 * Firebase Service for Restaurant Admin Panel
 * 
 * This file contains all Firebase operations for restaurant management:
 * - Restaurant profile management
 * - Menu management (CRUD)
 * - Order management
 * - Analytics and reporting
 */

import { db, auth, storage } from '../firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// ============================================
// RESTAURANT OPERATIONS
// ============================================

/**
 * Get restaurant profile by owner ID
 */
export const getRestaurantByOwner = async (ownerId) => {
    try {
        const q = query(
            collection(db, 'restaurants'),
            where('ownerId', '==', ownerId),
            limit(1)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) return null;
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        throw error;
    }
};

/**
 * Update restaurant profile
 */
export const updateRestaurant = async (restaurantId, data) => {
    try {
        const docRef = doc(db, 'restaurants', restaurantId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating restaurant:', error);
        throw error;
    }
};

/**
 * Upload restaurant image
 */
export const uploadRestaurantImage = async (restaurantId, file) => {
    try {
        const storageRef = ref(storage, `restaurants/${restaurantId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

// ============================================
// MENU OPERATIONS
// ============================================

/**
 * Get all menu items for a restaurant
 */
export const getMenuItems = async (restaurantId) => {
    try {
        const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
        const q = query(menuRef, orderBy('category'), orderBy('name'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
};

/**
 * Add a new menu item
 */
export const addMenuItem = async (restaurantId, itemData) => {
    try {
        const menuRef = collection(db, 'restaurants', restaurantId, 'menu');
        const docRef = await addDoc(menuRef, {
            ...itemData,
            isAvailable: true,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return { id: docRef.id, ...itemData };
    } catch (error) {
        console.error('Error adding menu item:', error);
        throw error;
    }
};

/**
 * Update a menu item
 */
export const updateMenuItem = async (restaurantId, itemId, itemData) => {
    try {
        const docRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
        await updateDoc(docRef, {
            ...itemData,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating menu item:', error);
        throw error;
    }
};

/**
 * Delete a menu item
 */
export const deleteMenuItem = async (restaurantId, itemId) => {
    try {
        const docRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error('Error deleting menu item:', error);
        throw error;
    }
};

/**
 * Toggle menu item availability
 */
export const toggleMenuItemAvailability = async (restaurantId, itemId, isAvailable) => {
    try {
        const docRef = doc(db, 'restaurants', restaurantId, 'menu', itemId);
        await updateDoc(docRef, {
            isAvailable: !isAvailable,
            updatedAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error toggling availability:', error);
        throw error;
    }
};

/**
 * Upload menu item image
 */
export const uploadMenuItemImage = async (restaurantId, itemId, file) => {
    try {
        const storageRef = ref(storage, `restaurants/${restaurantId}/menu/${itemId}_${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading menu image:', error);
        throw error;
    }
};

// ============================================
// ORDER OPERATIONS
// ============================================

/**
 * Get orders for a restaurant (with real-time updates)
 */
export const subscribeToOrders = (restaurantId, callback) => {
    const q = query(
        collection(db, 'orders'),
        where('restaurantId', '==', restaurantId),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        }));
        callback(orders);
    });
};

/**
 * Get orders by status
 */
export const getOrdersByStatus = async (restaurantId, status) => {
    try {
        const q = query(
            collection(db, 'orders'),
            where('restaurantId', '==', restaurantId),
            where('status', '==', status),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const docRef = doc(db, 'orders', orderId);
        await updateDoc(docRef, {
            status,
            updatedAt: serverTimestamp(),
            [`statusHistory.${status}`]: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

/**
 * Get order details
 */
export const getOrderDetails = async (orderId) => {
    try {
        const docRef = doc(db, 'orders', orderId);
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) return null;
        return { id: snapshot.id, ...snapshot.data() };
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// ============================================
// ANALYTICS & REPORTING
// ============================================

/**
 * Get today's statistics
 */
export const getTodayStats = async (restaurantId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
            collection(db, 'orders'),
            where('restaurantId', '==', restaurantId),
            where('createdAt', '>=', today),
            where('status', '!=', 'cancelled')
        );

        const snapshot = await getDocs(q);
        const orders = snapshot.docs.map(doc => doc.data());

        return {
            totalOrders: orders.length,
            totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0),
            pendingOrders: orders.filter(o => o.status === 'pending').length,
            completedOrders: orders.filter(o => o.status === 'delivered').length
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};

/**
 * Get revenue by date range
 */
export const getRevenueByDateRange = async (restaurantId, startDate, endDate) => {
    try {
        const q = query(
            collection(db, 'orders'),
            where('restaurantId', '==', restaurantId),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate),
            where('status', '==', 'delivered')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            date: doc.data().createdAt?.toDate(),
            amount: doc.data().total
        }));
    } catch (error) {
        console.error('Error fetching revenue:', error);
        throw error;
    }
};

/**
 * Get popular items
 */
export const getPopularItems = async (restaurantId, limitCount = 10) => {
    try {
        // This would typically be done with a Cloud Function that aggregates data
        // For now, we'll return mock data structure
        const menuItems = await getMenuItems(restaurantId);
        return menuItems.slice(0, limitCount).map(item => ({
            ...item,
            orderCount: Math.floor(Math.random() * 100) // Placeholder
        }));
    } catch (error) {
        console.error('Error fetching popular items:', error);
        throw error;
    }
};

// ============================================
// CATEGORIES
// ============================================

/**
 * Get unique categories from menu
 */
export const getCategories = async (restaurantId) => {
    try {
        const menuItems = await getMenuItems(restaurantId);
        const categories = [...new Set(menuItems.map(item => item.category))];
        return categories.filter(Boolean).sort();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export default {
    // Restaurant
    getRestaurantByOwner,
    updateRestaurant,
    uploadRestaurantImage,

    // Menu
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleMenuItemAvailability,
    uploadMenuItemImage,
    getCategories,

    // Orders
    subscribeToOrders,
    getOrdersByStatus,
    updateOrderStatus,
    getOrderDetails,

    // Analytics
    getTodayStats,
    getRevenueByDateRange,
    getPopularItems
};
