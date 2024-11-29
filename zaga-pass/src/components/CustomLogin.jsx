import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const CustomLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:3001/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Errore nella fetch!");
      }

      const data = await response.json();
      console.log("I tuoi dati", data);

      localStorage.setItem("Access Token", data.accessToken);
      navigate("/home");
    } catch (err) {
      console.log("Errore durante il login", err);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center justify-content-center background"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col lg={4} className="card p-4 shadow-sm">
          <div className="text-center mb-4">
            <h4 style={{ fontWeight: "300" }}>Benvenuto!</h4>
            <p style={{ fontWeight: "300", color: "#6c757d" }}>
              Il tuo gestionale aziendale di fiducia.
            </p>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Link to="/resetPasswordPage" className="text-muted">
                Forgot password?
              </Link>
            </div>

            <Button variant="dark" type="submit" className="w-100 ">
              Sign in
            </Button>

            <div className="text-center mt-3">
              <span className="text-muted">Not a member?</span>
              <Link to="/register" className="ms-2">
                Register
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomLogin;
