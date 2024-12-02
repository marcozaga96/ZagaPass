import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentFilms } from "../action/filmactions";
import { fetchCurrentSerietv, fetchSerietv } from "../action/serietvActions";
import { Col, Container, Row } from "react-bootstrap";
import FilmComponents2 from "./FilmComponents2";
import SerieTVComponents2 from "./SerieTVComponents2";
import { fetchCurrentSeasonAnimes } from "../action/animeActions";
import AnimeComponets2 from "./AnimeComponents2";

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
          <FilmComponents2 movieList={getRandomElements(currentFilms, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <AnimeComponets2
            animeList={getRandomElements(currentSeasonAnimes, 2)}
          />
        </Col>
        <Col md={4} className="flex-grow-1">
          <SerieTVComponents2
            tvShowList={getRandomElements(currentSerietv, 2)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UltimeUscite;
