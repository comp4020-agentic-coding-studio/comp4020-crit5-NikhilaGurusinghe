import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./components/animal-graphic";

export default function Home() {
  return (
    <main className="flex flex-row flex-1 h-full w-full items-end gap-2 overflow-x-scroll">
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} />
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} />
      <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} />
    </main>  
  );
}
