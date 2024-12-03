import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentFilms } from "../action/filmactions";
import { fetchCurrentSerietv } from "../action/serietvActions";
import { Col, Container, Row } from "react-bootstrap";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import { fetchCurrentSeasonAnimes } from "../action/animeActions";
import AnimeComponets from "./AnimeComponents";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const UltimeUscite = () => {
  const dispatch = useDispatch();
  const currentFilms = useSelector((state) => state.films.currentFilmsList);
  const currentSeasonAnimes = useSelector(
    (state) => state.animes.currentSeasonAnimesList
  );
  const currentSerietv = useSelector(
    (state) => state.serietv.currentSerietvList
  );
  useEffect(() => {
    dispatch(fetchCurrentSeasonAnimes());
    dispatch(fetchCurrentFilms());
    dispatch(fetchCurrentSerietv());
  }, [dispatch]);
  console.log(" sono currentSeasonAnimes", currentSeasonAnimes);

  return (
    <Container className="mt-4 ">
      <Row>
        <Col md={4} className="flex-grow-1">
          <FilmComponents movieList={getRandomElements(currentFilms, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <AnimeComponets
            animeList={getRandomElements(currentSeasonAnimes, 2)}
          />
        </Col>
        <Col md={4} className="flex-grow-1">
          <SerieTVComponents
            tvShowList={getRandomElements(currentSerietv, 2)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UltimeUscite;
