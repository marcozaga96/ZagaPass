import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimesByQuery } from "../action/animeActions";
import AnimeComponets from "../components/AnimeComponents";

const SearchPageAnime = () => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.animes.searchResultsAnime);

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
      <h2 className="text-white">Risultati per: "{query}"</h2>
      <AnimeComponets animeList={animes} />
    </div>
  );
};

export default SearchPageAnime;
