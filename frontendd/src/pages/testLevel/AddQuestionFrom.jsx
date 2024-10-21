import React, { useState, useEffect, useContext } from "react";
import "./testLevel.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

import { SelectedQuestionContext } from "./SelectedQuestionContext";
import axios from "axios";

const schema = yup.object().shape({
  questionType: yup.string().required("Please Specify a Question Type"),
  questionText: yup
    .string()
    .required("Please Specify a Question Text")
    .max(255)
    .min(10),
  level: yup.string().required("Please Specify a Level"),
  answerOptions: yup
    .array()
    .of(
      yup.object().shape({
        option: yup.string().required("Option is required"),
      })
    )
    .min(1, "At least 1 option is required")
    .max(4, "A maximum of 4 options are allowed"),
});

const AddQuestionForm = () => {
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      questionType: "multipleChoice",
      questionText: "",
      level: "",
      answerOptions: [{ option: "Option 1" }],
      correctAnswerIndex: "",
      blank: "",
      language: "EN",
    },
  });
  const { selectedQuestion } = useContext(SelectedQuestionContext);
  //////////////////////////////////

  ///////////////////////////////////////
  const { fields, append } = useFieldArray({
    control,
    name: "answerOptions",
    defaultValue: [{ option: "Option 1" }],
  });
  //////////////////////////////////

  useEffect(() => {
    if (selectedQuestion) {
      let questionType;
      if (selectedQuestion.blank !== null) {
        questionType = "blank";
      } else if (selectedQuestion.answer_options.length > 0) {
        questionType = "multipleChoice";
      }

      reset({
        questionType: questionType,
        questionText: selectedQuestion.question_text,
        level: selectedQuestion.level,
        answerOptions: selectedQuestion.answer_options.map((option) => ({
          option: option.text,
        })),
        correctAnswerIndex: selectedQuestion.correct_answer_index,
        blank: selectedQuestion.blank !== null ? selectedQuestion.blank : "",
        language: selectedQuestion.language,
      });
    }
  }, [selectedQuestion, reset]);

  /////////////////////////////////////
  const questionType = watch("questionType");

  const onSubmit = async (data) => {
    setSubmit(true);
    let submitData;

    if (data.questionType === "multipleChoice") {
      submitData = {
        question_text: data.questionText,
        level: data.level,
        answer_options: data.answerOptions.map((option) => ({
          text: option.option,
        })),
        correct_answer_index: Number(data.correctAnswerIndex),
        language: data.language,
        blank: null,
      };
    } else if (data.questionType === "blank") {
      submitData = {
        question_text: data.questionText,
        level: data.level,
        answer_options: [],
        correct_answer_index: null,
        language: data.language,
        blank: data.blank,
      };
    }

    if (selectedQuestion) {
      // If a question is being modified, ask for confirmation before updating
      const confirmUpdate = window.confirm(
        "Are you sure you want to update this question?"
      );

      if (confirmUpdate) {
        // If the admin confirmed the update, send the PUT request
        try {
          const response = await axios.put(
            `http://127.0.0.1:8000/quizData/${selectedQuestion.id}/`,
            submitData
          );

          // If the update was successful, show a success message
          alert("Question updated successfully!");
        } catch (error) {
          console.error("Failed to update question", error);
        }
      }
    } else {
      // If a new question is being added, send a POST request
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/quizData/",
          submitData
        );

        // If the submission was successful, show a success message
        alert("Question added successfully!");
      } catch (error) {
        console.error("Failed to submit question", error);
      }
    }
  };
  return (
    <div className="form">
      <div className="test-header">
        <h1>Questions Form</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Question Type:
          <select {...register("questionType")} className="input-field">
            <option value="multipleChoice">Multiple Choice</option>
            <option value="blank">Blank</option>
          </select>
          {errors.questionType && (
            <p className="custom-error">{errors.questionType.message}</p>
          )}
        </label>

        <label>
          Question Text:
          <input
            type="text"
            {...register("questionText")}
            className="input-field"
          />
          {errors.questionText && (
            <p className="custom-error">{errors.questionText.message}</p>
          )}
        </label>

        <label>
          Level:
          <select {...register("level")} className="input-field">
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
          {errors.level && (
            <p className="custom-error">{errors.level.message}</p>
          )}
        </label>
        <label>
          Language:
          <select {...register("language")} className="input-field">
            <option value="EN">EN</option>
            <option value="FR">FR</option>
            <option value="SP">SP</option>
            <option value="IT">IT</option>
          </select>
          {errors.language && (
            <p className="custom-error">{errors.language.message}</p>
          )}
        </label>
        {questionType === "multipleChoice" && (
          <>
            {fields.map((field, index) => (
              <div key={field.id}>
                <input
                  {...register(`answerOptions.${index}.option`)}
                  placeholder={`Option ${index + 1}`}
                  className="input-field"
                />
                {errors.answerOptions && errors.answerOptions[index] && (
                  <p className="custom-error">
                    {errors.answerOptions[index].message}
                  </p>
                )}
              </div>
            ))}

            <button
              className="add-option-button"
              type="button"
              onClick={() =>
                fields.length < 4 &&
                append({ option: `Option ${fields.length + 1}` })
              }
            >
              Add Option
            </button>
            <label>
              Correct Answer Index:
              <input
                type="number"
                {...register("correctAnswerIndex")}
                className="input-field"
              />
              {errors.correctAnswerIndex && (
                <p className="custom-error">
                  {errors.correctAnswerIndex.message}
                </p>
              )}
            </label>
          </>
        )}

        {questionType === "blank" && (
          <label>
            Blank:
            <input type="text" {...register("blank")} className="input-field" />
            {errors.blank && (
              <p className="custom-error">{errors.blank.message}</p>
            )}
          </label>
        )}
        <input type="submit" className="submit-button"></input>
        {submit && (
          <p className="success-message">Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default AddQuestionForm;
