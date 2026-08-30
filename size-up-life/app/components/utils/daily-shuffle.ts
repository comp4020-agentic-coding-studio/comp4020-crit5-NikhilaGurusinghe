import seedrandom from "seedrandom";

// The seed for a given UTC day
export function dailySeed(date: Date): string {
  const year: number = date.getUTCFullYear();
  const month: number = date.getUTCMonth() + 1; // getUTCMonth is 0-based
  const day: number = date.getUTCDate();

  return `${year}-${month}-${day}`;
}

// A whole permutation of [0, length)
export function shuffledIndices(length: number, seed: string): number[] {
  const rng: seedrandom.PRNG = seedrandom(seed);
  const order: number[] = Array.from({ length }, (_, index: number) => index);

  for (let i: number = order.length - 1; i > 0; i--) {
    const j: number = Math.floor(rng() * (i + 1));
    const swap: number = order[i];
    order[i] = order[j];
    order[j] = swap;
  }

  return order;
}
