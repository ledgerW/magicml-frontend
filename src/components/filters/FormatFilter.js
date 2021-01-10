import React from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function FormatFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <Form.Group as={Row} id='format'>
      <Form.Label column='lg' sm={2}>
        Format
      </Form.Label>
      <Col sm>
        <Form.Check
          inline
          checked={filters.format.standard}
          label="Standard"
          id='standard'
          onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm>
        <Form.Check
            inline
            checked={filters.format.historic}
            label="Historic"
            id='historic'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm>
        <Form.Check
            inline
            checked={filters.format.brawl}
            label="Brawl"
            id='brawl'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm>
        <Form.Check
            inline
            checked={filters.format.commander}
            label="Commander"
            id='commander'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.format.pauper}
            label="Pauper"
            id='pauper'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.format.oldschool}
            label="Old School"
            id='oldschool'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.format.modern}
            label="Modern"
            id='modern'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
    </Form.Group>
  )
}