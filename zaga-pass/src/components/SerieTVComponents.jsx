import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const SerieTVComponents = () => {
  const [tvShowList, setTVShowList] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/serietv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch TV shows");
      }
      const data = await response.json();
      setTVShowList(data._embedded.serieTVModels);
    };

    fetchTVShows().catch((error) => console.error("Error:", error));
  }, []);
  const handleClose = () => setShow(false);

  const handleShow = async (serietvId) => {
    const token = localStorage.getItem("Access Token");
    try {
      const response = await fetch(
        `http://localhost:3001/api/serietv/${serietvId}/videos`,
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
      <h2>Serie TV</h2>
      <Row>
        {tvShowList.map((tvShow) => (
          <Col md={2} className="mb-4" key={tvShow.id}>
            <Card>
              <Card.Img
                variant="top"
                src={`${BASE_URL}${tvShow.poster_path}`}
                style={{ height: "400px", objectFit: "fill" }}
                onClick={() => handleShow(tvShow.id)}
              />
              <Card.Body>
                <Card.Title>{tvShow.name}</Card.Title>
                <Button variant="primary" onClick={() => handleShow(tvShow.id)}>
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

export default SerieTVComponents;
