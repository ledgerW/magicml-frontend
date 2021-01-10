import React from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function ManaCostFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <Form.Group as={Row} id='manaCost'>
      <Form.Label column='lg' sm={3}>
        Mana Cost
      </Form.Label>
      <Col sm={{ padding: 5 }}>
        <Form.Check
          inline
          checked={filters.manaCost["lt1"]}
          label="0"
          id='lt1'
          onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["1"]}
            label="1"
            id='1'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["2"]}
            label="2"
            id='2'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["3"]}
            label="3"
            id='3'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["4"]}
            label="4"
            id='4'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["5"]}
            label="5"
            id='5'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.manaCost["6"]}
            label="6+"
            id='6'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
    </Form.Group>
  )
}