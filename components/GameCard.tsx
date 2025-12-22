export default function GameCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-zinc-700 bg-zinc-900/70 shadow-[0_0_40px_rgba(0,255,150,0.15)] backdrop-blur">
      {children}
    </div>
  );
}
