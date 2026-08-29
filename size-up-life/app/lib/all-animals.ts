import { basePath } from "@/lib/base-path";

export type AnimalMetadata = {
  imagePath: string; // e.g. `${basePath}/images/blue-whale.png`
  imageAspectRatio: string; // e.g. "1252 / 236"
  animalName: string;
};

export const allAnimals: AnimalMetadata[] = [
  {
    imagePath: `${basePath}/images/blue-whale.png`,
    imageAspectRatio: "1252 / 236",
    animalName: "Blue Whale"
  },
  {
    imagePath: `${basePath}/images/blue-whale.png`,
    imageAspectRatio: "1252 / 236",
    animalName: "Blue Whale1"
  },
  {
    imagePath: `${basePath}/images/blue-whale.png`,
    imageAspectRatio: "1252 / 236",
    animalName: "Blue Whale2"
  },
  {
    imagePath: `${basePath}/images/blue-whale.png`,
    imageAspectRatio: "1252 / 236",
    animalName: "Blue Whale3"
  },
]
