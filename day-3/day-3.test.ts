import { describe, expect, it, test } from "bun:test";
import { PartNumberParser } from "./day-3.ts";

const input = `
.......5......
..7*..*.......
...*13*.......
.......15.....
`;

const partNumberParser = new PartNumberParser(input);

describe("day-3", () => {
  it("can parse valid part numbers", () => {
    expect(
      partNumberParser.validPartNumbers,
    ).toStrictEqual([
      "5",
      "7",
      "13",
      "15",
      // "467",
      // "35",
      // "633",
      // "617",
      // "592",
      // "755",
      // "664",
      // "598",
    ]);
  });

  // it("it can get sum of valid part numbers", () => {
  //   const partNumberParser = new PartNumberParser(
  //     input,
  //   );
  //
  //   expect(
  //     partNumberParser.sumOfValidPartNumbers,
  //   ).toBe(4361);
  // });
});
