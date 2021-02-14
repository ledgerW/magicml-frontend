import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Link from "next/link";


export default function Header(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar-dark Header">
      <Link href="/" passHref>
        <Navbar.Brand className="BrandHeader">MagicML</Navbar.Brand>
      </Link>
      {props.children}
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav>
          <Link href="/about" passHref>
            <Nav.Link>About</Nav.Link>
          </Link>
          <Link href="/faq" passHref>
            <Nav.Link>FAQ</Nav.Link>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
