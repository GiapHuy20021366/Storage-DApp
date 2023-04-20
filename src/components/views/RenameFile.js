import React, { useRef } from "react";
import { Modal, Form, Col, Row, Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { renameFile } from "../../store/slices/contractSlice";
import { set } from "../../store/slices/fileContextSlice";

const RenameFile = ({ file, show, onHide }) => {
  const dispatch = useDispatch();
  const newNameRef = useRef();
  const onSubmit = async (event) => {
    event.preventDefault();
    const newName = newNameRef.current.value.trim();
    if (newName && newName.length > 5 && newName !== file.name) {
      const action = await dispatch(
        renameFile({
          file,
          newName,
        })
      );
      dispatch(set(action.payload));
      onHide && onHide();
    } else {
      window.alert("Number of character must large than 5");
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextOldName">
            <Form.Label column sm="4">
              Current Name:
            </Form.Label>
            <Col sm="8">
              <Form.Control plaintext readOnly defaultValue={file.name} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextNewName">
            <Form.Label column sm="4">
              New Name:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                placeholder="New name"
                ref={newNameRef}
              />
            </Col>
          </Form.Group>
        </Form>
      </Container>
      <Modal.Footer>
        <Button onClick={onSubmit}>Rename</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RenameFile;
