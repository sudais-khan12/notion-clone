import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCm0ZV2vUyaEv1u04x_Nw-_kSXCvim3p9M",
  authDomain: "notion-clone-c8e1e.firebaseapp.com",
  projectId: "notion-clone-c8e1e",
  storageBucket: "notion-clone-c8e1e.firebasestorage.app",
  messagingSenderId: "121409028692",
  appId: "1:121409028692:web:d1049844546782dcbaa3c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
