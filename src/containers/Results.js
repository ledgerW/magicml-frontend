import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CardDisplay from "../components/CardDisplay";
import Scryfall from "../libs/scryfall";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { search } from "../libs/similarityLib";
import "./Home.css";


export default function Results() {
  const nCardsPerRow = 4;
  const nCardResults = 20;

  const {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();

  const [searchedCard, setSearchedCard] = useState(null);
  const [simCards, setSimCards] = useState([]);

  const { nameParam } = useParams();


  useEffect(() => {
    setIsLoading(true);
    newSearch();
  }, [nameParam]);

  async function newSearch() {
    try {
      const res = await search(nameParam);
      console.log(res);
      if (res.cards.length > 0) {
        setSearchedCard(res.cards[0])
        setSimCards(res.cards[0].similarities.slice(0, nCardResults));
        setIsLoading(false);
      } else {
        onError("Sorry, we don't have similarities for that card yet.")
        setIsLoading(false);
      }
    }
    catch(e) {
      onError(e);
      setIsLoading(false);
    }
  }


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
      setSimCards([]);
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function renderScryfallCards(isLoading, scryfallCards, nCardsPerRow) {
    return (
        <SearchResults
          isLoading={isLoading}
          simCards={scryfallCards}
          nCardsPerRow={nCardsPerRow}
        />
      )
    }

  function renderSimilarityCards(searchedCard, isLoading, simCards, nCardsPerRow) {
    return (
      <Row>
        <Col sm={4}>
        {searchedCard && (
          <div className="sticky-top">
            <CardDisplay name={searchedCard.name} image_urls={searchedCard.image_urls}/>
          </div>
        )}
        </Col>
        <Col sm={8}>
        <SearchResults
          isLoading={isLoading}
          simCards={simCards}
          nCardsPerRow={nCardsPerRow}
        />
        </Col>
      </Row>
    )
  }


  return (
    <div>
      <NavBar>
        MagicML
      </NavBar>
      <div className="ResultsPage container">
        <SearchBar
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validateForm={validateForm}
          card={formCard}
          setCard={setFormCard}
        />
        {simCards.length > 0
          ? renderSimilarityCards(searchedCard, isLoading, simCards, nCardsPerRow)
          : renderScryfallCards(isLoading, scryfallCards, nCardsPerRow)
        }
      </div>
    </div>
  );
}