import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopFilms, fetchTrailer, setPage } from "../action/filmactions";

const FilmComponents3 = ({ movieList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.films.currentPage);
  const selectedTrailer = useSelector((state) => state.films.selectedTrailer);

  useEffect(() => {
    dispatch(fetchTopFilms(currentPage));
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
  const handleShow = async (movieId) => {
    dispatch(fetchTrailer(movieId));
    setShow(true);
  };
  console.log(movieList);

  return (
    <Container fluid className="pt-4 background">
      <Row>
        {movieList.map((movie) => (
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
                    class="bi bi-play-circle transparent-button"
                    style={{ fontSize: "3rem" }}
                    onClick={() => handleShow(movie.id)}
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

export default FilmComponents3;
