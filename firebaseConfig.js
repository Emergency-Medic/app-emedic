// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
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
  webClientId: "382135671168-a2p2o5embfj3euqqlb429sksfs8uoi01.apps.googleusercontent.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, db };