import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import LoaderButton from "../components/LoaderButton";
import "../containers/Home.css";


export default function(props) {
  const { handleSubmit, isLoading, validateForm, card, setCard } = props

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup controlId="card" className="mb-3">
        <InputGroup.Prepend>
          <LoaderButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Search
          </LoaderButton>
        </InputGroup.Prepend>
        <Form.Control
          value={card}
          placeholder="Enter name of a card..."
          as="input"
          size="lg"
          onChange={(e) => setCard(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}