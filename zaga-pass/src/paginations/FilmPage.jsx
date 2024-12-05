/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PaginatedFilm from "../components/PaginatedFIlm";
import { fetchFilmsByQuery } from "../action/filmactions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const FilmPage = () => {
  const [query, setQuery] = useState("");

  const films = useSelector((state) => state.films.searchResults);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
      dispatch(fetchFilmsByQuery(queryParam));
      setQuery("");
    }
  }, [dispatch, location]);
  return (
    <div className="p-4 background">
      <h1>Film</h1>
      {films && films.length > 0 ? (
        <PaginatedFilm />
      ) : (
        <p>No films found for your search.</p>
      )}
    </div>
  );
};

export default FilmPage;
