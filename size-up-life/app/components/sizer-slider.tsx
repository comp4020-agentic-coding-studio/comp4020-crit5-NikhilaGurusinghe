import { useState } from "react";

type SizerSliderProps = {
  guesses: number[];
  setGuessesAtIndex: (index: number, guess: number) => void;
  activeGuessIndex: number;
  goToNextGuess: () => void;
};

export default function SizerSlider({
  guesses,
  setGuessesAtIndex,
  activeGuessIndex,
  goToNextGuess,
}: SizerSliderProps) {
  const sliderStepSize: number = 0.01;
  const sliderMaxValue: number = 1;
  const sliderMinValue: number = 0.1;

  return (
    <div className="fixed z-67 top-1/2 -translate-y-1/2 left-0 h-1/2 ml-6 md:ml-7 w-13 md:w-14">
      <div className="relative flex h-full justify-center items-center gap-2 flex-col rounded-full bg-blue-400">
        <label htmlFor="size" className="sr-only">
          Change size of animal
        </label>
        <button
          type="button"
          onClick={() => {
            const newSliderValue: number = Math.min(
              sliderMaxValue,
              guesses[activeGuessIndex] + sliderStepSize,
            );
            setGuessesAtIndex(activeGuessIndex, newSliderValue);
            return;
          }}
          className="basis-1/12 hover:scale-110 mt-3 cursor-zoom-in text-white text-4xl active:scale-80 transition-all px-4 select-none"
        >
          +
        </button>
        <input
          name="size"
          className="cursor-grab active:cursor-grabbing [writing-mode:vertical-lr] [direction: ltr] [appearance: slider-vertical] basis-10/12 h-full"
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          step={sliderStepSize}
          value={guesses[activeGuessIndex]}
          onChange={(e) => {
            const sliderValue: number = Number(e.target.value);
            console.log(sliderValue);
            setGuessesAtIndex(activeGuessIndex, sliderValue);
            return;
          }}
          orient="vertical"
          style={{ direction: "rtl" }}
        />
        <button
          type="button"
          onClick={() => {
            const newSliderValue: number = Math.max(
              sliderMinValue,
              guesses[activeGuessIndex] - sliderStepSize,
            );
            setGuessesAtIndex(activeGuessIndex, newSliderValue);
            return;
          }}
          className="basis-1/12 hover:scale-110 mb-3 cursor-zoom-out text-white text-4xl -mt-3 active:scale-80 transition-all px-5 select-none"
        >
          -
        </button>
      </div>
      <button
        type="button"
        onClick={goToNextGuess}
        className="bg-red-500 cursor-pointer px-5 mx-auto -mt-6 h-17 rounded-b-full flex justify-center items-center pt-3.5 w-[92%] text-white text-xl"
      >
        <span
          className="active:scale-70 transition-all hover:scale-120 select-none"
          aria-hidden={true}
        >
          ✔
        </span>
        <span className="sr-only">Confirm size guess?</span>
      </button>
    </div>
  );
}
