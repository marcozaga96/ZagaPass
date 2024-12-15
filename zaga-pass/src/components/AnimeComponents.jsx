import React, { useEffect, useState } from "react";
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
  const [localFavoritesList, setLocalFavoritesList] = useState(favoritesList);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.animes.loader);
  const location = useLocation();
  console.log(loader);

  useEffect(() => {
    setLocalFavoritesList(favoritesList);
  }, [favoritesList]);
  const handleFavoriteClick = (anime) => {
    const isFavorite = localFavoritesList.some(
      (item) => item.mediaId === anime.mal_id
    );
    if (isFavorite) {
      const favoriteItem = localFavoritesList.find(
        (item) => item.mediaId === anime.mal_id
      );
      dispatch(removeFavoriteItem(favoriteItem.id));
      setLocalFavoritesList((prevList) =>
        prevList.filter((item) => item.mediaId !== anime.mal_id)
      );
    } else {
      const favoriteItem = { mediaId: anime.mal_id, mediaType: "anime" };
      dispatch(addFavoriteItem(favoriteItem));
      setLocalFavoritesList((prevList) => [...prevList, favoriteItem]);
    }
    const heartElement = document.getElementById(`heart-icon-${anime.mal_id}`);
    if (heartElement) {
      heartElement.classList.toggle("color-red");
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
          const colClassName = `mb-4 ${
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
        <Modal.Header closeButton className="modal-color text-white">
          <Modal.Title className="text-white">
            {selectedAnime.title}
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
            id={`heart-icon-${selectedAnime.mal_id}`}
            className={`favorite-icon ${
              localFavoritesList.some(
                (item) => item.mediaId === selectedAnime.mal_id
              )
                ? "color-red"
                : ""
            }`}
            onClick={() => handleFavoriteClick(selectedAnime)}
          >
            {localFavoritesList.some(
              (item) => item.mediaId === selectedAnime.mal_id
            ) ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )}
          </div>
          <Link
            to={`/anime/${selectedAnime.mal_id}/full`}
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

export default AnimeComponets;
