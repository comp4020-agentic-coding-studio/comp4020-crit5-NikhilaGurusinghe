"use client";

import type { Sketch } from "@p5-wrapper/react";
import type p5Types from "p5";
import ResizableP5Sketch, {
  type ResizableSketchProps,
} from "./resizable-p5-sketch";

type AnimalGraphicProps = { 
  imagePath: string;
  sketchHeightPx: number;
  sketchAspectRatio: string;
};

export default function AnimalGraphic({ imagePath, sketchHeightPx, sketchAspectRatio }: AnimalGraphicProps) {
  const sketch: Sketch<ResizableSketchProps> = (p5) => {
    // constants
    const maxHeightPx: number = 1000;
    const maxLerpDiameter: number = 4.2;

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

      halfToneDiameterScale = p5.lerp(0, maxLerpDiameter, newCanvasHeight/maxHeightPx);

      p5.resizeCanvas(newCanvasWidth, newCanvasHeight);
    };

    p5.draw = () => {
      if (animalImage === undefined) return;

      const animalImageP5: p5Types.Image = animalImage as p5Types.Image;

      const stepSize = 5;

      // halftoning - https://editor.p5js.org/chrsgrbr/sketches/mLNDLCYys
      animalImageP5.loadPixels();
      for (let x: number = 0; x < animalImageP5.width; x += stepSize) {
        for (let y: number = 0; y < animalImageP5.height; y += stepSize) {
          const i: number = (y * animalImageP5.width + x) * 4;

          const r: number = animalImageP5.pixels[i];
          const g: number = animalImageP5.pixels[i + 1];
          const b: number = animalImageP5.pixels[i + 2];
          const a: number = animalImageP5.pixels[i + 3];

          if (r > 200 && g > 200 && b > 200) {
            continue;
          }

          const luma: number =  0.299 * r + 0.587 * g + 0.114 * b;

          const diameter: number = p5.map(luma, 0, 255, 0, stepSize);

          p5.fill(0);
          p5.noStroke();
          p5.circle(p5.map(x, 0, animalImageP5.width, 0, p5.width + 10), p5.map(y, 0, animalImageP5.height, 0, p5.height + 10), diameter * halfToneDiameterScale);

        }
      }


      // if (animalImage !== undefined) {
      //   p5.image(animalImageP5, p5.width / 2, p5.height / 2, p5.width, p5.height);
      // }
    };
  };

  return <ResizableP5Sketch sketch={sketch} sketchHeightPx={sketchHeightPx} sketchAspectRatio={sketchAspectRatio} />;
}
