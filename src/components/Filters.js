import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";

import "../containers/Home.css";


export default function Filters() {

  const {
    filters, setFilters
  } = useAppContext();

  function handleFilters(id, value) {
    try {
      switch (`${id}`) {
        case 'W':
          setFilters({...filters, colors: {...filters.colors, W: value}});
          break;
        case 'B':
          setFilters({...filters, colors: {...filters.colors, B: value}});
          break;
        case 'G':
          setFilters({...filters, colors: {...filters.colors, G: value}});
          break;
        case 'U':
          setFilters({...filters, colors: {...filters.colors, U: value}});
          break;
        case 'R':
          setFilters({...filters, colors: {...filters.colors, R: value}});
          break;
        case '0':
          setFilters({...filters, colors: {...filters.colors, 0: value}});
          break;
        default:
          console.log(filters);
      }
    } catch (e) {
      onError(e);
    }
  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Row} id='color'>
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
      </Form.Row>
    </Form>
  )
}