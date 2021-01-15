import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";
import "./Home.css";

export default function Home() {
  const nCardsPerRow = 4;

  const {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();


  // Scryfall Search
  function validateForm() {
    return formCard.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const res = await Scryfall.get(`search?q=${formCard}`);
      var { data } = res.data;
      data = data.filter(card => card.hasOwnProperty('arena_id'));

      setScryfallCards(data)
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div class="HomePageMain">
        <Header></Header>
        <div class="HomePageTitle">
          <h2>Find cards with similar functionality</h2>
          <h5>Semantic search powered by Natural Language Processing</h5>
        </div>
        <div className="HomeSearchBar container">
          <SearchBar
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            validateForm={validateForm}
            card={formCard}
            setCard={setFormCard}
          />
        </div>
        <div className="HomeSearchResults">
          <SearchResults
            isLoading={isLoading}
            simCards={scryfallCards}
            nCardsPerRow={nCardsPerRow}
            cardOverlay={false}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}