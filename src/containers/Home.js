import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";
import "./Home.css";

export default function Home() {
  const nCardsPerRow = 4;

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();


  // Scryfall Search
  function validateForm() {
    return formCard.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setShowAlert(false);
    setIsLoading(true);
  
    try {
      const res = await Scryfall.get(`search?q=${formCard}`);
      var { data } = res.data;
      // only show cards in Arena
      data = data.filter(card => card.hasOwnProperty('arena_id'));

      setScryfallCards(data)
      setIsLoading(false);
    } catch (e) {
      setShowAlert(true);
      setIsLoading(false);
    }
  }


  return (
    <div>
      <div class="HomePageMain">
        <Header></Header>
        <div class="HomePageTitle">
          <h2>Find cards with similar functionality</h2>
          <h5><b>Magic: The Gathering</b> card search powered by Natural Language Processing</h5>
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
          {scryfallCards.length > 0 &&
            <div class="SearchHelper">
              <h2>What card do you want to find similarities for?</h2>
            </div>
          }
          <SearchResults
            isLoading={isLoading}
            simCards={scryfallCards}
            nCardsPerRow={nCardsPerRow}
            cardOverlay={false}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertType={"No Cards Found"}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}