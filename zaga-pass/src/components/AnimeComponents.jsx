import React, { useState } from "react";
import { Row, Col, Card, Modal } from "react-bootstrap";
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
  const [selectedAnime, setSelectedAnime] = useState({
    mal_id: null,
    title: "",
  });
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

  return (
    <>
      <Row>
        {animeList.map((anime) => {
          const imageUrl =
            anime.images?.jpg?.image_url || "https://placedog.net/500/280";
          const colClassName = `my-4 ${
            location.pathname === "/home" ? "flex-grow-1" : ""
          }`;
          const colProps =
            location.pathname === "/home"
              ? { sm: 6, md: 6, lg: 4 }
              : { sm: 4, md: 3, xxl: 2 };
          return (
            <Col {...colProps} className={colClassName} key={anime.mal_id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={imageUrl}
                  className="card"
                  style={{ objectFit: "fill" }}
                  onClick={() =>
                    handleShow(anime.trailer.embed_url, {
                      mal_id: anime.mal_id,
                      title: anime.title,
                    })
                  }
                />

                <div className="card-overlay d-flex align-items-center justify-content-center">
                  <i
                    className="bi bi-play-circle transparent-button"
                    style={{ fontSize: "3rem" }}
                    onClick={() =>
                      handleShow(anime.trailer.embed_url, {
                        mal_id: anime.mal_id,
                        title: anime.title,
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
          <Modal.Title>{selectedAnime.title}</Modal.Title>
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
            onClick={() => handleFavoriteClick(selectedAnime)}
          >
            {favoritesList.some(
              (item) => item.mediaId === selectedAnime.mal_id
            ) ? (
              <FaHeart color="red" />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <Link
            to={`/anime/${selectedAnime.mal_id}/full`}
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

export default AnimeComponets;
