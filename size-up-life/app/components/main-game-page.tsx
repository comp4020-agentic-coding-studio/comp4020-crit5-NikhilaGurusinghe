"use client";

import { useState } from "react";
import GameContent from "./game-content";
import Navbar from "./navbar";
import GameMode from "./utils/game-mode";

export default function MainGamePage() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.DAILY);
  const [streak, setStreak] = useState<number>(0);

  return (
    <>
      <Navbar
        streak={streak}
        gameMode={gameMode}
        setStreak={setStreak}
        setGameMode={setGameMode}
      />
      <GameContent />
    </>
  );
}
