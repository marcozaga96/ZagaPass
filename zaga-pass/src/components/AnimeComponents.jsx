import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CommentSection from "./CommentSection";
import {
  addFavoriteItem,
  removeFavoriteItem,
} from "../action/preferitiActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AnimeComponets = ({ animeList }) => {
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const favoritesList = useSelector((state) => state.preferiti.favoritesList);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.animes.loader);
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

  console.log("sono animecurrent", selectedAnime);
  return (
    <Container fluid className="pt-4 background">
      <Row>
        {animeList.map((anime) => {
          const isFavorite = favoritesList.some(
            (item) => item.mediaId === anime.mal_id
          );
          return (
            <Col md={2} className="mb-4 flex-grow-1" key={anime.mal_id}>
              {" "}
              <Card>
                {" "}
                <Card.Img
                  variant="top"
                  src={anime.images.jpg.image_url}
                  style={{ height: "400px", objectFit: "fill" }}
                  onClick={() =>
                    handleShow(anime.trailer.embed_url, anime.mal_id)
                  }
                />{" "}
                <Card.Body>
                  {" "}
                  <Card.Title>{anime.title}</Card.Title>{" "}
                  <div className="card-overlay d-flex align-items-center justify-content-center">
                    {" "}
                    <i
                      className="bi bi-play-circle transparent-button"
                      style={{ fontSize: "3rem" }}
                      onClick={() =>
                        handleShow(anime.trailer.embed_url, anime.mal_id)
                      }
                    ></i>{" "}
                  </div>{" "}
                  <div
                    className="favorite-icon"
                    onClick={() => handleFavoriteClick(anime)}
                  >
                    {" "}
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}{" "}
                  </div>{" "}
                </Card.Body>{" "}
              </Card>{" "}
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
              {" "}
              <iframe
                width="100%"
                height="500"
                src={selectedTrailer}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              ></iframe>{" "}
              {selectedAnime && (
                <CommentSection mediaId={selectedAnime} mediaType="anime" />
              )}{" "}
            </div>
          ) : (
            <p>Trailer non trovato</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AnimeComponets;
