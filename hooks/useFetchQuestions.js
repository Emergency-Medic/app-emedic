// hooks/useFetchQuestions.js
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const useFetchQuestions = (id) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!id) {
        console.log("ID belum tersedia");
        setIsLoading(false);
        return;
      }

      try {
        const questionsCollection = collection(db, 'articles_no_cat', id, 'questions');
        const questionSnapshot = await getDocs(questionsCollection);

        if (questionSnapshot.empty) {
          console.log("Tidak ada dokumen dalam subkoleksi 'questions'.");
          setIsLoading(false);
          return;
        }

        const questionList = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Fetched Questions:', questionList);
        setQuestions(questionList);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  return { questions, isLoading };
};

export default useFetchQuestions;