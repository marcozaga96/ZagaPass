import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import IlMeglioDaVedere from "./IlMeglioDaVedere";
import Carosello from "./Carosello";
import UltimeUscite from "./UltimeUscite";
import IPiùVotati from "./IPiùVotati";

const CustomHome = () => {
  return (
    <Container fluid className="p-4 background">
      <Carosello />

      <Row>
        <Col>
          <h2 className="text-white pt-5">Il Meglio Da Vedere</h2>
        </Col>
      </Row>
      <Row>
        <IlMeglioDaVedere />
      </Row>

      <Row>
        <Col>
          <h2 className="text-white pt-5"> Ultime Uscite</h2>
        </Col>
      </Row>
      <Row>
        <UltimeUscite />
      </Row>
      <Row>
        <Col>
          <h2 className="text-white pt-5">I Più Votati</h2>
        </Col>
      </Row>
      <Row>
        <IPiùVotati />
      </Row>
    </Container>
  );
};

export default CustomHome;
