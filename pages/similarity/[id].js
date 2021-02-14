import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Head from 'next/head'

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
import SearchResults from "../../components/SearchResults";
import CardDisplay from "../../components/CardDisplay";
import Filters from "../../components/Filters";
import Scryfall from "../../libs/scryfall";
import { useAppContext } from "../../libs/contextLib";
import { onError } from "../../libs/errorLib";
import { similaritySearch } from "../../libs/similarityLib";
import { getAllCardIds, removeFSPackage } from "../../libs/dynamicPathLib";
import { defaultFilters, applyFilters } from "../../libs/filtersLib";


export default function Results({ id }) {
  let meta = {
    'title': 'MagicML',
    'keywords': "Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards",
    'description': "NLP-powered MTG card similarities"
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
    newSimSearch(id);
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    applyFilters(filters, simCards, nCardResults, setFilteredSimCards, setIsLoading, onError);
  }, [filters]);


  // Similarity Search
  async function newSimSearch(id) {
    /*
    id (str): card name
    */
    try {
      const res = await similaritySearch(id);
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

  async function scryfallSearch(event) {
    event.preventDefault();
  
    setShowAlert(false);
    setIsLoading(true);
  
    try {
      const res = await Scryfall.get(`search?q=${formCard}`);
      var { data } = res.data;
      data = data.filter(card => card.hasOwnProperty('arena_id'));

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


  return (
    <div>
      <Head>
          <title>{meta.title.concat(" - ", id)}</title>
          <meta name="keywords" content={meta.keywords.concat(", ", id)}/>
          <meta name="description" content={searchedCard ? (searchedCard.name.concat(": ", searchedCard.text)) : meta.description}/>
          <link rel="canonical" href={"https://magicml.com/similarity".concat("/",id)} />
          <meta property="og:type" content="website"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:site" content="@magicml2"></meta>
          <meta name="twitter:title" content={meta.title.concat(" - ", id)}></meta>
          <meta name="twitter:description" content={searchedCard ? (searchedCard.name.concat(": ", searchedCard.text)) : meta.description}></meta>
          <meta name="twitter:image" content={searchedCard ? searchedCard.image_urls.normal : "/logo512.png"}></meta>
      </Head>
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
    fallback: false
  }
}


// For getStaticProps
// maybe put newSimSearch back here
export async function getStaticProps({ params }) {
  removeFSPackage();
  let staticSimCards = [];
  let id = params.id;

  return {
    props: {
      id,
      staticSimCards
    },
  };
}