import React from "react";
import { Row, Col, Carousel, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Carosello = () => {
  const films = useSelector((state) => state.films.filmsList);
  const animes = useSelector((state) => state.animes.animesList);
  const serietv = useSelector((state) => state.serietv.serietvList);
  const location = useLocation();
  const colClassName = `mb-4 ${location.pathname === "/home" ? "w-100" : ""}`;

  const getRandomElements = (array, numberOfElements) => {
    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numberOfElements);
  };
  console.log(animes);
  const getImageUrl = (item, type) => {
    if (type === "anime") {
      return (
        item.images?.jpg.large_image_url || "https://via.placeholder.com/1500"
      );
    }
    return `https://image.tmdb.org/t/p/original${item.backdrop_path}`;
  };

  const renderSlide = (item, type) => (
    <div
      className="carousel-slide"
      style={{
        backgroundImage: `url(${getImageUrl(item, type)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "1rem",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <div>
        <h5 className="mb-2">
          {type === "film" ? item.title : item.name || item.title}
        </h5>
        <p>{item.overview || item.synopsis || "Descrizione non disponibile"}</p>
        <Button variant="light">Guarda</Button>
      </div>
      <img
        src={
          type === "anime"
            ? item.images?.jpg.image_url || "https://via.placeholder.com/150"
            : `https://image.tmdb.org/t/p/original${item.poster_path}`
        }
        alt={item.title || item.name || "Elemento"}
        style={{
          width: "250px",
          height: "320px",
          borderRadius: "10px",
        }}
      />
    </div>
  );

  return (
    <Row className={colClassName}>
      <Col>
        <Carousel>
          <Carousel.Item>
            {renderSlide(getRandomElements(films, 1)[0], "film")}
          </Carousel.Item>
          <Carousel.Item>
            {renderSlide(getRandomElements(animes, 1)[0], "anime")}
          </Carousel.Item>
          <Carousel.Item>
            {renderSlide(getRandomElements(serietv, 1)[0], "serietv")}
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  );
};

export default Carosello;
