import React from "react";

import Form from 'react-bootstrap/Form';

import ColorFilter from "./filters/ColorFilter";
import TypeFilter from "./filters/TypeFilter";
import ManaCostFilter from "./filters/ManaCostFilter";
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
        // Mana Cost Filters
        case 'lt1':
          setFilters({...filters, manaCost: {...filters.manaCost, lt1: value}});
          break;
        case '1':
          setFilters({...filters, manaCost: {...filters.manaCost, 1: value}});
          break;
        case '2':
          setFilters({...filters, manaCost: {...filters.manaCost, 2: value}});
          break;
        case '3':
          setFilters({...filters, manaCost: {...filters.manaCost, 3: value}});
          break;
        case '4':
          setFilters({...filters, manaCost: {...filters.manaCost, 4: value}});
          break;
        case '5':
          setFilters({...filters, manaCost: {...filters.manaCost, 5: value}});
          break;
        case '6':
          setFilters({...filters, manaCost: {...filters.manaCost, 6: value}});
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
      <Form.Row>
        <ManaCostFilter handleFilters={handleFilters}/>
      </Form.Row>
    </Form>
  )
}