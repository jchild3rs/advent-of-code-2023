const {
  parseInput,
  getMaxColorsForGame,
} = require("./day-2");

const gameFixture = {
  id: 1,
  rounds: [
    { green: 4, blue: 2 },
    { red: 1, blue: 1, green: 4 },
    { green: 3, blue: 4, red: 15 },
    { green: 7, blue: 2, red: 4 },
    { red: 3, green: 7 },
    { red: 3, green: 3 },
  ],
};

describe("day-2", () => {
  it("gets max colors for game", () => {
    expect(getMaxColorsForGame(gameFixture)).toEqual({
      blue: 4,
      green: 7,
      red: 15,
    });
  });

  it("handles the weird ones", () => {
    const result = parseInput(
      "Game 1: 4 green, 2 blue; 1 red, 1 blue, 4 green; 3 green, 4 blue, 15 red; 7 green, 2 blue, 4 red; 3 red, 7 green; 3 red, 3 green",
    );
    expect(result).toEqual(gameFixture);
  });
});
