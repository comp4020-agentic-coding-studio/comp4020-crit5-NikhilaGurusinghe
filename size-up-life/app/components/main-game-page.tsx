"use client";

import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { type AnimalMetadata, allAnimals, Dimension } from "../lib/all-animals";
import GameContent from "./game-content";
import Navbar from "./navbar";
import SizerSlider from "./sizer-slider";
import GameState from "./utils/game-finish-state";
import GameMode from "./utils/game-mode";
import { getHeight, getWidth } from "./utils/get-dimensions";
import dynamic from "next/dynamic";
import WinLossDialogue from "./win-loss-dialogue";

export default function MainGamePage() {
  const newGuessValue: number = 0.2;
  const dailyAnimalsLimit: number = 5;
  const guessToleranceM: number = 0.5;
  // TODO to make this larger you're going to have to get smarter as at numbers larger than
  // this the p5 canvas takes up too much memory and crashes the site
  const maxHeightMultiplier: number = 100;
  const maxPossibleAnimalHeight: number = 15;

  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([newGuessValue]);
  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);
  const [animalIndices, setAnimalIndices] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>(
    GameState.IN_PROGRESS,
  );
  const [largestAnimalHeightIndex, setLargestAnimalHeightIndex] = useState<
    number | undefined
  >(undefined);

  // add an animal on mount to the animalIndices array (do this only once)
  useEffect(() => {
    console.log("use effect");
    selectNextAnimal(gameMode, animalIndices, activeGuessIndex);
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

    // load up next animal index
    // TODO not using fresh values for gameMode, animalIndices passed in as arguments
    // into this method might be bad
    if (selectNextAnimal(gameMode, animalIndices, activeGuessIndex) === GameState.IN_PROGRESS) {
      console.log("yes");
      setActiveGuessIndex(newActiveGuessIndex);
      setGuessesAtIndex(newActiveGuessIndex, newGuessValue);
    }  
  }

  function selectNextAnimal(gameMode: GameMode, animalIndices: number[], activeGuessIndex: number): GameState {
    // checking if you can advance to the next state (i.e. checking our guess is correct)
    // if blank animalIndices don't do this check
    if (animalIndices.length !== 0) {
      const mToPxModifier: number =
        maxPossibleAnimalHeight * maxHeightMultiplier;
      const currAnimal: AnimalMetadata =
        allAnimals[animalIndices[activeGuessIndex]];
      console.log(activeGuessIndex);
      const currAnimalCorrectMeasurementPx: number =
        currAnimal.correctDimensionMeasurement * maxHeightMultiplier;
      const guessHeightPx: number = guesses[activeGuessIndex] * mToPxModifier;
      const guessTolerancePx: number = guessToleranceM * maxHeightMultiplier;
      // we need to calculate based on which dimension we're checking
      if (currAnimal.measuredDimension === Dimension.WIDTH) {
        // need to get the guessHeightPx here as we are comparing currAnimal.height with guessHeightPx
        const guessWidthPx: number = getWidth(
          currAnimal.imageAspectRatio,
          guessHeightPx,
        );
        if (
          !(
            currAnimalCorrectMeasurementPx >= guessWidthPx - guessTolerancePx &&
            currAnimalCorrectMeasurementPx <= guessWidthPx + guessTolerancePx
          )
        ) {
          // if we aren't in the correct guess interval (with tolerance)
          // return immediately and we've lost
          setGameState(GameState.LOST);
          console.log(
            "ROUND LOST measurement width",
            currAnimalCorrectMeasurementPx,
            "animalpx",
            guessWidthPx,
            "guessWidth",
            guesses[activeGuessIndex],
            activeGuessIndex,
          );
          return GameState.LOST;
        }
        console.log("ROUND WON");
      } else {
        // currAnimal.measuredDimension === Dimension.HEIGHT
        // TODO need to convert into M from px
        if (
          !(
            currAnimalCorrectMeasurementPx >=
              guessHeightPx - guessTolerancePx &&
            currAnimalCorrectMeasurementPx <= guessHeightPx + guessTolerancePx
          )
        ) {
          // if we aren't in the correct guess interval (with tolerance)
          // return immediately and we've lost
          setGameState(GameState.LOST);
          console.log(
            "ROUND LOST measurement height",
            currAnimalCorrectMeasurementPx,
            "animalpx",
            guessHeightPx,
            "guessHeight",
            guesses[activeGuessIndex],
            activeGuessIndex,
          );
          return GameState.LOST;
        }
        console.log("ROUND WON");
      }
    }

    // if we're down here we are definitely adding an animal
    let nextAnimalIndex: number = 0;
    if (gameMode === GameMode.DAILY) {
      // daily mode -- pick random that we haven't picked before

      // you've done the daily amount of animals you need to do
      // so you win
      if (animalIndices.length >= dailyAnimalsLimit) {
        // you won!
        setGameState(GameState.WON);
        return GameState.WON;
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
        setGameState(GameState.WON);
        return GameState.WON;
      }
    }

    // updating our currently visible animals
    addAnimalIndex(nextAnimalIndex);

    // check if this animal is the largest we've seen yet
    const nextAnimalHeight: number = getAnimalHeight(nextAnimalIndex);

    if (largestAnimalHeightIndex === undefined) {
      console.log(nextAnimalHeight, "index", nextAnimalIndex);
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

    return GameState.IN_PROGRESS;
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
    setActiveGuessIndex(0);

    selectNextAnimal(nextGameMode, nextAnimalIndices, 0);
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
          guesses={guesses}
          setGuessesAtIndex={setGuessesAtIndex}
          activeGuessIndex={activeGuessIndex}
          goToNextGuess={goToNextGuess}
        />
      </header>
      <div className="h-full flex flex-col overflow-hidden">
       <WinLossDialogue gameMode={gameMode} isWin={true} streak={activeGuessIndex}/>
        <GameContent
          guesses={guesses}
          activeGuessIndex={activeGuessIndex}
          animalIndices={animalIndices}
          maxHeight={maxPossibleAnimalHeight * maxHeightMultiplier}
          heightMtoPxModifier={maxHeightMultiplier}
        />
      </div>
    </>
  );
}
