import React from "react";
import { Link } from "react-router-dom";
import "./testLevel.css";

const TestLevel = () => {
  return (
    <div className="main-page">
      <header className="test-header">
        <h1>Speakify Level Test!</h1>
        <p>Test Yourself, learn, and have fun with Our Intuitive Test!.</p>
      </header>
      <div className="main-page__quiz-list">
        <Link to="/quiz/EN/A1" className="main-page__quiz-link">
          <div className="main-page__quiz-card main-page__quiz-card--en">
            <h2 className="main-page__quiz-title main-page__quiz-title--en">
              English Test
            </h2> 
          </div>
        </Link>
        <Link to="/quiz/FR/A1" className="main-page__quiz-link">
          <div className="main-page__quiz-card main-page__quiz-card--fr">
            <h2 className="main-page__quiz-title main-page__quiz-title--fr">
              French Test
            </h2>
          </div>
        </Link>
        <Link to="/quiz/SP/A1" className="main-page__quiz-link">
          <div className="main-page__quiz-card main-page__quiz-card--sp">
            <h2 className="main-page__quiz-title main-page__quiz-title--sp">
              Spanish Test
            </h2>
          </div>
        </Link>
        <Link to="/quiz/IT/A1" className="main-page__quiz-link">
          <div className="main-page__quiz-card main-page__quiz-card--it">
            <h2 className="main-page__quiz-title main-page__quiz-title--it">
              Italian Test
            </h2>
          </div>
        </Link>
      </div>
      <div className="link">
        <center>
          <Link
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/AddQuestion"
          >
            <h2>AddQuestion</h2>
          </Link>
        </center>
      </div>
      <div className="link">
        <center>
          <Link
            className={({ isActive }) => (isActive ? "active" : "")}
            to="/ModifyQuestion"
          >
            <h2>Modify Questions</h2>
          </Link>
        </center>
      </div>
    </div>
  );
};

export default TestLevel;
