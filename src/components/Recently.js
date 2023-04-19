import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const Recently = () => {
  const files = useSelector((store) => store.contractStorage.files);

  return (
    <Container fluid>
      <h3>Recently</h3>
      <Row>
        {files.slice(0, 4).map((file, index) => {
          return (
            <Col className="col-3" key={file.cid}>
              <Card>
                <Card.Img
                  variant="top"
                  src={`${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`}
                />
                <Card.Body>
                  <Card.Title>{file.name}</Card.Title>
                  <Card.Text>
                    {/* Some quick example text to build on the card title and make up
                the bulk of the card's content. */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Recently;
