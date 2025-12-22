// components/FingerDisplay.tsx
"use client";

export function FingerDisplay({ finger, small }: { finger: string; small?: boolean }) {
  return (
    <div className={`text-center p-4 rounded-xl bg-black border border-zinc-700 ${small ? "text-sm" : ""}`}>
      <p className={`${small ? "text-xs" : "text-sm"} text-zinc-400 mb-1`}>Илрүүлсэн хуруу</p>
      <p
        className={`text-yellow-400 font-bold ${small ? "text-2xl h-20" : "text-5xl h-40"} flex justify-center items-center animate-pulse`}
      >
        {finger}
      </p>
    </div>
  );
}
