type PartNumber = {
  number: string;
  start: number;
  end: number;
  line: number;
};

export class PartNumberParser {
  lines: string[];
  private numberParts: PartNumber[];

  constructor(schematic: string) {
    this.lines = schematic.split("\n").filter(Boolean);
    this.numberParts = this.parsePartNumbers();
  }

  private isNumber(char: string) {
    return !isNaN(parseInt(char, 10));
  }

  private parsePartNumbers(): PartNumber[] {
    const matches = [];

    let lineCount = 0;
    for (const row of this.lines) {
      lineCount++;

      for (
        let column = 0;
        column < row.length;
        column++
      ) {
        const char = row[column];

        if (this.isNumber(char)) {
          const start = column;
          let end = column;
          while (this.isNumber(row[end])) {
            end++;
          }
          const number = row.slice(start, end);

          if (number) {
            column = end;

            matches.push({
              line: lineCount,
              number,
              start: start + 1,
              end: end + 1,
            });
          }
        }
      }
    }

    return matches;
  }

  get validPartNumbers(): string[] {
    return this.numberParts
      .filter((partNumber) =>
        this.isValidPartNumber(partNumber),
      )
      .map((part) => part.number);
  }

  private isValidPartNumber(part: PartNumber) {
    const { number, line, start, end } = part;
    let startCharTouchesSymbol = false;
    let endCharTouchesSymbol = false;
    let inBetweenCharTouchesSymbol = false;

    for (let i = start - 1; i <= end; i++) {
      if (i === start) {
        // if start, check...
        // - left
        // - top left
        // - bottom left
        // - top
        // - bottom

        const leftChar = this.lines[line - 1]?.[i - 2];
        const topLeftChar =
          this.lines[line - 2]?.[i - 2];
        const bottomLeftChar =
          this.lines[line]?.[i - 2];
        const topChar = this.lines[line - 2]?.[i - 1];
        const bottomChar = this.lines[line]?.[i - 1];

        if (!startCharTouchesSymbol) {
          startCharTouchesSymbol = [
            leftChar,
            topLeftChar,
            bottomLeftChar,
            topChar,
            bottomChar,
          ].some(this.isNotSymbol);
        }
      } else if (i === end) {
        // if end, check...
        // - right
        // - top right
        // - bottom right
        // - top
        // - bottom

        const rightChar =
          this.lines[line - 1]?.[i - 1];
        const topRightChar =
          this.lines[line - 2]?.[i - 1];
        const bottomRightChar =
          this.lines[line]?.[i - 1];
        const topChar = this.lines[line - 2]?.[i - 1];
        const bottomChar = this.lines[line]?.[i - 1];

        if (!endCharTouchesSymbol) {
          endCharTouchesSymbol = [
            rightChar,
            topRightChar,
            bottomRightChar,
            topChar,
            bottomChar,
          ].some(this.isNotSymbol);
        }
      } else {
        // if middle, check...
        // - top
        // - bottom

        const topChar = this.lines[line - 2]?.[i - 1];
        const bottomChar = this.lines[line]?.[i - 1];

        // console.log("testing within number", number, {
        //   topChar,
        //   bottomChar,
        // });

        if (!inBetweenCharTouchesSymbol) {
          inBetweenCharTouchesSymbol = [
            topChar,
            bottomChar,
          ].some(this.isNotSymbol);
        }
      }
    }

    return (
      startCharTouchesSymbol ||
      inBetweenCharTouchesSymbol ||
      endCharTouchesSymbol
    );
  }

  private isNotSymbol(char?: string) {
    return char !== undefined && char !== ".";
  }

  get sumOfValidPartNumbers(): number {
    return this.validPartNumbers.reduce(
      (acc, curr) => acc + parseInt(curr),
      0,
    );
  }
}

const inputText = await Bun.file(
  `${import.meta.dir}/input.txt`,
).text();

const partNumberParser = new PartNumberParser(
  inputText,
);

console.info(
  // partNumberParser.validPartNumbers
  `Sum of valid part numbers: ${partNumberParser.sumOfValidPartNumbers}`,
);
