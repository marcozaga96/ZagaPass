import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AnimeComponets = ({ animeList }) => {
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.animes.loader);
  const location = useLocation();
  console.log(loader);

  const handleFavoriteClick = (anime) => {
    const isFavorite = favoritesList.some(
      (item) => item.mediaId === anime.mal_id
    );
    if (isFavorite) {
      const favoriteItem = favoritesList.find(
        (item) => item.mediaId === anime.mal_id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
    } else {
      const favoriteItem = {
        mediaId: anime.mal_id,
        mediaType: "anime",
      };
      dispatch(addFavoriteItem(favoriteItem));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl, anime) => {
    setSelectedTrailer(trailerUrl);
    setSelectedAnime(anime);
    setShow(true);
  };
  console.log("Anime List:", animeList);
  console.log("sono animecurrent", selectedAnime);
  return (
    <Container fluid className="pt-4 background">
      <Row>
        {animeList.map((anime) => {
          const isFavorite = favoritesList.some(
            (item) => item.mediaId === anime.mal_id
          );
          const imageUrl =
            anime.images?.jpg?.image_url || "https://placedog.net/500/280";
          const colClassName = `mb-4 ${
            location.pathname === "/home" ? "flex-grow-1" : ""
          }`;
          return (
            <Col md={2} className={colClassName} key={anime.mal_id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  style={{ height: "400px", objectFit: "fill" }}
                  onClick={() =>
                    handleShow(anime.trailer.embed_url, anime.mal_id)
                  }
                />
                <Card.Body className="cardBody">
                  <Card.Title>{anime.title}</Card.Title>
                  <div className="card-overlay d-flex align-items-center justify-content-center">
                    <i
                      className="bi bi-play-circle transparent-button"
                      style={{ fontSize: "3rem" }}
                      onClick={() =>
                        handleShow(anime.trailer.embed_url, anime.mal_id)
                      }
                    ></i>
                  </div>
                  <div
                    className="favorite-icon"
                    onClick={() => handleFavoriteClick(anime)}
                  >
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrailer ? (
            <div>
              <iframe
                width="100%"
                height="500"
                src={selectedTrailer}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              ></iframe>
            </div>
          ) : (
            <p>Trailer non trovato</p>
          )}
          <Link
            to={`/anime/${selectedAnime}/full`}
            className="btn btn-dark mt-3"
            onClick={handleClose}
          >
            View Details
          </Link>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AnimeComponets;
