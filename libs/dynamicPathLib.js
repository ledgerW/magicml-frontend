import fs from "fs";

const cardNamesPath = "pages/similarity/CARDNAMES.txt";

export function getAllCardIds() {
  var cardNames = fs.readFileSync(cardNamesPath, 'utf8').toString().split("\n")
  console.log(cardNames);

  /*
  const cardNames = [
    'Happily Ever After',
    'Opt',
    'Negate'
  ]
  */

  return cardNames.map(cardName => {
    return {
      params: {
        id: cardName.replace('//','__')
      }
    }
  })
}

export function removeFSPackage() {
  fs.existsSync(cardNamesPath);
}