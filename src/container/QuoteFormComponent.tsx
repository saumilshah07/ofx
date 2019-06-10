import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
const QuoteFormComponent: React.FC<{}> = props => {
  return (
    <Form>
      <Row>
        <Col sm={12} md={6} xl={6}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name" />
          </Form.Group>
        </Col>
        <Col sm={12} md={6} xl={6}>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};
export default QuoteFormComponent;
