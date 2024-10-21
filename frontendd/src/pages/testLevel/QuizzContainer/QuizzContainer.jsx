import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizQuestion from "../Elements/QuizzQuestion";
import QuizTimer from "../Elements/QuizzTimer";
import QuizResult from "../Elements/QuizzResult";

import "./quiz.css";

const QuizContainer = () => {
  const { language, level } = useParams();
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch(`http://127.0.0.1:8000/quizData/`);
      const allData = await response.json();
      const data = allData.filter(
        (question) => question.language === language && question.level === level
      );
      setQuizQuestions(data);
      setQuizCompleted(false);
      setCurrentQuestionIndex(0);
      setUserAnswers(Array(data.length).fill(undefined));
    };

    fetchQuiz();
  }, [level, language]);

  // rest of your component

  const handleAnswerChange = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };
  const checkAnswer = (question, userAnswer) => {
    if (userAnswer === undefined) {
      return false;
    }
    if (question.blank) {
      return userAnswer.toLowerCase() === question.blank.toLowerCase();
    } else {
      return userAnswer + 1 === question.correct_answer_index;
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      window.location.href = "/testlvl";
    }
  };

  const handleSubmitQuiz = () => {
    const correctAnswers = userAnswers.map((userAnswer, index) => {
      return checkAnswer(quizQuestions[index], userAnswer);
    });

    const score = correctAnswers.filter(Boolean).length;

    setQuizScore(score);
    setQuizCompleted(true);
    setUserAnswers(Array(quizQuestions.length).fill(null));
  };

  const handleTimeUp = () => {
    handleSubmitQuiz();
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-container__title">Test Level {level}</h1>

      {quizCompleted ? (
        <QuizResult
          score={quizScore}
          total={quizQuestions.length}
          language={language}
          level={level}
        />
      ) : (
        <div className="quiz-container__box">
          <QuizTimer
            key={currentQuestionIndex}
            time={20}
            onTimeUp={handleTimeUp}
          />
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            questionIndex={currentQuestionIndex}
            onAnswerChange={handleAnswerChange}
            userAnswer={userAnswers[currentQuestionIndex]}
            language={language}
          />
          <div className="quiz-container__nav-buttons">
            <button
              className="quiz-container__nav-button--previous"
              onClick={handlePreviousQuestion}
            >
              Previous
            </button>
            <button
              className="quiz-container__nav-button--next"
              disabled={userAnswers[currentQuestionIndex] === undefined}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Next"
                : "Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
