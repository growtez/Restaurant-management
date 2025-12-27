// ==========================================
// Restaurant Service
// ==========================================

import {
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    serverTimestamp,
    collection,
} from 'firebase/firestore';
import { db } from '../config';
import { restaurantsRef, restaurantRef } from '../collections';
import {
    Restaurant,
    RestaurantSubscription,
    RestaurantBranding,
    RestaurantFeatures,
    RestaurantStatus,
    SubscriptionPlan,
} from '@restaurant-saas/types';

// ==========================================
// Restaurant CRUD
// ==========================================

export const getRestaurant = async (restaurantId: string): Promise<Restaurant | null> => {
    const docSnap = await getDoc(restaurantRef(restaurantId));
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Restaurant;
    }
    return null;
};

export const getRestaurantBySlug = async (slug: string): Promise<Restaurant | null> => {
    const q = query(restaurantsRef(), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Restaurant;
    }
    return null;
};

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
    const querySnapshot = await getDocs(restaurantsRef());
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
};

export const getActiveRestaurants = async (): Promise<Restaurant[]> => {
    const q = query(restaurantsRef(), where('status', '==', RestaurantStatus.ACTIVE));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
};

export const createRestaurant = async (
    restaurantData: Omit<Restaurant, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
    const docRef = doc(restaurantsRef());

    await setDoc(docRef, {
        ...restaurantData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return docRef.id;
};

export const updateRestaurant = async (
    restaurantId: string,
    data: Partial<Restaurant>
): Promise<void> => {
    await updateDoc(restaurantRef(restaurantId), {
        ...data,
        updatedAt: serverTimestamp(),
    });
};

// ==========================================
// Subscription Management
// ==========================================

export const getRestaurantSubscription = async (
    restaurantId: string
): Promise<RestaurantSubscription | null> => {
    const docSnap = await getDoc(doc(db, 'restaurants', restaurantId, 'subscription', 'current'));
    if (docSnap.exists()) {
        return docSnap.data() as RestaurantSubscription;
    }
    return null;
};

export const updateSubscription = async (
    restaurantId: string,
    subscription: Partial<RestaurantSubscription>
): Promise<void> => {
    await setDoc(
        doc(db, 'restaurants', restaurantId, 'subscription', 'current'),
        subscription,
        { merge: true }
    );
};

// ==========================================
// Branding Management
// ==========================================

export const getRestaurantBranding = async (
    restaurantId: string
): Promise<RestaurantBranding | null> => {
    const docSnap = await getDoc(doc(db, 'restaurants', restaurantId, 'branding', 'current'));
    if (docSnap.exists()) {
        return docSnap.data() as RestaurantBranding;
    }
    return null;
};

export const updateBranding = async (
    restaurantId: string,
    branding: Partial<RestaurantBranding>
): Promise<void> => {
    await setDoc(
        doc(db, 'restaurants', restaurantId, 'branding', 'current'),
        branding,
        { merge: true }
    );
};

// ==========================================
// Features Management
// ==========================================

export const getRestaurantFeatures = async (
    restaurantId: string
): Promise<RestaurantFeatures | null> => {
    const docSnap = await getDoc(doc(db, 'restaurants', restaurantId, 'features', 'current'));
    if (docSnap.exists()) {
        return docSnap.data() as RestaurantFeatures;
    }
    return null;
};

export const updateFeatures = async (
    restaurantId: string,
    features: Partial<RestaurantFeatures>
): Promise<void> => {
    await setDoc(
        doc(db, 'restaurants', restaurantId, 'features', 'current'),
        features,
        { merge: true }
    );
};

// ==========================================
// Feature Flag Helpers
// ==========================================

export const getDefaultFeaturesForPlan = (plan: SubscriptionPlan): RestaurantFeatures => {
    switch (plan) {
        case SubscriptionPlan.QR:
            return {
                qrOrder: true,
                delivery: false,
                customDomain: false,
                ownedApp: false,
            };
        case SubscriptionPlan.DELIVERY:
            return {
                qrOrder: true,
                delivery: true,
                customDomain: true,
                ownedApp: false,
            };
        case SubscriptionPlan.OWNED:
            return {
                qrOrder: true,
                delivery: true,
                customDomain: true,
                ownedApp: true,
            };
        default:
            return {
                qrOrder: false,
                delivery: false,
                customDomain: false,
                ownedApp: false,
            };
    }
};
