import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function TypeFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <DropdownButton id="dropdown-type" title="Type" size="lg" onSelect={(e) => handleFilters(e)}>
      <Form.Group id='type'>
        <Dropdown.Item eventKey="Creature" active={filters.type.Creature}>Creature</Dropdown.Item>
        <Dropdown.Item eventKey="Planeswalker" active={filters.type.Planeswalker}>Planeswalker</Dropdown.Item>
        <Dropdown.Item eventKey="Instant" active={filters.type.Instant}>Instant</Dropdown.Item>
        <Dropdown.Item eventKey="Sorcery" active={filters.type.Sorcery}>Sorcery</Dropdown.Item>
        <Dropdown.Item eventKey="Enchantment" active={filters.type.Enchantment}>Enchantment</Dropdown.Item>
        <Dropdown.Item eventKey="Atifact" active={filters.type.Artifact}>Artifact</Dropdown.Item>
        <Dropdown.Item eventKey="Land" active={filters.type.Land}>Land</Dropdown.Item>
      </Form.Group>
    </DropdownButton>
  )
}