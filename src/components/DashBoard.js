import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import LeftBar from "./LeftBar";
import Recently from "./Recently";
import FileContainer from "./FileContainer";

const DashBoard = () => {
  return (
    <Container className="mx-0 px-0" fluid>
      <Row>
        <div>Top Bar</div>
      </Row>
      <Row className="mx-0">
        <Col xs={2} className="px-0">
          <LeftBar />
        </Col>
        <Col>
          <Row>
            <Recently />
          </Row>
          <Row>
            <FileContainer />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;
