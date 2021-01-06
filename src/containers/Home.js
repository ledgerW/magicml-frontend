import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";
import "./Home.css";

export default function Home() {
  const nCardsPerRow = 5;
  const nCardResults = 25;

  const {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();
  
  const history = useHistory();


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
      //console.log(data);
      setScryfallCards(data)
      setIsLoading(false);
      //history.push(`/results/${card}`);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="HomePage text-black">
      <h1>MagicML</h1>
      <h3>Find cards with similar functionality</h3>
      <div className="SearchBar container">
        <SearchBar
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validateForm={validateForm}
          card={formCard}
          setCard={setFormCard}
        />
      </div>
      <SearchResults
        isLoading={isLoading}
        simCards={scryfallCards}
        nCardsPerRow={nCardsPerRow}
      />
    </div>
  );
}