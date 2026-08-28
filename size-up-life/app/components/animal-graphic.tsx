"use client"

type AnimalGraphicProps = { imagePath: string };

import { type Sketch } from "@p5-wrapper/react";
import ResizableP5Sketch, { ResizableSketchProps } from "./resizable-p5-sketch";

const sketch: Sketch<ResizableSketchProps> = (p5) => {
  // used for initialising the canvas size in p5.start see p5.updateWithProps for more info
  let newCanvasWidth = 50;
  let newCanvasHeight = 50;

  p5.setup = () => {
    p5.createCanvas(newCanvasWidth, newCanvasHeight);
  }

  p5.updateWithProps = props => {
    if (props.parentWidth === undefined || props.parentHeight === undefined) return;

    // this is purely for the race condition where the initial updateWithProps 
    // (from the resize observer) triggers before p5.setup() starts
    newCanvasWidth = props.parentWidth;
    newCanvasHeight = props.parentHeight;

    p5.resizeCanvas(newCanvasWidth, newCanvasHeight);
  }

  p5.draw = () => {
    p5.background(125);
    p5.fill(0, 125, 50);
    p5.circle(p5.width / 2, p5.height / 2, p5.width / 4);
  }
}

export default function AnimalGraphic({ imagePath }: AnimalGraphicProps) {
  return <ResizableP5Sketch sketch={sketch} />;
}