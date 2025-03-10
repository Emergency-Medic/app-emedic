import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUser(data);
        setName(data.firstName);
      } else {
        console.log("User does not exist!");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, name };
};

export default useUserData;
