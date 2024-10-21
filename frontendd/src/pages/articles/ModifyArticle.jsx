import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SelectedArticleContext } from "./SelectedArticleContext";
import "./articles.css";

const ModifyArticle = () => {
  const [articles, setArticles] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const { setSelectedArticle } = useContext(SelectedArticleContext);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/articles/").then((response) => {
      setArticles(response.data);
    });
  }, []);

  const handleModifyClick = (articleId) => {
    const article = articles.find((article) => article.id === articleId);
    setSelectedArticle(article);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleAuthorFilterChange = (event) => {
    setAuthorFilter(event.target.value);
  };

  const filteredArticles = articles.filter((article) => {
    return (
      (categoryFilter === "" || article.category === categoryFilter) &&
      (authorFilter === "" || article.authorName === authorFilter)
    );
  });
  const handleDeleteClick = (articleId) => {
    if (window.confirm("Do you want to delete this item?")) {
      axios.delete(`http://127.0.0.1:8000/articles/${articleId}/`).then(() => {
        setArticles(articles.filter((article) => article.id !== articleId));
      });
    }
  };

  return (
    <div className="modify">
      <div className="article-header">
        <h1>Modify Articles</h1>
      </div>
      <div>
        <select value={categoryFilter} onChange={handleCategoryFilterChange}>
          <option value="">All Categories</option>
          {[
            { value: "English", label: "English" },
            { value: "French", label: "French" },
            { value: "Spanish", label: "Spanish" },
            { value: "Italian", label: "Italian" },
            { value: "Grammar", label: "Grammar" },
            { value: "Vocabulary", label: "Vocabulary" },
            { value: "Pronunciation", label: "Pronunciation" },
            { value: "Culture", label: "Culture" },
            { value: "Literature", label: "Literature" },
          ].map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <select value={authorFilter} onChange={handleAuthorFilterChange}>
          <option value="">All Authors</option>
          {[
            "Rayane Cherifi",
            "Yasmine Habi",
            "Mounia Hadjebar",
            "Amel Sadoun",
            "Meroua Rezig",
            "Bouguerra Wail",
          ].map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Modify</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((article) => (
            <tr key={article.id}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.authorName}</td>
              <td>{article.category}</td>
              <td>
                <Link
                  className="modify-button"
                  to={{
                    pathname: "/AddArticle",
                    state: { selectedArticle: article },
                  }}
                  onClick={() => handleModifyClick(article.id)}
                >
                  Modify
                </Link>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(article.id)}
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
export default ModifyArticle;
