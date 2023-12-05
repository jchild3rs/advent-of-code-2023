/**
 * https://adventofcode.com/2023/day/2
 */

export type GameRound = {
  red?: number;
  green?: number;
  blue?: number;
};

export type Game = {
  id: number;
  rounds: Array<GameRound>;
};

const inputTextFile = await Bun.file(
  `${import.meta.dir}/input.txt`,
).text();

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

/**
 * Determine which games would have been possible if the bag
 * had been loaded with only 12 red cubes, 13 green cubes,
 * and 14 blue cubes.
 *
 * What is the sum of the IDs of those games?
 *
 */
function getSumOfPossibleGameIds(games: Game[]) {
  const ids = determinePossibleGameIds(games);

  return ids.reduce((acc, id) => acc + id, 0);
}

function getSumOfMaxColors(games: Game[]) {
  const maxColors = games.map(getMaxColorsForGame);

  return maxColors.reduce(
    (acc, { red, green, blue }) =>
      acc + red * green * blue,
    0,
  );
}

function determinePossibleGameIds(games: Game[]) {
  return games
    .filter(isGamePossible)
    .map((game) => game.id);
}

function isGamePossible(game: Game) {
  for (const round of game.rounds) {
    if (
      (round.red && round.red > 12) ||
      (round.green && round.green > 13) ||
      (round.blue && round.blue > 14)
    ) {
      return false;
    }
  }

  return true;
}

export function getMaxColorsForGame(game: Game) {
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

export function parseInput(str: string) {
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
