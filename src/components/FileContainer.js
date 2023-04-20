import React from "react";
import { Container, Card, Col, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/FileContainer.css";

const FileContainer = ({ setSelectedFile }) => {
  const files = useSelector((store) => store.contractStorage.files);

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
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => {
                return (
                  <tr
                    key={file.cid}
                    className="custom-table-row"
                    onClick={() => {
                      setSelectedFile && setSelectedFile(file);
                    }}
                  >
                    <th>{file.name}</th>
                    <th>{file.type_}</th>
                    <th>{file.size}</th>
                    <th>{file.time}</th>
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
