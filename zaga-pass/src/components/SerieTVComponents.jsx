import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailer } from "../action/serietvActions";
import CommentSection from "./CommentSection";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const SerieTVComponents = ({ tvShowList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const selectedTrailer = useSelector((state) => state.serietv.selectedTrailer);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const [currentSerieTV, setCurrentSerieTV] = useState(null);

  const handleFavoriteClick = (serietv) => {
    const isFavorite = favoritesList.some(
      (item) => item.mediaId === serietv.id
    );
    if (isFavorite) {
      const favoriteItem = favoritesList.find(
        (item) => item.mediaId === serietv.id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
    } else {
      const favoriteItem = {
        mediaId: serietv.id,
        mediaType: "serieTV",
      };
      dispatch(addFavoriteItem(favoriteItem));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = async (serietvId) => {
    dispatch(fetchTrailer(serietvId));
    setCurrentSerieTV(serietvId);
    setShow(true);
  };

  return (
    <Container fluid className="pt-4 background">
      <Row>
        {tvShowList.map((tvShow) => {
          const isFavorite = favoritesList.some(
            (item) => item.mediaId === tvShow.id
          );
          return (
            <Col md={2} className="mb-4 flex-grow-1" key={tvShow.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}${tvShow.poster_path}`}
                  style={{ height: "400px", objectFit: "fill" }}
                  onClick={() => handleShow(tvShow.id)}
                />
                <Card.Body>
                  <Card.Title>{tvShow.name}</Card.Title>
                  <div className="card-overlay d-flex align-items-center justify-content-center">
                    <i
                      className="bi bi-play-circle transparent-button"
                      style={{ fontSize: "3rem" }}
                      onClick={() => handleShow(tvShow.id)}
                    ></i>
                  </div>
                  <div
                    className="favorite-icon"
                    onClick={() => handleFavoriteClick(tvShow)}
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
              {currentSerieTV && (
                <CommentSection mediaId={currentSerieTV} mediaType="serieTV" />
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

export default SerieTVComponents;
