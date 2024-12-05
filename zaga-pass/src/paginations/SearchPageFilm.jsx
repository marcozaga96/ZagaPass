import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilmsByQuery } from "../action/filmactions";
import FilmComponents from "../components/FilmComponents";

const SearchPageFilm = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.searchResults);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      dispatch(fetchFilmsByQuery(searchQuery));
    }
  }, [location.search, dispatch]);

  return (
    <div className="p-4 background">
      <h1>Risultati per: "{query}"</h1>
      <FilmComponents movieList={films} />
    </div>
  );
};

export default SearchPageFilm;
