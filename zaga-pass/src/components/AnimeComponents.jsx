import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const AnimeComponets = () => {
  const [animeList, setAnimeList] = useState([]);
  useEffect(() => {
    const fetchAnimes = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/anime", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch animes");
      }
      const data = await response.json();
      setAnimeList(data._embedded.animes);
    };
    fetchAnimes().catch((error) => console.error("Error:", error));
  }, []);
  console.log(animeList);
  return (
    <Container className="mt-4">
      <h2>Anime</h2>
      <Row>
        {animeList.map((anime) => (
          <Col md={2} className="mb-4" key={anime.id}>
            <Card>
              <Card.Img variant="top" src={anime.images.jpg.image_url} />
              <Card.Body>
                <Card.Title>{anime.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnimeComponets;
