import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import SearchRadio from "../components/SearchRadio";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";
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

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formSearch, setFormSearch,
    scryfallCards, setScryfallCards,
    radioValue
  } = useAppContext();


  useEffect(() => {
    setIsLoading(true);
    scryfallSearch();
  }, [router.query.q]);

  
  // Scryfall API
  async function scryfallSearch() {

    setShowAlert(false);
    setIsLoading(true);
  
    try {
      const res = await Scryfall.get(`search?q=${formSearch}`);
      var { data } = res.data;
      
      if (data.length == 0) {
        setShowAlert(true);
      }

      setScryfallCards(data)
      setIsLoading(false);
    } catch (e) {
      setShowAlert(true);
      setIsLoading(false);
    }
  }

  // View
  return (
    <div>
      <CustomHead {...meta}/>
      <div className="ResultsPage">
        <Header>
          <SearchBar
            handleSubmit={
              radioValue==='text' ? 
              handleTextSearch(router, formSearch) :
              handleCardNameSearch(router, formSearch)
            }
            isLoading={isLoading}
            validateForm={validateForm(formSearch)}
            hint={
              radioValue==='text' ? 
              textHint : 
              cardHint
            }
            search={formSearch}
            setSearch={setFormSearch}
          />
          <div className="SearchRadio">
            <SearchRadio/>
          </div>
        </Header>
        <div className="container">
          {scryfallCards.length > 0 &&
            <div className="SearchHelper">
              <h2>What card do you want to find similarities for?</h2>
            </div>
          }
          <SearchResults
            isLoading={isLoading}
            simCards={scryfallCards}
            nCardsPerRow={nCardsPerRow}
            cardOverlay={false}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertType={"No Cards Found"}
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}