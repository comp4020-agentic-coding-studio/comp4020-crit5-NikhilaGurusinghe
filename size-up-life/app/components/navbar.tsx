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
    <header>
      <nav className="flex flex-row items-center justify-between px-7 pt-9 md:px-9 md:pt-10">
        <h1 className="sr-only">{gameMode} Mode</h1>
        <label className="text-6xl font-bold">
          {guesses.length}
          <span className="text-xl ml-[5.5px] md:ml-1.5">in a row</span>
        </label>

        <ul className="flex flex-row flex-nowrap gap-6 md:gap-5 justify-center items-center">
          <li>
            <div className="relative">
              <button
                className="cursor-pointer"
                type="button"
                onClick={
                  gameMode === GameMode.DAILY
                    ? () => setGameMode(GameMode.INFINITE)
                    : () => setGameMode(GameMode.DAILY)
                }
              >
                {gameMode === GameMode.DAILY && (
                  <>
                    <Image
                      className="h-15 md:h-17 w-auto aspect-square mb-0.5"
                      src={`${basePath}/icons/calendar-thick.png`}
                      width={512}
                      height={512}
                      alt=""
                      aria-hidden={true}
                    />
                    <label
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[calc(50%+1.2px)] font-semibold text-sm"
                      aria-hidden={true}
                    >
                      {dayOfMonth}
                    </label>
                  </>
                )}
                {gameMode === GameMode.INFINITE && (
                  <Image
                    className="h-15 md:h-17 w-auto aspect-square mt-0.5"
                    src={`${basePath}/icons/infinite-thick.png`}
                    width={512}
                    height={512}
                    alt=""
                    aria-hidden={true}
                  />
                )}
                <label className="sr-only">{gameMode} Mode</label>
              </button>
              <label className="absolute font-bold top-full left-1/2 -translate-x-1/2 -translate-y-1/2">
                {gameMode}
              </label>
            </div>
          </li>
          <li>
            <button className="cursor-pointer" type="button">
              <Image
                className="h-10.5 md:h-11 w-auto aspect-square"
                src={`${basePath}/icons/refresh-thick.png`}
                width={512}
                height={512}
                alt=""
                aria-hidden={true}
              />
              <label className="sr-only">Retry current game</label>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
