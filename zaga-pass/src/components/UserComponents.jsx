import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { updateUserProfile } from "../action/userAction";

const UserComponents = () => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    surname: profile?.surname || "",
    email: profile?.email || "",
    password: "",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      name: formData.name.trim() || profile.name,
      surname: formData.surname.trim() || profile.surname,
      email: formData.email.trim() || profile.email,
    };

    if (formData.password && formData.password.trim() !== "") {
      updatedData.password = formData.password.trim();
    }

    dispatch(updateUserProfile(updatedData));
    handleCloseModal();
  };

  return (
    <Container fluid className="p-4 background">
      <h1>Profilo Utente</h1>
      <Row className="mt-4">
        <Col md={4} className="text-center">
          <img
            src={profile.avatarURL}
            alt="Avatar"
            fluid
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
        </Col>

        <Col md={8}>
          <p>
            <strong>Nome:</strong> {profile.name}
          </p>
          <p>
            <strong>Cognome:</strong> {profile.surname}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <Button variant="dark" onClick={handleOpenModal}>
            Modifica
          </Button>
        </Col>
      </Row>
      <Row>
        <h2>Le tue Recensioni</h2>
        <Col>
          {profile.recensioni && profile.recensioni.length > 0 ? (
            profile.recensioni.map((recensioni) => (
              <div key={recensioni.id} className="review-card">
                <p>
                  <strong>Voto:</strong> {recensioni.voto}
                </p>
                <p>
                  <strong>Commento:</strong> {recensioni.commento}
                </p>
                <p>
                  <strong>Data:</strong> {recensioni.data}
                </p>

                {recensioni.filmId && (
                  <p>
                    <strong>Film ID:</strong> {recensioni.filmId}
                  </p>
                )}
                {recensioni.serieTVId && (
                  <p>
                    <strong>Serie TV ID:</strong> {recensioni.serieTVId}
                  </p>
                )}
                {recensioni.animeMalId && (
                  <p>
                    <strong>Anime ID:</strong> {recensioni.animeMalId}
                  </p>
                )}
                <hr />
              </div>
            ))
          ) : (
            <p>Non hai ancora recensioni.</p>
          )}
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="dark" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserComponents;
