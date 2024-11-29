import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import IlMeglioDaVedere from "./IlMeglioDaVedere";
import Carosello from "./Carosello";

const CustomHome = () => {
  return (
    <Container fluid className="p-4 background">
      <Carosello />

      <Row>
        <Col>
          <h2>Il Meglio Da Vedere</h2>
        </Col>
      </Row>
      <Row>
        <IlMeglioDaVedere />
      </Row>

      <Row>
        <Col>
          <h2> Ultime Uscite</h2>
        </Col>
      </Row>
      <Row>
        <IlMeglioDaVedere />
      </Row>
      <Row>
        <Col>
          <h2>I Più Votati</h2>
        </Col>
      </Row>
      <Row>
        <IlMeglioDaVedere />
      </Row>
    </Container>
  );
};

export default CustomHome;
