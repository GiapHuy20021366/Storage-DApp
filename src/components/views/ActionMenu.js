import React, { useRef, useState } from "react";
import { Row } from "react-bootstrap";
import {
  AiOutlineFullscreen,
  AiFillDelete,
  AiFillEdit,
  AiOutlineDownload,
} from "react-icons/ai";
import "../../styles/ActionMenu.css";
import FileView from "./FileView";

const ActionMenu = ({ file }) => {
  const [view, setView] = useState(false);
  const aRef = useRef();

  if (!file) {
    return <></>;
  }
  const downloadURI = () => {
    if (aRef.current) {
      // iframeRef.current.src = `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`;
      aRef.current.click();
    }
  };

  return (
    <span>
      <a
        href={`${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${file.cid}`}
        download
        style={{ display: "none" }}
        target={"_blank"}
        ref={aRef}
      >
        download
      </a>

      <AiOutlineFullscreen
        className="mx-2 view-icon"
        title="View"
        onClick={() => setView(true)}
      />
      <AiFillDelete className="mx-2 delete-icon" title="Delete" />
      <AiFillEdit className="mx-2 rename-icon" title="Rename" />
      <AiOutlineDownload
        className="mx-2 download-icon"
        title="Download"
        onClick={() => downloadURI()}
      />

      {/* File View */}
      <FileView file={file} show={view} onHide={() => setView(false)} />
    </span>
  );
};
export default ActionMenu;
