import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

import ColorFilter from "./filters/ColorFilter";
import TypeFilter from "./filters/TypeFilter";
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
        // Color Filters
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
        // Type Filters
        case 'Creature':
          setFilters({...filters, type: {...filters.type, Creature: value}});
          break;
        case 'Planeswalker':
          setFilters({...filters, type: {...filters.type, Planeswalker: value}});
          break;
        case 'Instant':
          setFilters({...filters, type: {...filters.type, Instant: value}});
          break;
        case 'Sorcery':
          setFilters({...filters, type: {...filters.type, Sorcery: value}});
          break;
        case 'Enchantment':
          setFilters({...filters, type: {...filters.type, Enchantment: value}});
          break;
        case 'Artifact':
          setFilters({...filters, type: {...filters.type, Artifact: value}});
          break;
        case 'Land':
          setFilters({...filters, type: {...filters.type, Land: value}});
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
        <ColorFilter handleFilters={handleFilters}/>
      </Form.Row>
      <Form.Row>
        <TypeFilter handleFilters={handleFilters}/>
      </Form.Row>
    </Form>
  )
}