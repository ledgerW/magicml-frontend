import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "./index.css";
import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <Navbar collapseOnSelect bg="header" variant="dark" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold">
          MagicML
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
