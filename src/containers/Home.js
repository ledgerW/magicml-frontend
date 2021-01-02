import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";
import { search } from "../libs/similarityLib";
import "./Home.css";

export default function Home() {
  const nCardsPerRow = 5;
  const nCardResults = 25;

  const { card, setCard, isLoading, setIsLoading } = useAppContext();
  const history = useHistory();


  function validateForm() {
    return card.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      // search here
      // setIsLoading(false);
      history.push(`/results/${card}`);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="HomePage text-white">
      <h1>MagicML</h1>
      <h3>Find cards with similar functionality</h3>
      <div className="SearchBar container">
        <SearchBar
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validateForm={validateForm}
          card={card}
          setCard={setCard}
        />
      </div>
      {/*
      <SearchResults
        isLoading={isLoading}
        simCards={simCards}
        nCardsPerRow={nCardsPerRow}
      />
      */}
    </div>
  );
}