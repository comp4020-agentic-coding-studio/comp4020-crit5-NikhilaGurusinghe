import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./components/animal-graphic";

export default function Home() {
  return (
    <main className="flex flex-row flex-1 h-full w-full items-end gap-2 overflow-x-scroll">
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} sketchHeightPx={100} sketchAspectRatio="640 / 427" />
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} sketchHeightPx={700} sketchAspectRatio="640 / 427" />
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} sketchHeightPx={200} sketchAspectRatio="640 / 427" />
    </main>  
  );
}
