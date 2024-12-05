import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimesByQuery } from "../action/animeActions";
import AnimeComponets from "../components/AnimeComponents";

const SearchPageAnime = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.animes.searchResults);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
      dispatch(fetchAnimesByQuery(searchQuery));
    }
  }, [location.search, dispatch]);

  return (
    <div className="p-4 background">
      <h1>Risultati per: "{query}"</h1>
      <AnimeComponets animeList={animes} />
    </div>
  );
};

export default SearchPageAnime;
