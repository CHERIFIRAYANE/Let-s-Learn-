import "./articles.css";
import SearchBar from "./searchbar/searchBar";
import Axios from "axios";
import { useState, useEffect } from "react";
import ArticleList from "./ArticleList/articleList";
import Fuse from "fuse.js";
import NotFound from "./searchbar/NotFound/NotFound";
import Pagination from "react-js-pagination";
import { NavLink } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsCountPerPage = 3;
  useEffect(() => {
    Axios.get("http://127.0.0.1:8000/articles/")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("There was an error!", error));
  }, []);

  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };

  const handleSearchResults = () => {
    setSearchPerformed(true);

    const options = {
      keys: ["category", "author", "title", "description"],
      includeScore: true,
      threshold: 0.4,
    };

    const fuse = new Fuse(articles, options);
    const result = fuse.search(searchKey);

    const filteredArticles = result.map(({ item }) => item);

    setArticles(filteredArticles);
  };

  const handleGoBack = () => {
    setSearchPerformed(false);
    Axios.get("http://127.0.0.1:8000/articles/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setSearchKey("");
  };

  const handleClearSearch = () => {
    setSearchKey("");
    setSearchPerformed(false);
    Axios.get("http://127.0.0.1:8000/articles/")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  // ...rest of your code...

  const indexOfLastItem = activePage * itemsCountPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsCountPerPage;
  const currentItems = articles.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="articles">
        <header className="article-header">
          <h1>Speakify Articles!</h1>
          <p>
            Explore, learn, and have fun with languages from around the world.
          </p>
        </header>
        <SearchBar
          value={searchKey}
          formSubmit={handleSearchBar}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
          clearSearch={handleClearSearch}
        />
        {searchPerformed && (
          <button className="goBackButton" onClick={handleGoBack}>
            <span className="goBackText">Go Back</span>
          </button>
        )}

        {currentItems.length ? (
          <ArticleList articles={currentItems} />
        ) : (
          <NotFound />
        )}

        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={articles.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      </div>
      <center>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/AddArticle"
        >
          <h2>AddArticle</h2>
        </NavLink>
      </center>
      <center>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "")}
          to="/ModifyArticle"
        >
          <h2>ModifyArticle</h2>
        </NavLink>
      </center>
    </>
  );
};

export default Articles;
/*<div className="link">

</div>*/
