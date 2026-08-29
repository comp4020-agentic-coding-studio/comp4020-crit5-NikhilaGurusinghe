"use client";

import type { Sketch } from "@p5-wrapper/react";
import type p5Types from "p5";
import { useMemo } from "react";
import ResizableP5Sketch, {
  type ResizableSketchProps,
} from "./resizable-p5-sketch";
import getWidth from "./utils/get-width";

type AnimalGraphicProps = {
  imagePath: string;
  imageAltText: string;
  sketchHeightPx: number;
  sketchAspectRatio: string;
  animalName: string;
  isGuessing: boolean;
};

type AnimalSketchProps = {
  isGuessing: boolean;
};

export default function AnimalGraphic({
  imagePath,
  imageAltText,
  sketchHeightPx,
  sketchAspectRatio,
  animalName,
  isGuessing,
}: AnimalGraphicProps) {
  const sketch = useMemo<Sketch<ResizableSketchProps<AnimalSketchProps>>>(
    () => (p5) => {
      // constants
      const maxHeightPx: number = 1000;
      const maxLerpDiameter: number = 6;
      let defaultFillColour: p5Types.Color;
      let guessingFillColour: p5Types.Color;
      const GLYPH_BUFFER_PX = 128;
      const GLYPH_TEXT_PX = 96;
      const GLYPH_SCALE = GLYPH_BUFFER_PX / GLYPH_TEXT_PX;
      let guessGlyph: p5Types.Graphics;

      // the size we have been asked for, written by updateWithProps
      let wantCanvasWidth: number = 50;
      let wantCanvasHeight: number = 50;

      let animalImage: p5Types.Image | undefined;
      let halfToneDiameterScale: number = 2;
      let currentIsGuessing: boolean = false;


      let isSetup: boolean = false;

      function tryResizeCanvas(): boolean {
        if (wantCanvasWidth === p5.width && wantCanvasHeight === p5.height)
          return false;

        halfToneDiameterScale = p5.lerp(
          1,
          maxLerpDiameter,
          wantCanvasHeight / maxHeightPx,
        );

        p5.resizeCanvas(wantCanvasWidth, wantCanvasHeight);
        return true;
      }

      p5.setup = async () => {
        p5.createCanvas(wantCanvasWidth, wantCanvasHeight);

        defaultFillColour = p5.color("#000000");
        guessingFillColour = p5.color("#50a2ff");

        guessGlyph = p5.createGraphics(GLYPH_BUFFER_PX, GLYPH_BUFFER_PX);
        guessGlyph.pixelDensity(1); 
        guessGlyph.clear();
        guessGlyph.noStroke();
        guessGlyph.fill(guessingFillColour);
        guessGlyph.textAlign(p5.CENTER, p5.CENTER);
        guessGlyph.textStyle(p5.BOLD);
        guessGlyph.textSize(GLYPH_TEXT_PX);
        guessGlyph.text("?", GLYPH_BUFFER_PX / 2, GLYPH_BUFFER_PX / 2);

        halfToneDiameterScale = p5.lerp(
          1,
          maxLerpDiameter,
          wantCanvasHeight / maxHeightPx,
        );

        p5.imageMode(p5.CENTER); // this makes image positioning easier
        // Turn off the draw loop. resizing canvas redraws when needed otherwise
        // we don't need to constantly keep drawing
        p5.noLoop();

        animalImage = await p5.loadImage(imagePath);
        animalImage.loadPixels();
  
        isSetup = true;
        tryResizeCanvas();
      };

      p5.updateWithProps = (props) => {
        if (props.parentWidth !== undefined)
          wantCanvasWidth = props.parentWidth;
        if (props.parentHeight !== undefined)
          wantCanvasHeight = props.parentHeight;

        const guessingChanged: boolean = props.isGuessing !== currentIsGuessing;
        currentIsGuessing = props.isGuessing;

        if (!isSetup) return;

        const resized: boolean = tryResizeCanvas();

        // changing when isGuessing has changed
        if (guessingChanged && !resized) p5.redraw();
      };

      p5.draw = () => {
        if (animalImage === undefined) return;

        const sampleResolution = 5;

        if (currentIsGuessing) {
          p5.fill(guessingFillColour);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.textStyle(p5.BOLD);
        } else {
          p5.fill(defaultFillColour);
        }

        // halftoning - https://editor.p5js.org/chrsgrbr/sketches/mLNDLCYys
        for (
          let x: number = 0;
          x < animalImage.width;
          x += sampleResolution
        ) {
          for (
            let y: number = 0;
            y < animalImage.height;
            y += sampleResolution
          ) {
            const i: number = (y * animalImage.width + x) * 4;

            const r: number = animalImage.pixels[i];
            const g: number = animalImage.pixels[i + 1];
            const b: number = animalImage.pixels[i + 2];
            const a: number = animalImage.pixels[i + 3];

            // transparency
            if (a === 0) {
              continue;
            }

            if (r > 220 && g > 220 && b > 220) {
              continue;
            }

            const luma: number = 0.299 * r + 0.587 * g + 0.114 * b;

            const diameter: number = p5.map(luma, 0, 255, 0, sampleResolution);

            const drawX: number = p5.map(
              x,
              0,
              animalImage.width,
              0,
              p5.width + 10,
            );
            const drawY: number = p5.map(
              y,
              0,
              animalImage.height,
              0,
              p5.height + 10,
            );
            const drawDiameter: number =
              diameter *
              p5.lerp(1, 0.4, x / animalImage.width) *
              p5.lerp(0.4, 1, y / animalImage.height) *
              halfToneDiameterScale;

            p5.noStroke();

            if (currentIsGuessing) {
              const glyphSize: number = drawDiameter * 3 * GLYPH_SCALE;
              p5.image(guessGlyph, drawX, drawY, glyphSize, glyphSize);
            } else {
              p5.circle(drawX, drawY, drawDiameter);
            }
          }
        }
      };
    },
    // imagePath is fixed for the lifetime of the component
    [imagePath],
  );

  return (
    <figure className="flex flex-col">
      <div className="inline-grid grid-cols-[auto_max-content] grid-rows-[auto_max-content]">
        {/* vertical measure i.e. height */}
        <div className="col-start-1 row-start-2 h-full flex flex-row items-center justify-center">
          <span
            className="mr-px md:mr-0.5 [writing-mode:vertical-lr] -scale-y-100 -scale-x-100"
            style={{ textOrientation: "sideways" }}
          >
            {sketchHeightPx} m
          </span>
          <div className="relative border-l-2 pl-3 h-full rounded-xs before:absolute before:top-0 before:left-0 before:h-0.5 before:bg-black before:w-2 before:content-[''] before:rounded-r-2xl after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-black after:w-2 after:content-[''] after:rounded-r-2xl" />
        </div>

        {/* horizontal measure i.e. width */}
        <div className="col-start-2 row-start-1 w-full flex flex-col items-center justify-center">
          <span className="mb-[1.5px] md:mb-0.5">
            {getWidth(sketchAspectRatio, sketchHeightPx)} m
          </span>
          <div className="relative border-t-2 pb-5 w-full rounded-xs before:absolute before:top-0 before:left-0 before:w-0.5 before:bg-black before:h-3 before:content-[''] before:rounded-b-2xl after:absolute after:top-0 after:left-full after:-translate-x-full after:w-0.5 after:bg-black after:h-3 after:content-[''] after:rounded-b-2xl" />
        </div>

        <div className="col-start-2 row-start-2 h-full w-fit overflow-clip">
          <ResizableP5Sketch
            sketch={sketch}
            sketchProps={{ isGuessing }}
            sketchAltText={imageAltText}
            sketchHeightPx={sketchHeightPx}
            sketchAspectRatio={sketchAspectRatio}
          />
        </div>
      </div>

      <figcaption
        className="text-2xl font-semibold contain-inline-size truncate ml-6 mt-4 md:mt-8"
        title={animalName}
      >
        {animalName}
      </figcaption>
    </figure>
  );
}
