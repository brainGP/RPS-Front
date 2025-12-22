// components/PrimaryButton.tsx
"use client";

import React from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "green" | "red" | "yellow";
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  disabled,
  variant,
  className,
}) => {
  let colorClass = "bg-zinc-800 text-white"; // default primary

  if (variant) {
    if (variant === "green") colorClass = "bg-green-500 text-white hover:bg-green-200";
    else if (variant === "red") colorClass = "bg-red-100 text-red-500 hover:bg-red-200";
    else if (variant === "yellow") colorClass = "bg-yellow-100 text-yellow-500 hover:bg-yellow-200";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${colorClass} w-full py-3 px-5 rounded-xl font-bold transition disabled:opacity-50 disabled:cursor-not-allowed ${className || ""}`}
    >
      {label}
    </button>
  );
};

export function StatusBadge({ status }: { status: string }) {
  let colorClass = "bg-blue-500/20 text-blue-400";
  if (status === "Холбогдсон") colorClass = "bg-green-100 text-green-500 border";
  else if (status === "Холбогдож байна…") colorClass = "bg-yellow-100 text-yellow-500 border";
  else if (status === "Холбогдоогүй") colorClass = "bg-red-100 text-red-500 border";
  return <span className={`px-3 py-1 rounded-full text-sm ${colorClass}`}>{status}</span>;
}
