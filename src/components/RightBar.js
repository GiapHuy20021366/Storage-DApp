import React, { useEffect, useState } from "react";
import { Button, Container, Tabs, Tab, Form, Col, Row } from "react-bootstrap";
import "../styles/RightBar.css";
import FileReview from "./views/FileReview";
import { ms2Date } from "../utils/parseDate";

const RightBar = ({ selectedFile }) => {
  const [vFile, setVFile] = useState({
    name: "No file selected",
    type_: "No file selected",
    size: "No file selected",
    time: "No file selected",
  });
  useEffect(() => {
    if (selectedFile) {
      setVFile(selectedFile);
    }
  }, [selectedFile]);
  return (
    <Container fluid className="custom-right-bar ml-3 mr-0">
      <Row>
        <h3 className="col-12 mb-5">File</h3>
      </Row>
      <Tabs defaultActiveKey="detail" id="uncontrolled-tab-example">
        <Tab eventKey="detail" title="Detail">
          <Container id="custom-container-scrollbar">
            <FileReview file={selectedFile}></FileReview>
            <hr />
            <Form className="mt-3">
              <Form.Group as={Row} controlId="formPlaintextName">
                <Form.Label column sm="2">
                  Name:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={vFile.name} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextType">
                <Form.Label column sm="2">
                  Type:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={vFile.type_} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextSize">
                <Form.Label column sm="2">
                  Size:
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={vFile.size} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextTime">
                <Form.Label column sm="2">
                  Time:
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    plaintext
                    readOnly
                    value={ms2Date(vFile.time)}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Container>
        </Tab>
        {/* <Tab eventKey="action" title="Action">
          Action
        </Tab> */}
      </Tabs>
    </Container>
  );
};

export default RightBar;
