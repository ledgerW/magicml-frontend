import React, { useState } from "react";
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";
import "./index.css";
import "./App.css";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [formCard, setFormCard] = useState("");
  const [scryfallCards, setScryfallCards] = useState([]);
  const [searchedCard, setSearchedCard] = useState(null);
  const [simCards, setSimCards] = useState([]);
  const [filteredSimCards, setFilteredSimCards] = useState([]);
  const [filters, setFilters] = useState({
    colors: {
      W: true,
      B: true,
      G: true,
      U: true,
      R: true,
      0: true
    },
    type: {
      Creature: true,
      Planeswalker: true,
      Instant: true,
      Sorcery: true,
      Enchantment: true,
      Artifact: true,
      Land: true
    },
    manaCost: {
      lt1: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true
    },
    format: {
      standard: true,
      historic: true,
      brawl: true,
      commander: true,
      pauper: true,
      oldschool: true,
      modern: true
    }
  });

  const allContext = {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards,
    searchedCard, setSearchedCard,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
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
