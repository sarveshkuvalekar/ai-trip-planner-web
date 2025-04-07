// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjCIt1Pz6HzJu0srYL6h4zSlqN3rORPFE",
  authDomain: "destinai-9302a.firebaseapp.com",
  projectId: "destinai-9302a",
  storageBucket: "destinai-9302a.firebasestorage.app",
  messagingSenderId: "907571364004",
  appId: "1:907571364004:web:8b8b97ab0b3e8a71a66631",
  measurementId: "G-KXS4ED3LW7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);




