import React from "react";
import { useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";

const UserComponents = () => {
  const { profile } = useSelector((state) => state.user);

  return (
    <Container fluid className="p-4 background">
      <h1>Profilo Utente</h1>
      <Row className="mt-4">
        <Col md={4} className="text-center">
          <img
            src={profile.avatarURL}
            alt="Avatar"
            fluid
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
        </Col>

        <Col md={8}>
          <p>
            <strong>Nome:</strong> {profile.name}
          </p>
          <p>
            <strong>Cognome:</strong> {profile.surname}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
        </Col>
      </Row>
      <Row>
        <h2>Le tue Recensioni</h2>
        <Col>
          {profile.recensioni && profile.recensioni.length > 0 ? (
            profile.recensioni.map((recensioni) => (
              <div key={recensioni.id} className="review-card">
                <p>
                  <strong>Voto:</strong> {recensioni.voto}
                </p>
                <p>
                  <strong>Commento:</strong> {recensioni.commento}
                </p>
                <p>
                  <strong>Data:</strong> {recensioni.data}
                </p>

                {recensioni.filmId && (
                  <p>
                    <strong>Film ID:</strong> {recensioni.filmId}
                  </p>
                )}
                {recensioni.serieTVId && (
                  <p>
                    <strong>Serie TV ID:</strong> {recensioni.serieTVId}
                  </p>
                )}
                {recensioni.animeMalId && (
                  <p>
                    <strong>Anime ID:</strong> {recensioni.animeMalId}
                  </p>
                )}
                <hr />
              </div>
            ))
          ) : (
            <p>Non hai ancora recensioni.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserComponents;
