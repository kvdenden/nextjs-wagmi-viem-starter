import Image from "next/image";
import { MintCard } from "@/components/mint-card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-0 mx-auto container">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 py-12 w-full">
        <div className="flex col-span-1 items-center justify-center"></div>
        <div className="flex col-span-1 items-center justify-center">
          <MintCard />
        </div>
      </div>
    </main>
  );
}
