import { signInWithRedirect, GoogleAuthProvider, getRedirectResult, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "@/firebaseConfig";
import { Alert } from "react-native";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

// GoogleSignin.configure({
//     webClientId: '382135671168-a2p2o5embfj3euqqlb429sksfs8uoi01.apps.googleusercontent.com', 
//   });

/**
 * Login dengan Google dan simpan user ke Firestore jika belum ada
 */
export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Google Sign-In Error:", error.message);
    Alert.alert("Error", error.message);
  }
};

/**
 * Menangani hasil redirect login Google & menyimpan user ke Firestore
 */
export const handleGoogleSignIn = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ")[1] || "",
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date().toISOString(),
        });
      }
    }
  } catch (error) {
    console.error("Google Redirect Error:", error.message);
    Alert.alert("Error", error.message);
  }
};

/**
 * Register user dengan email & password, lalu simpan ke Firestore
 */
export const registerUser = async (firstName, lastName, phone, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);

    await setDoc(userRef, {
      uid: user.uid,
      firstName,
      lastName,
      phone,
      email,
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};

/**
 * Login dengan email & password
 */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign-In Error:", error.message);
    throw error;
  }
};
