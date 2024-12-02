import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../action/filmactions";
import { fetchSerietv } from "../action/serietvActions";
import { Col, Container, Row } from "react-bootstrap";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import { fetchCurrentSeasonAnimes } from "../action/animeActions";
import AnimeComponets2 from "./AnimeComponents2";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
const UltimeUscite = () => {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.filmsList);
  const currentSeasonAnimes = useSelector(
    (state) => state.animes.currentSeasonAnimesList
  );
  const serietv = useSelector((state) => state.serietv.serietvList);
  useEffect(() => {
    dispatch(fetchCurrentSeasonAnimes());
    dispatch(fetchFilms());
    dispatch(fetchSerietv());
  }, [dispatch]);
  console.log(" sono currentSeasonAnimes", currentSeasonAnimes);

  return (
    <Container className="mt-4 ">
      <Row>
        <Col md={4} className="flex-grow-1">
          <FilmComponents movieList={getRandomElements(films, 2)} />
        </Col>
        <Col md={4} className="flex-grow-1">
          <AnimeComponets2
            animeList={getRandomElements(currentSeasonAnimes, 2)}
          />
        </Col>
        <Col md={4} className="flex-grow-1">
          <SerieTVComponents tvShowList={getRandomElements(serietv, 2)} />
        </Col>
      </Row>
    </Container>
  );
};

export default UltimeUscite;
