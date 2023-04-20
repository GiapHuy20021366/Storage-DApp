import React, { useRef, useState } from "react";
import {
  AiOutlineFullscreen,
  AiFillDelete,
  AiFillEdit,
  AiOutlineDownload,
} from "react-icons/ai";
import "../../styles/ActionMenu.css";
import FileView from "./FileView";
import RenameFile from "./RenameFile";
import { useSelector } from "react-redux";
import { getUri } from "../../utils/getReviewPng";

const ActionMenu = () => {
  const [view, setView] = useState(false);
  const [rename, setRename] = useState(false);
  const aRef = useRef();
  const file = useSelector((store) => store.fileContext.selected);

  if (!file) {
    return <></>;
  }
  const downloadURI = () => {
    if (aRef.current) {
      aRef.current.click();
    }
  };

  return (
    <span>
      <a
        href={getUri(file)}
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
