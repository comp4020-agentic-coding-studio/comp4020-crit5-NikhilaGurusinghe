import { describe, expect, it } from "bun:test";
import { isGuessCorrect } from "../size-up-life/app/components/utils/check-guess";

describe("guess tolerance", () => {
  it("accepts a height guess inside the tolerance band and rejects one outside", () => {
    const guess = (guessHeightM: number): boolean =>
      isGuessCorrect({
        measuresWidth: false,
        imageAspectRatio: "1252 / 236",
        correctMeasurementM: 4.5,
        guessHeightM,
        toleranceM: 0.5,
        pxPerM: 150,
      });

    expect(guess(4.5)).toBe(true); // spot on
    expect(guess(4.0)).toBe(true); // low edge of the band
    expect(guess(5.0)).toBe(true); // high edge of the band
    expect(guess(3.9)).toBe(false); // just under
    expect(guess(5.1)).toBe(false); // just over
  });
});
