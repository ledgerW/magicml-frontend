import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import CardGroup from "react-bootstrap/CardGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";

export default function Home() {
  const [card, setCard] = useState("");
  const [simCards, setSimCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return card.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    setIsLoading(true);
  
    try {
      const cards = await search(card);
      setSimCards(cards.cards[0].similarities.slice(0, 12));
      setIsLoading(false);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }
  
  function search(card) {
    return API.post("similarity", "/query", {
      body: {
        key: 'name',
        value: card
      }
    });
  }

  function renderCardsList(similarities) {
    /**
    similarities = similarities.map(item => {
        console.log(item);
        item.image_urls = JSON.parse(item.image_urls.replaceAll("\'", "\""));
        return item;
      });
    **/
    if (similarities.length > 0) {
      console.log(similarities);
      const sim1 = similarities.slice(0, 4);
      const sim2 = similarities.slice(4, 8);
      const sim3 = similarities.slice(8, 12);
      similarities = [sim1, sim2, sim3];
    }

    return (
      <>
        {similarities.map((sim) => (
          <CardGroup>
          {sim.map(({ name, text, image_urls }) => (
            <Card border="light" className="Card text-center">
              <Card.Img variant="top" src={ JSON.parse(image_urls.replaceAll("\'", "\"")).normal } />
              <Card.Body>
                <Card.Text>{ name }</Card.Text>
              </Card.Body>
            </Card>
          ))}
          </CardGroup>
        ))}
      </>
    );
  }

  return (
    <div className="Home">
      <Form onSubmit={handleSubmit}>
        <InputGroup controlId="card" className="mb-3">
          <InputGroup.Prepend>
            <LoaderButton
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Search
            </LoaderButton>
          </InputGroup.Prepend>
          <Form.Control
            value={card}
            placeholder="Enter name of a card..."
            as="input"
            size="lg"
            onChange={(e) => setCard(e.target.value)}
          />
        </InputGroup>
      </Form>
      <div className="SearchResults">
          {!isLoading && renderCardsList(simCards)}
      </div>
    </div>
  );

  /**
  return (
    <div className="Home">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="card">
          <Form.Control
            value={card}
            type="text"
            onChange={(e) => setCard(e.target.value)}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Search
        </LoaderButton>
      </Form>
      <div className="SimCards">
          {!isLoading && renderCardsList(simCards)}
      </div>
    </div>
  );
  **/
}