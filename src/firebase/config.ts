// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLTLN_RoZXRrH_AnAJ5uSA8NPcdxy3d0I",
  authDomain: "gaming-pc-cebbe.firebaseapp.com",
  projectId: "gaming-pc-cebbe",
  storageBucket: "gaming-pc-cebbe.firebasestorage.app",
  messagingSenderId: "670951072768",
  appId: "1:670951072768:web:ece52403dd4992207b64e5",
  measurementId: "G-4E7Q9X9N1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;