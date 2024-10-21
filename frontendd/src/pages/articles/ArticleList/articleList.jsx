import React from "react";
import "./articlelist.css";
import ArticleItem from "./ArticleItem/ArticleItem";

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleItem article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
