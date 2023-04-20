import React from "react";
import { Container, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../styles/Recently.css";

const Recently = ({ setSelectedFile }) => {
  const files = useSelector((store) => store.contractStorage.files);

  return (
    <Container fluid>
      <h3>Recently</h3>
      <Row>
        {files.slice(0, 4).map((file, index) => {
          const ipfsUrl = `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;
          const url = file.type_.startsWith("image/")
            ? ipfsUrl
            : "/images/File.png";
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
                <Card.Img variant="top" src={url} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Recently;
