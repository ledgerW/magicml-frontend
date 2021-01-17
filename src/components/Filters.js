import React from "react";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ColorFilter from "./filters/ColorFilter";
import TypeFilter from "./filters/TypeFilter";
import ManaCostFilter from "./filters/ManaCostFilter";
import FormatFilter from "./filters/FormatFilter";
import { onError } from "../libs/errorLib";
import { useAppContext } from "../libs/contextLib";

import "../containers/Home.css";


export default function Filters() {
  const {
    filters, setFilters
  } = useAppContext();

  function handleFilters(id) {
    let value;
    
    switch (`${id}`) {
      // Color Filters
      case 'W':
        value = !filters.colors.W
        setFilters({...filters, colors: {...filters.colors, W: value}});
        break;
      case 'B':
        value = !filters.colors.B
        setFilters({...filters, colors: {...filters.colors, B: value}});
        break;
      case 'G':
        value = !filters.colors.G
        setFilters({...filters, colors: {...filters.colors, G: value}});
        break;
      case 'U':
        value = !filters.colors.U
        setFilters({...filters, colors: {...filters.colors, U: value}});
        break;
      case 'R':
        value = !filters.colors.R
        setFilters({...filters, colors: {...filters.colors, R: value}});
        break;
      case '0':
        value = !filters.colors['0']
        setFilters({...filters, colors: {...filters.colors, 0: value}});
        break;
      // Type Filters
      case 'Creature':
        value = !filters.type.Creature
        setFilters({...filters, type: {...filters.type, Creature: value}});
        break;
      case 'Planeswalker':
        value = !filters.type.Planeswalker
        setFilters({...filters, type: {...filters.type, Planeswalker: value}});
        break;
      case 'Instant':
        value = !filters.type.Instant
        setFilters({...filters, type: {...filters.type, Instant: value}});
        break;
      case 'Sorcery':
        value = !filters.type.Sorcery
        setFilters({...filters, type: {...filters.type, Sorcery: value}});
        break;
      case 'Enchantment':
        value = !filters.type.Enchantment
        setFilters({...filters, type: {...filters.type, Enchantment: value}});
        break;
      case 'Artifact':
        value = !filters.type.Artifact
        setFilters({...filters, type: {...filters.type, Artifact: value}});
        break;
      case 'Land':
        value = !filters.type.Land
        setFilters({...filters, type: {...filters.type, Land: value}});
        break;
      // Mana Cost Filters
      case 'lt1':
        value = !filters.manaCost.lt1
        setFilters({...filters, manaCost: {...filters.manaCost, lt1: value}});
        break;
      case '1':
        value = !filters.manaCost['1']
        setFilters({...filters, manaCost: {...filters.manaCost, 1: value}});
        break;
      case '2':
        value = !filters.manaCost['2']
        setFilters({...filters, manaCost: {...filters.manaCost, 2: value}});
        break;
      case '3':
        value = !filters.manaCost['3']
        setFilters({...filters, manaCost: {...filters.manaCost, 3: value}});
        break;
      case '4':
        value = !filters.manaCost['4']
        setFilters({...filters, manaCost: {...filters.manaCost, 4: value}});
        break;
      case '5':
        value = !filters.manaCost['5']
        setFilters({...filters, manaCost: {...filters.manaCost, 5: value}});
        break;
      case '6':
        value = !filters.manaCost['6']
        setFilters({...filters, manaCost: {...filters.manaCost, 6: value}});
        break;
      // Format Filters
      case 'standard':
        value = !filters.format.standard
        setFilters({...filters, format: {...filters.format, standard: value}});
        break;
      case 'historic':
        value = !filters.format.historic
        setFilters({...filters, format: {...filters.format, historic: value}});
        break;
      case 'brawl':
        value = !filters.format.brawl
        setFilters({...filters, format: {...filters.format, brawl: value}});
        break;
      case 'commander':
        value = !filters.format.commander
        setFilters({...filters, format: {...filters.format, commander: value}});
        break;
      case 'pauper':
        value = !filters.format.pauper
        setFilters({...filters, format: {...filters.format, pauper: value}});
        break;
      case 'oldschool':
        value = !filters.format.oldschool
        setFilters({...filters, format: {...filters.format, oldschool: value}});
        break;
      case 'modern':
        value = !filters.format.modern
        setFilters({...filters, format: {...filters.format, modern: value}});
        break;
      default:
        console.log(filters);
    }
  }

  return (
    <Row className="Filters justify-content-md-center">
      <Col sm={3}>
        <ColorFilter handleFilters={handleFilters}/>
      </Col>
      <Col sm={3}>
        <TypeFilter handleFilters={handleFilters}/>
      </Col>
      <Col sm={3}>
        <ManaCostFilter handleFilters={handleFilters}/>
      </Col>
      <Col sm={3}>
        <FormatFilter handleFilters={handleFilters}/>
      </Col>
    </Row>
  )
}