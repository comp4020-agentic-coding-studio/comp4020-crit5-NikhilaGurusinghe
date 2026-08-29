import { useState } from "react";

export default function SizerSlider() {
  const sliderStepSize: number = 0.01;
  const [sliderValue, setSliderValue] = useState<number>(0.5);
  console.log(sliderValue)

  return (
    <div>
      <div className="fixed flex justify-center items-center gap-2 flex-col z-67 rounded-full w-11 md:w-13 ml-6 md:ml-7 top-1/2 -translate-y-1/2 left-0 bg-blue-400 h-1/2">
        <label htmlFor="size" className="sr-only">
          Change size of animal
        </label>
        <button type="button" onClick={() => setSliderValue((prevValue) => prevValue += sliderStepSize)} className="basis-1/12 mt-3 cursor-zoom-in text-white text-4xl">+</button>
        <input
          name="size"
          className="[writing-mode:vertical-lr] [direction: ltr] [appearance: slider-vertical] basis-10/12 h-full"
          type="range"
          min="0"
          max="1"
          step={sliderStepSize}
          value={sliderValue}
          onChange={e => setSliderValue(Number(e.target.value))}        
          orient="vertical"
          style={{ direction: "rtl" }}
        />
        <button type="button" onClick={() => setSliderValue((prevValue) => prevValue -= sliderStepSize)} className="basis-1/12 mb-3 cursor-zoom-out text-white text-4xl -mt-3">-</button>
      </div>
    </div>
  );
}
