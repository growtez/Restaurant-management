// Firebase Services for React Native Customer App
// Using @react-native-firebase packages
//
// Firebase App ID: 1:802832672428:web:04060fd62302de56f26109
// Android Package: com.customerapp

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In
GoogleSignin.configure({
    webClientId: '802832672428-XXXXXXXXX.apps.googleusercontent.com', // Get from Firebase Console > Authentication > Sign-in method > Google
    offlineAccess: true,
});


// ============================================
// RESTAURANT SERVICES
// ============================================

/**
 * Get all active restaurants
 */
export const getRestaurants = async () => {
    try {
        console.log('🔥 Fetching restaurants from Firestore...');
        const snapshot = await firestore()
            .collection('restaurants')
            .where('isActive', '==', true)
            .get();

        const restaurants = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`✅ Fetched ${restaurants.length} restaurants`);
        return restaurants;
    } catch (error) {
        console.error('❌ Error fetching restaurants:', error);
        // Return mock data as fallback
        return getMockRestaurants();
    }
};

/**
 * Get a single restaurant by ID
 */
export const getRestaurant = async (restaurantId) => {
    try {
        const doc = await firestore()
            .collection('restaurants')
            .doc(restaurantId)
            .get();

        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        return null;
    }
};

// ============================================
// MENU SERVICES
// ============================================

/**
 * Get menu items for a restaurant
 */
export const getMenuItems = async (restaurantId) => {
    try {
        const snapshot = await firestore()
            .collection('restaurants')
            .doc(restaurantId)
            .collection('menu')
            .where('isAvailable', '==', true)
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching menu:', error);
        return [];
    }
};

// ============================================
// ORDER SERVICES
// ============================================

/**
 * Create a new order
 */
export const createOrder = async (orderData) => {
    try {
        const docRef = await firestore().collection('orders').add({
            ...orderData,
            status: 'pending',
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log('✅ Order created:', docRef.id);
        return { id: docRef.id, ...orderData, status: 'pending' };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

/**
 * Get customer's orders
 */
export const getCustomerOrders = async (customerId) => {
    try {
        const snapshot = await firestore()
            .collection('orders')
            .where('customerId', '==', customerId)
            .orderBy('createdAt', 'desc')
            .limit(20)
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate()
        }));
    } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
};

/**
 * Subscribe to order updates (real-time)
 */
export const subscribeToOrder = (orderId, callback) => {
    return firestore()
        .collection('orders')
        .doc(orderId)
        .onSnapshot(doc => {
            if (doc.exists) {
                callback({ id: doc.id, ...doc.data() });
            }
        }, error => {
            console.error('Error subscribing to order:', error);
        });
};

// ============================================
// AUTH SERVICES
// ============================================

/**
 * Sign in with email and password
 */
export const signIn = async (email, password) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('✅ User signed in:', userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error('❌ Sign in error:', error);
        throw error;
    }
};

/**
 * Sign up with email and password
 */
export const signUp = async (email, password, name) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        // Update display name
        await userCredential.user.updateProfile({ displayName: name });

        // Create user profile in Firestore
        await firestore().collection('users').doc(userCredential.user.uid).set({
            email: userCredential.user.email,
            name: name,
            phone: '',
            role: 'customer',
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log('✅ User created:', userCredential.user.email);
        return userCredential.user;
    } catch (error) {
        console.error('❌ Sign up error:', error);
        throw error;
    }
};

/**
 * Sign out
 */
export const signOut = async () => {
    try {
        // Sign out from Google if signed in with Google
        try {
            await GoogleSignin.signOut();
        } catch (e) {
            // Ignore if not signed in with Google
        }
        await auth().signOut();
        console.log('✅ User signed out');
    } catch (error) {
        console.error('❌ Sign out error:', error);
        throw error;
    }
};

/**
 * Sign in with Google
 */
