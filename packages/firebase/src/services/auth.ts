// ==========================================
// Authentication Service
// ==========================================

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    User as FirebaseUser,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config';
import { User, UserRole } from '@restaurant-saas/types';

// ==========================================
// Auth Functions
// ==========================================

export const signIn = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const signUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole = UserRole.CUSTOMER
) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update display name
    await updateProfile(user, { displayName: name });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });

    return user;
};

export const signOut = async () => {
    await firebaseSignOut(auth);
};

export const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
};

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// ==========================================
// User Profile Functions
// ==========================================

export const getUserProfile = async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
        return userDoc.data() as User;
    }
    return null;
};

export const getCurrentUser = () => auth.currentUser;

export const getIdToken = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdToken();
};

export const getIdTokenResult = async () => {
    const user = auth.currentUser;
    if (!user) return null;
    return user.getIdTokenResult();
};

// Get user's custom claims (role, restaurantId, etc.)
export const getUserClaims = async () => {
    const tokenResult = await getIdTokenResult();
    if (!tokenResult) return null;
    return tokenResult.claims;
};
