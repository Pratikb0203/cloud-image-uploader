import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-dWal0pXM6cEcXVKzqXZNDdei2X3Deu8",
  authDomain: "cloud-image-app-52d95.firebaseapp.com",
  projectId: "cloud-image-app-52d95",
  storageBucket: "cloud-image-app-52d95.firebasestorage.app",
  messagingSenderId: "280976782310",
  appId: "1:280976782310:web:377ce2affcd5d3f0799c27"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
