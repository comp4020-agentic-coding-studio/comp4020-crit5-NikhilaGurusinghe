import { NextReactP5Wrapper } from "@p5-wrapper/next";
import type { Sketch, SketchProps } from "@p5-wrapper/react";
import { useResizeObserver } from "use-resize-observer";

export type ResizableSketchProps<Props extends SketchProps = SketchProps> =
  Props & {
    parentWidth: number | undefined;
    parentHeight: number | undefined;
  };

interface ResizableP5Props<Props extends SketchProps = SketchProps> {
  sketch: Sketch<ResizableSketchProps>;
  sketchProps?: Props;
  sketchHeightPx: number;
  sketchAspectRatio: string;
  sketchAltText: string;
}

export default function ResizableP5Sketch({
  sketch,
  sketchProps,
  sketchHeightPx,
  sketchAspectRatio,
  sketchAltText,
}: ResizableP5Props) {
  // used initially to set the p5 canvas size
  // used for when the size of the parent div changes (and the p5 canvas size needs to the change)
  const {
    ref,
    width = undefined,
    height = undefined,
  } = useResizeObserver<HTMLDivElement>();

  // this dictates when the p5 canvas has a suitable width and height to size itself to
  // however the p5 canvas may still load (e.g. images) beforehand and show an ugly
  // loading screen in itself
  const isDisplayable = width !== undefined && height !== undefined;

  return (
    <div
      ref={ref}
      className="flex-none w-auto"
      style={{
        aspectRatio: `${sketchAspectRatio}`,
        height: `${sketchHeightPx}px`,
      }}
      aria-label={sketchAltText}
      role="img"
    >
      {isDisplayable && (
        <NextReactP5Wrapper
          sketch={sketch}
          parentWidth={width}
          parentHeight={height}
          {...sketchProps}
        />
      )}
    </div>
  );
}
