import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer } from "../action/filmactions";
import CommentSection from "./CommentSection";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FilmComponents = ({ movieList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [currentMovie, setCurrentMovie] = useState(null);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const selectedTrailer = useSelector((state) => state.films.selectedTrailer);

  const handleFavoriteClick = (movie) => {
    const isFavorite = favoritesList.some((item) => item.mediaId === movie.id);
    if (isFavorite) {
      const favoriteItem = favoritesList.find(
        (item) => item.mediaId === movie.id
      );
      console.log("sono la lista movie", movie.id);
      console.log("sono isFavorite", isFavorite);
      dispatch(removeFavoriteItem(favoriteItem.id));
    } else {
      const favoriteItem = {
        mediaId: movie.id,
        mediaType: "film",
      };
      dispatch(addFavoriteItem(favoriteItem));
      console.log("sono la lista item", favoriteItem);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = async (movieId) => {
    dispatch(fetchTrailer(movieId));
    setCurrentMovie(movieId);
    setShow(true);
  };

  console.log("sono cirrent", currentMovie);

  return (
    <Container fluid className="pt-4 background">
      <Row>
        {movieList.map((movie) => {
          const isFavorite =
            Array.isArray(favoritesList) &&
            favoritesList.some((item) => item.mediaId === movie.id);
          return (
            <Col md={2} className="mb-4 flex-grow-1" key={movie.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}${movie.poster_path}`}
                  style={{ height: "400px", objectFit: "fill" }}
                  onClick={() => handleShow(movie.id)}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <div className="card-overlay d-flex align-items-center justify-content-center">
                    <i
                      className="bi bi-play-circle transparent-button"
                      style={{ fontSize: "3rem" }}
                      onClick={() => handleShow(movie.id)}
                    ></i>
                  </div>
                  <div
                    className="favorite-icon"
                    onClick={() => handleFavoriteClick(movie)}
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
              {currentMovie && (
                <CommentSection mediaId={currentMovie} mediaType="film" />
              )}
            </div>
          ) : (
            <p>Trailer non trovato</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FilmComponents;
