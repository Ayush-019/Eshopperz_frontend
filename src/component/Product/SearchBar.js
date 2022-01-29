import React, { useState, Fragment } from "react";
import Metadata from "../layout/metadata";
import "./SearchBar.css";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      <Metadata title="Search Product!" />]
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};
export default SearchBar;
