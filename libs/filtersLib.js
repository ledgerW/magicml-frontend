export function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()]
}


export const defaultFilters = {
  colors: {
    W: true,
    B: true,
    G: true,
    U: true,
    R: true,
    0: true
  },
  type: {
    Creature: true,
    Planeswalker: true,
    Instant: true,
    Sorcery: true,
    Enchantment: true,
    Artifact: true,
    Land: true
  },
  manaCost: {
    lt1: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true
  },
  format: {
    standard: true,
    historic: true,
    brawl: true,
    commander: true,
    pauper: true,
    oldschool: true,
    modern: true
  }
}


export function applyFilters(
  filters,
  simCards,
  nCardResults,
  setFilteredSimCards,
  setIsLoading,
  onError
) {
  try {
    let filteredCards = simCards;

    // apply color filters
    let filterColors = Object.entries(filters.colors).map(pair => {
      if (pair[1]) {
        return pair[0]
      }
    }).filter(el => el != null);

    filteredCards = filteredCards.map(card => {
      if (filterColors.some(c => card.colors.includes(c))) {
        return card
      }
    }).filter(el => el != null);

    // apply type filters
    let filterTypes = Object.entries(filters.type).map(pair => {
      if (pair[1]) {
        return pair[0]
      }
    }).filter(el => el != null);

    filteredCards = filteredCards.map(card => {
      if (filterTypes.some(t => card.types.includes(t))) {
        return card
      }
    }).filter(el => el != null);

    // apply mana cost filters
    let filterMana = Object.entries(filters.manaCost).map(pair => {
      if (pair[1]) {
        if (pair[0] === "lt1") {
          return "0"
        } else {
          return pair[0]
        }
      }
    }).filter(el => el != null);

    filteredCards = filteredCards.map(card => {
      if (filterMana.some(m => Number(m) === Number(card.convertedManaCost))) {
        return card
      }
    }).filter(el => el != null);

    // apply format filters
    let filterFormat = Object.entries(filters.format).map(pair => {
      if (pair[1]) {
        return pair[0]
      }
    }).filter(el => el != null);

    filteredCards = filteredCards.map(card => {
      let legalFormats = Object.entries(card).map(pair => {
        if (pair[1] === "Legal") {
          return pair[0]
        }
      }).filter(el => el != null).join(',');

      if (filterFormat.some(f => legalFormats.includes(f))) {
        return card
      }
    }).filter(el => el != null);

    // No more filters
    setFilteredSimCards(filteredCards.slice(0, nCardResults));
    setIsLoading(false);
  }
  catch (e) {
    onError(e);
    setIsLoading(false);
  }
}