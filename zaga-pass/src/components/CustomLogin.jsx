import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../action/authActions";

const CustomLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(email, password));
      navigate("/home");
    } catch (err) {
      console.log("Errore durante il login", err);
      setError("Credenziali non valide!");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center background"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col lg={4} className="cardLogin p-4 shadow-sm">
          <div className="text-center mb-4">
            <h4 style={{ fontWeight: "300" }} className="text-white">
              Benvenuto!
            </h4>
            <p style={{ fontWeight: "300" }} className="text-white">
              La miglior piattaforma di streaming
            </p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 ">
              Accedi
            </Button>
            <div className="text-center mt-3">
              <span className="text-muted">Non sei iscritto?</span>
              <Link to="/register" className="ms-2">
                Registrati
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomLogin;
