// ==========================================
// Firebase Configuration
// ==========================================
// Replace these values with your Firebase project config

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, Firestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, FirebaseStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, Functions, connectFunctionsEmulator } from 'firebase/functions';

// Firebase configuration - Replace with your project's config
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let functions: Functions;

function initializeFirebase(): FirebaseApp {
    if (!app) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        storage = getStorage(app);
        functions = getFunctions(app);

        // Connect to emulators in development
        if (import.meta.env.DEV && import.meta.env.VITE_USE_EMULATORS === 'true') {
            connectAuthEmulator(auth, 'http://localhost:9099');
            connectFirestoreEmulator(db, 'localhost', 8080);
            connectStorageEmulator(storage, 'localhost', 9199);
            connectFunctionsEmulator(functions, 'localhost', 5001);
            console.log('🔥 Connected to Firebase Emulators');
        }
    }
    return app;
}

// Initialize on import
initializeFirebase();

export { app, auth, db, storage, functions };
export { firebaseConfig };
