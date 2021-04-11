import { API } from "aws-amplify";

export function simCardSearch(card) {
  return API.post("similarity", "/card_query", {
    body: {
      key: 'name',
      value: card
    }
  });
}

export function simTextSearch(text) {
  return API.post("similarity", "/free_text_query", {
    body: {
      query: [text]
    }
  });
}