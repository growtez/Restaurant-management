// ==========================================
// Menu Service
// ==========================================

import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    collection,
} from 'firebase/firestore';
import { db } from '../config';
import { MenuCategory, MenuItem } from '@restaurant-saas/types';

// ==========================================
// Helper: Get menu collection refs
// ==========================================

const categoriesCollection = (restaurantId: string) =>
    collection(db, 'restaurants', restaurantId, 'menus', 'categories', 'items');

const menuItemsCollection = (restaurantId: string) =>
    collection(db, 'restaurants', restaurantId, 'menus', 'menuItems', 'items');

// ==========================================
// Category CRUD
// ==========================================

export const getCategories = async (restaurantId: string): Promise<MenuCategory[]> => {
    const q = query(
        categoriesCollection(restaurantId),
        orderBy('order', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuCategory));
};

export const getCategory = async (
    restaurantId: string,
    categoryId: string
): Promise<MenuCategory | null> => {
    const docSnap = await getDoc(doc(categoriesCollection(restaurantId), categoryId));
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MenuCategory;
    }
    return null;
};

export const createCategory = async (
    restaurantId: string,
    category: Omit<MenuCategory, 'id'>
): Promise<string> => {
    const docRef = doc(categoriesCollection(restaurantId));
    await setDoc(docRef, category);
    return docRef.id;
};

export const updateCategory = async (
    restaurantId: string,
    categoryId: string,
    data: Partial<MenuCategory>
): Promise<void> => {
    await updateDoc(doc(categoriesCollection(restaurantId), categoryId), data);
};

export const deleteCategory = async (
    restaurantId: string,
    categoryId: string
): Promise<void> => {
    await deleteDoc(doc(categoriesCollection(restaurantId), categoryId));
};

// ==========================================
// Menu Item CRUD
// ==========================================

export const getMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
    const querySnapshot = await getDocs(menuItemsCollection(restaurantId));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
};

export const getMenuItemsByCategory = async (
    restaurantId: string,
    categoryId: string
): Promise<MenuItem[]> => {
    const q = query(
        menuItemsCollection(restaurantId),
        where('categoryId', '==', categoryId),
        where('available', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
};

export const getAvailableMenuItems = async (restaurantId: string): Promise<MenuItem[]> => {
    const q = query(
        menuItemsCollection(restaurantId),
        where('available', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
};

export const getMenuItem = async (
    restaurantId: string,
    itemId: string
): Promise<MenuItem | null> => {
    const docSnap = await getDoc(doc(menuItemsCollection(restaurantId), itemId));
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as MenuItem;
    }
    return null;
};

export const createMenuItem = async (
    restaurantId: string,
    item: Omit<MenuItem, 'id'>
): Promise<string> => {
    const docRef = doc(menuItemsCollection(restaurantId));
    await setDoc(docRef, item);
    return docRef.id;
};

export const updateMenuItem = async (
    restaurantId: string,
    itemId: string,
    data: Partial<MenuItem>
): Promise<void> => {
    await updateDoc(doc(menuItemsCollection(restaurantId), itemId), data);
};

export const deleteMenuItem = async (
    restaurantId: string,
    itemId: string
): Promise<void> => {
    await deleteDoc(doc(menuItemsCollection(restaurantId), itemId));
};

export const toggleItemAvailability = async (
    restaurantId: string,
    itemId: string,
    available: boolean
): Promise<void> => {
    await updateDoc(doc(menuItemsCollection(restaurantId), itemId), { available });
};

// ==========================================
// Full Menu (Categories + Items)
// ==========================================

export interface MenuWithItems {
    category: MenuCategory;
    items: MenuItem[];
}

export const getFullMenu = async (restaurantId: string): Promise<MenuWithItems[]> => {
    const categories = await getCategories(restaurantId);
    const items = await getAvailableMenuItems(restaurantId);

    return categories
        .filter(cat => cat.active)
        .map(category => ({
            category,
            items: items.filter(item => item.categoryId === category.id),
        }));
};
