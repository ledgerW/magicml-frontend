import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import LoaderButton from "../components/LoaderButton";


export default function SearchBar(props) {
  const { handleSubmit, isLoading, validateForm, hint, search, setSearch } = props

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
          value={search}
          placeholder={hint}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}