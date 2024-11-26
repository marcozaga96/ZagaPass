import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const SerieTVComponents = () => {
  const [tvShowList, setTVShowList] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchTVShows = async () => {
      const token = localStorage.getItem("Access Token");
      const response = await fetch("http://localhost:3001/api/serietv", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch TV shows");
      }
      const data = await response.json();
      setTVShowList(data._embedded.serieTVs);
    };

    fetchTVShows().catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Container className="mt-4">
      <h2>TV Shows</h2>
      <Row>
        {tvShowList.map((tvShow) => (
          <Col md={2} className="mb-4" key={tvShow.id}>
            <Card>
              <Card.Img
                variant="top"
                src={`${BASE_URL}${tvShow.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{tvShow.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SerieTVComponents;
