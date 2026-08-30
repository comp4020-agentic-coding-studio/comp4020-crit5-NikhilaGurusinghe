import { useCallback } from "react";
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
  isAriaHidden,
}: GameContentProps) {
  const scrollTargetRef = useCallback((divElement: HTMLDivElement) => {
    if (divElement) {
      setTimeout(() => {
        divElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }, []);

  return (
    <div
      aria-disabled={isAriaHidden}
      inert={isAriaHidden}
      className="flex h-full min-h-0 flex-col overflow-x-auto overflow-y-auto"
    >
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

        {animalIndices.map((animalIndex: number, currIndex: number) => {
          if (currIndex === animalIndices.length - 1) return null;
          return (
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
          );
        })}

        {/* last animal */}
        {animalIndices.length !== 0 && (
          <AnimalGraphic
            scrollTargetRef={
              activeGuessIndex === 0 ? undefined : scrollTargetRef
            }
            key={allAnimals[animalIndices[animalIndices.length - 1]].animalName}
            imagePath={
              allAnimals[animalIndices[animalIndices.length - 1]].imagePath
            }
            imageAltText={
              allAnimals[animalIndices[animalIndices.length - 1]].animalName
            }
            sketchHeightPx={guesses[animalIndices.length - 1] * maxHeight}
            sketchAspectRatio={
              allAnimals[animalIndices[animalIndices.length - 1]]
                .imageAspectRatio
            }
            animalName={
              allAnimals[animalIndices[animalIndices.length - 1]].animalName
            }
            isGuessing={activeGuessIndex === animalIndices.length - 1}
            sketchMToPxHeightModifier={heightMtoPxModifier}
          />
        )}
      </div>
    </div>
  );
}
