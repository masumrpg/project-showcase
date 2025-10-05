import { Loader2 } from "lucide-react";

interface LoadingScreenProps {
  isDarkMode: boolean;
}

export function LoadingScreen({ isDarkMode }: LoadingScreenProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="text-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
        <p
          className={`text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}
        >
          Loading settings...
        </p>
      </div>
    </div>
  );
}