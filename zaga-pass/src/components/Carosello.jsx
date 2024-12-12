import React from "react";
import { Row, Col, Carousel } from "react-bootstrap";
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
          marginRight: "20px",
        }}
      />
      <div className="flex-grow-1">
        <h1 className="mb-2 text-white">
          {type === "film" ? item.title : item.name || item.title}
        </h1>
        <h3 className="text-white">
          {item.overview || item.synopsis || "Descrizione non disponibile"}
        </h3>
      </div>
    </div>
  );
  let itemsToShow;
  if (location.pathname.includes("/films")) {
    itemsToShow = getRandomElements(films, 1);
  } else if (location.pathname.includes("/anime")) {
    itemsToShow = getRandomElements(animes, 1);
  } else if (location.pathname.includes("/serietv")) {
    itemsToShow = getRandomElements(serietv, 1);
  } else {
    itemsToShow = [
      ...getRandomElements(films, 1),
      ...getRandomElements(serietv, 1),
    ];
  }
  console.log("item", itemsToShow);
  return (
    <Row className={colClassName}>
      <Col>
        <Carousel>
          {itemsToShow.map((item) => (
            <Carousel.Item key={item.id || item.mal_id}>
              {renderSlide(
                item,
                location.pathname.includes("/anime")
                  ? "anime"
                  : location.pathname.includes("/films")
                  ? "film"
                  : "serietv"
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default Carosello;
