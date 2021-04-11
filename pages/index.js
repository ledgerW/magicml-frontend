import { useState } from "react";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import CustomHead from "../components/CustomHead";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";

export default function Home() {
  let meta = {
    'title': 'MagicML: MTG Tools, Powered by Machine Learning',
    'keywords': 'Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards',
    'description': 'Magic: The Gathering card search powered by Natural Language Processing',
    'canonical': 'https://magicml.com',
    'image': 'https://magicml.com/logo512.png'
  };
  const nCardsPerRow = 4;

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();

  const [radioValue, setRadioValue] = useState('text');

  const radios = [
    { name: 'Text Search', value: 'text' },
    { name: 'Card Search', value: 'card' }
  ];


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

      // only show cards in Arena
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

      setScryfallCards(data)
      setIsLoading(false);
    } catch (e) {
      setShowAlert(true);
      setIsLoading(false);
    }
  }


  return (
    <div>
      <CustomHead {...meta}/>
      <div className="HomePageMain">
        <Header></Header>
        <div className="HomePageTitle">
          <h2>Find cards with similar functionality</h2>
          <h5><b>Magic: The Gathering</b> card search powered by Natural Language Processing</h5>
        </div>
        <div className="HomeSearchBar container">
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
          <SearchBar
            handleSubmit={scryfallSearch}
            isLoading={isLoading}
            validateForm={validateForm}
            card={formCard}
            setCard={setFormCard}
          />
        </div>
        <div className="HomeSearchResults">
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