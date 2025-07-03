import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import HouseAnimation from "@/components/HouseAnimation";

export default function Welcome() {
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);
  const [showHouseAnimation, setShowHouseAnimation] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Stage 0: Show initial layout for 2 seconds
    const timer1 = setTimeout(() => {
      setAnimationStage(1); // Start dot movement and text fade
    }, 2000);

    // Stage 1: Dot moves up, text fades (1 second)
    const timer2 = setTimeout(() => {
      setAnimationStage(2); // Dot reaches center
      setShowHouseAnimation(true); // Start house building
    }, 3000);

    // Stage 2: House animation completes (5 seconds)
    const timer3 = setTimeout(() => {
      setAnimationStage(3); // Show buttons
      setShowButtons(true);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

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
        {/* Initial layout: Spaces text + dot side by side */}
        {animationStage === 0 && (
          <div className="flex flex-row items-center">
            <div className="text-center">
              <div className="text-5xl font-light tracking-wide text-black">
                Spaces
              </div>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse mt-3 ml-4"></div>
          </div>
        )}

        {/* Transition stage: Dot moves up, text fades */}
        {animationStage === 1 && (
          <>
            {/* Fading "Spaces" text */}
            <div className="text-center transition-opacity duration-1000 opacity-0">
              <div className="text-5xl font-light tracking-wide text-black">
                Spaces
              </div>
            </div>

            {/* Moving dot */}
            <div
              className="w-8 h-8 bg-red-500 rounded-full animate-pulse absolute transition-all duration-1000 ease-out"
              style={{
                transform: "translateY(-150px)",
                left: "50%",
                marginLeft: "-16px",
              }}
            ></div>
          </>
        )}

        {/* House animation stage */}
        {animationStage >= 2 && (
          <div className="flex flex-col items-center">
            {/* Centered dot that becomes house origin */}
            <div className="mb-4">
              {!showHouseAnimation && (
                <div className="w-8 h-8 bg-red-500 rounded-full animate-pulse"></div>
              )}

              {/* 3D House building animation */}
              {showHouseAnimation && (
                <div className="relative">
                  <HouseAnimation loop={false} />
                  {/* Keep a small dot at center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action buttons - fade in after house animation */}
        {showButtons && (
          <div className="w-full max-w-sm space-y-4 mt-8 transition-all duration-1000 ease-out opacity-100 transform translate-y-0">
            <Button
              className="w-full bg-red-500 text-white hover:bg-red-600 font-medium py-4 text-base rounded-2xl transition-all duration-200 hover:scale-105"
              onClick={() => alert("Create account functionality")}
            >
              Create new account
            </Button>

            <button
              className="w-full text-black text-base font-medium py-4 hover:text-gray-600 transition-all duration-200 hover:scale-105"
              onClick={() => alert("Sign in functionality")}
            >
              I already have an account
            </button>
          </div>
        )}
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
