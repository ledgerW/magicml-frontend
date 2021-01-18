import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import {Helmet} from "react-helmet";

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
  let meta = {
    'title': 'MagicML',
    'keywords': "Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards",
    'description': "Magic: The Gathering card search powered by Natural Language Processing"
  };
  const nCardsPerRow = 4;
  const nCardResults = 25;

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
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
      if (res.cards.length > 0) {
        let resSearchCard = res.cards[0]
        let resSimCards = res.cards[0].similarities.slice(0, nCardResults);
        setSearchedCard(resSearchCard);
        setSimCards(resSimCards);
        setFilteredSimCards(resSimCards);
        setIsLoading(false);
      } else {
        setShowAlert(true);
        setIsLoading(false);
      }
    }
    catch(e) {
      setIsLoading(false);
    }
  }


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
      data = data.filter(card => card.hasOwnProperty('arena_id'));
      setScryfallCards(data);
      setSimCards([]);
      setIsLoading(false);
    } catch (e) {
      setShowAlert(true);
      setSimCards([]);
      setIsLoading(false);
    }
  }

  // Conditional Renders
  function renderScryfallCards(isLoading, scryfallCards, nCardsPerRow, showAlert, setShowAlert) {
    return (
      <SearchResults
        isLoading={isLoading}
        simCards={scryfallCards}
        nCardsPerRow={nCardsPerRow}
        cardOverlay={false}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertType={"No Cards Found"}
      />
    )
  }

  function renderSimilarityCards(searchedCard, isLoading, simCards, nCardsPerRow, showAlert, setShowAlert) {
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
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertType={"No similarities for that card yet :("}
          />
        </Col>
      </Row>
    )
  }


  return (
    <div>
      <Helmet>
          <title>{meta.title.concat(" - ", nameParam)}</title>
          <meta name="keywords" content={meta.keywords.concat(", ", nameParam)}/>
          <meta name="description" content={searchedCard ? (searchedCard.name.concat(": ", searchedCard.text)) : meta.description}/>
          <link rel="canonical" href="https://magicml.com/similarity" />
      </Helmet>
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
            <Filters></Filters>
          </div>
          {simCards.length > 0
            ? renderSimilarityCards(searchedCard, isLoading, filteredSimCards, nCardsPerRow, showAlert, setShowAlert)
            : renderScryfallCards(isLoading, scryfallCards, nCardsPerRow, showAlert, setShowAlert)
          }
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}