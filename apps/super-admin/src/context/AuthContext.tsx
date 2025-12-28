// Authentication Context for Super Admin
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: 'restaurant_admin' | 'super_admin' | 'customer' | 'driver';
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<User>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    isAuthenticated: boolean;
    isSuperAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔐 Setting up Firebase Auth listener for Super Admin...');

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log('🔐 Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data() as Omit<UserProfile, 'id'>;
                        const profile: UserProfile = { id: userDoc.id, ...data };
                        setUserProfile(profile);

                        // Verify user is a super admin
                        if (profile.role !== 'super_admin') {
                            console.warn('⚠️ User is not a super admin');
                        }
                    }
                } catch (error) {
                    console.warn('⚠️ Could not fetch user profile:', error);
                }
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string): Promise<User> => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Verify user role
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
        if (userDoc.exists()) {
            const profile = userDoc.data() as UserProfile;
            if (profile.role !== 'super_admin') {
                // Sign out if not authorized
                await firebaseSignOut(auth);
                throw new Error('You are not authorized to access the super admin panel');
            }
        }

        return userCredential.user;
    };

    // Sign out
    const signOut = async (): Promise<void> => {
        await firebaseSignOut(auth);
        setUser(null);
        setUserProfile(null);
    };

    // Reset password
    const resetPassword = async (email: string): Promise<void> => {
        await sendPasswordResetEmail(auth, email);
    };

    const value: AuthContextType = {
        user,
        userProfile,
        loading,
        signIn,
        signOut,
        resetPassword,
        isAuthenticated: !!user,
        isSuperAdmin: userProfile?.role === 'super_admin',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
