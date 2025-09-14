import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOYz8DLxA99nLioLXHpF2EZ8RuVmGF364",
  authDomain: "zura-website-20ebe.firebaseapp.com",
  projectId: "zura-website-20ebe",
  storageBucket: "zura-website-20ebe.appspot.com",
  messagingSenderId: "364581222646",
  appId: "1:364581222646:web:284a28af8e505a18c714d7"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
