import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const AnimeComponets = () => {
  const [animeList, setAnimeList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShow(true);
  };
  useEffect(() => {
    const fetchAnimes = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/anime", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch animes");
      }
      const data = await response.json();
      setAnimeList(data._embedded.animeModels);
    };
    fetchAnimes().catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Anime</h2>
      <Row>
        {animeList.map((anime) => (
          <Col md={2} className="mb-4" key={anime.mal_id}>
            <Card>
              <Card.Img
                variant="top"
                src={anime.images.jpg.image_url}
                onClick={() => handleShow(anime.trailer.embed_url)}
              />
              <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
                <Button
                  variant="primary"
                  onClick={() => handleShow(anime.trailer.embed_url)}
                >
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

export default AnimeComponets;
