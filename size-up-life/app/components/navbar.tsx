import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { basePath } from "@/lib/base-path";
import GameMode from "./utils/game-mode";

type NavbarProps = {
  guesses: number[];
  gameMode: GameMode;
  setGameMode: Dispatch<SetStateAction<GameMode>>;
};

export default function Navbar({
  guesses,
  gameMode,
  setGameMode,
}: NavbarProps) {
  const dayOfMonth: number = new Date().getDate();

  return (
    <nav className="fixed z-67 top-0 w-full flex flex-row items-center justify-between px-7 pt-9 md:px-9 md:pt-10">
      <h1 className="sr-only">{gameMode} Mode</h1>
      <span className="text-6xl font-bold">
        {guesses.length}
        <span className="text-xl ml-[5.5px] md:ml-1.5">
          in a row ⋅ {gameMode.toLowerCase()} mode
        </span>
      </span>
      <ul className="flex flex-row flex-nowrap gap-6 md:gap-5 justify-center items-center">
        <li>
          <div className="relative">
            <button
              className="relative cursor-pointer hover:scale-110 transition-all active:scale-90"
              type="button"
              onClick={
                gameMode === GameMode.DAILY
                  ? () => setGameMode(GameMode.INFINITE)
                  : () => setGameMode(GameMode.DAILY)
              }
            >
              {gameMode === GameMode.INFINITE && (
                <>
                  <Image
                    className="h-15 md:h-17 w-auto aspect-square mb-0.5"
                    src={`${basePath}/icons/calendar-thick.png`}
                    width={512}
                    height={512}
                    alt=""
                    aria-hidden={true}
                  />
                  <span
                    className="absolute cursor-pointer left-1/2 -translate-x-1/2 top-1/2 -translate-y-[calc(50%-2px)] font-semibold text-sm"
                    aria-hidden={true}
                  >
                    {dayOfMonth}
                  </span>
                </>
              )}
              {gameMode === GameMode.DAILY && (
                <Image
                  className="h-15 md:h-17 w-auto aspect-square mt-0.5"
                  src={`${basePath}/icons/infinite-thick.png`}
                  width={512}
                  height={512}
                  alt=""
                  aria-hidden={true}
                />
              )}
              <span className="sr-only">{gameMode} Mode</span>
            </button>
            <span className="absolute font-bold top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
              {gameMode === GameMode.DAILY ? GameMode.INFINITE : GameMode.DAILY}
            </span>
          </div>
        </li>
        <li>
          <button
            className="cursor-pointer hover:rotate-720 transition-all duration-500 active:scale-70 ease-in-out"
            type="button"
          >
            <Image
              className="h-11 md:h-12 w-auto aspect-square"
              src={`${basePath}/icons/refresh-thick.png`}
              width={512}
              height={512}
              alt=""
              aria-hidden={true}
            />
            <span className="sr-only">Retry current game</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
