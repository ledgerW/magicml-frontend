import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "../index.css";
import "../App.css";


export default function NavBar(props) {
  return (
    <Navbar collapseOnSelect bg="header" variant="dark" expand="md" className="mb-3">
      <Navbar.Brand href="/" className="font-weight-bold">
        {props.children}
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar>
  )
}
