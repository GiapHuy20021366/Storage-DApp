import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import RightBar from "./RightBar";
import Recently from "./Recently";
import FileContainer from "./FileContainer";
import Uploader from "./Uploader";
import "../styles/DashBoard.css";
import NavBar from "./NavBar";
import ActionMenu from "./views/ActionMenu";

const DashBoard = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <Container className="mx-0 px-0" fluid id="dashboard-container">
      <NavBar />

      <Row className="mx-0 mt-2">
        <Col id="content-container">
          <Container className="px-0 d-flex justify-content-between align-items-end">
            <Dropdown className="mt-3">
              <Dropdown.Toggle id="custom-dropdown">My Storage</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowUpload(true)}>
                  Upload File
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ActionMenu />
          </Container>
          <Container fluid className="px-0" id="main-content-container">
            {/* Recently */}
            <Row className="mt-3 mb-5 mr-0">
              <Recently />
            </Row>

            {/* File container */}
            <FileContainer />
          </Container>
        </Col>
        <Col xs={3} className="px-0">
          <RightBar />
        </Col>
      </Row>

      {/* Upload File Modal */}
      <Uploader show={showUpload} onHide={() => setShowUpload(false)} />
    </Container>
  );
};

export default DashBoard;
