import { useState } from "react";

export default function SizerSlider() {
  const sliderStepSize: number = 0.01;
  const [sliderValue, setSliderValue] = useState<number>(0.5);

  return (
    <div className="fixed z-67 top-1/2 -translate-y-1/2 left-0 h-1/2 ml-6 md:ml-7 w-13 md:w-14">
      <div className="relative flex h-full justify-center items-center gap-2 flex-col rounded-full bg-blue-400">
        <label htmlFor="size" className="sr-only">
          Change size of animal
        </label>
        <button type="button" onClick={() => setSliderValue((prevValue) => prevValue += sliderStepSize)} className="basis-1/12 mt-3 cursor-zoom-in text-white text-4xl active:scale-80 transition-all px-4">+</button>
        <input
          name="size"
          className="cursor-grab active:cursor-grabbing [writing-mode:vertical-lr] [direction: ltr] [appearance: slider-vertical] basis-10/12 h-full"
          type="range"
          min="0"
          max="1"
          step={sliderStepSize}
          value={sliderValue}
          onChange={e => setSliderValue(Number(e.target.value))}        
          orient="vertical"
          style={{ direction: "rtl" }}
        />
        <button type="button" onClick={() => setSliderValue((prevValue) => prevValue -= sliderStepSize)} className="basis-1/12 mb-3 cursor-zoom-out text-white text-4xl -mt-3 active:scale-80 transition-all px-5">-</button>
      </div>
      <button className="bg-red-500 cursor-pointer px-5 mx-auto -mt-6 h-17 rounded-b-full flex justify-center items-center pt-4 w-[92%] text-white text-xl">
        <span className="active:scale-80 transition-all" aria-hidden={true}>✔</span>
        <span className="sr-only">Confirm size guess?</span>
      </button>
    </div>
  );
}
