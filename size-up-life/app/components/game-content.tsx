import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./animal-graphic";

type GameContentProps = { guesses: number[]; activeGuessIndex: number };

export default function GameContent({
  guesses,
  activeGuessIndex,
}: GameContentProps) {
  return (
    <main className="flex flex-row flex-1 h-full w-full items-end gap-10 overflow-x-scroll pb-3 pl-23 md:pl-25 px-3.5 mt-10">
      <AnimalGraphic
        imagePath={`${basePath}/images/person.png`}
        imageAltText="A person"
        sketchHeightPx={400}
        sketchAspectRatio="188 / 816"
        animalName="Person"
        isGuessing={false}
      />
      <AnimalGraphic
        imagePath={`${basePath}/images/blue-whale.png`}
        imageAltText="image of a blue whale"
        sketchHeightPx={300}
        sketchAspectRatio="1252 / 236"
        animalName="Blue Whale asdasdasd asd ad sasdsadasdasdasdasdsada"
        isGuessing={true}
      />
    </main>
  );
}
