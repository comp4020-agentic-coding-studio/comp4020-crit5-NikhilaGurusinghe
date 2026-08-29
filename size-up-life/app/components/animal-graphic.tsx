"use client";

import type { Sketch } from "@p5-wrapper/react";
import type p5Types from "p5";
import ResizableP5Sketch, {
  type ResizableSketchProps,
} from "./resizable-p5-sketch";

type AnimalGraphicProps = {
  imagePath: string;
  imageAltText: string;
  sketchHeightPx: number;
  sketchAspectRatio: string;
  animalName: string;
};

export default function AnimalGraphic({
  imagePath,
  imageAltText,
  sketchHeightPx,
  sketchAspectRatio,
  animalName,
}: AnimalGraphicProps) {
  const sketch: Sketch<ResizableSketchProps> = (p5) => {
    // constants
    const maxHeightPx: number = 1000;
    const maxLerpDiameter: number = 6;

    // used for initialising the canvas size in p5.start see p5.updateWithProps for more info
    let newCanvasWidth: number = 50;
    let newCanvasHeight: number = 50;
    // TODO idk why Image isn't sufficient enough of a type here
    let animalImage: p5Types.Image | p5Types.FramebufferTexture | undefined;
    let halfToneDiameterScale: number = 2;

    p5.setup = async () => {
      p5.createCanvas(newCanvasWidth, newCanvasHeight);
      animalImage = await p5.loadImage(imagePath);
      p5.imageMode(p5.CENTER); // this makes image positioning easier
      // Turn off the draw loop. resizing canvas redraws when needed otherwise
      // we don't need to constantly keep drawing
      p5.noLoop();
    };

    p5.updateWithProps = (props) => {
      if (props.parentWidth === undefined || props.parentHeight === undefined)
        return;

      // this is purely for the race condition where the initial updateWithProps
      // (from the resize observer) triggers before p5.setup() starts
      newCanvasWidth = props.parentWidth;
      newCanvasHeight = props.parentHeight;

      halfToneDiameterScale = p5.lerp(
        1,
        maxLerpDiameter,
        newCanvasHeight / maxHeightPx,
      );

      p5.resizeCanvas(newCanvasWidth, newCanvasHeight);
    };

    p5.draw = () => {
      if (animalImage === undefined) return;

      const animalImageP5: p5Types.Image = animalImage as p5Types.Image;

      const sampleResolution = 5;

      // halftoning - https://editor.p5js.org/chrsgrbr/sketches/mLNDLCYys
      animalImageP5.loadPixels();
      for (let x: number = 0; x < animalImageP5.width; x += sampleResolution) {
        for (
          let y: number = 0;
          y < animalImageP5.height;
          y += sampleResolution
        ) {
          const i: number = (y * animalImageP5.width + x) * 4;

          const r: number = animalImageP5.pixels[i];
          const g: number = animalImageP5.pixels[i + 1];
          const b: number = animalImageP5.pixels[i + 2];
          const a: number = animalImageP5.pixels[i + 3];

          // transparency
          if (a === 0) {
            continue;
          }

          if (r > 220 && g > 220 && b > 220) {
            continue;
          }

          const luma: number = 0.299 * r + 0.587 * g + 0.114 * b;

          const diameter: number = p5.map(luma, 0, 255, 0, sampleResolution);

          p5.fill(0);
          p5.noStroke();
          p5.circle(
            p5.map(x, 0, animalImageP5.width, 0, p5.width + 10),
            p5.map(y, 0, animalImageP5.height, 0, p5.height + 10),
            diameter *
              p5.lerp(1, 0.4, x / animalImageP5.width) *
              p5.lerp(0.4, 1, y / animalImageP5.height) *
              halfToneDiameterScale,
          );
        }
      }
    };
  };

  return (
    <figure className="flex flex-col">
        <div className="inline-grid grid-cols-[auto_max-content] grid-rows-[auto_max-content]">
          {/* vertical measure i.e. height */}
          <div className="col-start-1 row-start-2 h-full flex flex-row items-center justify-center">
            <span className="mr-px md:mr-0.5 [writing-mode:vertical-lr] -scale-y-100 -scale-x-100" style={{ textOrientation: "sideways", }}>{sketchHeightPx}m</span>
            <div className="relative border-l-3 pl-3 h-full rounded-xs before:absolute before:top-0 before:left-0 before:h-0.75 before:bg-black before:w-2 before:content-[''] before:rounded-r-2xl after:absolute after:bottom-0 after:left-0 after:h-0.75 after:bg-black after:w-2 after:content-[''] after:rounded-r-2xl" />
          </div>

          {/* horizontal measure i.e. width */}
          <div className="col-start-2 row-start-1 w-full flex flex-col items-center justify-center">
            <span className="mb-[1.5px] md:mb-0.5">{sketchHeightPx}m</span>
            <div className="relative border-t-3 pb-5 w-full rounded-xs before:absolute before:top-0 before:left-0 before:w-0.75 before:bg-black before:h-3 before:content-[''] before:rounded-b-2xl after:absolute after:top-0 after:left-full after:-translate-x-full after:w-0.75 after:bg-black after:h-3 after:content-[''] after:rounded-b-2xl" />
          </div>
          
          <div className="col-start-2 row-start-2 h-full">
            <ResizableP5Sketch
              sketch={sketch}
              sketchAltText={imageAltText}
              sketchHeightPx={sketchHeightPx}
              sketchAspectRatio={sketchAspectRatio}
            />
          </div>
        </div>

        <figcaption className="text-2xl contain-inline-size truncate ml-6 mt-4 md:mt-8" title={animalName}>{animalName}</figcaption>
    </figure>
  );
}
