import React from "react";

const QuizQuestion = ({
  question,
  questionIndex,
  onAnswerChange,
  userAnswer,
}) => {
  const getActiveSelectionClass = (answerIndex) => {
    if (userAnswer !== null && answerIndex === userAnswer) {
      return "quiz-question__option--selected";
    }
    return "";
  };

  const handleAnswerChange = (event) => {
    const answer = question.blank
      ? event.target.value
      : parseInt(event.target.value);
    onAnswerChange(questionIndex, answer);
  };

  return (
    <div className="quiz-question">
      {question && (
        <>
          <h3 className="quiz-question__title">{question.question_text}</h3>
          <div className="quiz-question__options">
            {question.blank ? (
              <input
                type="text"
                value={userAnswer || ""}
                onChange={handleAnswerChange}
                className="quiz-question__option-input"
              />
            ) : (
              question.answer_options.map((answerOption, answerIndex) => (
                <label
                  key={answerIndex}
                  className={`quiz-question__option ${getActiveSelectionClass(
                    answerIndex
                  )}`}
                >
                  <input
                    type="radio"
                    value={answerIndex}
                    checked={userAnswer === answerIndex}
                    onChange={handleAnswerChange}
                    className="quiz-question__option-radio"
                  />
                  <span className="quiz-question__option-text">
                    {answerOption.text}
                  </span>
                </label>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizQuestion;
