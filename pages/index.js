import Head from 'next/head'

import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { useAppContext } from "../libs/contextLib";
import Scryfall from "../libs/scryfall";
import { supportedSets } from "../libs/magicLib";

export default function Home() {
  let meta = {
    'title': 'MagicML',
    'keywords': "Magic: The Gathering, MTG, MTG Arena, Magic Card Search, Magic Cards",
    'description': "Magic: The Gathering card search powered by Natural Language Processing"
  };
  const nCardsPerRow = 4;

  const {
    isLoading, setIsLoading,
    showAlert, setShowAlert,
    formCard, setFormCard,
    scryfallCards, setScryfallCards
  } = useAppContext();


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
      data = data.map(card => {
        if (supportedSets.some(s => card.set_name.includes(s))) {
          return card
        }
      }).filter(el => el != null);
      
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
      <Head>
          <title>{meta.title}</title>
          <meta name="keywords" content={meta.keywords}/>
          <meta name="description" content={meta.description}/>
          <link rel="canonical" href="https://magicml.com" />
          <meta property="og:type" content="website"></meta>
          <meta name="twitter:card" content="summary_large_image"></meta>
          <meta name="twitter:site" content="@magicml2"></meta>
          <meta name="twitter:title" content={meta.title}></meta>
          <meta name="twitter:description" content={meta.description}></meta>
          <meta name="twitter:image" content="/logo512.png"></meta>
      </Head>
      <div className="HomePageMain">
        <Header></Header>
        <div class="HomePageTitle">
          <h2>Find cards with similar functionality</h2>
          <h5><b>Magic: The Gathering</b> card search powered by Natural Language Processing</h5>
        </div>
        <div className="HomeSearchBar container">
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
            <div class="SearchHelper">
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