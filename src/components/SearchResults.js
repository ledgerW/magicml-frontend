import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import CardGroup from "react-bootstrap/CardGroup";
import CardDisplay from "./CardDisplay";
import "../containers/Home.css";


export default function SearchResults(props) {
  const { isLoading, simCards, nCardsPerRow } = props

  function renderCardsList(cards, nCardsPerRow) {
    if (cards.length > 0) {
      cards = cards.map((card) => {
        // Similarity API
        if (card.image_urls) {
          return card
        } else {
          // Scryfall API
          if (card.image_uris) {
            return {...card, "image_urls": card.image_uris }
          } else {
            return {...card, "image_urls": card.card_faces[0].image_uris }
          }
        }
      })
      //console.log(cards);

      var newCards = [];
      for (var n=0; n < cards.length; n = n + nCardsPerRow) {
        newCards.push(cards.slice(n, n + nCardsPerRow))
      }
      cards = newCards;
    }

    return (
      <>
        {cards.map((card) => (
          <Row className="justify-content-md-center">
            <CardGroup>
              {card.map(({ name, image_urls }) => (
                <Col>
                  <CardDisplay name={name} image_urls={image_urls}/>
                </Col>
              ))}
            </CardGroup>
          </Row>
        ))}
      </>
    );
  }

  return (
    <div className="SearchResults">
        {!isLoading && renderCardsList(simCards, nCardsPerRow)}
    </div>
  )
}