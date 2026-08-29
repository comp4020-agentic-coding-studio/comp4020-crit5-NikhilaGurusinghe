export default function getWidth(aspectRatio: string, height: number): number {
  const [numerator, denominator] = aspectRatio.split(" / ").map(Number);

  return Math.round(height * (numerator / denominator));
}
