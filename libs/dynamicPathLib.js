import fs from "fs";

const cardNamesPath = "./CARDNAMES.txt";

export function getAllCardIds() {
  var cardNames = fs.readFileSync(cardNamesPath, 'utf8').toString().split("\n")

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