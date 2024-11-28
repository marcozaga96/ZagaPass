import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";

const FilmComponents = () => {
  const [movieList, setMovieList] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/films", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      setMovieList(data._embedded.filmModels);
    };

    fetchMovies().catch((error) => console.error("Error:", error));
  }, []);
  const handleClose = () => setShow(false);

  const handleShow = async (movieId) => {
    const token = localStorage.getItem("Access Token");
    try {
      const response = await fetch(
        `http://localhost:3001/api/films/${movieId}/videos`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log("sono data", data);
      const trailer = data.find((video) => video.type === "Trailer");
      const trailerUrl = trailer
        ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1`
        : null;
      setSelectedTrailer(trailerUrl);
      setShow(true);
    } catch (error) {
      console.error("Error fetching video:", error);
      setSelectedTrailer(null);
      setShow(true);
    }
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
