import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

type TProps = {
  CustomerRate: number;
  CustomerAmount: number;
  fromCurrency: string;
  amount: string;
  toCurrency: string;
  resetForm(): void;
};

const QuoteResultComponent: React.FC<TProps> = props => {
  return (
    <Container className="quote-result-component">
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <span className="info">OFX Customer Rate</span>
        </Col>
      </Row>
      <Row>
        <Col xs={5} sm={4} md={3} lg={2} xl={2}>
          <span className="current-rate">{props.CustomerRate}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <span className="info">From</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <span className="currency">{props.fromCurrency}</span>
          <span className="amount">{props.amount}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <span className="info">To</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} sm={5} md={4} lg={3} xl={3}>
          <span className="currency">{props.toCurrency}</span>
          <span className="amount">{props.CustomerAmount}</span>
        </Col>
      </Row>
      <Row>
        <Col xs={6} className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              props.resetForm()
            }
          >
            START NEW QUOTE
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
export default QuoteResultComponent;
