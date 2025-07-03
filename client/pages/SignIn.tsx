import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-black text-white flex flex-col items-center justify-center px-8"
      style={{ height: "844px", width: "390px", margin: "0 auto" }}
    >
      {/* iPhone status bar */}
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

      <div className="text-center max-w-sm mx-auto">
        <h1 className="text-2xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Sign in to your Spaces AI account</p>

        <div className="space-y-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-base rounded-2xl">
            Continue with Google
          </Button>

          <Button className="w-full bg-gray-800 hover:bg-gray-700 py-4 text-base rounded-2xl">
            Continue with Apple
          </Button>

          <Button className="w-full bg-white text-black hover:bg-gray-100 py-4 text-base rounded-2xl">
            Continue with Email
          </Button>
        </div>

        <button
          className="mt-8 text-gray-400 hover:text-white transition-colors"
          onClick={() => navigate("/welcome")}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
