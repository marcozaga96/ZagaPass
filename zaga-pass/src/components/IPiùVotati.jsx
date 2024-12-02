import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFilms } from "../action/filmactions";
import { fetchTopSerietv } from "../action/serietvActions";
import { Col, Container, Row } from "react-bootstrap";
import FilmComponents3 from "./FilmComponents3";
import SerieTVComponents3 from "./SerieTVComponents3";
import { fetchTopAnimes } from "../action/animeActions";
import AnimeComponets3 from "./AnimeComponents3";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const IPiùVotati = () => {
  const dispatch = useDispatch();
  const topFilms = useSelector((state) => state.films.topFilmsList);
  const topAnimes = useSelector((state) => state.animes.topAnimesList);
  const topSerietv = useSelector((state) => state.serietv.topSerietvList);
  useEffect(() => {
    dispatch(fetchTopAnimes());
    dispatch(fetchTopFilms());
    dispatch(fetchTopSerietv());
  }, [dispatch]);

  return (
    <Container className="mt-4 ">
      <Row>
        <Col md={4} className="flex-grow-1">
          <FilmComponents3 movieList={getRandomElements(topFilms, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <AnimeComponets3 animeList={getRandomElements(topAnimes, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <SerieTVComponents3 tvShowList={getRandomElements(topSerietv, 2)} />
        </Col>
      </Row>
    </Container>
  );
};

export default IPiùVotati;
