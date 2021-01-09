import React from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function TypeFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <Form.Group as={Row} id='type'>
      <Form.Label column='lg' sm={2}>
        Type
      </Form.Label>
      <Col sm={{ padding: 5 }}>
        <Form.Check
          inline
          checked={filters.type.Creature}
          label="Creature"
          id='Creature'
          onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Planeswalker}
            label="Planeswalker"
            id='Planeswalker'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Instant}
            label="Instant"
            id='Instant'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Sorcery}
            label="Sorcery"
            id='Sorcery'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Enchantment}
            label="Enchantment"
            id='Enchantment'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Artifact}
            label="Artifact"
            id='Artifact'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.type.Land}
            label="Land"
            id='Land'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
    </Form.Group>
  )
}