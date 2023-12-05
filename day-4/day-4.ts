// const exampleString =
//   "Card   1: 72 28 41 15 98 13 27 99 93 38 | 62  5 80 81 53 29 23 25 59 72 90 19 54 86 68 73 55 21 56 27 32 15 12 42 44\n";
//
// const exampleParsed = {
//   id: 1,
//   winningNumbers: [
//     72, 28, 41, 15, 98, 13, 27, 99, 93, 38,
//   ],
//   yourNumbers: [
//     62, 5, 80, 81, 53, 29, 23, 25, 59, 72, 90, 19, 54,
//     86, 68, 73, 55, 21, 56, 27, 32, 15, 12, 42, 44,
//   ],
// };

class Card {
  constructor(
    private id: number,
    private winningNumbers: number[],
    private yourNumbers: number[],
  ) {}

  getWinningNumbers(): number[] {
    return this.winningNumbers.filter((number) =>
      this.yourNumbers.includes(number),
    );
  }
}

class ScratchCardGames {
  cards: Card[];

  constructor(rawInput: string) {
    this.cards = rawInput
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        const [id, numbers] = line.split(":");
        const [winningNumbers, yourNumbers] = numbers
          .split("|")
          .map((numbers) => {
            return numbers
              .trim()
              // .replace("  ", "")
              .split(" ")
              .map(Number).filter(val => val !== 0);
          });

        return new Card(
          Number(id.replace("Card ", "")),
          winningNumbers,
          yourNumbers,
        );
      });
  }

  get totalWinningCardsPoints(): number {
    return this.cards.reduce((total, card) => {
      const winningNumbers = card.getWinningNumbers();
      // The first match makes the card worth one point and
      // each match after the first doubles the point value of that card.
	    if (winningNumbers.length === 0) {
		    return total;
	    }

			if (winningNumbers.length === 1) {
				return total + 1;
			}

			const points = Math.pow(2, winningNumbers.length - 1);

			return total + points;
    }, 0);
  }
}

// ===============

const inputTextFile = await Bun.file(
  import.meta.dir + "/input.txt",
).text();

const game = new ScratchCardGames(inputTextFile);

game.cards.forEach((card) => {
	// console.log(card.yourNumbers.length);
});
console.log(game.totalWinningCardsPoints);
