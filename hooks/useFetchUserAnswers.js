// hooks/useFetchUserAnswers.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';

const useFetchUserAnswers = (userId, articleId) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', articleId);
        const quizDoc = await getDoc(quizDocRef);

        if (quizDoc.exists()) {
          const data = quizDoc.data();
          setUserAnswers(data.answers);
        }
      } catch (error) {
        console.error('Error fetching user answers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAnswers();
  }, [userId, articleId]);

  return { userAnswers, isLoading };
};

export default useFetchUserAnswers;