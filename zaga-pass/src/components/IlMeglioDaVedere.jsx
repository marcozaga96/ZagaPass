import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilmComponents from "./FilmComponents";
import AnimeComponents from "./AnimeComponents";
import SerieTVComponents from "./SerieTVComponents";
import { fetchAnimes } from "../action/animeActions";
import { fetchFilms } from "../action/filmactions";
import { fetchSerietv } from "../action/serietvActions";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random()); // Mescola la lista
  return shuffled.slice(0, count); // Prendi i primi `count` elementi
};
const IlMeglioDaVedere = () => {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.filmsList);
  const animes = useSelector((state) => state.animes);
  const serietv = useSelector((state) => state.serietv.serietvList);
  useEffect(() => {
    dispatch(fetchAnimes());
    dispatch(fetchFilms());
    dispatch(fetchSerietv());
  }, [dispatch]);

  return (
    <>
      <FilmComponents movieList={getRandomElements(films, 2)} />
      <AnimeComponents animeList={getRandomElements(animes, 2)} />
      <SerieTVComponents tvShowList={getRandomElements(serietv, 2)} />
    </>
  );
};

export default IlMeglioDaVedere;
