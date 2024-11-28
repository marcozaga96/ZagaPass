import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSerietv, fetchTrailer } from "../action/serietvActions";

const SerieTVComponents = ({ tvShowList }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = async (serietvId) => {
    dispatch(fetchTrailer(serietvId));
    setShow(true);
  };

  const selectedTrailer = useSelector((state) => state.serietv.selectedTrailer);

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
