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

  return (
    <>
      <header>
        <Navbar
          guesses={guesses}
          gameMode={gameMode}
          setGameMode={setGameMode}
        />
        <SizerSlider />
      </header>
      <GameContent />
    </>
  );
}
