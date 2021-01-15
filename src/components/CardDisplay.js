import React, { useRef } from "react";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "../containers/Home.css";


export default function CardDisplay(props) {
  const target = useRef(null);
  let { name, image_urls } = props;
  var src = '';
  
  try {
    src = JSON.parse(image_urls.replaceAll("'", "\"")).normal
  } catch (e) {
    src = image_urls.normal
  }

  const renderHover = (src) => {
    return (
      <Card className="CardOverlay">
        <Card.Img variant="top" src={ src }/>
      </Card>
    )
  };

  return (
    <OverlayTrigger
      target={target.current}
      placement="auto-start"
      overlay={renderHover(src)}
    >
      <Card border="light" className="Card text-center">
        <Card.Link href={`/results/${name}`}>
          <Card.Img variant="top" src={ src } />
        </Card.Link>
      </Card>
    </OverlayTrigger>
  )
}