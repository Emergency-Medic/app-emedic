import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from '@/firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// 1. Buat Context
const UserContext = createContext(null);

// 2. Provider untuk membagikan data user ke semua halaman
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Ambil data user saat pertama kali masuk
  useEffect(() => {
    // 🔥 Pantau perubahan autentikasi
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 🔥 Ambil data user dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUser({
            uid: user.uid,
            ...userDocSnap.data(),
          });
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook agar mudah digunakan di komponen lain
export const useUser = () => {
  useContext(UserContext);
};
