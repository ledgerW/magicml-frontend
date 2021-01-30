import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


export default function Header(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-dark Header">
      <Navbar.Brand href="/" className="BrandHeader">MagicML</Navbar.Brand>
      {props.children}
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/faq">FAQ</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
