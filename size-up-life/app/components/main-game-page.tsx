"use client";

import { useEffect, useState } from "react";
import { type AnimalMetadata, allAnimals, Dimension } from "../lib/all-animals";
import GameContent from "./game-content";
import Navbar from "./navbar";
import SizerSlider from "./sizer-slider";
import { isGuessCorrect } from "./utils/check-guess";
import { dailySeed, shuffledIndices } from "./utils/daily-shuffle";
import GameState from "./utils/game-finish-state";
import GameMode from "./utils/game-mode";
import { getHeight } from "./utils/get-dimensions";
import WinLossDialogue from "./win-loss-dialogue";

export default function MainGamePage() {
  const newGuessValue: number = 0.2;
  const dailyAnimalsLimit: number = 5;
  const guessToleranceM: number = 0.5;
  // TODO to make this larger you're going to have to get smarter as at numbers larger than
  // this the p5 canvas takes up too much memory and crashes the site
  const maxHeightMultiplier: number = 150;
  const maxPossibleAnimalHeight: number = 15;

  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([newGuessValue]);
  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);
  const [animalIndices, setAnimalIndices] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);
  const [largestAnimalHeightIndex, setLargestAnimalHeightIndex] = useState<
    number | undefined
  >(undefined);

  // add an animal on mount to the animalIndices array (do this only once)
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentionally run only once when the component mounts.
  useEffect(() => {
    selectNextAnimal(GameMode.DAILY, [], 0);
  }, []);

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

    const nextAnimalResult: GameState = selectNextAnimal(gameMode, animalIndices, activeGuessIndex);

    if (
      nextAnimalResult === GameState.IN_PROGRESS || nextAnimalResult === GameState.WON
    ) {
      setActiveGuessIndex(newActiveGuessIndex);
      setGuessesAtIndex(newActiveGuessIndex, newGuessValue);
    }
  }

  function selectNextAnimal(
    gameMode: GameMode,
    animalIndices: number[],
    activeGuessIndex: number,
  ): GameState {
    // checking if you can advance to the next state (i.e. checking our guess is correct)
    // if blank animalIndices don't do this check
    if (animalIndices.length !== 0) {
      const currAnimal: AnimalMetadata =
        allAnimals[animalIndices[activeGuessIndex]];

      // the slider is a fraction of the tallest animal the canvas can draw,
      // so turn it into metres before the rule sees it
      const guessHeightM: number =
        guesses[activeGuessIndex] * maxPossibleAnimalHeight;

      // one path for both dimensions. It used to be two branches, and only
      // the width one told the rest of the game you'd lost --- missing a
      // height animal just silently did nothing.
      if (
        !isGuessCorrect({
          measuresWidth: currAnimal.measuredDimension === Dimension.WIDTH,
          imageAspectRatio: currAnimal.imageAspectRatio,
          correctMeasurementM: currAnimal.correctDimensionMeasurement,
          guessHeightM,
          toleranceM: guessToleranceM,
          pxPerM: maxHeightMultiplier,
        })
      ) {
        setGameState(GameState.LOST);

        return GameState.LOST;
      }
    }

    // if we're down here we are definitely adding an animal
    let nextAnimalIndex: number = 0;
    if (gameMode === GameMode.DAILY) {
      // daily mode -- pick random that we haven't picked before

      // today's animals, based on rng seeded on today's utc date
      const dailyOrder: number[] = shuffledIndices(
        allAnimals.length,
        dailySeed(new Date()),
      );

      // you've done the daily amount of animals you need to do, or run out of
      // animals to give you, so you win
      if (
        animalIndices.length >= Math.min(dailyAnimalsLimit, dailyOrder.length)
      ) {
        // you won!
        setGameState(GameState.WON);
        return GameState.WON;
      }

      // the shuffle already guarantees no repeats, so just walk it
      nextAnimalIndex = dailyOrder[animalIndices.length];
    } else {
      // we're in infinite mode so just get next index
      nextAnimalIndex =
        animalIndices.length !== 0
          ? animalIndices[animalIndices.length - 1] + 1
          : 0; // if our animalIndices array is zero then just pick the first animal

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

  function resetCurrentGameMode(): void {
    // clear our animal Indices fully
    setAnimalIndices([]);
    setActiveGuessIndex(0);
    setGuesses([newGuessValue]);
    setLargestAnimalHeightIndex(undefined);

    selectNextAnimal(gameMode, [], 0);
  }

  // TODO go into GameContent and have something that fires when activeGuessIndex changes
  //    that checks if we got the guess right or wrong, and then do confetti or failure message
  //    if confetti keep going otherwise don't

  // TODO scroll to end of scroll bar when new animal is added

  return (
    <>
      <header
        inert={gameState !== GameState.IN_PROGRESS}
        aria-disabled={gameState !== GameState.IN_PROGRESS}
      >
        <Navbar
          activeGuessIndex={activeGuessIndex}
          gameMode={gameMode}
          changeGameMode={changeGameMode}
          resetGameMode={resetCurrentGameMode}
          maxDailyStreak={dailyAnimalsLimit}
        />
        <SizerSlider
          guesses={guesses}
          setGuessesAtIndex={setGuessesAtIndex}
          activeGuessIndex={activeGuessIndex}
          goToNextGuess={goToNextGuess}
        />
      </header>
      <main className="h-full flex flex-col overflow-hidden">
        <WinLossDialogue
          gameMode={gameMode}
          isWin={gameState === GameState.WON}
          isVisible={gameState !== GameState.IN_PROGRESS}
          streak={activeGuessIndex}
          setGameState={setGameState}
          resetGameMode={resetCurrentGameMode}
        />
        <GameContent
          isAriaHidden={gameState !== GameState.IN_PROGRESS}
          guesses={guesses}
          activeGuessIndex={activeGuessIndex}
          animalIndices={animalIndices}
          maxHeight={maxPossibleAnimalHeight * maxHeightMultiplier}
          heightMtoPxModifier={maxHeightMultiplier}
        />
      </main>
    </>
  );
}
