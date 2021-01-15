import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function ManaCostFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <DropdownButton id="dropdown-manaCost" title="Mana Cost" size="lg" onSelect={(e) => handleFilters(e)}>
      <Form.Group id='manaCost'>
        <Dropdown.Item eventKey="lt1" active={filters.manaCost.lt1}>0</Dropdown.Item>
        <Dropdown.Item eventKey="1" active={filters.manaCost['1']}>1</Dropdown.Item>
        <Dropdown.Item eventKey="2" active={filters.manaCost['2']}>2</Dropdown.Item>
        <Dropdown.Item eventKey="3" active={filters.manaCost['3']}>3</Dropdown.Item>
        <Dropdown.Item eventKey="4" active={filters.manaCost['4']}>4</Dropdown.Item>
        <Dropdown.Item eventKey="5" active={filters.manaCost.['5']}>5</Dropdown.Item>
        <Dropdown.Item eventKey="6" active={filters.manaCost.['6']}>6</Dropdown.Item>
      </Form.Group>
    </DropdownButton>
  )
}