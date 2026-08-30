import { basePath } from "@/lib/base-path";
import { allAnimals } from "../lib/all-animals";
import AnimalGraphic from "./animal-graphic";

type GameContentProps = {
  guesses: number[];
  activeGuessIndex: number;
  animalIndices: number[];
  maxHeight: number;
};

export default function GameContent({
  guesses,
  activeGuessIndex,
  animalIndices,
  maxHeight,
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

      {animalIndices.map((animalIndex: number, currIndex: number) => (
        <AnimalGraphic
          key={allAnimals[animalIndex].animalName}
          imagePath={allAnimals[animalIndex].imagePath}
          imageAltText={allAnimals[animalIndex].animalName}
          sketchHeightPx={guesses[currIndex] * maxHeight}
          sketchAspectRatio={allAnimals[animalIndex].imageAspectRatio}
          animalName={allAnimals[animalIndex].animalName}
          isGuessing={activeGuessIndex === currIndex}
        />
      ))}
    </main>
  );
}
