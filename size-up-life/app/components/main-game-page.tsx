"use client";

import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { useResizeObserver } from "use-resize-observer";
import { type AnimalMetadata, allAnimals, Dimension } from "../lib/all-animals";
import GameContent from "./game-content";
import Navbar from "./navbar";
import SizerSlider from "./sizer-slider";
import GameFinishState from "./utils/game-finish-state";
import GameMode from "./utils/game-mode";
import { convertMToPx, getHeight, getWidth } from "./utils/get-dimensions";

export default function MainGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([0.5]);
  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);
  const [animalIndices, setAnimalIndices] = useState<number[]>([]);
  const [gameFinishState, setGameFinishState] = useState<GameFinishState>(
    GameFinishState.IN_PROGRESS,
  );
  // TODO set this based on largest animal we have currently seen
  const maxHeightMultiplier: number = 100;
  const [largestAnimalHeightIndex, setLargestAnimalHeightIndex] = useState<
    number | undefined
  >(undefined);
  const {
    ref,
    width = 500, // okay default values TODO do we need this width or can we use 
    height = 500,
  } = useResizeObserver<HTMLDivElement>();
  const guessTolerance: number = 10;

  const dailyAnimalsLimit: number = 5;

  // add an animal on mount to the animalIndices array (do this only once)
  useEffect(() => {
    console.log("use effect");
    selectNextAnimal(GameMode.DAILY, []);
  }, []);

  console.log("animalIndices", animalIndices);
  // selectNextAnimal();

  // wrapper for set guesses that makes updating a single element easier
  function setGuessesAtIndex(index: number, guess: number): void {
    setGuesses((prevGuesses: number[]) => {
      const newGuesses: number[] = [...prevGuesses];
      newGuesses[index] = guess;

      return newGuesses;
    });
  }

  function addAnimalIndex(newAnimalIndex: number): void {
    setAnimalIndices((prevAnimalIndices: number[]) => [
      ...prevAnimalIndices,
      newAnimalIndex,
    ]);
  }

  function goToNextGuess(): void {
    const newActiveGuessIndex: number = activeGuessIndex + 1;
    setActiveGuessIndex(newActiveGuessIndex);
    setGuessesAtIndex(newActiveGuessIndex, 0.5);
    // load up next animal index
    // TODO not using fresh values for gameMode, animalIndices passed in as arguments
    // into this method might be bad
    selectNextAnimal(gameMode, animalIndices);
  }

  function selectNextAnimal(gameMode: GameMode, animalIndices: number[]): void {
    // checking if you can advance to the next state (i.e. checking our guess is correct)
    // if blank animalIndices don't do this check
    // if (animalIndices.length !== 0) {
    //   const currAnimal: AnimalMetadata =
    //     allAnimals[animalIndices[activeGuessIndex]];
    //   const currAnimalHeightPx: number = guesses[activeGuessIndex] * maxHeight;
    //   // we need to calculate based on which dimension we're checking
    //   if (currAnimal.measuredDimension === Dimension.HEIGHT) {
    //     if (
    //       !(
    //         currAnimal.correctDimensionMeasurement >=
    //           currAnimalHeightPx - guessTolerance &&
    //         currAnimal.correctDimensionMeasurement <=
    //           currAnimalHeightPx + guessTolerance
    //       )
    //     ) {
    //       // if we aren't in the correct guess interval (with tolerance)
    //       // return immediately and we've lost
    //       setGameFinishState(GameFinishState.LOST);
    //       return;
    //     }
    //   } else {
    //     // currAnimal.measuredDimension === Dimension.WIDTH
    //     // TODO need to convert into M from px
    //     const currAnimalWidth: number = getWidth(
    //       currAnimal.imageAspectRatio,
    //       currAnimalHeightPx,
    //     );
    //     if (
    //       !(
    //         currAnimal.correctDimensionMeasurement >=
    //           currAnimalWidth - guessTolerance &&
    //         currAnimal.correctDimensionMeasurement <=
    //           currAnimalWidth + guessTolerance
    //       )
    //     ) {
    //       // if we aren't in the correct guess interval (with tolerance)
    //       // return immediately and we've lost
    //       setGameFinishState(GameFinishState.LOST);
    //       return;
    //     }
    //   }
    // }

    // if we're down here we are definitely adding an animal
    let nextAnimalIndex: number = 0;
    if (gameMode === GameMode.DAILY) {
      // daily mode -- pick random that we haven't picked before

      // you've done the daily amount of animals you need to do
      // so you win
      if (animalIndices.length >= dailyAnimalsLimit) {
        // you won!
        setGameFinishState(GameFinishState.WON);
        return;
      }

      // get random seed based on day/month/year
      const dateNow: Date = new Date();
      const rng: seedrandom.PRNG = seedrandom(
        dateNow.getUTCFullYear.toString() +
          dateNow.getUTCMonth.toString() +
          dateNow.getUTCDate.toString(),
      );

      const animalIndicesSet = new Set(animalIndices);
      const availableAnimalIndices = allAnimals
        .map((_, index: number) => index)
        .filter((index: number) => !animalIndicesSet.has(index));

      if (availableAnimalIndices.length === 0) {
        console.error("selectNextAnimal failed to find a new animal");
      }

      const randomAnimalIndex = Math.floor(
        rng() * availableAnimalIndices.length,
      );

      nextAnimalIndex = availableAnimalIndices[randomAnimalIndex];
    } else {
      // we're in infinite mode so just get next index
      nextAnimalIndex =
        animalIndices.length !== 0
          ? animalIndices[animalIndices.length - 1] + 1
          : 0; // if our animalIndices array is zero then just pick the first animal

      console.log("infinite calc", animalIndices.length - 1);

      console.log("infinite", nextAnimalIndex);

      // you've gone through all the animals available
      if (nextAnimalIndex > allAnimals.length - 1) {
        // // just wrap around if we're over
        // nextAnimalIndex = 0;

        // you won!
        setGameFinishState(GameFinishState.WON);
        return;
      }
    }

    // updating our currently visible animals
    addAnimalIndex(nextAnimalIndex);

    // check if this animal is the largest we've seen yet
    const nextAnimalHeight: number = getAnimalHeight(nextAnimalIndex);

    if (largestAnimalHeightIndex === undefined) {
      console.log(nextAnimalHeight, "index", nextAnimalIndex)
      // always larger
      setLargestAnimalHeightIndex(nextAnimalIndex);
    } else {
      // need to check
      const largestAnimalHeight: number = getAnimalHeight(
        largestAnimalHeightIndex,
      );
      if (nextAnimalHeight > largestAnimalHeight) {
        setLargestAnimalHeightIndex(nextAnimalIndex);
      }
    }
  }

  function getAnimalHeight(animalIndex: number): number {
    const animal: AnimalMetadata = allAnimals[animalIndex];

    if (animal === undefined) {
      console.error(
        "getAnimalHeight got an out of bounds index into allAnimals",
      );
      return -1;
    }

    return animal.measuredDimension === Dimension.HEIGHT
      ? animal.correctDimensionMeasurement
      : getHeight(animal.imageAspectRatio, animal.correctDimensionMeasurement);
  }

  function changeGameMode(): void {
    const nextGameMode: GameMode =
      gameMode === GameMode.DAILY ? GameMode.INFINITE : GameMode.DAILY;
    const nextAnimalIndices: number[] = [];

    // clear our animal Indices fully
    setAnimalIndices([]);
    setGameMode(nextGameMode);

    selectNextAnimal(nextGameMode, nextAnimalIndices);
  }

  // TODO go into GameContent and have something that fires when activeGuessIndex changes
  //    that checks if we got the guess right or wrong, and then do confetti or failure message
  //    if confetti keep going otherwise don't

  // TODO scroll to end of scroll bar when new animal is added

  return (
    <>
      <header>
        <Navbar
          activeGuessIndex={activeGuessIndex}
          gameMode={gameMode}
          changeGameMode={changeGameMode}
        />
        <SizerSlider
          setGuessesAtIndex={setGuessesAtIndex}
          activeGuessIndex={activeGuessIndex}
          goToNextGuess={goToNextGuess}
        />
      </header>
      <GameContent
        ref={ref}
        guesses={guesses}
        activeGuessIndex={activeGuessIndex}
        animalIndices={animalIndices}
        maxHeight={(largestAnimalHeightIndex === undefined ? 30 : getAnimalHeight(largestAnimalHeightIndex)) * maxHeightMultiplier}
        heightMtoPxModifier={maxHeightMultiplier}
      />
    </>
  );
}
