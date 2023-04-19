import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Uploader from "./Uploader";

const LeftBar = () => {
  const [showUpload, setShowUpload] = useState(false);
  return (
    <Container>
      <Button variant="primary" size="lg" onClick={() => setShowUpload(true)}>
        New
      </Button>
      <Uploader show={showUpload} onHide={() => setShowUpload(false)} />
    </Container>
  );
};

export default LeftBar;
