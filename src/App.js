import React from "react";
import NavBar from "./components/NavBar";
import "./index.css";
import "./App.css";
import Routes from "./Routes";

function App() {
  return (
    <div className="App">
      <NavBar>
        MagicML
      </NavBar>
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
