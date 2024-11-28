import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms, fetchTrailer } from "../action/filmactions";

const FilmComponents = ({ movieList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const selectedTrailer = useSelector((state) => state.films.selectedTrailer);

  const handleClose = () => setShow(false);
  const handleShow = async (movieId) => {
    dispatch(fetchTrailer(movieId));
    setShow(true);
  };

  return (
    <Container className="mt-4">
      <h2>Film</h2>
      <Row>
        {movieList.map((movie) => (
          <Col md={2} className="mb-4" key={movie.id}>
            <Card>
              <Card.Img
                variant="top"
                src={`${BASE_URL}${movie.poster_path}`}
                style={{ height: "400px", objectFit: "fill" }}
                onClick={() => handleShow(movie.id)}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" onClick={() => handleShow(movie.id)}>
                  Guarda il Trailer
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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

export default FilmComponents;
