import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./animal-graphic";

export default function GameContent() {
  return (
    <main className="flex flex-row flex-1 h-full w-full items-end gap-10 overflow-x-scroll pb-3 pl-18 md:pl-20 px-3.5 mt-10">
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={30}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale asdasdasd asd ad sasdsadasdasdasdasdsada"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={200}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={100}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={500}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={300}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={200}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale"
      />
    </main>
  );
}
