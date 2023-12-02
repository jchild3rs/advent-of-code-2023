/**
 * https://adventofcode.com/2023/day/2
 */
const { readFileSync } = require("fs");
const path = require("path");

const inputTextFile = readFileSync(
  path.join(__dirname, "./input.txt"),
  "utf-8",
);

/** @type {Array<Game>} */
const games = inputTextFile
  .split("\n")
  .filter(Boolean)
  .map(parseInput);

console.info(
  `Sum of max colors: ${getSumOfMaxColors(games)}`,
);
console.info(
  `Sum of possible game ids: ${getSumOfPossibleGameIds(
    games,
  )}`,
);

// =========================================================

/** @typedef GameRound */
/** @property {number} red */
/** @property {number} green */
/** @property {number} blue */

/** @typedef Game */
/** @property {number} id */
/** @property {Array<GameRound>} rounds */

/**
 * Determine which games would have been possible if the bag
 * had been loaded with only 12 red cubes, 13 green cubes,
 * and 14 blue cubes.
 *
 * What is the sum of the IDs of those games?
 *
 * @param {Array<Game>} games
 */
function getSumOfPossibleGameIds(games) {
  const ids = determinePossibleGameIds(games);

  return ids.reduce((acc, id) => acc + id, 0);
}

/**
 * @param {Array<Game>} games
 * @return {number}
 */
function getSumOfMaxColors(games) {
  const maxColors = games.map(getMaxColorsForGame);

  return maxColors.reduce(
    (acc, { red, green, blue }) =>
      acc + red * green * blue,
    0,
  );
}

/**
 * @param {Array<Game>} games
 * @return {Array<number>} possible ids
 */
function determinePossibleGameIds(games) {
  return games
    .filter(isGamePossible)
    .map((game) => game.id);
}

/**
 * @param {Game} game
 * @return {boolean}
 */
function isGamePossible(game) {
  for (const round of game.rounds) {
    if (
      round.red > 12 ||
      round.green > 13 ||
      round.blue > 14
    ) {
      return false;
    }
  }

  return true;
}

/**
 * @param {Game} game
 * @return {{red: number, green: number, blue: number}}
 */
function getMaxColorsForGame(game) {
  const reds = [];
  const greens = [];
  const blues = [];

  for (const round of game.rounds) {
    reds.push(round.red || 0);
    greens.push(round.green || 0);
    blues.push(round.blue || 0);
  }

  return {
    red: Math.max(...reds),
    green: Math.max(...greens),
    blue: Math.max(...blues),
  };
}

/**
 *
 * @param {string} str
 * @return {Game}
 */
function parseInput(str) {
  const id = parseInt(
    str.replace("Game ", "").split(":")[0],
  );

  const rounds = str
    .split(": ")[1]
    .split(";")
    .map((round) => {
      const colors = round
        .split(",")
        .map((colorChunk) => {
          const [number, color] = colorChunk
            .trim()
            .split(" ");
          return {
            [color]: parseInt(number),
          };
        });

      return Object.assign({}, ...colors);
    });

  return {
    id,
    rounds,
  };
}

module.exports = {
  getMaxColorsForGame,
  parseInput,
};
