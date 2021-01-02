import Card from "react-bootstrap/Card";
import "../containers/Home.css";


export default function CardDisplay(props) {
  const { name, image_urls } = props;

  return (
    <Card border="light" className="Card text-center">
      <Card.Img variant="top" src={ JSON.parse(image_urls.replaceAll("'", "\"")).normal } />
      <Card.Body>
        <Card.Text>{ name }</Card.Text>
      </Card.Body>
    </Card>
  )
}