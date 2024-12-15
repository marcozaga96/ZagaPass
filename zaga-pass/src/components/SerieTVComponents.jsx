/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer } from "../action/serietvActions";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SerieTVComponents = ({ tvShowList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const selectedTrailer = useSelector((state) => state.serietv.selectedTrailer);
  const [selectedTrailers, setSelectedTrailer] = useState(null);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const [localFavoritesList, setLocalFavoritesList] = useState(favoritesList);
  const [currentSerieTV, setCurrentSerieTV] = useState({ id: null, title: "" });
  const location = useLocation();

  useEffect(() => {
    setLocalFavoritesList(favoritesList);
  }, [favoritesList]);
  const handleFavoriteClick = (serietv) => {
    const isFavorite = localFavoritesList.some(
      (item) => item.mediaId === serietv.id
    );
    const heartElement = document.getElementById(`heart-icon-${serietv.id}`);
    if (isFavorite) {
      const favoriteItem = localFavoritesList.find(
        (item) => item.mediaId === serietv.id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
      setLocalFavoritesList((prevList) =>
        prevList.filter((item) => item.mediaId !== serietv.id)
      );
    } else {
      const favoriteItem = { mediaId: serietv.id, mediaType: "serieTV" };
      dispatch(addFavoriteItem(favoriteItem));
      setLocalFavoritesList((prevList) => [...prevList, favoriteItem]);
    }
    if (heartElement) {
      heartElement.classList.toggle("color-red");
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl, serietv) => {
    dispatch(fetchTrailer(serietv.id));
    setSelectedTrailer(trailerUrl);
    setCurrentSerieTV(serietv);
    setShow(true);
  };
  return (
    <>
      <Row>
        {tvShowList.map((tvShow) => {
          const imageUrl = tvShow.poster_path
            ? `${BASE_URL}${tvShow.poster_path}`
            : "https://placedog.net/500/280";
          const colClassName = `mb-4 ${
            location.pathname === "/home" ? "flex-grow-1" : ""
          }`;
          const colProps =
            location.pathname === "/home"
              ? { sm: 6, md: 6, lg: 4 }
              : { sm: 4, md: 3, xxl: 2 };
          return (
            <Col {...colProps} className={colClassName} key={tvShow.id}>
              <Card>
                <Card.Img
                  variant="top"
                  className="card"
                  src={imageUrl}
                  style={{ objectFit: "fill" }}
                  onClick={() =>
                    handleShow(tvShow.trailer?.embed_url, {
                      id: tvShow.id,
                      title: tvShow.name,
                    })
                  }
                />
                <div className="card-overlay d-flex align-items-center justify-content-center">
                  <i
                    className="bi bi-play-circle transparent-button"
                    style={{ fontSize: "3rem" }}
                    onClick={() =>
                      handleShow(tvShow.trailer?.embed_url, {
                        id: tvShow.id,
                        title: tvShow.name,
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
          <Modal.Title className="text-white">
            {currentSerieTV.title}
          </Modal.Title>
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
            id={`heart-icon-${currentSerieTV.id}`}
            className={`favorite-icon ${
              localFavoritesList.some(
                (item) => item.mediaId === currentSerieTV.id
              )
                ? "color-red"
                : ""
            }`}
            onClick={() => handleFavoriteClick(currentSerieTV)}
          >
            {" "}
            {localFavoritesList.some(
              (item) => item.mediaId === currentSerieTV.id
            ) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <Link
            to={`/serietv/${currentSerieTV.id}/full`}
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
export default SerieTVComponents;
