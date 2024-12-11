/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PaginatedAnime from "../components/PaginatedAnime";
import { fetchAnimesByQuery } from "../action/animeActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const AnimePage = () => {
  const [query, setQuery] = useState("");
  const animes = useSelector((state) => state.animes.searchResultsAnime);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryParam = queryParams.get("query");
    // if (queryParam) {
    setQuery(queryParam);
    dispatch(fetchAnimesByQuery(queryParam));
    setQuery("");
    // }
  }, [dispatch, location]);
  return (
    <div className="p-4 background">
      <h2 className="text-white">Anime</h2>
      {animes && animes.length > 0 ? (
        <PaginatedAnime />
      ) : (
        <p>No serietv found for your search.</p>
      )}
    </div>
  );
};

export default AnimePage;
