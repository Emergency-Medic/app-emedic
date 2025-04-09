import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";

const useUserData = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [completedQuizzes, setCompletedQuizzes] = useState([])

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setUser(data);
        setName(data.firstName);
        setEmail(data.email);
        setUsername(data.username);
        setCompletedQuizzes(data.completedQuizzes??[]);
      } else {
        console.log("User does not exist!");
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, name, email, username, completedQuizzes };
};

export default useUserData;
