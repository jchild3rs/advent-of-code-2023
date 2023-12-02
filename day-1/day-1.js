/**
 * https://adventofcode.com/2023/day/1
 */

const fs = require("fs");
const path = require("path");

// =========================================================

const numberWordsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberWords = Object.keys(numberWordsMap);

/**
 * Parse "digits" from string
 *
 * @param {string} str
 * @param {boolean} [withWords=false]
 * @return {number}
 */
function parse(str, withWords = false) {
  const matches = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (/\d/.test(char)) {
      matches.push({ index: i, item: parseInt(char) });
    }
  }

  if (withWords) {
    for (const numberWord of numberWords) {
      const indexes = indexOfAll(str, numberWord);
      for (const index of indexes) {
        matches.push({
          index,
          item: numberWordsMap[numberWord],
        });
      }
    }
  }

  matches.sort((a, b) => a.index - b.index);

  const firstMatch = matches[0];
  const lastMatch = matches.at(-1);

  return parseInt(
    `${firstMatch.item}${lastMatch.item}`,
  );
}

/**
 * Get all indexes of searchItem in array
 *
 * @param {string | Array<string>} array
 * @param {string} searchItem
 * @return {Array<number>}
 */
function indexOfAll(array, searchItem) {
  let i = array.indexOf(searchItem);
  const indexes = [];

  while (i !== -1) {
    indexes.push(i);
    i = array.indexOf(searchItem, ++i);
  }

  return indexes;
}

/**
 *
 * @param {Array<string>} inputs
 * @param {boolean} withWords
 * @return {number}
 */
function getTotal(inputs, withWords = false) {
  let total = 0;

  for (let input of inputs) {
    let num = parse(input, withWords);

    if (`${num}`.length === 1) {
      num = parseInt(`${num}${num}`);
    }

    total += num;
  }

  return total;
}

// =========================================================

const inputTextFile = fs.readFileSync(
  path.join(__dirname, "./input.txt"),
  "utf-8",
);

const strings = inputTextFile
  .split("\n")
  .filter(Boolean);

console.info(
  `Sum of max colors: ${getTotal(strings)}`,
);

console.info(
  `Sum of max colors w/ words: ${getTotal(
    strings,
    true,
  )}`,
);

module.exports = {
  parse,
  getTotal,
};
