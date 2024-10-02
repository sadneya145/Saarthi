import React from "react";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navigationBar py-2">
      <Container>
        <Navbar.Brand href="/dashboard"><h1>Saarthi</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto pe-3">
            <Nav.Link href="/dashboard" className="mx-2">Home</Nav.Link>
            <Nav.Link href="/about" className="mx-2">About</Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown" className="mx-2">
              <NavDropdown.Item href="">All</NavDropdown.Item>
              <NavDropdown.Item href="">Health Care</NavDropdown.Item>
              <NavDropdown.Item href="">Leisure Care</NavDropdown.Item>
              <NavDropdown.Item href="">Companion Care</NavDropdown.Item>
              <NavDropdown.Item href="">Rehabilitation</NavDropdown.Item>
              <NavDropdown.Item href="">Mental Health Care</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Emergency Care</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
}