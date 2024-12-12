import React, { useCallback, useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSearchContext } from "../action/searchActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fetchUserProfile } from "../action/userAction";
import { logout } from "../action/authActions";

const CustomNavbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const { profile, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarScrolled(true);
      } else {
        setNavbarScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const performSearch = useCallback(
    (query) => {
      if (!query.trim()) return;
      let context = "home";
      if (location.pathname.includes("/films")) context = "films";
      if (location.pathname.includes("/anime")) context = "anime";
      if (location.pathname.includes("/serietv")) context = "serietv";

      dispatch(setSearchQuery(query));
      dispatch(setSearchContext(context));

      if (context === "films") {
        navigate(`/films/search?query=${query}`);
      } else if (context === "anime") {
        navigate(`/anime/search?query=${query}`);
      } else if (context === "serietv") {
        navigate(`/serietv/search?query=${query}`);
      } else {
        navigate(`/search?query=${query}`);
      }
    },
    [dispatch, location.pathname, navigate]
  );

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    if (typingTimeout) clearTimeout(typingTimeout);

    setTypingTimeout(
      setTimeout(() => {
        performSearch(query);
      }, 500)
    );
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

  console.log("sono profile", profile);

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className={"background text-color p-3 mynavbar "}
    >
      <Container fluid className={`${navbarScrolled ? "mynavbar p-4" : ""}`}>
        <Navbar.Brand as={Link} to="/home">
          <img
            alt=""
            src="/logo.png"
            width="150"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-dark-example" />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              id="nav-dropdown-dark-example"
              className="text-color"
              style={{ color: "White" }}
              title="Serie TV"
              menuVariant="dark"
            >
              <NavDropdown.Item
                as={Link}
                to="/serietv"
                className="dropdown-card"
              >
                Il Meglio Da Vedere
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/serietv/playing-now"
                className="dropdown-card"
              >
                Ultime Uscite
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/serietv/top"
                className="dropdown-card"
              >
                I Più Votati
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Anime"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/anime" className="dropdown-card">
                Il Meglio Da Vedere
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/anime/playing-now"
                className="dropdown-card"
              >
                Ultime Uscite
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/anime/top"
                className="dropdown-card"
              >
                I Più Votati
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Film"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/films" className="dropdown-card">
                Il Meglio Da Vedere
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/films/playing-now"
                className="dropdown-card"
              >
                Ultime Uscite
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/films/top"
                className="dropdown-card"
              >
                I Più Votati
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {showSearch && (
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Cerca"
                className="me-2 bg-dark text-white"
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
                onClick={() => setSearchInput("")}
              />
            </Form>
          )}

          <i
            className="bi bi-search search-icon mx-3"
            onClick={() => setShowSearch(!showSearch)}
          ></i>

          <Nav>
            {profile ? (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={profile.name}
                  menuVariant="dark"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/me"
                    className="dropdown-card"
                  >
                    Profilo
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/favorites"
                    className="dropdown-card"
                  >
                    Preferiti
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/login"
                    onClick={handleLogout}
                    className="dropdown-card"
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <img
                  src={profile.avatarURL || "https://via.placeholder.com/150"}
                  alt="Avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    marginLeft: "20px",
                    borderRadius: "50%",
                  }}
                />
              </>
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
