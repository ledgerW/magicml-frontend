import { API } from "aws-amplify";

export function search(card) {
  return API.post("similarity", "/query", {
    body: {
      key: 'name',
      value: card
    }
  });
}