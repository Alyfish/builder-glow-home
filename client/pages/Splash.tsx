import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate to welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* iPhone status bar simulation */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-3 text-sm font-medium">
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

      {/* Logo placeholder - using the provided image */}
      <div className="mb-8">
        <img
          src="https://cdn.builder.io/api/v1/assets/c51f377a7f5c40f8aa811e96184dc4d1/image-11365c?format=webp&width=200"
          alt="Spaces AI Logo"
          className="w-16 h-16 object-contain"
        />
      </div>

      {/* Main text */}
      <div className="text-center">
        <h1 className="text-3xl font-light tracking-wide">
          <span className="font-normal">spaces</span>{" "}
          <span className="font-bold">AI</span>
        </h1>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-8 w-32 h-1 bg-white/20 rounded-full">
        <div className="h-full bg-white rounded-full animate-pulse"></div>
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
