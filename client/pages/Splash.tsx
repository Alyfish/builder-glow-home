import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Splash() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);
  const [animatingDot, setAnimatingDot] = useState(false);

  useEffect(() => {
    // Show buttons after 1 second
    const buttonTimer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(buttonTimer);
  }, []);

  const handleCreateAccount = () => {
    setAnimatingDot(true);
    setTimeout(() => {
      navigate("/welcome");
    }, 800);
  };

  const handleSignIn = () => {
    setAnimatingDot(true);
    setTimeout(() => {
      navigate("/signin");
    }, 800);
  };

  return (
    <div
      className="h-screen bg-black flex flex-col text-white relative overflow-hidden"
      style={{ height: "844px", width: "390px", margin: "0 auto" }}
    >
      {/* iPhone status bar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-3 text-sm font-medium z-20">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
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
          <div className="w-6 h-3 border border-white rounded-sm ml-1">
            <div className="w-full h-full bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Brand text with animated dot */}
        <div className="text-center mb-12">
          <div className="relative">
            <h1 className="text-4xl font-light tracking-wider text-white">
              spaces
              <span
                className={`inline-block w-3 h-3 bg-blue-500 rounded-full ml-1 transition-all duration-800 ${
                  animatingDot ? "transform scale-150 animate-ping" : ""
                }`}
              ></span>
            </h1>
          </div>
        </div>

        {/* Buttons with fade-in animation */}
        <div
          className={`w-full max-w-sm space-y-4 transition-all duration-500 ${
            showButtons
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            className="w-full bg-white text-black hover:bg-gray-100 font-medium py-4 text-base rounded-2xl transition-all duration-200 hover:scale-105"
            onClick={handleCreateAccount}
          >
            Create new account
          </Button>

          <button
            className="w-full text-white text-base font-medium py-4 hover:text-gray-300 transition-all duration-200 hover:scale-105"
            onClick={handleSignIn}
          >
            I already have an account
          </button>
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-white/60">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
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
