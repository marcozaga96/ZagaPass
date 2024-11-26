import React, { useState } from "react";
import { Col, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CustomRegister = () => {
  const [name, setName] = useState("");
  const [surname, setSurnameame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Le password non corrispondono!");
      return;
    }

    const url = "http://localhost:3001/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (!response.ok) {
        throw new Error("Errore nella fetch!");
      }

      const data = await response.json();
      console.log("Dati registrati:", data);

      localStorage.setItem("Access Token", data.accessToken);
      setShowAlert(true);

      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (err) {
      console.log("Errore durante la registrazione", err);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col lg={4} className="card p-4 shadow-sm">
          <div className="text-center mb-4">
            <h4 style={{ fontWeight: "300" }}>Registrazione</h4>
            <p style={{ fontWeight: "300", color: "#6c757d" }}>
              Crea il tuo account.
            </p>
          </div>

          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Registrazione effettuata con successo!
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci cognome"
                value={surname}
                onChange={(e) => setSurnameame(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Conferma password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
            >
              Registrati
            </Button>

            <div className="text-center mt-3">
              <span className="text-muted">Già registrato?</span>
              <Link to="/login" className="ms-2">
                Accedi
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomRegister;
