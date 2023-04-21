import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../store/slices/contractSlice";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import "../styles/Uploader.css";

require("dotenv").config();

const Uploader = (props) => {
  const [fileSelected, setFileSelected] = useState(null);
  const dispatch = useDispatch();
  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFileSelected({
        name: file.name,
        size: file.size,
        type_: file.type,
        buffer: Buffer(reader.result),
      });
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(uploadFile(fileSelected));
    setFileSelected(null);
    props.onHide && props.onHide();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFileSelected({
        name: file.name,
        size: file.size,
        type_: file.type,
        buffer: Buffer(reader.result),
      });
    };
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="uploader"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          File Upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="file-upload-wrapper">
          <Form>
            <Form.Group>
              <Form.File
                id="custom-file-input"
                label="Drag or drop file here"
                onChange={captureFile}
                onDrag={onDrop}
              />
            </Form.Group>
          </Form>
        </Container>
        <Container>
          <Form.Group as={Row} controlId="formPlaintextSize">
            <Form.Label column sm="2">
              Size
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                value={fileSelected ? `${fileSelected.size}` : "unknown"}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextType">
            <Form.Label column sm="2">
              Type
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                value={fileSelected ? `${fileSelected.type_}` : "unknown"}
              />
            </Col>
          </Form.Group>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Upload</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Uploader;
