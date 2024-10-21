import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SelectedQuestionContext } from "./SelectedQuestionContext";

const ModifyQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [languageFilter, setLanguageFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const { setSelectedQuestion } = useContext(SelectedQuestionContext);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/quizData/").then((response) => {
      setQuestions(response.data);
    });
  }, []);
  /////////////////////////////////////////////////////////
  const handleModifyClick = (questionId) => {
    const question = questions.find((question) => question.id === questionId);
    setSelectedQuestion(question);
  };
  //////////////////////////////////////////////////////////////
  const handleLanguageFilterChange = (event) => {
    setLanguageFilter(event.target.value);
  };
  const handleLevelFilterChange = (event) => {
    setLevelFilter(event.target.value);
  };
  const FilteredQuestion = questions.filter((question) => {
    return (
      (languageFilter === "" || question.language === languageFilter) &&
      (levelFilter === "" || question.level === levelFilter)
    );
  });
  const handleDeleteClick = (questionId) => {
    if (window.confirm("Do you want to delete this item?")) {
      axios.delete(`http://127.0.0.1:8000/quizData/${questionId}/`).then(() => {
        setQuestions(
          questions.filter((question) => question.id !== questionId)
        );
      });
    }
  };

  return (
    <div className="modify">
      <div className="test-header">
        <h1>Modify Questions</h1>
      </div>
      <div>
        <select value={languageFilter} onChange={handleLanguageFilterChange}>
          <option value="">All Languages</option>
          <option value="EN">English</option>
          <option value="FR">French</option>
          <option value="SP">Spanish</option>
          <option value="IT">Italian</option>
          {/* Add more options as needed */}
        </select>
        <select value={levelFilter} onChange={handleLevelFilterChange}>
          <option value="">All Levels</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Question Text</th>
            <th>Language</th>
            <th>Level</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {FilteredQuestion.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.question_text}</td>
              <td>{question.language}</td>
              <td>{question.level}</td>
              <td>
                <Link
                  className="modify-button"
                  to={{
                    pathname: "/AddQuestion",
                    state: { selectedQuestion: question },
                  }}
                  onClick={() => handleModifyClick(question.id)}
                >
                  Modify
                </Link>
              </td>
              <td>
                <button
                  className="modify-button"
                  onClick={() => handleDeleteClick(question.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ModifyQuestion;
