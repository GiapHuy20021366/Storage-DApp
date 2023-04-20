import React from "react";
import { Container, Image } from "react-bootstrap";
import ActionMenu from "./ActionMenu";

const FileReview = ({ file }) => {
  const getSrc = (file) => {
    if (!file) {
      return "/images/File_Nothing.jpg";
    }
    if (file.type_.startsWith("video/")) {
      return "/images/Video_File.png";
    }
    if (file.type_.startsWith("image/")) {
      return `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;
    }
    return "/images/File_Nothing.jpg";
  };
  const src = getSrc(file);
  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <Image className="my-5 pl-2 pr-4 " src={src} fluid />
      <ActionMenu file={file} />
    </Container>
  );
};

export default FileReview;
