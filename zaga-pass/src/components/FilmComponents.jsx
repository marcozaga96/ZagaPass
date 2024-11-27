import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const FilmComponents = () => {
  const [movieList, setMovieList] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/films", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovieList(data._embedded.filmModels);
    };

    fetchMovies().catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h2>Movies</h2>
      <Row>
        {movieList.map((movie) => (
          <Col md={2} className="mb-4" key={movie.id}>
            <Card>
              <Card.Img variant="top" src={`${BASE_URL}${movie.poster_path}`} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FilmComponents;
