// hooks/useQuizNavigation.js
import { useState } from 'react';

const useQuizNavigation = (totalQuestions) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    handleNext()
    console.log("📌 Jawaban pengguna:", newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return {
    currentQuestionIndex,
    userAnswers,
    handleAnswer,
    handleNext,
    handlePrevious,
  };
};

export default useQuizNavigation;