"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SplashScreen from "../components/SplashScreen"; // Import SplashScreen

const SECRET_KEY = "eldenringisconceptofteam";

const createJWT = (role: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ role, iat: Date.now() }));
  const signature = btoa(SECRET_KEY);
  return `${header}.${payload}.${signature}`;
};

const decodeJWT = (token: string): { role: string } | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
};

const initializeToken = () => {
  if (typeof window === "undefined") return;

  const existingToken = sessionStorage.getItem("roleToken");
  if (!existingToken) {
    const defaultToken = createJWT("tarnished");
    sessionStorage.setItem("roleToken", defaultToken);
  }
};

const checkRole = (): string | null => {
  if (typeof window === "undefined") return null;

  const token = sessionStorage.getItem("roleToken");
  if (!token) return null;

  const decoded = decodeJWT(token);
  return decoded?.role || null;
};

export default function Page3() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleDoorClick = () => {
    const role = checkRole();

    if (role === "tarnished") {
      alert("โอ้ไม่มีสิทธิ์นั้น โอ้ไม่มีสิทธิ์");
      return;
    }

    if (role === "admin") {
      setIsOpening(true);

      // Start flash after door opens
      setTimeout(() => {
        setShowFlash(true);
      }, 800);

      // Navigate to admin page
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    }
  };

  useEffect(() => {
    initializeToken();
  }, []);

  if (showSplash)
    return (
      <SplashScreen
        chapter="CHAPTER 3"
        title="The Engine of Restoration"
        subtitle="Authorization System Recovery"
        onComplete={() => setShowSplash(false)}
      />
    );

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>

      {/* Fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

      {/* Door container */}
      <div className="relative flex items-center justify-center h-full">
        <button
          onClick={handleDoorClick}
          disabled={isOpening}
          className="relative group focus:outline-none"
          aria-label="Open the door"
        >
          {/* Door frame */}
          <div className="relative w-64 h-96 md:w-80 md:h-[32rem]">
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-amber-500/30 blur-3xl transition-opacity duration-700 ${
                isOpening ? "opacity-100" : "opacity-0 group-hover:opacity-50"
              }`}
            ></div>

            {/* Left door */}
            <div
              className={`absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-amber-900/80 via-amber-800/60 to-gray-900/80 
              border-2 border-amber-700/50 transition-all duration-1000 origin-left ${
                isOpening ? "-translate-x-full rotate-y-90 opacity-0" : ""
              }`}
            >
              <div className="absolute inset-2 border border-amber-600/30"></div>
              <div className="absolute top-1/2 right-4 w-3 h-8 bg-amber-500/60 rounded-full shadow-lg shadow-amber-500/50"></div>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-amber-600/50 rotate-45"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-600/50 rounded-full"></div>
              </div>
            </div>

            {/* Right door */}
            <div
              className={`absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-amber-900/80 via-amber-800/60 to-gray-900/80 
              border-2 border-amber-700/50 transition-all duration-1000 origin-right ${
                isOpening ? "translate-x-full rotate-y-90 opacity-0" : ""
              }`}
            >
              <div className="absolute inset-2 border border-amber-600/30"></div>
              <div className="absolute top-1/2 left-4 w-3 h-8 bg-amber-500/60 rounded-full shadow-lg shadow-amber-500/50"></div>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-16 border-2 border-amber-600/50 rotate-45"></div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 border-2 border-amber-600/50 rounded-full"></div>
              </div>
            </div>

            {/* Door frame border */}
            <div className="absolute inset-0 border-4 border-amber-700/70 pointer-events-none"></div>
            <div className="absolute -inset-2 border-2 border-amber-600/40 pointer-events-none"></div>
          </div>

          {/* Light from beyond the door */}
          <div
            className={`hover:cursor-pointer absolute inset-0 bg-gradient-to-t from-amber-400/0 via-amber-300/20 to-amber-200/40 transition-opacity duration-1000 ${
              isOpening ? "opacity-100" : "opacity-0"
            }`}
          ></div>

          {/* Hover prompt */}
          <div
            className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-amber-400 text-sm md:text-base font-semibold tracking-wider transition-opacity ${
              isOpening ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            Open
          </div>
        </button>
      </div>

      {/* White flash transition */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-500 pointer-events-none ${
          showFlash ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <h1
          className="text-2xl md:text-4xl font-bold text-amber-400 tracking-widest mb-2"
          style={{ fontFamily: "serif" }}
        >
          THE DOOR
        </h1>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
      </div>
    </div>
  );
}
