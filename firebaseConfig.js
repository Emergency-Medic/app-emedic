// Import the functions you need from the SDKs you need
<<<<<<< HEAD
import { initializeApp } from "@firebase/app";
// import { getAnalytics } from "firebase/analytics";
=======
import { initializeApp } from "firebase/app";
>>>>>>> d4d933161e66a2dfb21bc003d2d8c597d16db3a0
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnuFN5Q9D9AjmZqI9xYn885V1Ps75WBWc",
  authDomain: "emedic-app-52042.firebaseapp.com",
  projectId: "emedic-app-52042",
  storageBucket: "emedic-app-52042.firebasestorage.app",
  messagingSenderId: "382135671168",
  appId: "1:382135671168:web:7d29df6534010f046b0965",
  measurementId: "G-1GYB0DPP27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
<<<<<<< HEAD
// const analytics = getAnalytics(app);
=======
>>>>>>> d4d933161e66a2dfb21bc003d2d8c597d16db3a0
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };