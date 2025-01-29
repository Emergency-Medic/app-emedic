import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from "expo-router";

const registerUser = async (firstName, lastName, phone, email, password) => {
  try {
    // Buat user di Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Simpan data tambahan user ke Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      createdAt: new Date().toISOString(),
    });
    router.push("./SignInScreen")
    console.log('User registered successfully!');
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

export default registerUser;
