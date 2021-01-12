import React from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function ColorFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <Form.Group as={Row} id='color' className="Filters">
      <Form.Label column='lg' sm={2}>
        Color
      </Form.Label>
      <Col sm={{ padding: 5 }}>
        <Form.Check
          inline
          checked={filters.colors.W}
          label="White"
          id='W'
          onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.colors.B}
            label="Black"
            id='B'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.colors.G}
            label="Green"
            id='G'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.colors.U}
            label="Blue"
            id='U'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.colors.R}
            label="Red"
            id='R'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
      <Col sm={{ padding: 5 }}>
        <Form.Check
            inline
            checked={filters.colors["0"]}
            label="Colorless"
            id='0'
            onChange={(e) => handleFilters(e.target.id, e.target.checked)}
        />
      </Col>
    </Form.Group>
  )
}