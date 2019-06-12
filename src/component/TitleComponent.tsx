import React from "react";
import { Container, Row, Col } from "react-bootstrap";

type Props = {
  title?: string;
};

const TitleComponent: React.FC<Props> = ({ title = "" }) => {
  return (
    <Container className="title-component">
      <Row>
        <Col md={12} className="heading">
          <h2>{title}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default TitleComponent;
