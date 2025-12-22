"use client";

import React, { useRef, useEffect, useState } from "react";
import { HandLandmarker, FilesetResolver, HandLandmarkerResult } from "@mediapipe/tasks-vision";

interface FingerDetectorProps {
  onFingerCount: (finger: string) => void;
}

const FingerDetector: React.FC<FingerDetectorProps> = ({ onFingerCount }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const handLandmarkerRef = useRef<HandLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const detectFinger = (landmarks: Array<{ x: number; y: number; z: number }>) => {
    if (!landmarks || landmarks.length !== 21) return;

    // Determine if each finger is up
    const fingers: string[] = [];

    // Thumb: check relative to MCP joint (landmarks[2])
    if (landmarks[4].x < landmarks[2].x) fingers.push("Эрхий хуруу");

    // Index, Middle, Ring, Pinky: tip.y < pip.y
    const tips = [8, 12, 16, 20];
    const pips = [6, 10, 14, 18];
    const names = ["Долоовор хуруу", "Дунд хуруу", "Ядам хуруу", "Чигчий хуруу"];
    for (let i = 0; i < tips.length; i++) {
      if (landmarks[tips[i]].y < landmarks[pips[i]].y) fingers.push(names[i]);
    }

    // Only show one finger for UI
    const detected = fingers.length === 1 ? fingers[0] : "Зөвхөн 1 хуруу гаргана уу!";
    onFingerCount(detected);
  };

  const predictWebcam = async () => {
    const video = videoRef.current;
    const handLandmarker = handLandmarkerRef.current;
    if (!video || !handLandmarker) return;

    try {
      const results: HandLandmarkerResult = handLandmarker.detectForVideo(video, performance.now());
      if (results.landmarks && results.landmarks.length > 0) detectFinger(results.landmarks[0]);
    } catch (e) {
      console.warn("HandLandmarker detect error", e);
    }

    animationFrameRef.current = requestAnimationFrame(predictWebcam);
  };

  const startWebcam = async () => {
    if (!videoRef.current) return;

    if (videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
    }

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    videoRef.current.srcObject = stream;

    try {
      await videoRef.current.play();
    } catch (err) {
      console.warn("Video play interrupted", err);
    }

    animationFrameRef.current = requestAnimationFrame(predictWebcam);
  };

  const createHandLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    const landmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });

    handLandmarkerRef.current = landmarker;
    setLoading(false);
    startWebcam();
  };

  useEffect(() => {
    createHandLandmarker();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (handLandmarkerRef.current) handLandmarkerRef.current.close();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        style={{ transform: "rotateY(180deg)", width: "100%", borderRadius: "1rem" }}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default FingerDetector;
