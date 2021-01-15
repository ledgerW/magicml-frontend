import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CardDisplay from "../components/CardDisplay";
import Filters from "../components/Filters";
import Scryfall from "../libs/scryfall";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { search } from "../libs/similarityLib";
import { applyFilters } from "../libs/filtersLib";
import "./Home.css";


export default function Results() {
  const nCardsPerRow = 4;
  const nCardResults = 20;

  const {
    isLoading, setIsLoading,
    formCard, setFormCard,
    scryfallCards, setScryfallCards,
    searchedCard, setSearchedCard,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
    filters
  } = useAppContext();

  const { nameParam } = useParams();


  useEffect(() => {
    setIsLoading(true);
    newSimSearch();
  }, [nameParam]);


  useEffect(() => {
    setIsLoading(true);
    applyFilters(filters, simCards, nCardResults, setFilteredSimCards, setIsLoading, onError);
  }, [filters]);

  
  // Similarity Search
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
      setScryfallCards(data);
      setSimCards([]);
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  // Conditional Renders
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
            <CardDisplay
              name={searchedCard.name}
              image_urls={searchedCard.image_urls}
              cardOverlay={false}
            />
          </div>
        )}
        </Col>
        <Col sm={9}>
        <SearchResults
          isLoading={isLoading}
          simCards={simCards}
          nCardsPerRow={nCardsPerRow}
          cardOverlay={true}
        />
        </Col>
      </Row>
    )
  }


  return (
    <div className="ResultsPage">
      <Header>
        <SearchBar
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validateForm={validateForm}
          card={formCard}
          setCard={setFormCard}
        />
      </Header>
      <div className="container">
        <div className="ResultsFilters">
          <Filters/>
        </div>
        {simCards.length > 0
          ? renderSimilarityCards(searchedCard, isLoading, filteredSimCards, nCardsPerRow)
          : renderScryfallCards(isLoading, scryfallCards, nCardsPerRow)
        }
      </div>
      <Footer></Footer>
    </div>
  );
}