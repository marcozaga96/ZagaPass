import { useSelector } from "react-redux";
import AnimeComponets from "./AnimeComponents";
import FilmComponents from "./FilmComponents";
import SerieTVComponents from "./SerieTVComponents";
import { Carousel, Col, Row } from "react-bootstrap";

const getRandomElements = (list, count) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Carosello = () => {
  const films = useSelector((state) => state.films.filmsList);
  const animes = useSelector((state) => state.animes.animesList);
  const serietv = useSelector((state) => state.serietv.serietvList);

  return (
    <Row className="mb-4">
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
