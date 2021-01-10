import Card from "react-bootstrap/Card";
import "../containers/Home.css";


export default function CardDisplay(props) {
  let { name, image_urls } = props;
  var src = '';
  
  try {
    src = JSON.parse(image_urls.replaceAll("'", "\"")).normal
  } catch (e) {
    src = image_urls.normal
  }

  return (
    <Card border="light" className="Card text-center">
      <Card.Link href={`/results/${name}`}>
        <Card.Img variant="top" src={ src } />
      </Card.Link>
    </Card>
  )
}