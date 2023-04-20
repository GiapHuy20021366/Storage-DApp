import React from "react";
import { Container, Image } from "react-bootstrap";
import ActionMenu from "./ActionMenu";
import { getUri } from "../../utils/getReviewPng";

const FileReview = ({ file }) => {
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <Image className="my-3 pl-2 pr-4 " src={getUri(file)} fluid />
      <ActionMenu file={file} />
    </Container>
  );
};

export default FileReview;
