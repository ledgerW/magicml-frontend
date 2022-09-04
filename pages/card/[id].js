import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { useRouter } from 'next/router'

import CustomHead from "../../components/CustomHead";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import CardDisplay from "../../components/CardDisplay";
import Filters from "../../components/Filters";
import SearchRadio from "../../components/SearchRadio";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { simCardSearch } from "../../libs/similarityLib";
import { getAllCardIds, removeFSPackage } from "../../libs/dynamicPathLib";
import { defaultFilters, applyFilters, getUniqueListBy } from "../../libs/filtersLib";
import {
  cardHint, textHint,
  validateForm,
  handleTextSearch, handleCardNameSearch
} from "../../libs/formSearchLib";


export default function Results({ id, simSearch, top3Sims }) {
  const router = useRouter()

  // Static Pre Rendering for Metadata SEO 
  if (!top3Sims) {
    top3Sims = [''];
  }

  let searchImageURLs = '';
  if (simSearch) {
    try {
      searchImageURLs = JSON.parse(simSearch.image_urls.replaceAll("'", "\""))
      searchImageURLs = Array.isArray(searchImageURLs) ? searchImageURLs[0] : searchImageURLs
    } catch (e) {
      searchImageURLs = simSearch.image_urls
    }
  } else {
    searchImageURLs = ''
  }

  let meta = {
    'dynamic': true,
    'title': 'MagicML',
    'keywords': 'Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards',
    'description': 'NLP-powered MTG card similarities',
    'id': id,
    'searchImageURLs': searchImageURLs,
    'top3Sims': top3Sims
  };

  // Normal Page Functionality
  const nCardsPerRow = 4;
  const nCardResults = 25;

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formSearch, setFormSearch,
    searchedFor, setSearchedFor,
    simCards, setSimCards,
    filteredSimCards, setFilteredSimCards,
    filters, setFilters,
    radioValue
  } = useAppContext();

  const [hasSims, setHasSims] = useState(false)


  useEffect(() => {
    setIsLoading(true);
    setHasSims(false);
    setFilters(defaultFilters);
    loadCardSimResults(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    applyFilters(filters, simCards, nCardResults, setFilteredSimCards, setIsLoading, onError);
  }, [filters]);


  // Similarity Card Search
  async function loadCardSimResults(id) {
    /*
    id (str): card name from Next Get Static Props
    */
    let simResults = await simCardSearch(id);
    console.log(simResults.cards)

    try {
      if (simResults.cards.length > 0) {
        let simSearchSimCards = simResults.cards[0].similarities;
        simSearchSimCards = getUniqueListBy(simSearchSimCards, 'name')
        simSearchSimCards = simSearchSimCards.slice(0, nCardResults);
        setSearchedFor(simResults.cards[0]);
        setSimCards(simSearchSimCards);
        setHasSims(true);
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
  if (router.isFallback) {
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
          <div class="SearchHelper">
            <h2>Just a second :)</h2>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
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
            <Col sm={3}>
              {hasSims && (
                <div className="sticky-top">
                  <CardDisplay
                    name={searchedFor.name}
                    image_urls={searchedFor.image_urls}
                    cardOverlay={false}
                  />
                </div>
              )}
            </Col>
            <Col sm={hasSims ? 9 : 12}>
              <SearchResults
                isLoading={isLoading}
                simCards={filteredSimCards}
                nCardsPerRow={nCardsPerRow}
                cardOverlay={true}
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


// ========= Next.js Dynamic Route Functions ========
export async function getStaticPaths() {
  const paths = getAllCardIds()
  return {
    paths,
    fallback: true
  }
}


// For getStaticProps
// maybe put newSimSearch back here
export async function getStaticProps({ params }) {
  removeFSPackage();
  let simSearch = null;
  let top3Sims = [''];
  let id = params.id;
  let simResults = await simCardSearch(params.id);

  if (simResults.cards.length > 0) {
    simSearch = simResults.cards[0]
    top3Sims = simSearch.similarities.filter(card => (
      card.name != simSearch.name
    )).map(card => (
      card.name
    ))

    top3Sims = [...new Set(top3Sims)].slice(0, 3)
  }

  return {
    props: {
      id,
      simSearch,
      top3Sims
    },
    revalidate: 60
  };
}