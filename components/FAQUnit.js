import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


export default function FAQUnit(props) {
  const { faqs } = props;
  
  return (
    <Accordion>
      {
        faqs.map((faq, idx) =>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={`${idx}`}>
              {faq.q}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={`${idx}`}>
            <Card.Body>
              {faq.a.map((line) =>
                <p>{line}</p>
              )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        )
      }
    </Accordion>
  )
}