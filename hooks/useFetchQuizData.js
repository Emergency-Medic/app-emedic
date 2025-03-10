// hooks/useFetchQuizData.js
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';

const useFetchQuizData = (id) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchQuizData = async () => {
      if (!userId || !id) return;

      try {
        // Check quiz status
        const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', id);
        const quizDoc = await getDoc(quizDocRef);
        if (quizDoc.exists() && quizDoc.data().completed) {
          setQuizStarted(true);
        }

        // Fetch questions
        const questionsCollection = collection(db, 'articles_no_cat', id, 'questions');
        const questionSnapshot = await getDocs(questionsCollection);
        const questionList = questionSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setQuestions(questionList);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizData();
  }, [userId, id]);

  return { quizStarted, questions, isLoading };
};

export default useFetchQuizData;