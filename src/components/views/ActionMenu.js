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
import RenameFile from "./RenameFile";

const ActionMenu = ({ file }) => {
  const [view, setView] = useState(false);
  const [rename, setRename] = useState(false);
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
      <AiFillEdit
        className="mx-2 rename-icon"
        title="Rename"
        onClick={() => setRename(true)}
      />
      <AiOutlineDownload
        className="mx-2 download-icon"
        title="Download"
        onClick={() => downloadURI()}
      />
      <AiFillDelete className="mx-2 delete-icon" title="Delete" />

      {/* File View */}
      <FileView file={file} show={view} onHide={() => setView(false)} />

      {/* Rename File */}
      <RenameFile file={file} show={rename} onHide={() => setRename(false)} />
    </span>
  );
};
export default ActionMenu;
