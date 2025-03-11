// hooks/useUpdateUserProgress.js
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/firebaseConfig';

const useUpdateUserProgress = (userId, articleId, score) => {
  const updateUserProgress = async () => {
    if (score !== 100) return;

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        let completedQuizzes = userDoc.data().completedQuizzes || [];

        if (!completedQuizzes.includes(articleId)) {
          completedQuizzes.push(articleId);
          await updateDoc(userRef, { completedQuizzes });
        }
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  return { updateUserProgress };
};

export default useUpdateUserProgress;