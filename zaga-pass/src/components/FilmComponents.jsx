/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
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
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const [localFavoritesList, setLocalFavoritesList] = useState(favoritesList);
  const location = useLocation();

  useEffect(() => {
    setLocalFavoritesList(favoritesList);
  }, [favoritesList]);
  const handleFavoriteClick = (movie) => {
    const isFavorite = localFavoritesList.some(
      (item) => item.mediaId === movie.id
    );
    const heartElement = document.getElementById(`heart-icon-${movie.id}`);
    if (isFavorite) {
      const favoriteItem = localFavoritesList.find(
        (item) => item.mediaId === movie.id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
      setLocalFavoritesList((prevList) =>
        prevList.filter((item) => item.mediaId !== movie.id)
      );
    } else {
      const favoriteItem = { mediaId: movie.id, mediaType: "film" };
      dispatch(addFavoriteItem(favoriteItem));
      setLocalFavoritesList((prevList) => [...prevList, favoriteItem]);
    }
    if (heartElement) {
      heartElement.classList.toggle("color-red");
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
        <Modal.Header closeButton className="modal-color">
          <Modal.Title className="text-white">{currentMovie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-color">
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
            id={`heart-icon-${currentMovie.id}`}
            className={`favorite-icon ${
              localFavoritesList.some(
                (item) => item.mediaId === currentMovie.id
              )
                ? "color-red"
                : ""
            }`}
            onClick={() => handleFavoriteClick(currentMovie)}
          >
            {" "}
            {localFavoritesList.some(
              (item) => item.mediaId === currentMovie.id
            ) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <Link
            to={`/films/${currentMovie.id}/full`}
            className="btn btn-primary mt-3 mybutton"
            onClick={handleClose}
          >
            Dettagli
          </Link>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilmComponents;
