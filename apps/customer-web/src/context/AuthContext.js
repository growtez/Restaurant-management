// Authentication Context for Customer Web
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                // Fetch user profile from Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                if (userDoc.exists()) {
                    setUserProfile({ id: userDoc.id, ...userDoc.data() });
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign up with email and password
    const signUp = async (email, password, name) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user: firebaseUser } = userCredential;

        // Update display name
        await updateProfile(firebaseUser, { displayName: name });

        // Create user profile in Firestore
        await setDoc(doc(db, 'users', firebaseUser.uid), {
            email: firebaseUser.email,
            name: name,
            phone: '',
            avatar: '',
            role: 'customer',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return firebaseUser;
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    };

    // Sign in with Google
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const { user: firebaseUser } = userCredential;

        // Check if user profile exists
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

        if (!userDoc.exists()) {
            // Create user profile for new Google users
            await setDoc(doc(db, 'users', firebaseUser.uid), {
                email: firebaseUser.email,
                name: firebaseUser.displayName || '',
                phone: firebaseUser.phoneNumber || '',
                avatar: firebaseUser.photoURL || '',
                role: 'customer',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }

        return firebaseUser;
    };

    // Sign out
    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setUserProfile(null);
    };

    // Reset password
    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
    };

    // Update user profile
    const updateUserProfile = async (data) => {
        if (!user) return;

        await setDoc(doc(db, 'users', user.uid), {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true });

        // Refresh profile
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            setUserProfile({ id: userDoc.id, ...userDoc.data() });
        }
    };

    const value = {
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signInWithGoogle,
        logout,
        resetPassword,
        updateUserProfile,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
