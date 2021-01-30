import React from "react";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import Form from 'react-bootstrap/Form';

import { useAppContext } from "../../libs/contextLib";


export default function FormatFilter(props) {
  const { filters } = useAppContext();
  const { handleFilters } = props;

  return (
    <DropdownButton id="dropdown-format" title="Format" size="lg" onSelect={(e) => handleFilters(e)}>
      <Form.Group id='format'>
        <Dropdown.Item eventKey="standard" active={filters.format.standard}>Standard</Dropdown.Item>
        <Dropdown.Item eventKey="historic" active={filters.format.historic}>Historic</Dropdown.Item>
        <Dropdown.Item eventKey="brawl" active={filters.format.brawl}>Brawl</Dropdown.Item>
        <Dropdown.Item eventKey="commander" active={filters.format.commander}>Commander</Dropdown.Item>
        <Dropdown.Item eventKey="pauper" active={filters.format.pauper}>Pauper</Dropdown.Item>
        <Dropdown.Item eventKey="oldschool" active={filters.format.oldschool}>Old School</Dropdown.Item>
        <Dropdown.Item eventKey="modern" active={filters.format.modern}>Modern</Dropdown.Item>
      </Form.Group>
    </DropdownButton>
  )
}