import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import AnimeComponets from "./AnimeComponents";
import SerieTVComponents from "./SerieTVComponents";
import FilmComponents from "./FilmComponents";

const CustomHome = () => {
  return (
    <Container fluid className="p-4">
      <Row className="mb-4">
        <Col>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://placedog.net/900x280"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://placedog.net/900x280"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://placedog.net/900x280"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Featured Products</h2>
        </Col>
      </Row>
      <Row>
        <AnimeComponets />
      </Row>

      <Row>
        <Col>
          <h2>Featured Products</h2>
        </Col>
      </Row>
      <Row>
        <SerieTVComponents />
      </Row>
      <Row>
        <Col>
          <h2>Featured Products</h2>
        </Col>
      </Row>
      <Row>
        <FilmComponents />
      </Row>
    </Container>
  );
};

export default CustomHome;
