import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand href="/">
          <img alt="Logo" src={logo} width="30" height="30" className="d-inline-block align-top" /> Portal OG - Algar Telecom
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
