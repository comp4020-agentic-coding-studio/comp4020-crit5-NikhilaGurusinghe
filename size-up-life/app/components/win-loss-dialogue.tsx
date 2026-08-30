import dynamic from "next/dynamic";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import { basePath } from "@/lib/base-path";
import GameState from "./utils/game-finish-state";
import GameMode from "./utils/game-mode";

const ReactConfettiDynamic = dynamic(() => import("react-confetti"), {
  ssr: false,
});

type WinLossDialogueProps = {
  gameMode: GameMode;
  isWin: boolean;
  streak: number;
  isVisible: boolean;
  setGameState: Dispatch<SetStateAction<GameState>>;
  resetGameMode: () => void;
};

export default function WinLossDialogue({
  gameMode,
  isWin,
  streak,
  isVisible,
  setGameState,
  resetGameMode,
}: WinLossDialogueProps) {
  return (
    <>
      <div
        aria-hidden={!isVisible}
        className={`${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} absolute transition-all inset-0 h-full w-full backdrop-blur-xs z-68 flex flex-col items-center justify-center`}
      >
        {isWin && <ReactConfettiDynamic />}
        <div
          className={`flex flex-col w-7/8 sm:w-6/8 md:w-1/2 h-full my-5 ${isWin ? "bg-yellow-300 text-black" : "bg-red-500 text-gray-100"} rounded-[60px] z-70 p-10 overflow-y-auto`}
        >
          <h1 className="text-6xl font-bold">
            {isWin ? "You won!" : "Oh no, you lost..."}
          </h1>
          <section className="text-lg/5.5 mt-3 text-pretty mb-10 flex flex-col">
            {isWin && (
              <>
                {gameMode === GameMode.DAILY && (
                  <p>
                    Completed daily ({streak} in a row) for{" "}
                    {new Date().getUTCDate()}/{new Date().getUTCMonth()}/
                    {new Date().getUTCFullYear()} (UTC). Come back tomorrow for
                    more!
                  </p>
                )}
                {gameMode === GameMode.INFINITE && (
                  <p>
                    Wow you completed everything! There's a streak of {streak},
                    huge.
                  </p>
                )}
                <Image
                  className="mt-4 w-full h-auto rounded-2xl pointer-events-none select-none"
                  draggable={false}
                  src={`${basePath}/images/misc/hooray_spongebob.webp`}
                  alt="Montage of Spongebob Squarepants being sad and crying"
                  width={320}
                  height={198}
                />
              </>
            )}
            {!isWin && (
              <>
                <p>
                  So close! Better luck next time, see if you can beat {streak}{" "}
                  in a row!
                </p>
                <Image
                  className="self-start mt-3 w-5/8 h-auto rounded-2xl pointer-events-none select-none"
                  draggable={false}
                  src={`${basePath}/images/misc/sad_spongebob.webp`}
                  alt="Montage of Spongebob Squarepants being sad and crying"
                  width={480}
                  height={480}
                />
              </>
            )}
          </section>
          <button
            type="button"
            onClick={() => {
              if (!isWin) resetGameMode();
              setGameState(GameState.IN_PROGRESS);
              return;
            }}
            className="relative mt-auto bottom-0 cursor-pointer font-semibold rounded-full py-10 px-8.5 w-full"
          >
            <div className="absolute inset-0 h-full w-full bg-gray-100 transition-all hover:bg-white hover:scale-y-103 hover:scale-x-101 active:scale-y-97 active:scale-x-99 rounded-full" />
            <p className="absolute top-1/2 left-1/2 -translate-1/2 pointer-events-none text-lg text-black">
              {isWin ? "Continue" : "Try again?"}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
