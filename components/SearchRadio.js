import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

import { useAppContext } from "../libs/contextLib";


export default function SearchRadio() {
  const {
    radioValue, setRadioValue
  } = useAppContext();
  
  const radios = [
    { name: 'Free Text Search', value: 'text' },
    { name: 'Card Name Search', value: 'card' }
  ];

  return (
    <ButtonGroup toggle>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          type="radio"
          variant="secondary"
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={(e) => setRadioValue(e.currentTarget.value)}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  )
}