import { basePath } from "@/lib/base-path";

export enum Dimension {
  HEIGHT,
  WIDTH,
}

export type AnimalMetadata = {
  imagePath: string; // e.g. `${basePath}/images/blue-whale.png`
  imageAspectRatio: string; // e.g. "1252 / 236"
  animalName: string;
  measuredDimension: Dimension;
  correctDimensionMeasurement: number; //(in metres)
};

export const allAnimals: AnimalMetadata[] = [
  {
    imagePath: `${basePath}/images/blue-whale.png`,
    imageAspectRatio: "1252 / 236",
    animalName: "Blue Whale",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 33,
  },
];
