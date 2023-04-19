import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../store/slices/contractSlice";
require("dotenv").config();

const Uploader = () => {
  const [fileSelected, setFileSelected] = useState(null);
  const files = useSelector((store) => store.contractStorage.files);
  const dispatch = useDispatch();
  // const [imgSrc, setImgSrc] = useState("");
  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setFileSelected({
        name: file.name,
        size: file.size,
        type: file.type,
        buffer: Buffer(reader.result),
      });
    };
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(uploadFile(fileSelected));
  };
  useEffect(() => {
    console.log("FILES: ", files);
  });
  const imgSrc =
    files.length > 0
      ? `${process.env.REACT_APP_IF_DEDICATED_GATEWAY}/ipfs/${files[0].cid}`
      : "";
  return (
    <>
      <img src={imgSrc} alt="logo" />
      <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile}></input>
        <input type="submit"></input>
      </form>
    </>
  );
};

export default Uploader;
