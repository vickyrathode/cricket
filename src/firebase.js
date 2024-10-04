import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage"; // Storage (optional, for file uploads)

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyD4NJUUFmYiXShh-Rti020YI5Hr75NkIwo",
  authDomain: "cricket-79792.firebaseapp.com",
  projectId: "cricket-79792",
  storageBucket: "cricket-79792.appspot.com",
  messagingSenderId: "952688530681",
  appId: "1:952688530681:web:ca43b99322c12bd7e9be28",
  measurementId: "G-MYJY85EW0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app); // Firebase Auth
export const db = getFirestore(app); // Firestore
export const storage = getStorage(app); // Firebase Storage (optional)
