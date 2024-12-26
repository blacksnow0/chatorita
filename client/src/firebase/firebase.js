// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3iBDPr1_N1D9Anb5yFp81I_6cmodPPLw",
  authDomain: "chat-burnmetric.firebaseapp.com",
  projectId: "chat-burnmetric",
  storageBucket: "chat-burnmetric.firebasestorage.app",
  messagingSenderId: "981703826166",
  appId: "1:981703826166:web:a3e0b38845949ede0b2ad7",
  measurementId: "G-RXB3WTDKJY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
