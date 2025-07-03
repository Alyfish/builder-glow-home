import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HouseAnimation from "@/components/HouseAnimation";

const FloatingIcon = ({
  children,
  delay = 0,
  x,
  y,
}: {
  children: React.ReactNode;
  delay?: number;
  x: string;
  y: string;
}) => (
  <div
    className="absolute animate-bounce"
    style={{
      left: x,
      top: y,
      animationDelay: `${delay}s`,
      animationDuration: "3s",
    }}
  >
    {children}
  </div>
);

export default function Welcome() {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = () => {
    setShowContent(true);
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
        {/* Large centered dot */}
        <div className="mb-16">
          <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Main text - Coinbase style */}
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-wide text-black">
            Spaces.
          </h1>
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-black/60">
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
