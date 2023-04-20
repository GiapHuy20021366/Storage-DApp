import React from "react";
import { Modal, Image, Container } from "react-bootstrap";

const ImageView = ({ file }) => {
  const url =
    file && `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <Image
        src={url}
        style={{
          width: "auto",
          height: "70vh",
        }}
      />
    </Container>
  );
};

const PdfView = ({ file }) => {
  const url =
    file && `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <embed
        src={url}
        style={{
          width: "100vw",
          height: "90vh",
        }}
      />
    </Container>
  );
};

const VideoView = ({ file }) => {
  const url =
    file && `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <video
        src={url}
        style={{
          width: "auto",
          height: "80vh",
        }}
        controls
      />
    </Container>
  );
};

const FileView = ({ file, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {file && file.type_.startsWith("image/") && <ImageView file={file} />}
      {file && file.type_.startsWith("video/") && <VideoView file={file} />}
      {file && file.type_.startsWith("application/pdf") && (
        <PdfView file={file} />
      )}
    </Modal>
  );
};

export default FileView;
