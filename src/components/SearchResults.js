import CardGroup from "react-bootstrap/CardGroup";
import CardDisplay from "./CardDisplay";
import "../containers/Home.css";


export default function(props) {
  const { isLoading, simCards, nCardsPerRow } = props

  function renderCardsList(similarities, nCardsPerRow) {
    if (similarities.length > 0) {
      console.log(similarities);

      var newSims = [];
      for (var n=0; n < similarities.length; n = n + nCardsPerRow) {
        newSims.push(similarities.slice(n, n + nCardsPerRow))
      }
      similarities = newSims;
    }

    return (
      <>
        {similarities.map((sim) => (
          <CardGroup>
          {sim.map(({ name, image_urls }) => (
            <CardDisplay name={name} image_urls={image_urls}/>
          ))}
          </CardGroup>
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