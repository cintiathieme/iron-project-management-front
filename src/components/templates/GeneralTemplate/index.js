import React from 'react';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const GeneralTemplate = ({ children }) => (
  <Container fluid>
    <Row>
      <Nav>
        <Nav.Item>
          <Link to="/">Login</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/signup">Signup</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/projects">Projects</Link>
        </Nav.Item>
      </Nav>
    </Row>
    <Row>
      <Col xs={1}></Col>
      <Col>
        {children}
      </Col>
      <Col xs={1}></Col>
    </Row>
  </Container>
);

export default GeneralTemplate;
