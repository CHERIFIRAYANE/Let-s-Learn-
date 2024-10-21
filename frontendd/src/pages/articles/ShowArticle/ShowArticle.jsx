import React, { useEffect, useState } from "react";
import "./showarticle.css";
import { useParams, Link } from "react-router-dom";
import { data } from "../../../config/data";
import Chip from "../ArticleList/ArticleItem/Chip/Chip";
import NotFound from "../searchbar/NotFound/NotFound";
import Axios from "axios";

const ShowArticle = () => {
  const { id } = useParams(); //this iwll hold the id of the article, from the react router dom link url
  const [article, setArticle] = useState(null); //initiating the object to null

  useEffect(() => {
    Axios.get(`http://127.0.0.1:8000/articles/${id}`)
      .then((response) => {
        const article = response.data;
        const date = new Date(article.createdAt);
        article.created_at = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        setArticle(article);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  return (
    <>
      {article ? (
        <div className="article-wrap">
          <Link className="article-goBack" to="/articles">
            <span> &#8592;</span> <span></span>
          </Link>
          <header>
            <p className="article-date">Published {article.created_at}</p>

            <h1>{article.title}</h1>
            <div className="article-category">
              <Chip category={article.category} />
            </div>
          </header>
          <img src={article.cover} alt="cover" />
          <p className="article-desc">{article.description}</p>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ShowArticle;
