"use client";

import { useState } from "react";
import GameContent from "./game-content";
import Navbar from "./navbar";
import GameMode from "./utils/game-mode";

export default function MainGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [guesses, setGuesses] = useState<number[]>([]);

  return (
    <>
      <Navbar
        guesses={guesses}
        gameMode={gameMode}
        setGameMode={setGameMode}
      />
      <GameContent />
    </>
  );
}
