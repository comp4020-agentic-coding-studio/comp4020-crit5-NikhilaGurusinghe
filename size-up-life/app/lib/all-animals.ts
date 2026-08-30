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
    correctDimensionMeasurement: 27,
  },
  {
    imagePath: `${basePath}/images/t-rex.png`,
    imageAspectRatio: "2546 / 939",
    animalName: "Tyrannosaurus rex",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 12,
  },
  {
    imagePath: `${basePath}/images/grizzly-bear.png`,
    imageAspectRatio: "1083 / 767",
    animalName: "Grizzly Bear",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 2.2,
  },
  {
    imagePath: `${basePath}/images/giraffe.png`,
    imageAspectRatio: "867 / 923",
    animalName: "Giraffe",
    measuredDimension: Dimension.HEIGHT,
    correctDimensionMeasurement: 5,
  },
  {
    imagePath: `${basePath}/images/velociraptor.png`,
    imageAspectRatio: "906 / 579",
    animalName: "Velociraptor",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 1.75,
  },
  {
    imagePath: `${basePath}/images/elephant.png`,
    imageAspectRatio: "869 / 488",
    animalName: "African Elephant",
    measuredDimension: Dimension.HEIGHT,
    correctDimensionMeasurement: 3,
  },
  {
    imagePath: `${basePath}/images/lion.png`,
    imageAspectRatio: "790 / 506",
    animalName: "Lion",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 1.9,
  },
  {
    imagePath: `${basePath}/images/dreadnoughtus.png`,
    imageAspectRatio: "748 / 409",
    animalName: "Dreadnoughtus",
    measuredDimension: Dimension.WIDTH,
    correctDimensionMeasurement: 26,
  },
];
