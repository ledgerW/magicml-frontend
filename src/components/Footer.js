import React from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import "../index.css";
import "../App.css";


export default function Footer() {
  return (
    <footer>
      <Row className="content">
        <Col>
          <p>By: Ledger West  (ArenaID: lw2134)</p>
        </Col>
        <Col>
          ledger@magicml.com
        </Col>
      </Row>
      <Row>
        <Col>
          <p class="legal">
            Portions of MagicML are unofficial Fan Content permitted under the Wizards of the Coast Fan Content Policy.
            The literal and graphical information presented on this site about Magic: The Gathering, including card images, the mana symbols, and Oracle text, is copyright Wizards of the Coast, LLC, a subsidiary of Hasbro, Inc.
            MagicML is not produced by, endorsed by, supported by, or affiliated with Wizards of the Coast.
          </p>
          <p class="legal">
            Card prices and promotional offers represent daily estimates and/or market values provided by our affiliates.
            Absolutely no guarantee is made for any price information. See stores for final prices and details.
          </p>
          <p class="legal">
            All other content © 2021 MagicML.
          </p>
        </Col>
      </Row>
    </footer>
  )
}