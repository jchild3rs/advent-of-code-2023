/**
 * https://adventofcode.com/2023/day/1
 */

const fs = require('fs');
const path = require('path');

const inputTextFile = fs.readFileSync(path.join(__dirname, "./input.txt"), "utf-8");
const items = inputTextFile.split('\n').filter(Boolean)
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
}
const numberWords = Object.keys(numberWordsMap);

function day1Parse(str) {
  const matches = [];

  for(let i = 0; i < str.length; i++) {
    const char = str[i];

    if (/\d/.test(char)) {
      matches.push({ index: i, item: parseInt(char) });
    }
  }

  for (const numberWord of numberWords) {
    const indexes = indexOfAll(str, numberWord);
    for (const index of indexes) {
      matches.push({ index, item: numberWordsMap[numberWord] });
    }
  }

  matches.sort((a, b) => a.index - b.index);

  const firstMatch = matches[0];
  const lastMatch = matches.at(-1);

  return parseInt(`${firstMatch.item}${lastMatch.item}`);
}

function indexOfAll(array, searchItem) {
  let i = array.indexOf(searchItem);
  const indexes = [];

  while (i !== -1) {
    indexes.push(i);
    i = array.indexOf(searchItem, ++i);
  }

  return indexes;
}

let total = 0;
for (let i = 0; i < items.length; i++) {
  let str = items[i];

  let num = day1Parse(str);
  if (`${num}`.length === 1) {
    num = parseInt(`${num}${num}`);
  }
  total += num;
}

console.log(`The total is ${total}.`);

module.exports = day1Parse;

