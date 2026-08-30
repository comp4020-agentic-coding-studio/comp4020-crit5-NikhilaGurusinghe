import dynamic from "next/dynamic";
import GameMode from "./utils/game-mode";

const ReactConfettiDynamic = dynamic(
  () => import("react-confetti"),
  { ssr: false }
);

type WinLossDialogueProps = { gameMode: GameMode, isWin: boolean, streak: number }

export default function WinLossDialogue({ gameMode, isWin, streak }: WinLossDialogueProps) {
  return (
    <>
      <div className="absolute inset-0 h-full w-full backdrop-blur-xs z-68 flex flex-col items-center justify-center pointer-events-auto">
        {isWin && <ReactConfettiDynamic />}
        <div className="w-7/8 sm:w-6/8 md:w-1/2 h-fit bg-yellow-300 rounded-4xl z-70 p-10">
          <h1 className="text-6xl font-bold">{isWin ? "You won!" : "Oh no, you lost..."}</h1>
          <p>()</p>
          <button type="button" className="cursor-pointer">Continue</button>
            
        </div>
      </div>
    </>
  )
}