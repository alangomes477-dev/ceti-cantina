import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Suas chaves do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAuuwcq6yto-BpcUbkCT8bmaZ85-iYLMX0",
  authDomain: "ceti-cantina.firebaseapp.com",
  projectId: "ceti-cantina",
  storageBucket: "ceti-cantina.firebasestorage.app",
  messagingSenderId: "229997328292",
  appId: "1:229997328292:web:8337f08d19ec420d6ab331"
};

// Inicializa o app
const app = initializeApp(firebaseConfig);


export const db = getDatabase(app);