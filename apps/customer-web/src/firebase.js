// Firebase Configuration for Customer Web
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

console.log('🔥 Firebase Config:', {
    apiKey: firebaseConfig.apiKey ? '✓ Set' : '✗ Missing',
    authDomain: firebaseConfig.authDomain || '✗ Missing',
    projectId: firebaseConfig.projectId || '✗ Missing',
});

// Initialize Firebase
let app, db, auth, storage;

try {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized');

    // Initialize services
    db = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    console.log('✅ Firebase services ready (Firestore, Auth, Storage)');

} catch (error) {
    console.error('❌ Firebase initialization failed:', error);
}

// Connect to emulators in development
if (import.meta.env.VITE_USE_EMULATORS === 'true' && db && auth && storage) {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('🔧 Using Firebase Emulators');
}

export { db, auth, storage };
export default app;

