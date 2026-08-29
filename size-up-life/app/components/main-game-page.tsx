"use client";

import { useState } from "react";
import GameContent from "./game-content";
import Navbar from "./navbar";
import SizerSlider from "./sizer-slider";
import GameMode from "./utils/game-mode";

export default function MainGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([]);
  const [activeGuessIndex, setActiveGuessIndex] = useState<number>(0);

  // TODO make wrapper for set guesses that makes updating a single element easier
  function setGuessesAtIndex(index: number, guess: number): void {
    setGuesses((prevGuesses: number[]) => {
      const newGuesses: number[] = [...prevGuesses];
      newGuesses[index] = guess;

      return newGuesses;
    });
  }

  return (
    <>
      <header>
        <Navbar
          activeGuessIndex={activeGuessIndex}
          gameMode={gameMode}
          setGameMode={setGameMode}
        />
        <SizerSlider
          setGuessesAtIndex={setGuessesAtIndex}
          activeGuessIndex={activeGuessIndex}
          setActiveGuessIndex={setActiveGuessIndex}
        />
      </header>
      <GameContent guesses={guesses} activeGuessIndex={activeGuessIndex} />
    </>
  );
}
