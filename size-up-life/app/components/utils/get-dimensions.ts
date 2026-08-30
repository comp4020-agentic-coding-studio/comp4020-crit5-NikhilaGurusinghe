// aspectRatio must be in form "<numerator> / <denominator>"
function stringAspectRatioToNumbers(aspectRatio: string): number[] {
  return aspectRatio.split(" / ").map(Number);
}

export function getWidth(aspectRatio: string, height: number): number {
  const [numerator, denominator] = stringAspectRatioToNumbers(aspectRatio);

  return Math.round(height * (numerator / denominator));
}

export function getHeight(aspectRatio: string, width: number): number {
  const [numerator, denominator] = stringAspectRatioToNumbers(aspectRatio);

  return Math.round(width * (denominator / numerator));
}

export function convertPxToM(maxM: number, maxPx: number, px: number) {
  return px * (maxM / maxPx);
}

export function convertMToPx(maxM: number, maxPx: number, m: number) {
  return Math.round(m * (maxPx / maxM));
}
