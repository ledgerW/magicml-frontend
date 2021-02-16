import React, { useRef } from "react";
import Link from "next/link";

import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";


export default function CardDisplay(props) {
  const target = useRef(null);
  let { name, image_urls, cardOverlay } = props;
  var src = '';
  
  try {
    src = JSON.parse(image_urls.replaceAll("'", "\""))
    src = Array.isArray(src) ? src[0].normal : src.normal
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
    <div>
      {cardOverlay
        ? (
          <OverlayTrigger
            target={target.current}
            placement="auto-start"
            overlay={renderHover(src)}
          >
            <Card border="light" className="Card text-center">
              <Link href={`/similarity/${name.replace('//','__')}`} passHref>
                <Card.Link>
                  <Card.Img variant="top" src={ src } />
                </Card.Link>
              </Link>
            </Card>
          </OverlayTrigger>
          )
        : (
          <Card border="light" className="Card text-center">
            <Link href={`/similarity/${name.replace('//','__')}`} passHref>
              <Card.Link>
                <Card.Img variant="top" src={ src } />
              </Card.Link>
            </Link>
          </Card>
          )
      }
    </div>
    
  )
}