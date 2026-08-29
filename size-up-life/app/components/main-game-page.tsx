"use client";

import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { allAnimals } from "../lib/all-animals";
import GameContent from "./game-content";
import Navbar from "./navbar";
import SizerSlider from "./sizer-slider";
import GameMode from "./utils/game-mode";

export default function MainGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([0.5]);
  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);
  const [animalIndices, setAnimalIndices] = useState<number[]>([]);
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const dailyAnimalsLimit: number = 5;

  // add an animal on mount to the animalIndices array
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
    if (gameMode === GameMode.DAILY) {
      // daily mode -- pick random that we haven't picked before
      if (animalIndices.length >= dailyAnimalsLimit) {
        // you won!
        setIsGameFinished(true);
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

      addAnimalIndex(availableAnimalIndices[randomAnimalIndex]);
    } else {
      // we're in infinite mode so just get next index
      const nextAnimalIndex =
        animalIndices.length !== 0
          ? animalIndices[animalIndices.length - 1] + 1
          : 0; // if our animalIndices array is zero then just pick the first animal

      console.log("infinite calc", animalIndices.length - 1);

      console.log("infinite", nextAnimalIndex);

      if (nextAnimalIndex > allAnimals.length - 1) {
        // // just wrap around if we're over
        // nextAnimalIndex = 0;

        // you won!
        setIsGameFinished(true);
        return;
      }

      addAnimalIndex(nextAnimalIndex);
    }
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
        guesses={guesses}
        activeGuessIndex={activeGuessIndex}
        animalIndices={animalIndices}
      />
    </>
  );
}
