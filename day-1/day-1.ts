/**
 * https://adventofcode.com/2023/day/1
 */
import { Dict } from '@swan-io/boxed';

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

const numberWords = Dict.keys(numberWordsMap);

/**
 * Parse "digits" from string
 */
export function parse(str: string, withWords: boolean = false): number {
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
  const lastMatch = matches.at(-1) || firstMatch;

  return parseInt(
    `${firstMatch.item}${lastMatch.item}`,
  );
}

/**
 * Get all indexes of searchItem in array
 */
function indexOfAll(array: string | string[], searchItem: string): number[] {
  let i = array.indexOf(searchItem);
  const indexes = [];

  while (i !== -1) {
    indexes.push(i);
    i = array.indexOf(searchItem, ++i);
  }

  return indexes;
}

function getTotal(inputs: string[], withWords = false): number {
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

const inputTextFile = await Bun.file(import.meta.dir + '/input.txt').text();

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
