// text or card search selection
export const cardHint = "... any part of card name"
export const textHint = "... a card that does what?  type anything :)"

// Form Search Functions
export function validateForm(query) {
  return function() {
    return query.length > 0;
  }
}

export function handleTextSearch(router, query) {
  return function(event) {
    event.preventDefault()
    router.push(`/free_text_search?q=${query}`, undefined, { shallow: true })
  }
} 

export function handleCardNameSearch(router, query) {
  return function(event) {
    event.preventDefault()
    router.push(`/card_name_search?q=${query}`, undefined, { shallow: true })
  }
}