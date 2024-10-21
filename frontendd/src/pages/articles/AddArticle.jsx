import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./articles.css";
import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { SelectedArticleContext } from "./SelectedArticleContext";
import axios from "axios";

const AddArticle = () => {
  const schema = yup.object().shape({
    title: yup.string().max(255).required("A Title is required"),
    description: yup.string().required("Your article must have a Body!"),
    authorName: yup
      .string()
      .required("Please Specify The author of this piece"),
    category: yup.string().required("Please Specify a Category").min(4).max(20),
    authorAvatar: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File is not selected / File is too large",
        (value) => value && value[0] && value[0].size <= 1024 * 1024 * 10
      ),
    cover: yup
      .mixed()
      .test(
        "fileSize",
        "File is not selected / File is too large",
        (value) => value && value[0] && value[0].size <= 1024 * 1024 * 8
      )
      .required("A file is required"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { selectedArticle } = useContext(SelectedArticleContext);
  useEffect(() => {
    if (selectedArticle) {
      reset({
        title: selectedArticle.title,
        description: selectedArticle.description,
        authorName: selectedArticle.authorName,
        authorAvatar: selectedArticle.authorAvatar,
        cover: selectedArticle.cover,
      });
    }
  }, [selectedArticle, reset]);

  useEffect(() => {
    register("category");
  }, [register]);
  const [submit, setSubmit] = useState(false);
  const authorAvatarFile = watch("authorAvatar");
  const [isAvatarSelected, setIsAvatarSelected] = useState(false);
  const [isCoverSelected, setIsCoverSelected] = useState(false);
  const coverFile = watch("cover");

  useEffect(() => {
    setIsAvatarSelected(authorAvatarFile && authorAvatarFile.length > 0);
  }, [authorAvatarFile]);

  useEffect(() => {
    setIsCoverSelected(coverFile && coverFile.length > 0);
  }, [coverFile]);

  const options = [
    { value: "English", label: "English" },
    { value: "French", label: "French" },
    { value: "Spanish", label: "Spanish" },
    { value: "Italian", label: "Italian" },
    { value: "Grammar", label: "Grammar" },
    { value: "Vocabulary", label: "Vocabulary" },
    { value: "Pronunciation", label: "Pronunciation" },
    { value: "Culture", label: "Culture" },
    { value: "Literature", label: "Literature" },
  ];
  const handleCategoryChange = (selectedOption) => {
    setValue("category", selectedOption.value);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  const onSubmit = async (data) => {
    setSubmit(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("authorName", data.authorName);
    formData.append("authorAvatar", data.authorAvatar[0]);
    formData.append("cover", data.cover[0]);
    formData.append("category", data.category);

    try {
      let response;
      if (selectedArticle) {
        // If selectedArticle exists, we're editing an existing article
        if (window.confirm("Do you want to update this article?")) {
          response = await axios.put(
            `http://127.0.0.1:8000/articles/${selectedArticle.id}/`,
            formData
          );
        }
      } else {
        // If selectedArticle doesn't exist, we're adding a new article
        response = await axios.post(
          "http://127.0.0.1:8000/articles/",
          formData
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  ///////////////////////////////////////////////////////////
  return (
    <center>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <header className="article-header">
          <h1>Articles Form</h1>
        </header>
        <input type="text" placeholder="Title" {...register("title")} />
        {errors.title && <p className="custom-error">{errors.title.message}</p>}
        <textarea placeholder="Description" {...register("description")} />
        {errors.description && (
          <p className="custom-error">{errors.description.message}</p>
        )}
        <Select
          options={options}
          onChange={handleCategoryChange}
          className="input-field"
          classNamePrefix="my-select"
        />

        <input
          type="text"
          placeholder="Author Name"
          {...register("authorName")}
        />
        {errors.authorName && (
          <p className="custom-error">{errors.authorName.message}</p>
        )}
        <div className="file-upload-container">
          <label
            htmlFor="author-avatar-upload"
            className={`custom-file-upload ${
              isAvatarSelected ? "file-selected" : ""
            }`}
          >
            Avatar
          </label>
          <input
            id="author-avatar-upload"
            className="file-input"
            type="file"
            {...register("authorAvatar")}
          />
          {errors.authorAvatar && (
            <p className="custom-error">{errors.authorAvatar.message}</p>
          )}

          <label
            htmlFor="cover-upload"
            className={`custom-file-upload ${
              isCoverSelected ? "file-selected" : ""
            }`}
          >
            Cover
          </label>
          <input
            id="cover-upload"
            className="file-input"
            type="file"
            {...register("cover")}
          />
          {errors.cover && (
            <p className="custom-error">{errors.cover.message}</p>
          )}
        </div>
        <input type="submit"></input>
        {submit && <p className="success">Form submitted successfully!</p>}
      </form>
    </center>
  );
};
export default AddArticle;
// what's the validation, it means that i have to make sure that what i type in the input must be in the correct form
//up defines the shape of the form , or how it supposed to be like , and that is by creating somehting called a schema
//we created the schema to specify the shape of our form , so the useForm hook must be below it , the useForm hook accepts an object as a parameter {} , which contains a resolver
//How to link to my Rest frameword backend
//we have to use the fetch API
