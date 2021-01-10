import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CardDisplay from "../components/CardDisplay";
import Filters from "../components/Filters";
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
    scryfallCards, setScryfallCards,
    filters
  } = useAppContext();

  const [searchedCard, setSearchedCard] = useState(null);
  const [simCards, setSimCards] = useState([]);
  const [filteredSimCards, setFilteredSimCards] = useState([]);

  const { nameParam } = useParams();


  useEffect(() => {
    setIsLoading(true);
    newSimSearch();
  }, [nameParam]);


  useEffect(() => {
    setIsLoading(true);
    applyFilters();
  }, [filters]);


  function applyFilters() {
    try {
      console.log(filters);
      let filteredCards = simCards;
      console.log(filteredCards);
      
      // apply color filters
      let filterColors = Object.entries(filters.colors).map(pair => {
        if (pair[1]) {
          return pair[0]
        }
      }).filter(el => el != null);

      filteredCards = filteredCards.map(card => {
        if (filterColors.some(c => card.colors.includes(c))) {
          return card
        }
      }).filter(el => el != null);

      // apply type filters
      let filterTypes = Object.entries(filters.type).map(pair => {
        if (pair[1]) {
          return pair[0]
        }
      }).filter(el => el != null);

      filteredCards = filteredCards.map(card => {
        if (filterTypes.some(t => card.types.includes(t))) {
          return card
        }
      }).filter(el => el != null);

      // apply mana cost filters
      let filterMana = Object.entries(filters.manaCost).map(pair => {
        if (pair[1]) {
          if (pair[0] == "lt1") {
            return "0"
          } else {
            return pair[0]
          }
        }
      }).filter(el => el != null);

      filteredCards = filteredCards.map(card => {
        if (filterMana.some(m => Number(m) == Number(card.convertedManaCost))) {
          return card
        }
      }).filter(el => el != null);

      // No more filters
      setFilteredSimCards(filteredCards.slice(0, nCardResults));
      setIsLoading(false);
    }
    catch(e) {
      onError(e);
      setIsLoading(false);
    }
  }

  async function newSimSearch() {
    try {
      const res = await search(nameParam);
      console.log(res);
      if (res.cards.length > 0) {
        let resSearchCard = res.cards[0]
        let resSimCards = res.cards[0].similarities.slice(0, nCardResults);
        setSearchedCard(resSearchCard);
        setSimCards(resSimCards);
        setFilteredSimCards(resSimCards);
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
      setScryfallCards(data);
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
        <Col sm={3}>
        {searchedCard && (
          <div className="sticky-top">
            <CardDisplay name={searchedCard.name} image_urls={searchedCard.image_urls}/>
          </div>
        )}
        </Col>
        <Col sm={9}>
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
        <Filters/>
        {simCards.length > 0
          ? renderSimilarityCards(searchedCard, isLoading, filteredSimCards, nCardsPerRow)
          : renderScryfallCards(isLoading, scryfallCards, nCardsPerRow)
        }
      </div>
    </div>
  );
}