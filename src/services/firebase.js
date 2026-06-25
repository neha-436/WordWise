import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBchjMq1JCtkPjI5isnI7LCgboMMjwynHE",
  authDomain: "wordwise-60b3b.firebaseapp.com",
  projectId: "wordwise-60b3b",
  storageBucket: "wordwise-60b3b.firebasestorage.app",
  messagingSenderId: "970379258731",
  appId: "1:970379258731:web:60c0ed0ab1e047c2297a2e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;