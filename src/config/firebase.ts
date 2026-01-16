/**
 * Firebase configuration
 * Initialize Firebase services (Storage and Messaging only)
 * Authentication is handled by Supabase
 */

import {initializeApp, getApps, FirebaseApp} from 'firebase/app';
import {getFirestore, Firestore} from 'firebase/firestore';
import {getStorage, FirebaseStorage} from 'firebase/storage';
import Config from 'react-native-config';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId: Config.FIREBASE_APP_ID,
};

let app: FirebaseApp;
let firestore: Firestore;
let storage: FirebaseStorage;

// Initialize Firebase only if not already initialized
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Note: Auth is handled by Supabase, not Firebase
firestore = getFirestore(app);
storage = getStorage(app);

export {app, firestore, storage};
