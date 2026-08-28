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
    // used for initialising the canvas size in p5.start see p5.updateWithProps for more info
    let newCanvasWidth: number = 50;
    let newCanvasHeight: number = 50;
    // TODO idk why Image isn't sufficient enough of a type here
    let animalImage: p5Types.Image | p5Types.FramebufferTexture | undefined;

    p5.setup = async () => {
      p5.createCanvas(newCanvasWidth, newCanvasHeight);
      animalImage = await p5.loadImage(imagePath);
      p5.imageMode(p5.CENTER);
    };

    p5.updateWithProps = (props) => {
      if (props.parentWidth === undefined || props.parentHeight === undefined)
        return;

      // this is purely for the race condition where the initial updateWithProps
      // (from the resize observer) triggers before p5.setup() starts
      newCanvasWidth = props.parentWidth;
      newCanvasHeight = props.parentHeight;

      p5.resizeCanvas(newCanvasWidth, newCanvasHeight);
    };

    p5.draw = () => {
      if (animalImage !== undefined) {
        p5.image(animalImage, p5.width / 2, p5.height / 2, p5.width, p5.height);
      }
    };
  };

  return <ResizableP5Sketch sketch={sketch} sketchHeightPx={sketchHeightPx} sketchAspectRatio={sketchAspectRatio} />;
}
