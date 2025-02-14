import React, { createContext, useState, useEffect } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebaseConfig';  // Ensure you have firebaseConfig.js

// Create Context
export const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reference to Firestore user document
        const userRef = doc(db, "users", user.uid);

        // Listen for real-time updates
        const unsubscribeFirestore = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setUserData(snapshot.data());
          }
        });

        return () => unsubscribeFirestore(); // Cleanup on unmount
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribeAuth(); // Cleanup authentication listener
  }, []);

  return (
    <FirestoreContext.Provider value={{ userData }}>
      {children}
    </FirestoreContext.Provider>
  );
};
