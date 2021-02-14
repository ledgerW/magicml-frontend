import { API } from "aws-amplify";

export function similaritySearch(card) {
  return API.post("similarity", "/query", {
    body: {
      key: 'name',
      value: card
    }
  });
}