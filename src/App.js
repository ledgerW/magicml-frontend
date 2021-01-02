import React, { useState } from "react";
import { AppContext } from "./libs/contextLib";
import Routes from "./Routes";
import "./index.css";
import "./App.css";


function App() {
  const [card, setCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const allContext = { card, setCard, isLoading, setIsLoading };

  return (
    <div className="App">
      <AppContext.Provider value={ allContext }>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
