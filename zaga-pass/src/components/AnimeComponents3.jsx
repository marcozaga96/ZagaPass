import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopAnimes } from "../action/animeActions";
import { setPage } from "../action/animeActions";

const AnimeComponets3 = ({ animeList }) => {
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const loader = useSelector((state) => state.animes.loader);
  console.log(loader);

  const currentPage = useSelector((state) => state.animes.currentPage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopAnimes(currentPage));
  }, [dispatch, currentPage]);

  const handleNext = () => {
    dispatch(setPage(currentPage + 1));
  };
  const handlePrevious = () => {
    if (currentPage > 0) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShow(true);
  };

  console.log("sono animelist2", animeList);
  return (
    <Container fluid className="pt-4 background">
      <Row>
        {animeList?.map((anime) => (
          <Col md={2} className="mb-4 flex-grow-1" key={anime.mal_id}>
            <Card>
              <Card.Img
                variant="top"
                src={anime.images.jpg.image_url}
                style={{ height: "400px", objectFit: "fill" }}
                onClick={() => handleShow(anime.trailer.embed_url)}
              />
              <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                <div className="card-overlay d-flex align-items-center justify-content-center">
                  <i
                    class="bi bi-play-circle transparent-button"
                    style={{ fontSize: "3rem" }}
                    onClick={() => handleShow(anime.trailer.embed_url)}
                  ></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Precedente
        </Button>
        <span>Pagina {currentPage}</span>
        <Button variant="secondary" onClick={handleNext}>
          Successivo
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Trailer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrailer ? (
            <iframe
              width="100%"
              height="500"
              src={selectedTrailer}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Trailer"
            ></iframe>
          ) : (
            <p>Trailer non trovato</p>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AnimeComponets3;
