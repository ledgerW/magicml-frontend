import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import LoaderButton from "../components/LoaderButton";
import "../containers/Home.css";


export default function SearchBar(props) {
  const { handleSubmit, isLoading, validateForm, card, setCard } = props

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup controlId="card" size="lg">
        <InputGroup.Prepend>
          <LoaderButton
            type="submit"
            variant="dark"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Search
          </LoaderButton>
        </InputGroup.Prepend>
        <FormControl
          className="SearchBar"
          value={card}
          placeholder="any part of card name or card text..."
          onChange={(e) => setCard(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}