import { useSelector } from "react-redux";
import AnimeComponets from "./AnimeComponents";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import { Carousel, Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Carosello = () => {
  const films = useSelector((state) => state.films.filmsList);
  const animes = useSelector((state) => state.animes.animesList);
  const serietv = useSelector((state) => state.serietv.serietvList);
  const location = useLocation();
  const colClassName = `mb-4 ${location.pathname === "/home" ? " w-25" : ""}`;
  return (
    <Row className={colClassName}>
      <Col>
        <Carousel>
          <Carousel.Item>
            <FilmComponents movieList={getRandomElements(films, 1)} />
          </Carousel.Item>
          <Carousel.Item>
            <AnimeComponets animeList={getRandomElements(animes, 1)} />
          </Carousel.Item>
          <Carousel.Item>
            <SerieTVComponents tvShowList={getRandomElements(serietv, 1)} />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default Carosello;
