import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";

import "../../containers/Home.css";


export default function ColorFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <DropdownButton id="dropdown-color" title="Colors" size="lg" onSelect={(e) => handleFilters(e)}>
      <Form.Group id='color'>
        <Dropdown.Item eventKey="W" active={filters.colors.W}>White</Dropdown.Item>
        <Dropdown.Item eventKey="B" active={filters.colors.B}>Black</Dropdown.Item>
        <Dropdown.Item eventKey="G" active={filters.colors.G}>Green</Dropdown.Item>
        <Dropdown.Item eventKey="U" active={filters.colors.U}>Blue</Dropdown.Item>
        <Dropdown.Item eventKey="R" active={filters.colors.R}>Red</Dropdown.Item>
        <Dropdown.Item eventKey="0" active={filters.colors['0']}>Colorless</Dropdown.Item> 
      </Form.Group>
    </DropdownButton>
  )
}