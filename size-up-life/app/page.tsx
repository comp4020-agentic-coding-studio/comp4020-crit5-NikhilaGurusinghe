import Image from "next/image";
import { basePath } from "@/lib/base-path";
import AnimalGraphic from "./components/animal-graphic";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      <main className="flex">
        <div className="w-[20vw]">
          <AnimalGraphic imagePath={`${basePath}/images/blue-whale.jpg`} />
        </div>
      </main>
    </div>
  );
}
