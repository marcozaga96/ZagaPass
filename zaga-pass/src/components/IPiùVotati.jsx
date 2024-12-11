import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFilms } from "../action/filmactions";
import { fetchTopSerietv } from "../action/serietvActions";
import { Col, Container, Row } from "react-bootstrap";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import { fetchTopAnimes } from "../action/animeActions";
import AnimeComponets from "./AnimeComponents";

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
        <Col md={6} xxl={4} className="flex-grow-1">
          <FilmComponents movieList={getRandomElements(topFilms, 3)} />
        </Col>
        <Col md={6} xxl={4} className="flex-grow-1">
          <AnimeComponets animeList={getRandomElements(topAnimes, 3)} />
        </Col>
        <Col md={6} xxl={4} className="flex-grow-1">
          <SerieTVComponents tvShowList={getRandomElements(topSerietv, 3)} />
        </Col>
      </Row>
    </Container>
  );
};

export default IPiùVotati;
