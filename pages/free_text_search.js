import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Filters from "../components/Filters";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { simTextSearch } from "../libs/similarityLib";
import { defaultFilters, applyFilters } from "../libs/filtersLib";


export default function Results() {
  const router = useRouter()

  let meta = {
    'title': 'MagicML - Free Text Similarity Search',
    'keywords': 'Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards',
    'description': 'Magic: The Gathering card search powered by Natural Language Processing',
    'canonical': 'https://magicml.com/free_text_search',
    'image': 'https://magicml.com/logo512.png'
  };

  const nCardsPerRow = 4;
  const nCardResults = 25;
  const textHint = "you're looking for a card that does what?"

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formSearch, setFormSearch,
    searchedFor, setSearchedFor,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
    filters, setFilters
  } = useAppContext();


  useEffect(() => {
    setIsLoading(true);
    setFilters(defaultFilters);
    loadTextSimResults();
  }, [router.query.q]);

  useEffect(() => {
    setIsLoading(true);
    applyFilters(filters, simCards, nCardResults, setFilteredSimCards, setIsLoading, onError);
  }, [filters]);


  function validateForm() {
    return formSearch.length > 0;
  }


  // Similarity Card Search
  async function handleTextSearch(event) {
    event.preventDefault();
    router.push(`/free_text_search?q=${formSearch}`, undefined, { shallow: true })
  }

  
  async function loadTextSimResults() {
    /*
    id (str): card name
    */
    console.log(formSearch)
    setShowAlert(false);
    setIsLoading(true);

    let simResults = await simTextSearch(formSearch);
    
    try {
      if (simResults.cards.length > 0) {
        let simSearchSimCards = simResults.cards[0].similarities.slice(0, nCardResults);
        setSearchedFor(simResults.cards[0]);
        setSimCards(simSearchSimCards);
        setFilteredSimCards(simSearchSimCards);
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

  function renderSimilarityCards(searchedFor, isLoading, simCards, nCardsPerRow, showAlert, setShowAlert) {
    return (
      <Row>
        <Col sm={3}>
        {searchedFor && (
          <div className="sticky-top">
            <p>Put Something Here</p>
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
      <CustomHead {...meta}/>
      <div className="ResultsPage">
        <Header>
          <SearchBar
            handleSubmit={handleTextSearch}
            isLoading={isLoading}
            validateForm={validateForm}
            hint={textHint}
            search={formSearch}
            setSearch={setFormSearch}
          />
        </Header>
        <div className="container">
          <div className="ResultsFilters">
            <Filters></Filters>
          </div>
          {renderSimilarityCards(searchedFor, isLoading, filteredSimCards, nCardsPerRow, showAlert, setShowAlert)}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}