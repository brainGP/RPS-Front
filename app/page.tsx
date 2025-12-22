"use client";

import { useRouter } from "next/navigation";
import {PrimaryButton} from "@/components/PrimaryButton";
import GameCard from "@/components/GameCard";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-6">
     <GameCard>
      <h1 className="text-5xl font-bold text-center mb-8">Хуруудах</h1>
     
      <PrimaryButton label="Тоглох" variant="green" onClick={() => router.push("/game")} />
        </GameCard>
    </main>
  );
}
