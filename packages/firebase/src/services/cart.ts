// ==========================================
// Cart Service (Restaurant-Scoped)
// ==========================================

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config';
import { Cart, CartItem, OrderType } from '@restaurant-saas/types';
import { getCurrentUser } from './auth';

// ==========================================
// Session ID for Guest Users
// ==========================================

const SESSION_KEY = 'restaurant_saas_session';

export const getSessionId = (): string => {
    if (typeof window === 'undefined') return 'server';

    let sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
};

export const getCartId = (): string => {
    const user = getCurrentUser();
    return user ? user.uid : getSessionId();
};

// ==========================================
// Cart Collection Reference
// ==========================================

const cartDoc = (restaurantId: string, cartId: string) =>
    doc(db, 'restaurants', restaurantId, 'carts', cartId);

// ==========================================
// Cart CRUD
// ==========================================

export const getCart = async (restaurantId: string): Promise<Cart | null> => {
    const cartId = getCartId();
    const docSnap = await getDoc(cartDoc(restaurantId, cartId));

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Cart;
    }
    return null;
};

export const createOrUpdateCart = async (
    restaurantId: string,
    items: CartItem[],
    type: OrderType,
    tableNumber?: number
): Promise<void> => {
    const cartId = getCartId();

    await setDoc(cartDoc(restaurantId, cartId), {
        items,
        type,
        tableNumber: tableNumber || null,
        updatedAt: serverTimestamp(),
    });
};

export const clearCart = async (restaurantId: string): Promise<void> => {
    const cartId = getCartId();
    await deleteDoc(cartDoc(restaurantId, cartId));
};

// ==========================================
// Cart Item Operations
// ==========================================

export const addToCart = async (
    restaurantId: string,
    item: CartItem,
    type: OrderType,
    tableNumber?: number
): Promise<void> => {
    const cart = await getCart(restaurantId);

    if (cart) {
        // Check if item already exists
        const existingIndex = cart.items.findIndex(
            i => i.itemId === item.itemId &&
                JSON.stringify(i.variant) === JSON.stringify(item.variant) &&
                JSON.stringify(i.addons) === JSON.stringify(item.addons)
        );

        let updatedItems: CartItem[];

        if (existingIndex > -1) {
            // Update quantity
            updatedItems = cart.items.map((i, index) =>
                index === existingIndex
                    ? { ...i, quantity: i.quantity + item.quantity }
                    : i
            );
        } else {
            // Add new item
            updatedItems = [...cart.items, item];
        }

        await createOrUpdateCart(restaurantId, updatedItems, type, tableNumber);
    } else {
        // Create new cart
        await createOrUpdateCart(restaurantId, [item], type, tableNumber);
    }
};

export const updateCartItemQuantity = async (
    restaurantId: string,
    itemIndex: number,
    quantity: number
): Promise<void> => {
    const cart = await getCart(restaurantId);
    if (!cart) return;

    let updatedItems: CartItem[];

    if (quantity <= 0) {
        // Remove item
        updatedItems = cart.items.filter((_, index) => index !== itemIndex);
    } else {
        // Update quantity
        updatedItems = cart.items.map((item, index) =>
            index === itemIndex ? { ...item, quantity } : item
        );
    }

    if (updatedItems.length === 0) {
        await clearCart(restaurantId);
    } else {
        await createOrUpdateCart(restaurantId, updatedItems, cart.type, cart.tableNumber);
    }
};

export const removeFromCart = async (
    restaurantId: string,
    itemIndex: number
): Promise<void> => {
    await updateCartItemQuantity(restaurantId, itemIndex, 0);
};

// ==========================================
// Cart Calculations
// ==========================================

export const calculateCartTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => {
        let itemTotal = item.price * item.quantity;

        // Add variant price if exists
        if (item.variant) {
            itemTotal = item.variant.price * item.quantity;
        }

        // Add addons
        if (item.addons) {
            const addonsTotal = item.addons.reduce((sum, addon) => sum + addon.price, 0);
            itemTotal += addonsTotal * item.quantity;
        }

        return total + itemTotal;
    }, 0);
};

export const getCartItemCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
};
