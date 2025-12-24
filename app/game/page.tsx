// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { createSocket } from "@/lib/socket";

// import FingerDetector from "@/components/FingerDetector";
// import { FingerDisplay } from "@/components/FingerDisplay";
// import { Countdown } from "@/components/Countdown";
// import { PrimaryButton } from "@/components/PrimaryButton";

// export default function GamePage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const autoReady = params.get("autoReady") === "true";

//   const [socket, setSocket] = useState<any>(null);
//   const [status, setStatus] = useState("Холбогдож байна…");
//   const [finger, setFinger] = useState("None"); // always show current finger
//   const [ready, setReady] = useState(false);
//   const [countdown, setCountdown] = useState<number | null>(null);
//   const [waiting, setWaiting] = useState(false);
//   const [playing, setPlaying] = useState(false);

//   const lastGestureRef = useRef("None"); // track latest for backend
//   const countdownRef = useRef(false); // track if countdown active

//   const initSocket = () => {
//     if (socket) socket.disconnect();

//     const s = createSocket();
//     setSocket(s);
//     setStatus("Холбогдож байна…");

//     s.on("connect", () => setStatus("Холбогдсон"));
//     s.on("disconnect", () => setStatus("Холбогдоогүй"));

//     s.on("countdown_start", (v: number) => {
//       setCountdown(v);
//       countdownRef.current = true;
//       lastGestureRef.current = "None"; // reset for countdown
//       setPlaying(true);
//     });

//     s.on("countdown_tick", (v: number) => {
//       setCountdown(v);

//       if (v === 0) {
//         countdownRef.current = false;
//         setPlaying(false);

//         if (lastGestureRef.current !== "None") {
//           s.emit("submit_gesture", { gesture: lastGestureRef.current });
//         }
//       }
//     });

//     s.on("match_result", ({ result, gesture }: { result: string; gesture: string }) => {
//       setCountdown(null);
//       setPlaying(false);
//       router.replace(`/result?status=${result}&finger=${gesture || lastGestureRef.current}`);
//     });

//     return s;
//   };

//   useEffect(() => {
//     initSocket();
//   }, []);

//   useEffect(() => {
//     if (autoReady && status === "Холбогдсон" && !ready) toggleReady();
//   }, [autoReady, status]);

//   const toggleReady = () => {
//     if (status !== "Холбогдсон" || playing) return;
//     socket.emit("player_ready");
//     setReady((p) => !p);
//     setWaiting(true);
//   };

//   // 🔥 Always update finger for UI
//   const onFingerDetected = (f: string) => {
//     setFinger(f); // always show current
//     if (countdownRef.current) lastGestureRef.current = f; // only track last during countdown
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 pt-safe pb-safe gap-4">
//       <div className="w-full max-w-md p-3 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-700 shadow-xl relative flex flex-col items-center">

//         {/* Status badge */}
//         <div className={`absolute top-6 right-6 z-10 px-3 py-1 rounded-xl text-sm ${
//           status === "Холбогдсон" ? "bg-green-500 text-white border" :
//           status === "Холбогдож байна…" ? "bg-yellow-100 text-zinc-500 border" :
//           "bg-red-100 text-red-500 border"
//         }`}>
//           {status}
//         </div>

//         {/* ALWAYS mounted */}
//         <FingerDetector onFingerCount={onFingerDetected} />

//         <div className="my-2 w-full">
//           <FingerDisplay finger={finger} small />
//         </div>

//         {countdown !== null && (
//           <div className="w-full flex justify-center my-2">
//             <Countdown value={countdown} />
//           </div>
//         )}

//         <PrimaryButton
//           label={ready ? "Цуцлах" : "Бэлэн"}
//           variant={ready ? "red" : "green"}
//           onClick={toggleReady}
//           disabled={status !== "Холбогдсон" || playing}
//         />

//         {waiting && ready && !playing && (
//           <p className="text-yellow-400 mt-2 text-center text-xs sm:text-sm">
//             Өрсөлдөгчийг хүлээж байна…
//           </p>
//         )}
//       </div>
//     </main>
//   );
// }

// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { createSocket } from "@/lib/socket";
// import FingerDetector from "@/components/FingerDetector";
// import { FingerDisplay } from "@/components/FingerDisplay";
// import { Countdown } from "@/components/Countdown";
// import { PrimaryButton } from "@/components/PrimaryButton";

// export default function GamePage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const autoReady = params.get("autoReady") === "true";

//   const [socket, setSocket] = useState<any>(null);
//   const [status, setStatus] = useState("Холбогдож байна…");
//   const [finger, setFinger] = useState("None");
//   const [ready, setReady] = useState(false);
//   const [countdown, setCountdown] = useState<number | null>(null);
//   const [waiting, setWaiting] = useState(false);
//   const [playing, setPlaying] = useState(false);

//   const lastGestureRef = useRef("None");
//   const countdownActiveRef = useRef(false);
//   const submittedRef = useRef(false);

//   useEffect(() => {
//     const s = createSocket();
//     setSocket(s);

//     s.on("connect", () => setStatus("Холбогдсон"));
//     s.on("disconnect", () => setStatus("Холбогдоогүй"));

//     s.on("countdown_start", (v: number) => {
//       setCountdown(v);
//       setPlaying(true);
//       countdownActiveRef.current = true;
//       submittedRef.current = false;
//       lastGestureRef.current = "None";
//     });

