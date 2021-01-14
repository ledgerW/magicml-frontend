import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../index.css";
import "../containers/Home.css";
import "../App.css";


export default function Header(props) {
  return (
    <Navbar collapseOnSelect className="bg-header Header" expand="md">
      <Navbar.Brand href="/" className="BrandHeader">MagicML</Navbar.Brand>
      {props.children}
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/faq">FAQ</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
