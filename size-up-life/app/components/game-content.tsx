import { basePath } from "@/lib/base-path";
import { allAnimals } from "../lib/all-animals";
import AnimalGraphic from "./animal-graphic";

type GameContentProps = {
  guesses: number[];
  activeGuessIndex: number;
  animalIndices: number[];
  maxHeight: number;
  heightMtoPxModifier: number;
  isAriaHidden: boolean;
};

export default function GameContent({
  guesses,
  activeGuessIndex,
  animalIndices,
  maxHeight,
  heightMtoPxModifier,
  isAriaHidden
}: GameContentProps) {
  return (
    <div aria-disabled={isAriaHidden} inert={isAriaHidden} className="flex h-full min-h-0 flex-col overflow-x-auto overflow-y-auto">
      <div className="flex flex-1 flex-row h-fit items-end gap-10 px-3.5 pb-3 pl-23 md:pl-25">
        <AnimalGraphic
          imagePath={`${basePath}/images/person.png`}
          imageAltText="A person"
          sketchHeightPx={1.85 * heightMtoPxModifier}
          sketchAspectRatio="188 / 816"
          animalName="Person"
          isGuessing={false}
          sketchMToPxHeightModifier={heightMtoPxModifier}
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
            sketchMToPxHeightModifier={heightMtoPxModifier}
          />
        ))}
      </div>
    </div>
  );
}
