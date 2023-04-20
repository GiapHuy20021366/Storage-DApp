import React from "react";
import { Container, Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/FileContainer.css";
import { ms2Date } from "../utils/parseDate";
import { set } from "../store/slices/fileContextSlice";

const FileContainer = ({ setSelectedFile }) => {
  const files = useSelector((store) => store.contractStorage.files);
  const dispatch = useDispatch();
  const onClickFile = (file) => {
    dispatch(set(file));
  };
  return (
    <>
      <h3>Storage</h3>
      <Container fluid className="ml-1 px-0">
        <Row>
          <Table hover>
            <thead className="custom-table-header">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr
                    key={file.uuid}
                    className="custom-table-row"
                    onClick={() => {
                      onClickFile(file);
                    }}
                  >
                    <td>{file.name}</td>
                    <td>{file.type_}</td>
                    <td>{file.size}</td>
                    <td>{ms2Date(file.time)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default FileContainer;
