import { useEffect, useState } from "react";

const QuizTimer = ({ time, onTimeUp }) => {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    if (remainingTime > 0) {
      const timerId = setTimeout(() => {
        setRemainingTime(remainingTime - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [remainingTime, onTimeUp]);

  return (
    <div>
      <p className={`quiz-timer__label `}>
        Time Remaining: {remainingTime} seconds
      </p>
      <div className="quiz-timer__bar">
        <div
          className="quiz-timer__bar-fill"
          style={{ width: `${(remainingTime / time) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
