import { describe, expect, it } from "bun:test";

import { parse } from "./day-1";

describe("day-1", () => {
  it("handles the weird ones", () => {
    expect(parse("4fourtwo86tkdkxtwo")).toBe(46);
    expect(parse("sixtwo9tqpqg1fourtwo")).toBe(91);
    expect(
      parse("jh2mmsdtzktkgoneeightonefive2nine"),
    ).toBe(22);
  });
  it("handles the weird ones with words", () => {
    expect(parse("4fourtwo86tkdkxtwo", true)).toBe(42);
    expect(parse("sixtwo9tqpqg1fourtwo", true)).toBe(
      62,
    );
    expect(
      parse("jh2mmsdtzktkgoneeightonefive2nine", true),
    ).toBe(29);
  });
});
