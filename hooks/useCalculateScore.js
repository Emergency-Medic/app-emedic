// hooks/useCalculateScore.js
const useCalculateScore = (questions, userAnswers) => {
    const calculateScore = () => {
      if (!questions || !userAnswers) return 0;
  
      let score = 0;
      questions.forEach((question, index) => {
        if (question.correctAnswer === userAnswers[index]) {
          score++;
        }
      });
      return (score / questions.length) * 100;
    };
  
    return calculateScore();
  };
  
  export default useCalculateScore;