import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../store/slices/contractSlice";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../styles/Uploader.css";

require("dotenv").config();

const Uploader = (props) => {
  const [fileSelected, setFileSelected] = useState(null);
  const files = useSelector((store) => store.contractStorage.files);
  const dispatch = useDispatch();
  // const [imgSrc, setImgSrc] = useState("");
  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFileSelected({
        name: file.name,
        size: file.size,
        type: file.type,
        buffer: Buffer(reader.result),
      });
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dispatch(uploadFile(fileSelected));
    props.onHide && props.onHide();
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
        <Form>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
              onChange={captureFile}
            />
          </Form.Group>
        </Form>
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
              value={fileSelected ? `${fileSelected.type}` : "unknown"}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Upload</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Uploader;
