import React from "react";
import { Navbar, Form, FormControl, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Storage DApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-5">
          <Nav.Link onClick={goHome}>Home</Nav.Link>
          <Nav.Link active>DashBoard</Nav.Link>
        </Nav>
        <Form inline className="w-100">
          <FormControl type="text" placeholder="Search" className="mx-2 w-50" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
