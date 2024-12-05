import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import AnimeComponets from "../components/AnimeComponents";
import SerieTVComponents from "../components/SerieTVComponents";
import { useLocation } from "react-router-dom";
import { fetchAnimesByQuery } from "../action/animeActions";
import { fetchSerieTVByQuery } from "../action/serietvActions";
import { fetchFilmsByQuery } from "../action/filmactions";
import FilmComponents from "../components/FilmComponents";

const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const films = useSelector((state) => state.films.searchResults);
  const animes = useSelector((state) => state.animes.searchResultsAnime);
  const serietv = useSelector((state) => state.serietv.searchResultsSerieTV);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    if (query) {
      console.log(`Fetching results for query: "${query}"`);
      dispatch(fetchFilmsByQuery(query));
      dispatch(fetchAnimesByQuery(query));
      dispatch(fetchSerieTVByQuery(query));
    }
  }, [dispatch, query]);

  useEffect(() => {
    console.log("Films:", films);
    console.log("Animes:", animes);
    console.log("Serie TV:", serietv);
  }, [films, animes, serietv]);

  return (
    <Container fluid className="p-4 background">
      <h1>Risultati della ricerca per "{query}"</h1>
      {films.length > 0 && (
        <div>
          <h2>Film</h2>
          <FilmComponents movieList={films} />
        </div>
      )}
      {animes.length > 0 && (
        <div>
          <h2>Anime</h2>
          <AnimeComponets animeList={animes} />
        </div>
      )}
      {serietv.length > 0 && (
        <div>
          <h2>Serie TV</h2>
          <SerieTVComponents tvShowList={serietv} />
        </div>
      )}
      {films.length === 0 && animes.length === 0 && serietv.length === 0 && (
        <p>Nessun risultato trovato per "{query}"</p>
      )}
    </Container>
  );
};

export default SearchPage;
