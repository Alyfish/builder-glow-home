import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HouseAnimation from "@/components/HouseAnimation";

export default function Animation() {
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);
  const [showHouse, setShowHouse] = useState(false);

  useEffect(() => {
    // Stage 0: Show dot for 1 second
    const timer1 = setTimeout(() => {
      setAnimationStage(1); // Dot blast
    }, 1000);

    // Stage 1: Blast effect for 0.5 seconds
    const timer2 = setTimeout(() => {
      setAnimationStage(2); // Start house building
      setShowHouse(true);
    }, 1500);

    // Navigate to next screen after animation completes
    const timer3 = setTimeout(() => {
      navigate("/next");
    }, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [navigate]);

  const HouseBuildingAnimation = () => {
    const [buildStage, setBuildStage] = useState(0);

    useEffect(() => {
      if (!showHouse) return;

      const interval = setInterval(() => {
        setBuildStage((prev) => {
          if (prev >= 8) return prev; // Stop at final stage
          return prev + 1;
        });
      }, 400);

      return () => clearInterval(interval);
    }, [showHouse]);

    return (
      <div className="relative w-32 h-32 mx-auto">
        {/* Foundation lines */}
        <div
          className={`absolute bottom-8 left-8 w-16 h-0.5 bg-red-500 origin-left transition-all duration-300 ${
            buildStage >= 0 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-8 left-8 right-8 h-0.5 bg-red-500 transition-all duration-300 ${
            buildStage >= 1 ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Left and right walls */}
        <div
          className={`absolute bottom-8 left-8 w-0.5 bg-red-500 origin-bottom transition-all duration-300 ${
            buildStage >= 2 ? "h-12 opacity-100" : "h-0 opacity-0"
          }`}
        />
        <div
          className={`absolute bottom-8 right-8 w-0.5 bg-red-500 origin-bottom transition-all duration-300 ${
            buildStage >= 3 ? "h-12 opacity-100" : "h-0 opacity-0"
          }`}
        />

        {/* Top horizontal line */}
        <div
          className={`absolute top-8 left-8 right-8 h-0.5 bg-red-500 transition-all duration-300 ${
            buildStage >= 4 ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Roof lines */}
        <div
          className={`absolute top-8 left-8 w-8 h-0.5 bg-red-500 origin-left transition-all duration-300 ${
            buildStage >= 5 ? "rotate-45 opacity-100" : "rotate-0 opacity-0"
          }`}
        />
        <div
          className={`absolute top-8 right-8 w-8 h-0.5 bg-red-500 origin-right transition-all duration-300 ${
            buildStage >= 6 ? "-rotate-45 opacity-100" : "rotate-0 opacity-0"
          }`}
        />

        {/* Door */}
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-0.5 bg-red-500 origin-bottom transition-all duration-300 ${
            buildStage >= 7 ? "h-6 opacity-100" : "h-0 opacity-0"
          }`}
        />

        {/* Window */}
        <div
          className={`absolute top-12 left-12 w-2 h-2 border border-red-500 transition-all duration-300 ${
            buildStage >= 8 ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sparkle effects */}
        {buildStage >= 8 && (
          <>
            <div className="absolute -top-2 -left-2 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
            <div
              className="absolute -top-1 -right-1 w-1 h-1 bg-red-400 rounded-full animate-ping"
              style={{ animationDelay: "0.3s" }}
            ></div>
            <div
              className="absolute -bottom-1 -left-1 w-1 h-1 bg-red-400 rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}
            ></div>
            <div
              className="absolute -bottom-2 -right-2 w-1 h-1 bg-red-400 rounded-full animate-ping"
              style={{ animationDelay: "0.9s" }}
            ></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className="h-screen bg-white text-black relative overflow-hidden"
      style={{ height: "844px", width: "390px", margin: "0 auto" }}
    >
      {/* iPhone status bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-3 text-sm font-medium z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black/60 rounded-full"></div>
          </div>
          <svg className="w-4 h-3 ml-1" viewBox="0 0 16 12" fill="currentColor">
            <path
              d="M1 3h14v6H1z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path d="M15 5v2h1V5z" />
          </svg>
          <div className="w-6 h-3 border border-black rounded-sm ml-1">
            <div className="w-full h-full bg-black rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full px-8 relative z-10">
        {/* 3D House building animation positioned above title */}
        <div className="mb-8">
          {animationStage === 0 && (
            <div className="w-8 h-8 bg-red-500 rounded-full mx-auto animate-pulse mb-4"></div>
          )}

          {animationStage === 1 && (
            <div className="relative mb-4">
              {/* Central blast dot */}
              <div className="w-8 h-8 bg-red-500 rounded-full mx-auto animate-ping"></div>

              {/* Blast particles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-2 h-2 bg-red-400 rounded-full absolute animate-ping"
                  style={{
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full absolute animate-ping"
                  style={{
                    bottom: "-10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    animationDelay: "0.1s",
                  }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full absolute animate-ping"
                  style={{
                    left: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    animationDelay: "0.2s",
                  }}
                ></div>
                <div
                  className="w-2 h-2 bg-red-400 rounded-full absolute animate-ping"
                  style={{
                    right: "-10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    animationDelay: "0.3s",
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* 3D House building animation */}
          {showHouse && (
            <div className="mb-4">
              <HouseAnimation loop={false} />
            </div>
          )}
        </div>

        {/* Spaces text positioned below the animation */}
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-wide text-black">
            Spaces
          </h1>
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-black/60">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span>Spaces AI</span>
        </div>
        <div className="flex items-center gap-2">
          <span>powered by</span>
          <span className="font-semibold">Builder</span>
        </div>
      </div>
    </div>
  );
}
