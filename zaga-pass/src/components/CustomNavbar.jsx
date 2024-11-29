import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
  return (
    <Navbar variant="dark" expand="lg" className="background">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt=""
            src="/logo.png"
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="bg-primary"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/serietv">
              Serie TV
            </Nav.Link>
            <Nav.Link as={Link} to="/films">
              Film
            </Nav.Link>
            <Nav.Link as={Link} to="/anime">
              Anime
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Cerca"
              className="me-2 bg-secondary"
              aria-label="Search"
            />
            <Button variant="outline-secondary">
              <i class="bi bi-search"></i>
            </Button>
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/profile">
              Profilo
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Registrati
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
