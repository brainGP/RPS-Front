
interface StatusBadgeProps {
  status: string;
  className?: string;

}
export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  let color = "bg-blue-500/20 text-blue-400";

  if (status === "Холбогдсон") color = "bg-green-100 text-green-500 border ";
  else if (status === "Холбогдож байна…") color = "bg-yellow-100 text-yellow-500 border";
  else if (status === "Холбогдоогүй") color = "bg-red-100 text-red-500 border";

  return (
    <div className={`absolute top-6 right-6 z-10 px-3 py-1 rounded-full text-sm ${color}`}>
      {status}
    </div>
  );
}