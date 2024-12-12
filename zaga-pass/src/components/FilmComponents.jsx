/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer } from "../action/filmactions";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const FilmComponents = ({ movieList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const selectedTrailer = useSelector((state) => state.films.selectedTrailer);
  const [selectedTrailer2, setSelectedTrailer] = useState(null);
  const [currentMovie, setCurrentMovie] = useState({ id: null, title: "" });
  const favoritesList = useSelector((state) => state.user.profile.preferiti);
  const location = useLocation();

  const handleFavoriteClick = (movie) => {
    const isFavorite = favoritesList.some((item) => item.mediaId === movie.id);
    if (isFavorite) {
      const favoriteItem = favoritesList.find(
        (item) => item.mediaId === movie.id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
    } else {
      const favoriteItem = {
        mediaId: movie.id,
        mediaType: "film",
      };
      dispatch(addFavoriteItem(favoriteItem));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl, movie) => {
    dispatch(fetchTrailer(movie.id));
    setSelectedTrailer(trailerUrl);
    setCurrentMovie(movie);
    setShow(true);
  };

  return (
    <>
      <Row>
        {movieList.map((movie) => {
          const imageUrl = movie.poster_path
            ? `${BASE_URL}${movie.poster_path}`
            : "https://placedog.net/500/280";
          const colClassName = `mb-4 ${
            location.pathname === "/home" ? "flex-grow-1" : ""
          }`;
          const colProps =
            location.pathname === "/home"
              ? { sm: 6, md: 6, lg: 4 }
              : { sm: 4, md: 3, xxl: 2 };
          return (
            <Col {...colProps} className={colClassName} key={movie.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  className="card"
                  style={{ objectFit: "fill" }}
                  onClick={() =>
                    handleShow(movie.trailer?.embed_url, {
                      id: movie.id,
                      title: movie.title,
                    })
                  }
                />

                <div className="card-overlay d-flex align-items-center justify-content-center">
                  <i
                    className="bi bi-play-circle transparent-button"
                    style={{ fontSize: "3rem" }}
                    onClick={() =>
                      handleShow(movie.trailer?.embed_url, {
                        id: movie.id,
                        title: movie.title,
                      })
                    }
                  ></i>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentMovie.title}</Modal.Title>
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
          <div
            className="favorite-icon"
            onClick={() => handleFavoriteClick(currentMovie)}
          >
            {favoritesList.some((item) => item.mediaId === currentMovie.id) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <Link
            to={`/films/${currentMovie.id}/full`}
            className="btn btn-dark mt-3"
            onClick={handleClose}
          >
            View Details
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilmComponents;
