import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col'
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import CardDisplay from "../components/CardDisplay";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { search } from "../libs/similarityLib";
import "./Home.css";


export default function Results() {
  const nCardsPerRow = 4;
  const nCardResults = 20;

  const { card, setCard, isLoading, setIsLoading } = useAppContext();
  const { nameParam } = useParams();
  const history = useHistory();
  const [searchCard, setSearchCard] = useState(null);
  const [simCards, setSimCards] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    newSearch();
  }, [nameParam]);

  async function newSearch() {
    try {
      const cards = await search(nameParam);
      console.log(cards);
      setSearchCard(cards.cards[0])
      setSimCards(cards.cards[0].similarities.slice(0, nCardResults));
      setIsLoading(false);
    }
    catch(e) {
      onError(e);
      setIsLoading(false);
    }
  }


  function validateForm() {
    return card.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    history.push(`/results/${card}`);
  }

  return (
    <div>
      <NavBar>
        MagicML
      </NavBar>
      <div className="ResultsPage container">
        <SearchBar
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          validateForm={validateForm}
          card={card}
          setCard={setCard}
        />
        <Row>
          <Col sm={4}>
          {searchCard && (
            <div className="sticky-top">
              <CardDisplay name={searchCard.name} image_urls={searchCard.image_urls}/>
            </div>
          )}
          </Col>
          <Col sm={8}>
          <SearchResults
            isLoading={isLoading}
            simCards={simCards}
            nCardsPerRow={nCardsPerRow}
          />
          </Col>
        </Row>
      </div>
    </div>
  );
}