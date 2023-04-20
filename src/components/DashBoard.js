import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  FormControl,
  Button,
  Navbar,
  NavDropdown,
  Nav,
} from "react-bootstrap";
import RightBar from "./RightBar";
import Recently from "./Recently";
import FileContainer from "./FileContainer";
import Uploader from "./Uploader";
import "../styles/DashBoard.css";

const DashBoard = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <Container className="mx-0 px-0" fluid id="dashboard-container">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Storage DApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-5">
            <Nav.Link href="./">Home</Nav.Link>
            <Nav.Link active>DashBoard</Nav.Link>
          </Nav>
          <Form inline className="w-100">
            <FormControl
              type="text"
              placeholder="Search"
              className="mx-2 w-50"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Row className="mx-0 mt-2">
        <Col id="content-container">
          <Dropdown className="mt-3">
            <Dropdown.Toggle id="custom-dropdown">My Storage</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowUpload(true)}>
                Upload File
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Container fluid className="px-0" id="main-content-container">
            <Row className="mt-3 mb-5 mr-0">
              <Recently setSelectedFile={setSelectedFile} />
            </Row>
            {/* <Row> */}
            <FileContainer setSelectedFile={setSelectedFile} />
            {/* </Row> */}
          </Container>
        </Col>
        <Col xs={3} className="px-0">
          <RightBar selectedFile={selectedFile} />
        </Col>
      </Row>

      {/* Upload File Modal */}
      <Uploader show={showUpload} onHide={() => setShowUpload(false)} />
    </Container>
  );
};

export default DashBoard;
