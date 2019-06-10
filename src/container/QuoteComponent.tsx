import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuoteFormComponent from "./QuoteFormComponent";

type Props = {};
type State = {};

export default class QuoteComponent extends Component<Props, State> {
  render() {
    return (
      <div className="quote-component">
        <Container>
          <Row noGutters={true}>
            <Col md={12} className="heading">
              <h1>Quick Quote</h1>
            </Col>
          </Row>
          <QuoteFormComponent />
        </Container>
      </div>
    );
  }
}
