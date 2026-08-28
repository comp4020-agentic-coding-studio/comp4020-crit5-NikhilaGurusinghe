import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./animal-graphic";

export default function GameContent() {
  return (
    <main className="flex flex-row flex-1 h-full w-full items-end gap-2 overflow-x-scroll">
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={200}
        sketchAspectRatio="1252 / 236"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={100}
        sketchAspectRatio="1252 / 236"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={500}
        sketchAspectRatio="1252 / 236"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={300}
        sketchAspectRatio="1252 / 236"
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={200}
        sketchAspectRatio="1252 / 236"
      />
    </main>
  );
}
