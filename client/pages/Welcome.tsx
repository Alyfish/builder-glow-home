import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const HouseBuildingAnimation = () => {
  const [buildStage, setBuildStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBuildStage((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-16 h-16 mx-auto mb-8">
      {/* Foundation line */}
      <div
        className={`absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-400 transition-all duration-500 ${
          buildStage >= 0 ? "w-8 opacity-100" : "w-0 opacity-0"
        }`}
      />

      {/* Left wall */}
      <div
        className={`absolute bottom-0 left-1/4 w-0.5 bg-blue-400 transition-all duration-500 ${
          buildStage >= 1 ? "h-6 opacity-100" : "h-0 opacity-0"
        }`}
      />

      {/* Right wall */}
      <div
        className={`absolute bottom-0 right-1/4 w-0.5 bg-blue-400 transition-all duration-500 ${
          buildStage >= 1 ? "h-6 opacity-100" : "h-0 opacity-0"
        }`}
      />

      {/* Roof line 1 */}
      <div
        className={`absolute bottom-6 left-1/4 w-4 h-0.5 bg-blue-400 origin-left transition-all duration-500 ${
          buildStage >= 2 ? "rotate-45 opacity-100" : "rotate-0 opacity-0"
        }`}
      />

      {/* Roof line 2 */}
      <div
        className={`absolute bottom-6 right-1/4 w-4 h-0.5 bg-blue-400 origin-right transition-all duration-500 ${
          buildStage >= 3 ? "-rotate-45 opacity-100" : "rotate-0 opacity-0"
        }`}
      />

      {/* Door */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 bg-blue-400 transition-all duration-500 ${
          buildStage >= 2 ? "h-4 opacity-100" : "h-0 opacity-0"
        }`}
      />

      {/* Sparkle effect */}
      {buildStage === 3 && (
        <div className="absolute -top-2 -left-2 -right-2 -bottom-2">
          <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
          <div
            className="absolute top-4 right-3 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute bottom-3 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
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
      <FloatingIcon x="10%" y="15%" delay={0}>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
          <span className="text-white text-lg">💰</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="80%" y="20%" delay={0.5}>
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">💎</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="15%" y="35%" delay={1}>
        <div className="w-11 h-11 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🚀</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="75%" y="45%" delay={1.5}>
        <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">⚡</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="20%" y="60%" delay={2}>
        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-blue-400 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">🔮</span>
        </div>
      </FloatingIcon>

      <FloatingIcon x="85%" y="65%" delay={2.5}>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">🌟</span>
        </div>
      </FloatingIcon>

      {/* Decorative stars */}
      <div className="absolute top-1/4 right-1/4 text-yellow-400 text-2xl animate-pulse">
        ✨
      </div>
      <div
        className="absolute top-1/3 left-1/3 text-yellow-400 text-lg animate-pulse"
        style={{ animationDelay: "1s" }}
      >
        ✨
      </div>
      <div
        className="absolute bottom-1/3 right-1/5 text-yellow-400 text-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      >
        ✨
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10">
        {/* House building animation */}
        <HouseBuildingAnimation />

        {/* Central logo */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 rounded-full flex items-center justify-center shadow-xl">
              <img
                src="https://cdn.builder.io/api/v1/assets/c51f377a7f5c40f8aa811e96184dc4d1/image-4883cb?format=webp&width=200"
                alt="Spaces AI"
                className="w-12 h-12 object-contain"
              />
            </div>
            {/* Outer ring */}
            <div
              className="absolute inset-0 w-24 h-24 border-4 border-blue-500 rounded-full animate-spin"
              style={{ animationDuration: "8s" }}
            ></div>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light mb-4 leading-tight">
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
