import React from "react";
import { Link } from "react-router-dom";

const QuizResult = ({ score, total, language, level }) => {
  const passPercentage = 80;
  const percentageScore = (score / total) * 100;
  const passed = percentageScore >= passPercentage;

  const getLevels = (currentLevel) => {
    const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
    const currentLevelIndex = levels.indexOf(currentLevel);
    let nextLevel = null;
    let previousLevel = null;

    if (currentLevelIndex < levels.length - 1) {
      nextLevel = levels[currentLevelIndex + 1];
    }

    if (currentLevelIndex > 0) {
      previousLevel = levels[currentLevelIndex - 1];
    }

    return { nextLevel, previousLevel };
  };

  const { nextLevel, previousLevel } = getLevels(level);

  return (
    <div className="quiz-result">
      <div className="quiz-result__box">
        <h3 className="quiz-result__title">Test Result</h3>
        <p className="quiz-result__score">
          You scored {score} out of {total} ({percentageScore}%)
        </p>
        {passed ? (
          <>
            <p className="quiz-result__message">
              {level === "C2"
                ? "Congratulations! You are a pro in the language and your level is C2."
                : "Congratulations! You passed the Test."}
            </p>
            {nextLevel && (
              <Link
                to={`/quiz/${language}/${nextLevel}`}
                className="quiz-result__button"
              >
                Test in the next level
              </Link>
            )}
          </>
        ) : (
          <>
            {level === "A1" ? (
              <p className="quiz-result__message">
                Sorry, you did not pass the Test. You need to practice more.
              </p>
            ) : (
              <>
                <p className="quiz-result__message">
                  Sorry, you did not pass the Test of this Current Level
                </p>
                <h3>Your level based on our Test is : </h3>
                <h1 className="level">{previousLevel}</h1>
              </>
            )}
          </>
        )}
        <Link to="/testlvl" className="quiz-result__button">
          Back to Main Page
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;
