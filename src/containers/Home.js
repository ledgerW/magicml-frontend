import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import CardGroup from "react-bootstrap/CardGroup";
import InputGroup from "react-bootstrap/InputGroup";
import CardDisplay from "../components/CardDisplay";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";

export default function Home() {
  const nCardsPerRow = 5;
  const nCardResults = 25;

  const [card, setCard] = useState("");
  const [simCards, setSimCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return card.length > 0;
  }

  function search(card) {
    return API.post("similarity", "/query", {
      body: {
        key: 'name',
        value: card
      }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const cards = await search(card);
      setSimCards(cards.cards[0].similarities.slice(0, nCardResults));
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  return (
    <div className="Home">
      <SearchBar
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        validateForm={validateForm}
        card={card}
        setCard={setCard}
      />
      <SearchResults
        isLoading={isLoading}
        simCards={simCards}
        nCardsPerRow={nCardsPerRow}
      />
    </div>
  );
}