//     s.on("countdown_tick", (v: number) => {
//       setCountdown(v);

//       if (v === 0 && !submittedRef.current) {
//         countdownActiveRef.current = false;
//         setPlaying(false);
//         submittedRef.current = true;

//         s.emit("submit_gesture", {
//           gesture: lastGestureRef.current,
//         });
//       }
//     });

//     s.on("match_result", ({ result, gesture }) => {
//       setCountdown(null);
//       setPlaying(false);
//       router.replace(
//         `/result?status=${result}&finger=${gesture || lastGestureRef.current}`
//       );
//     });

//     return () => {
//   s.disconnect();
// };
//   }, []);

//   useEffect(() => {
//     if (autoReady && status === "Холбогдсон" && !ready) toggleReady();
//   }, [autoReady, status]);

//   const toggleReady = () => {
//     if (!socket || playing) return;
//     socket.emit("player_ready");
//     setReady((p) => !p);
//     setWaiting(true);
//   };

//   const onFingerDetected = (f: string) => {
//     setFinger(f);
//     if (countdownActiveRef.current && f !== "Зөвхөн 1 хуруу гаргана уу!") {
//       lastGestureRef.current = f;
//     }
//   };

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white gap-4">
//       <FingerDetector onFingerCount={onFingerDetected} />
//       <FingerDisplay finger={finger} small />
//       {countdown !== null && <Countdown value={countdown} />}
//       <PrimaryButton
//         label={ready ? "Цуцлах" : "Бэлэн"}
//         variant={ready ? "red" : "green"}
//         onClick={toggleReady}
//         disabled={playing}
//       />
//     </main>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";

import FingerDetector from "@/components/FingerDetector";
import { FingerDisplay } from "@/components/FingerDisplay";
import { Countdown } from "@/components/Countdown";
import { PrimaryButton } from "@/components/PrimaryButton";

const INVALID_GESTURES = ["None", "Зөвхөн 1 хуруу гаргана уу!"];

export default function GamePage() {
  const router = useRouter();
  const params = useSearchParams();
  const autoReady = params.get("autoReady") === "true";

  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState("Холбогдож байна…");
  const [finger, setFinger] = useState("None");
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [playing, setPlaying] = useState(false);

  const lastGestureRef = useRef("None"); // Submitted gesture
  const lastValidGestureRef = useRef<string | null>(null); // Latest detected
  const countdownRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    const s = createSocket();
    setSocket(s);

    s.on("connect", () => setStatus("Холбогдсон"));
    s.on("disconnect", () => setStatus("Холбогдоогүй"));

    s.on("countdown_start", (v: number) => {
      setCountdown(v);
      countdownRef.current = true;
      submittedRef.current = false;
      lastGestureRef.current = "None";
      setPlaying(true);
    });

    s.on("countdown_tick", (v: number) => {
      setCountdown(v);

      if (v === 0 && !submittedRef.current) {
        submittedRef.current = true;
        countdownRef.current = false;
        setPlaying(false);

        lastGestureRef.current = lastValidGestureRef.current || "None";
        console.log("📤 Submitting gesture:", lastGestureRef.current);
        s.emit("submit_gesture", { gesture: lastGestureRef.current });
      }
    });

    s.on("match_result", ({ result, gesture }) => {
      setCountdown(null);
      setPlaying(false);

      const fingerToShow = gesture || lastGestureRef.current || "None";
      router.replace(`/result?status=${result}&finger=${fingerToShow}`);
    });

    return () => {
      s.removeAllListeners();
      s.disconnect();
    };
  }, []);

  const toggleReady = () => {
    if (!socket || playing) return;
    socket.emit("player_ready");
    setReady((p) => !p);
    setWaiting(true);
  };

  const onFingerDetected = (f: string) => {
    setFinger(f);

    if (!INVALID_GESTURES.includes(f)) {
      lastValidGestureRef.current = f;
      if (countdownRef.current) lastGestureRef.current = f;
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 pt-safe pb-safe gap-4">
      <div className="w-full max-w-md p-3 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-700 shadow-xl relative flex flex-col items-center">
        <div className={`absolute top-6 right-6 z-10 px-3 py-1 rounded-xl text-sm ${
          status === "Холбогдсон"
            ? "bg-green-500 text-white border"
            : status === "Холбогдож байна…"
            ? "bg-yellow-100 text-zinc-500 border"
            : "bg-red-100 text-red-500 border"
        }`}>
          {status}
        </div>

        <FingerDetector onFingerCount={onFingerDetected} />
        <div className="my-2 w-full">
          <FingerDisplay finger={finger} small />
        </div>

        {countdown !== null && (
          <div className="w-full flex justify-center my-2">
            <Countdown value={countdown} />
          </div>
        )}

        <PrimaryButton
          label={ready ? "Цуцлах" : "Бэлэн"}
          variant={ready ? "red" : "green"}
          onClick={toggleReady}
          disabled={status !== "Холбогдсон" || playing}
        />

        {waiting && ready && !playing && (
          <p className="text-yellow-400 mt-2 text-center text-xs sm:text-sm">
            Өрсөлдөгчийг хүлээж байна…
          </p>
        )}
      </div>
    </main>
  );
}
