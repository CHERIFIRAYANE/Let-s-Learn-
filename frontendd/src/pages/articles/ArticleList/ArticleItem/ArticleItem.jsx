import React from "react";
import "./articleitem.css";
import { Link } from "react-router-dom";
import Chip from "./Chip/Chip";

const ArticleItem = ({
  article: {
    id,
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
  },
}) => {
  const date = new Date(createdAt);
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <div className="articleItem-wrap">
      <a href="">
        <img className="articleItem-cover" src={cover} alt="cover" />
      </a>
      <Chip category={category} />
      <h3>{title}</h3>
      <p className="articleItem-desc">{description}</p>
      <footer>
        <div className="articleItem-author">
          <img src={authorAvatar} alt="avatar" />
          <div>
            <h6>{authorName}</h6>
            <p>{formattedDate}</p>
          </div>
        </div>
        <Link className="articleItem-link" to={`/articles/${id}`}>
          Read More
        </Link>
      </footer>
    </div>
  );
};

export default ArticleItem;
