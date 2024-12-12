import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { deleteUserProfile, updateUserProfile } from "../action/userAction";
import { Link } from "react-router-dom";

const UserComponents = () => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    surname: profile?.surname || "",
    email: profile?.email || "",
    password: "",
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleDeleteUser = () => {
    dispatch(deleteUserProfile());
    setShowDeleteModal(false);
  };

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
  console.log(profile.recensioni);
  return (
    <Container fluid className="p-4 background text-white">
      <h2>Profilo Utente</h2>

      <Row className="my-5">
        <Col md={2} className="text-center">
          <img
            src={profile.avatarURL}
            alt="Avatar"
            fluid
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
        </Col>

        <Col md={9} className="mx-5">
          <p>
            <strong>Nome:</strong> {profile.name}
          </p>
          <p>
            <strong>Cognome:</strong> {profile.surname}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <Button variant="dark" onClick={handleOpenModal} className="mybutton">
            Modifica
          </Button>
          <Button
            variant="danger"
            onClick={handleOpenDeleteModal}
            className="mybutton"
          >
            Cancella Profilo
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8}>
          <h2 className="mb-4">Le tue Recensioni</h2>
          {profile.recensioni && profile.recensioni.length > 0 ? (
            <ul className="list-unstyled">
              {profile.recensioni.map((recensioni) => (
                <li
                  key={recensioni.id}
                  className="p-3 mb-3 border rounded shadow-sm"
                >
                  <div>
                    <strong>Voto:</strong>
                    <p>{recensioni.voto}</p>
                  </div>
                  <div>
                    <strong>Commento:</strong>
                    <p>{recensioni.commento}</p>
                  </div>
                  <div>
                    <strong>Data:</strong>
                    <span>
                      {new Date(recensioni.data).toLocaleDateString()}
                    </span>
                  </div>
                  {recensioni.filmId && (
                    <div>
                      <strong>Film ID:</strong>
                      <span>{recensioni.filmId}</span>
                    </div>
                  )}
                  {recensioni.serieTVId && (
                    <div>
                      <strong>Serie TV ID:</strong>
                      <span>{recensioni.serieTVId}</span>
                    </div>
                  )}
                  {recensioni.animeMalId && (
                    <div>
                      <strong>Anime ID:</strong>
                      <span>{recensioni.animeMalId}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Non hai ancora recensioni.</p>
          )}
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Conferma Cancellazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sei sicuro di voler cancellare il tuo profilo? Questa azione è
          irreversibile.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            onClick={handleCloseDeleteModal}
            className="mybutton"
          >
            Annulla
          </Button>
          <Link to={"/login"}>
            <Button
              variant="danger"
              onClick={handleDeleteUser}
              className="mybutton"
            >
              Conferma
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>

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
            <Button variant="dark" type="submit" className="mybutton">
              Salva Modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserComponents;
