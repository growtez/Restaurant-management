// ==========================================
// Firestore Collection References
// ==========================================

import {
    collection,
    doc,
    CollectionReference,
    DocumentReference
} from 'firebase/firestore';
import { db } from './config';

// ==========================================
// Collection Names (Constants)
// ==========================================

export const COLLECTIONS = {
    // Platform level
    SAAS: 'saas',
    SUPER_ADMINS: 'superAdmins',
    USERS: 'users',
    RESTAURANTS: 'restaurants',

    // Restaurant subcollections
    SUBSCRIPTION: 'subscription',
    BRANDING: 'branding',
    FEATURES: 'features',
    RESTAURANT_USERS: 'users',
    MENUS: 'menus',
    CATEGORIES: 'categories',
    ITEMS: 'items',
    TABLES: 'tables',
    CARTS: 'carts',
    ORDERS: 'orders',
    DELIVERY: 'delivery',
    AGENTS: 'agents',
    ASSIGNMENTS: 'assignments',
    ANALYTICS: 'analytics',

    // User subcollections
    ADDRESSES: 'addresses',
} as const;

// ==========================================
// Collection References
// ==========================================

// Platform level collections
export const saasRef = () => collection(db, COLLECTIONS.SAAS);
export const superAdminsRef = () => collection(db, COLLECTIONS.SUPER_ADMINS);
export const usersRef = () => collection(db, COLLECTIONS.USERS);
export const restaurantsRef = () => collection(db, COLLECTIONS.RESTAURANTS);

// Restaurant document
export const restaurantRef = (restaurantId: string) =>
    doc(db, COLLECTIONS.RESTAURANTS, restaurantId);

// Restaurant subcollections
export const restaurantUsersRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.RESTAURANT_USERS);

export const menuCategoriesRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.MENUS, 'data', COLLECTIONS.CATEGORIES);

export const menuItemsRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.MENUS, 'data', COLLECTIONS.ITEMS);

export const tablesRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.TABLES);

export const cartsRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.CARTS);

export const cartRef = (restaurantId: string, cartId: string) =>
    doc(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.CARTS, cartId);

export const ordersRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.ORDERS);

export const orderRef = (restaurantId: string, orderId: string) =>
    doc(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.ORDERS, orderId);

export const deliveryAgentsRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.DELIVERY, 'data', COLLECTIONS.AGENTS);

export const analyticsRef = (restaurantId: string) =>
    collection(db, COLLECTIONS.RESTAURANTS, restaurantId, COLLECTIONS.ANALYTICS);

// User subcollections
export const userAddressesRef = (userId: string) =>
    collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.ADDRESSES);
