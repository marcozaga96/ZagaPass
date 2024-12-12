import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecensione,
  fetchRecensioniPerMedia,
} from "../action/recensioniActions";

const CommentSection = ({ mediaId, mediaType }) => {
  const [text, setText] = useState("");
  const [voto, setVoto] = useState(0);
  const recensioni = useSelector((state) => state.recensioni.recensioniList);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecensioniPerMedia(mediaId, mediaType));
  }, [dispatch, mediaId, mediaType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecensione = { mediaId, mediaType, commento: text, voto };
    console.log("Invio nuova recensione: ", newRecensione);
    dispatch(addRecensione(newRecensione));
    setText("");
    setVoto(0);
  };
  console.log(recensioni);

  return (
    <>
      <Row className="mt-5">
        <Col md={8}>
          <h3>Aggiungi una recensione</h3>
          {isAuthenticated ? (
            <Form onSubmit={handleSubmit} className="mt-3">
              <Form.Group controlId="reviewText">
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Scrivi il tuo commento qui..."
                  required
                />
              </Form.Group>
              <Form.Group controlId="reviewVote" className="mt-3">
                <Form.Select
                  value={voto}
                  onChange={(e) => setVoto(Number(e.target.value))}
                  required
                >
                  <option value="" disabled>
                    Seleziona un voto
                  </option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="dark" type="submit" className="mt-3 mybutton">
                Aggiungi Recensione
              </Button>
            </Form>
          ) : (
            <p>Effettua il login per aggiungere una recensione.</p>
          )}
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <h3 className="mt-5">Recensioni</h3>
          <ul className="list-unstyled mt-4">
            {recensioni.map((recensione) => (
              <li
                key={recensione.id}
                className="p-3 mb-3 border rounded shadow-sm"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>{recensione.autore || "Anonimo"}</strong>
                  <em>{new Date(recensione.data).toLocaleDateString()}</em>
                </div>
                <div className="fw-bold">Voto: {recensione.voto}</div>
                <div>{recensione.commento}</div>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default CommentSection;
