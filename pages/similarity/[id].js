import React, { useEffect } from "react";
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
import Scryfall from "../../libs/scryfall";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { simCardSearch, simTextSearch } from "../../libs/similarityLib";
import { getAllCardIds, removeFSPackage } from "../../libs/dynamicPathLib";
import { defaultFilters, applyFilters } from "../../libs/filtersLib";


export default function Results({ id, simSearch, top3Sims }) {
  const router = useRouter()

  if (!top3Sims) {
    top3Sims = [''];
  }
  
  let searchImageURLs;
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
    filters, setFilters
  } = useAppContext();


  useEffect(() => {
    setIsLoading(true);
    setFilters(defaultFilters);
    loadSimResults(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    applyFilters(filters, simCards, nCardResults, setFilteredSimCards, setIsLoading, onError);
  }, [filters]);


  function validateForm() {
    return formCard.length > 0;
  }

  // Similarity Card Search
  async function loadSimResults(id) {
    /*
    id (str): card name
    */
    let simResults = await simCardSearch(id);
    
    try {
        if (simResults.cards.length > 0) {
          let simSearchSimCards = simResults.cards[0].similarities.slice(0, nCardResults);
          setSearchedCard(simResults.cards[0]);
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


  // Scryfall Search
  async function scryfallSearch(event) {
    event.preventDefault();
  
    setShowAlert(false);
    setIsLoading(true);
  
    try {
      const res = await Scryfall.get(`search?q=${formCard}`);
      var { data } = res.data;

      /*
      data = data.map(card => {
        if (supportedSets.some(s => card.set_name.includes(s))) {
          return card
        }
      }).filter(el => el != null);
      */

      if (data.length == 0) {
        setShowAlert(true);
      }
      
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

  if (router.isFallback) {
    return (
      <div>
        <CustomHead {...meta}/>
        <div className="ResultsPage">
          <Header>
            <SearchBar
              handleSubmit={scryfallSearch}
              isLoading={isLoading}
              validateForm={validateForm}
              card={formCard}
              setCard={setFormCard}
            />
          </Header>
          <div class="SearchHelper">
            <h2>Just a second :)</h2>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div>
      <CustomHead {...meta}/>
      <div className="ResultsPage">
        <Header>
          <SearchBar
            handleSubmit={scryfallSearch}
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


// Next.js Dynamic Route Functions
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