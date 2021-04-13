import { useContext, createContext, useState } from "react";
import { defaultFilters } from "./filtersLib";

export const AppContext = createContext();

export function ContextWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formSearch, setFormSearch] = useState("");
  const [scryfallCards, setScryfallCards] = useState([]);
  const [searchedFor, setSearchedFor] = useState(null);
  const [simCards, setSimCards] = useState([]);
  const [filteredSimCards, setFilteredSimCards] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);

  const allContext = {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formSearch, setFormSearch,
    scryfallCards, setScryfallCards,
    searchedFor, setSearchedFor,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
    filters, setFilters
  };

  return (
    <AppContext.Provider value={allContext}>
      {children}
    </AppContext.Provider>
  );
}


export function useAppContext() {
  return useContext(AppContext);
}