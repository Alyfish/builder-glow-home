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
      className="h-screen bg-black text-white relative overflow-hidden"
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

      {/* Floating background icons */}
      <FloatingIcon x="8%" y="15%" delay={0}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">💰</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="78%" y="18%" delay={0.5}>
        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">💎</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="12%" y="30%" delay={1}>
        <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🚀</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="82%" y="35%" delay={1.5}>
        <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">⚡</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="15%" y="65%" delay={2}>
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🔮</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="85%" y="70%" delay={2.5}>
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🌟</span>
        </div>
      </FloatingIcon>

      {/* Decorative stars */}
      <div className="absolute top-1/4 right-1/4 text-yellow-400 text-lg animate-pulse">
        ✨
      </div>
      <div
        className="absolute top-1/3 left-1/4 text-yellow-400 text-sm animate-pulse"
        style={{ animationDelay: "1s" }}
      >
        ✨
      </div>
      <div
        className="absolute bottom-1/3 right-1/5 text-yellow-400 text-base animate-pulse"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center h-full px-8 relative z-10">
        {/* 3D House building animation at top */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <HouseAnimation loop={true} onComplete={handleAnimationComplete} />
        </div>

        {/* Central dot that transitions from splash */}
        <div className="mb-8 mt-16">
          <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-8 animate-pulse"></div>

          {/* Central logo */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 rounded-full flex items-center justify-center shadow-xl">
              <img
                src="https://cdn.builder.io/api/v1/assets/c51f377a7f5c40f8aa811e96184dc4d1/image-4883cb?format=webp&width=200"
                alt="Spaces AI"
                className="w-10 h-10 object-contain"
              />
            </div>
            {/* Outer ring */}
            <div
              className="absolute inset-0 w-20 h-20 border-3 border-blue-500 rounded-full animate-spin"
              style={{ animationDuration: "8s" }}
            ></div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-light mb-4 leading-tight">
            Welcome to
            <br />
            <span className="font-bold">Spaces AI</span>
          </h1>

          <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
            By using Spaces AI, you agree to the{" "}
            <span className="text-blue-400 underline">terms</span> and{" "}
            <span className="text-blue-400 underline">privacy policy</span>
          </p>
        </div>

        {/* Action buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button
            className="w-full bg-white text-black hover:bg-gray-100 font-medium py-4 text-base rounded-2xl"
            onClick={() => navigate("/signup")}
          >
            Create new account
          </Button>

          <button
            className="w-full text-white text-base font-medium py-4 hover:text-gray-300 transition-colors"
            onClick={() => navigate("/signin")}
          >
            I already have an account
          </button>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full">
        <div className="w-1/3 h-full bg-white rounded-full"></div>
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
