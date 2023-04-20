import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUri } from "../utils/getReviewPng";
import "../styles/Recently.css";

const Recently = ({ setSelectedFile }) => {
  const files = useSelector((store) => store.contractStorage.files);

  return (
    <Container fluid>
      <h3>Recently</h3>
      <Row>
        {files.slice(0, 4).map((file, index) => {
          return (
            <Col className="col-3" key={file.cid}>
              <Card
                className="custom-card"
                onClick={() => {
                  setSelectedFile && setSelectedFile(file);
                }}
              >
                <Card.Body>
                  <Card.Title>{file.name}</Card.Title>
                </Card.Body>
                <Card.Img variant="top" src={getUri(file)} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Recently;
