import Col from 'react-bootstrap/Col';
import CardGroup from "react-bootstrap/CardGroup";
import CardDisplay from "./CardDisplay";
import AlertMessage from "./AlertMessage";
import "../containers/Home.css";


export default function SearchResults(props) {
  const { 
    isLoading,
    simCards,
    nCardsPerRow,
    cardOverlay,
    showAlert,
    setShowAlert,
    alertType
  } = props

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

      var newCards = [];
      for (var n=0; n < cards.length; n = n + nCardsPerRow) {
        newCards.push(cards.slice(n, n + nCardsPerRow))
      }
      cards = newCards;
    }

    return (
      <>
        {cards.map((card) => (
          <CardGroup className="justify-content-md-center">
            {card.map(({ name, image_urls }) => (
              <Col md={3}>
                <CardDisplay name={name} image_urls={image_urls} cardOverlay={cardOverlay}/>
              </Col>
            ))}
          </CardGroup>
        ))}
      </>
    );
  }

  return (
    showAlert
    ? <AlertMessage
        alertType={alertType}
        setShowAlert={setShowAlert}
      />
    : <div className="SearchResults">
        {!isLoading && renderCardsList(simCards, nCardsPerRow)}
      </div>
  )
}