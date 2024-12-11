import { getApp, getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const VITE_FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: "conj200-e61ee.firebaseapp.com",
  projectId: "conj200-e61ee",
  storageBucket: "conj200-e61ee.firebasestorage.app",
  messagingSenderId: "601362958896",
  appId: "1:601362958896:web:5c010d290dc322d6b93bf5",
};

// Initialize Firebase
const firestoreApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth(firestoreApp);

export { auth, googleAuthProvider };
