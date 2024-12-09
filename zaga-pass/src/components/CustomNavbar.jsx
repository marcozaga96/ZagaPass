import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSearchContext } from "../action/searchActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile } from "../action/userAction";
import { logout } from "../action/authActions";

const CustomNavbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const { profile, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    let context = "home";
    if (location.pathname.includes("/films")) context = "films";
    if (location.pathname.includes("/anime")) context = "anime";
    if (location.pathname.includes("/serietv")) context = "serietv";

    dispatch(setSearchQuery(searchInput));
    dispatch(setSearchContext(context));

    if (context === "films") {
      navigate(`/films/search?query=${searchInput}`);
    } else if (context === "anime") {
      navigate(`/anime/search?query=${searchInput}`);
    } else if (context === "serietv") {
      navigate(`/serietv/search?query=${searchInput}`);
    } else {
      navigate(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  if (loading) return <p>Caricamento in corso...</p>;

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/"
  ) {
    return (
      <div className="background p-4">
        <img
          alt=""
          src="/logo.png"
          width="150"
          height="50"
          className="d-inline-block align-top"
        />
      </div>
    );
  }

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
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Cerca"
              className="me-2 bg-secondary"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button variant="outline-secondary">
              <i class="bi bi-search"></i>
            </Button>
          </Form>
          <Nav>
            {profile ? (
              <Dropdown>
                <Dropdown.Toggle variant="dark" id="user-dropdown">
                  <img
                    src={profile.avatarURL || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    roundedCircle
                    style={{ width: "40px", height: "40px" }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/me">
                    Profilo
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/favorites">
                    Preferiti
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrati
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
