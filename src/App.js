import React, { useState } from "react";
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";
import "./index.css";
import "./App.css";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formCard, setFormCard] = useState("");
  const [scryfallCards, setScryfallCards] = useState([]);
  const [filters, setFilters] = useState({
    colors: {
      W: true,
      B: true,
      G: true,
      U: true,
      R: true,
      0: true
    }
  });

  const allContext = {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards,
    filters, setFilters
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
