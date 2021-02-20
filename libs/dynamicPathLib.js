import fs from "fs";

let cardNamesPath;
try {
  cardNamesPath = "../CARDNAMES.txt";
} catch {
  cardNamesPath = "./CARDNAMES.txt";
}

export function getAllCardIds() {
  var cardNames = fs.readFileSync(cardNamesPath, 'utf8').toString().split("\n")
  
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