export const signInWithGoogle = async () => {
    try {
        console.log('🔐 Starting Google Sign-In...');

        // Check if device supports Google Play services
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

        // Get the user's ID token
        const signInResult = await GoogleSignin.signIn();

        // Try to get idToken from different possible locations
        let idToken = signInResult.data?.idToken || signInResult.idToken;

        if (!idToken) {
            throw new Error('No ID token found in Google Sign-In result');
        }

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign in to Firebase with the Google credential
        const userCredential = await auth().signInWithCredential(googleCredential);
        const { user } = userCredential;

        // Check if user profile exists in Firestore
        const userDoc = await firestore().collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            // Create new user profile for Google users
            await firestore().collection('users').doc(user.uid).set({
                email: user.email,
                name: user.displayName || '',
                phone: user.phoneNumber || '',
                avatar: user.photoURL || '',
                role: 'customer',
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            console.log('✅ New Google user profile created');
        }

        console.log('✅ Google Sign-In successful:', user.email);
        return user;
    } catch (error) {
        console.error('❌ Google Sign-In error:', error);

        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            throw new Error('Sign-in was cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            throw new Error('Sign-in already in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            throw new Error('Google Play Services not available');
        }

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
// USER PROFILE SERVICES
// ============================================

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
    try {
        const doc = await firestore().collection('users').doc(userId).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, data) => {
    try {
        await firestore().collection('users').doc(userId).update({
            ...data,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('✅ Profile updated');
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

// ============================================
// ADDRESS SERVICES
// ============================================

/**
 * Get user's saved addresses
 */
export const getUserAddresses = async (userId) => {
    try {
        const snapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('addresses')
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching addresses:', error);
        return [];
    }
};

/**
 * Save a new address
 */
export const saveUserAddress = async (userId, address) => {
    try {
        const docRef = await firestore()
            .collection('users')
            .doc(userId)
            .collection('addresses')
            .add({
                ...address,
                createdAt: firestore.FieldValue.serverTimestamp(),
            });

        return { id: docRef.id, ...address };
    } catch (error) {
        console.error('Error saving address:', error);
        throw error;
    }
};

// ============================================
// FAVORITES SERVICES
// ============================================

/**
 * Add restaurant to favorites
 */
export const addFavorite = async (userId, restaurantId) => {
    try {
        await firestore().collection('favorites').add({
            userId,
            restaurantId,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('✅ Added to favorites');
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

/**
 * Remove from favorites
 */
export const removeFavorite = async (userId, restaurantId) => {
    try {
        const snapshot = await firestore()
            .collection('favorites')
            .where('userId', '==', userId)
            .where('restaurantId', '==', restaurantId)
            .get();

        const batch = firestore().batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        await batch.commit();

        console.log('✅ Removed from favorites');
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

/**
 * Get user's favorite restaurants
 */
export const getFavorites = async (userId) => {
    try {
        const snapshot = await firestore()
            .collection('favorites')
            .where('userId', '==', userId)
            .get();

        return snapshot.docs.map(doc => doc.data().restaurantId);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};

// ============================================
// MOCK DATA (Fallback when Firestore is empty)
// ============================================

const getMockRestaurants = () => [
    {
        id: 'mock-rest-001',
        name: 'Pizza Palace',
        description: 'Best pizzas in town',
        rating: 4.5,
        deliveryTime: '25-35 min',
        deliveryFee: 40,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
        isActive: true,
    },
    {
        id: 'mock-rest-002',
        name: 'Burger Joint',
        description: 'Juicy burgers & fries',
        rating: 4.3,
        deliveryTime: '20-30 min',
        deliveryFee: 35,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
        isActive: true,
    },
];

export default {
    // Restaurants
    getRestaurants,
    getRestaurant,

    // Menu
    getMenuItems,

    // Orders
    createOrder,
    getCustomerOrders,
    subscribeToOrder,

    // Auth
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    getCurrentUser,
    onAuthStateChanged,

    // Profile
    getUserProfile,
    updateUserProfile,

    // Addresses
    getUserAddresses,
    saveUserAddress,

    // Favorites
    addFavorite,
    removeFavorite,
    getFavorites,
};
