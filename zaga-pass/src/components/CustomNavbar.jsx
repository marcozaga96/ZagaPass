import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
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
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-serietv">
                Serie TV
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/serietv">
                  Il Meglio Da Vedere
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/serietv/playing-now">
                  Ultime Uscite
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/serietv/top">
                  I Più Votati
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-anime">
                Anime
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/anime">
                  Il Meglio Da Vedere
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/anime/playing-now">
                  Ultime Uscite
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/anime/top">
                  I Più Votati
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-films">
                Film
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/films">
                  Il Meglio Da Vedere
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/films/playing-now">
                  Ultime Uscite
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/films/top">
                  I Più Votati
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
