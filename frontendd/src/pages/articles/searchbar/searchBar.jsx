import React from "react";
import "./searchbar.css";

const SearchBar = ({ formSubmit, value, handleSearchKey, clearSearch }) => (
  <div className="searchBar-wrap">
    <form onSubmit={formSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Search For Articles"
          value={value}
          onChange={handleSearchKey}
        />
        {value && <span onClick={clearSearch}>X</span>}
        <button>Go</button>
      </div>
    </form>
  </div>
);

export default SearchBar;
