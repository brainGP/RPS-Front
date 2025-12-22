"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/PrimaryButton";

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();

  const status = params.get("status"); // win | lose | draw | unbeatable
  const finger = params.get("finger");

  const fingerEmojis: Record<string, string> = {
    "эрхий": "Эрхий",
    "долоовор": "Долоовор",
    "дунд": "Дунд",
    "ядам": "Ядам",
    "чигчий": "Чигчий",
    "None": "❓",
  };

  const fingerDisplay = finger ? fingerEmojis[finger.toLowerCase()] || finger : "❓";

  const getResultText = () => {
    switch (status) {
      case "win": return ["ТА ХОЖЛОО!", "Гайхалтай тоглолт байлаа 👏", "text-green-400"];
      case "lose": return ["ТА ХОЖИГДЛОО", "", "text-red-400"];
      case "draw": return ["ТЭНЦЛЭЭ!", "Дахиад нэг тоглоё 🤝", "text-yellow-400"];
      case "unbeatable": return ["Үгүй болохгүй хослол!", "Хоёр хуруу харилцан ялах боломжгүй 🤔", "text-purple-400"];
      default: return ["Тэнцлээ!", "", "text-yellow-400"];
    }
  };

  const [title, subtitle, colorClass] = getResultText();

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-700 bg-zinc-900/70 text-center shadow-[0_0_40px_rgba(0,255,150,0.15)]">
        <h1 className={`text-5xl font-extrabold mb-4 ${colorClass}`}>{title}</h1>
        {subtitle && <p className="text-zinc-300 mb-2">{subtitle}</p>}
        <p className="text-3xl mt-4">Та гаргасан хуруу: {fingerDisplay}</p>

        <div className="mt-8 flex flex-col gap-4">
          <PrimaryButton
            label="Дахин тоглох"
            variant="green"
            onClick={() => router.push("/game")}
          />
          <button
            className="w-full px-4 py-3 rounded-xl border border-zinc-700 text-white bg-zinc-800 hover:bg-zinc-700 transition"
            onClick={() => router.push("/")}
          >
            Буцах
          </button>
        </div>
      </div>
    </main>
  );
}
