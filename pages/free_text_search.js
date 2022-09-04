import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router';

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SearchRadio from "../components/SearchRadio";
import Filters from "../components/Filters";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { simTextSearch } from "../libs/similarityLib";
import { defaultFilters, applyFilters, getUniqueListBy } from "../libs/filtersLib";
import {
  cardHint, textHint,
  validateForm,
  handleTextSearch, handleCardNameSearch
} from "../libs/formSearchLib";


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

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formSearch, setFormSearch,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
    filters, setFilters,
    radioValue
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


  async function loadTextSimResults() {
    setShowAlert(false);
    setIsLoading(true);

    let simResults = await simTextSearch(formSearch);

    try {
      if (simResults.cards.length > 0) {
        let simSearchSimCards = simResults.cards[0].similarities;
        simSearchSimCards = getUniqueListBy(simSearchSimCards, 'name')
        simSearchSimCards = simSearchSimCards.slice(0, nCardResults);
        setSimCards(simSearchSimCards);
        setFilteredSimCards(simSearchSimCards);
        setIsLoading(false);
      } else {
        setShowAlert(true);
        setIsLoading(false);
      }
    }
    catch (e) {
      setIsLoading(false);
    }
  }


  // View
  return (
    <div>
      <CustomHead {...meta} />
      <div className="ResultsPage">
        <Header>
          <SearchBar
            handleSubmit={
              radioValue === 'text' ?
                handleTextSearch(router, formSearch) :
                handleCardNameSearch(router, formSearch)
            }
            isLoading={isLoading}
            validateForm={validateForm(formSearch)}
            hint={
              radioValue === 'text' ?
                textHint :
                cardHint
            }
            search={formSearch}
            setSearch={setFormSearch}
          />
          <div className="SearchRadio">
            <SearchRadio />
          </div>
        </Header>
        <div className="container">
          <div className="ResultsFilters">
            <Filters></Filters>
          </div>
          <Row>
            <Col sm={12}>
              <SearchResults
                isLoading={isLoading}
                simCards={filteredSimCards}
                nCardsPerRow={nCardsPerRow}
                cardOverlay={false}
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                alertType={"No similarities for that card yet :("}
              />
            </Col>
          </Row>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}