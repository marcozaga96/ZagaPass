import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

const AnimeComponets = ({ animeList }) => {
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = (trailerUrl) => {
    setSelectedTrailer(trailerUrl);
    setShow(true);
  };

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
                style={{ height: "400px", objectFit: "fill" }}
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
