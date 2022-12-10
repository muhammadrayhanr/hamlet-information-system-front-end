import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';

const Jumbotron = () => {
  return (
    <section id="hero-image" className="pb-5">
      <div className="jumbotron">
        <Container className="jumbo-item">
          <Row>
            <Col lg={6}>
              <h1 className="display-4 tagline">
                Kami Hadir Untuk Memberi Solusi
              </h1>
              <p>Kenyamanan dan Ketentraman adalah Prioritas utama kami</p>
              <NavLink to="/login">
                <Button variant="success" size="lg" className="his-btn">
                  Pengaduan
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Jumbotron;
