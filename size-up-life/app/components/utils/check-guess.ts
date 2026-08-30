import { getWidth } from "./get-dimensions";

type GuessCheck = {
  // whether this animal is judged on its width rather than its height
  measuresWidth: boolean;
  imageAspectRatio: string; // "<numerator> / <denominator>"
  correctMeasurementM: number;
  guessHeightM: number;
  toleranceM: number;
  pxPerM: number;
};

export function isGuessCorrect({
  measuresWidth,
  imageAspectRatio,
  correctMeasurementM,
  guessHeightM,
  toleranceM,
  pxPerM,
}: GuessCheck): boolean {
  const correctPx: number = correctMeasurementM * pxPerM;
  const tolerancePx: number = toleranceM * pxPerM;
  const guessHeightPx: number = guessHeightM * pxPerM;

  // compare like with like: a width-measured animal is judged on the width
  // its aspect ratio gives that guessed height
  const guessPx: number = measuresWidth
    ? getWidth(imageAspectRatio, guessHeightPx)
    : guessHeightPx;

  return (
    correctPx >= guessPx - tolerancePx && correctPx <= guessPx + tolerancePx
  );
}
