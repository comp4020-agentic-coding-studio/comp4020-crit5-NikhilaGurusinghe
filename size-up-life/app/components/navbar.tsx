import type { Dispatch, SetStateAction } from "react";
import type GameMode from "./utils/game-mode";

type NavbarProps = {
  streak: number;
  gameMode: GameMode;
  setStreak: Dispatch<SetStateAction<number>>;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

export default function Navbar({ streak, gameMode }: NavbarProps) {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between px-8 pt-9 md:px-9 md:pt-10">
        <h1 className="sr-only">{gameMode} Mode</h1>
        <p className="text-5xl font-bold">
          {streak}
          <span className="text-xl ml-[5.5px] md:ml-1.5">in a row</span>
        </p>

        <ul className="flex flex-row gap-4">
          <li>
            <button className="cursor-pointer" type="button">
              {gameMode}
            </button>
          </li>
          <li>
            <button className="cursor-pointer" type="button">
              Reset
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
