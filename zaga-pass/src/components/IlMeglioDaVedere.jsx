import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FilmComponents from "./FilmComponents";
import AnimeComponents from "./AnimeComponents";
import SerieTVComponents from "./SerieTVComponents";
import { fetchAnimes } from "../action/animeActions";
import { fetchFilms } from "../action/filmactions";
import { fetchSerietv } from "../action/serietvActions";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const IlMeglioDaVedere = () => {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.filmsList);
  const animes = useSelector((state) => state.animes.animesList);
  const serietv = useSelector((state) => state.serietv.serietvList);
  useEffect(() => {
    dispatch(fetchAnimes());
    dispatch(fetchFilms());
    dispatch(fetchSerietv());
  }, [dispatch]);

  return (
    <Container className="mt-4 ">
      <Row>
        <Col md={4} className="flex-grow-1">
          <FilmComponents movieList={getRandomElements(films, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <AnimeComponents animeList={getRandomElements(animes, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <SerieTVComponents tvShowList={getRandomElements(serietv, 2)} />
        </Col>
      </Row>
    </Container>
  );
};

export default IlMeglioDaVedere;
