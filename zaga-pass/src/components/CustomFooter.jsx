import React from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const CustomFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4">
            <h5>Links Utili</h5>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                href="/home"
                className="bg-dark text-white"
              >
                Home
              </ListGroup.Item>
              <ListGroup.Item action href="/me" className="bg-dark text-white">
                Profilo
              </ListGroup.Item>
              <ListGroup.Item
                action
                href="/favorites"
                className="bg-dark text-white"
              >
                Preferiti
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Contatti</h5>
            <ul className="list-unstyled">
              <li>Indirizzo: Via Carlo Forlanini, 69</li>
              <li>Email: marcozagaria@live.com</li>
              <li>Telefono: 3319331141</li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Seguici</h5>
            <div className="d-flex justify-content-center">
              <Button
                variant="dark"
                href="https://www.facebook.com/marco.zagaria.10/"
                target="_blank"
                className="text-white me-3"
              >
                <FaFacebook size={30} />
              </Button>
              <Button
                variant="dark"
                href="https://github.com/marcozaga96"
                target="_blank"
                className="text-white me-3"
              >
                <FaGithub size={30} />
              </Button>
              <Button
                variant="dark"
                href="https://www.instagram.com/marco_zagaria96/"
                target="_blank"
                className="text-white me-3"
              >
                <FaInstagram size={30} />
              </Button>
              <Button
                variant="dark"
                href="https://www.linkedin.com/in/marco-zagaria-b4281b327/"
                target="_blank"
                className="text-white me-3 "
              >
                <FaLinkedin size={30} />
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {currentYear} CinePass Club. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomFooter;
