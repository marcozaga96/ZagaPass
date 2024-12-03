import React, { useState } from "react";
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import CommentSection from "./CommentSection";

const AnimeComponets = ({ animeList }) => {
  const [show, setShow] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const loader = useSelector((state) => state.animes.loader);
  console.log(loader);

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
                    onClick={() =>
                      handleShow(anime.trailer.embed_url, anime.mal_id)
                    }
                  ></i>
                </div>
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
