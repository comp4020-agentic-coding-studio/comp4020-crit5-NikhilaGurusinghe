import type { Dispatch, SetStateAction } from "react";
import type GameMode from "./utils/game-mode";
import Image from "next/image";
import { basePath } from "@/lib/base-path";

type NavbarProps = {
  guesses: number[];
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

export default function Navbar({ guesses, gameMode }: NavbarProps) {
  return (
    <header>
      <nav className="flex flex-row items-center justify-between px-8 pt-9 md:px-9 md:pt-10">
        <h1 className="sr-only">{gameMode} Mode</h1>
        <p className="text-6xl font-bold">
          {guesses.length}
          <span className="text-xl ml-[5.5px] md:ml-1.5">in a row</span>
        </p>

        <ul className="flex flex-row gap-4 mt-2 justify-center items-center">
          <li>
            <button className="cursor-pointer relative" type="button">
              <Image className="h-12 md:h-13 w-auto aspect-square mx-2" src={`${basePath}/icons/infinity-circles.png`} width={512} height={512} alt="" aria-hidden={true} />
              <p className="absolute top-full left-1/2 -translate-x-1/2">{gameMode}</p>
            </button>
          </li>
          <li>
            <button className="cursor-pointer" type="button">
              <Image className="h-14 md:h-15 w-auto aspect-square" src={`${basePath}/icons/restart.png`} width={512} height={512} alt="" aria-hidden={true} />
              <p className="sr-only">Retry current game</p>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
