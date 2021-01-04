import React, { useState } from "react";
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";
import "./index.css";
import "./App.css";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formCard, setFormCard] = useState("");
  const [scryfallCards, setScryfallCards] = useState([]);

  const allContext = {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  };

  return (
    <div className="App">
      <AppContext.Provider value={ allContext }>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
