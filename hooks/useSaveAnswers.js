// hooks/useSaveAnswers.js
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';
import { useRouter } from 'expo-router';

const useSaveAnswers = (userId, id, userAnswers, questions) => {
  const router = useRouter();

  const saveAnswersToFirestore = async () => {
    try {
      if (auth.currentUser) {
        console.log('User Answers to Save:', userAnswers);
        console.log(userId);
        console.log(id);
        const quizDocRef = doc(db, 'userAnswers', userId, 'articleAnswers', id);
        await setDoc(quizDocRef, {
          answers: userAnswers,
          completed: true, // Set status kuis selesai
        });
        router.push({
          pathname: './ScoreScreen',
          params: {
            questions: JSON.stringify(questions),
            userAnswers: JSON.stringify(userAnswers),
            id: id,
          },
        });
      }
    } catch (error) {
      console.error('Error saving answers:', error);
    }
  };

  return { saveAnswersToFirestore };
};

export default useSaveAnswers;