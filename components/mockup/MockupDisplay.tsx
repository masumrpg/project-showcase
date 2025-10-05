import Image from "next/image";
import { Wifi } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MockupDisplayProps {
  activeDevice: string;
  websiteUrl: string;
  websiteScale: number;
  cornerRadius: number;
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  isFullscreen: boolean;
  isDarkMode: boolean;
  currentTime: Date;
  gradientStyle: React.CSSProperties;
}

export function MockupDisplay({
  activeDevice,
  websiteUrl,
  websiteScale,
  cornerRadius,
  shadowEnabled,
  shadowBlur,
  shadowSpread,
  shadowOpacity,
  isFullscreen,
  isDarkMode,
  currentTime,
  gradientStyle,
}: MockupDisplayProps) {
  const shadowFilter = shadowEnabled
    ? `drop-shadow(0 ${shadowBlur / 2}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})) drop-shadow(0 ${shadowSpread}px ${shadowSpread * 2}px rgba(0, 0, 0, ${shadowOpacity * 0.5}))`
    : "none";

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden flex items-center justify-center transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 min-h-screen p-4"
          : "min-h-[600px] p-8"
      }`}
      style={gradientStyle}
    >
      {activeDevice === "iphone" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="relative cursor-help"
                style={{ filter: shadowFilter }}
              >
                <Image
                  src="/images/iphone-mockup.png"
                  alt="iPhone Mockup"
                  width={300}
                  height={600}
                  className={`max-w-full h-auto ${
                    isFullscreen ? "max-h-[85vh]" : ""
                  }`}
                  style={{
                    height: isFullscreen ? "85vh" : "auto",
                    width: "auto",
                  }}
                  priority
                />
                <div
                  className="absolute top-[2.4%] left-[5.5%] right-[5.5%] bottom-[2.5%] overflow-hidden"
                  style={{ borderRadius: `${cornerRadius}px` }}
                >
                  {/* iPhone Status Bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 z-10 h-11 flex items-center justify-between px-6 text-sm font-medium ${
                      isDarkMode ? "text-white bg-black" : "text-black bg-white"
                    }`}
                  >
                    {/* iPhone Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 rounded-b-3xl bg-black border-2 border-gray-900">
                      {/* Speaker grille */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-1 rounded-full bg-gray-800" />
                      {/* Camera */}
                      <div className="absolute top-1.5 right-7 w-2.5 h-2.5 rounded-full bg-gray-900" />
                    </div>

                    {/* Left side - Time */}
                    <div className="flex items-center">
                      <span className="font-semibold">
                        {currentTime.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </span>
                    </div>

                    {/* Right side - Status indicators */}
                    <div className="flex items-center space-x-1">
                      {/* Signal strength */}
                      <div className="flex items-center space-x-0.5">
                        <div
                          className={`w-1 h-1 rounded-full ${
                            isDarkMode ? "bg-white" : "bg-black"
                          }`}
                        />
                        <div
                          className={`w-1 h-1.5 rounded-full ${
                            isDarkMode ? "bg-white" : "bg-black"
                          }`}
                        />
                        <div
                          className={`w-1 h-2 rounded-full ${
                            isDarkMode ? "bg-white" : "bg-black"
                          }`}
                        />
                        <div
                          className={`w-1 h-2.5 rounded-full ${
                            isDarkMode ? "bg-white" : "bg-black"
                          }`}
                        />
                      </div>

                      {/* WiFi icon */}
                      <Wifi
                        className={`w-4 h-4 ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      />

                      {/* Battery */}
                      <div className="flex items-center">
                        <div
                          className={`w-6 h-3 border rounded-sm relative ${
                            isDarkMode ? "border-white" : "border-black"
                          }`}
                        >
                          <div
                            className={`absolute inset-0.5 rounded-sm ${
                              isDarkMode ? "bg-white" : "bg-black"
                            }`}
                            style={{ width: "85%" }}
                          />
                        </div>
                        <div
                          className={`w-0.5 h-1.5 rounded-r-sm ml-0.5 ${
                            isDarkMode ? "bg-white" : "bg-black"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <iframe
                    src={websiteUrl}
                    className="w-full h-full border-0 bg-white origin-top-left"
                    title="Website Preview"
                    allow="cookies *"
                    allowFullScreen
                    style={{
                      transform: `scale(${websiteScale})`,
                      width: `${100 / websiteScale}%`,
                      height: `${100 / websiteScale}%`,
                      marginTop: "44px",
                      overflow: "hidden",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <p className="text-sm">
                <a
                  href="https://www.freepik.com/free-vector/realistic-front-view-smartphone-mockup-mobile-iphone-purple-frame-with-blank-white-display-vector_33632332.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline"
                >
                  Image by svstudioart on Freepik
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {activeDevice === "macbook" && (
        <div className="relative" style={{ filter: shadowFilter }}>
          <Image
            src="/images/macbook-mockup.png"
            alt="MacBook Mockup"
            width={800}
            height={500}
            className={`max-w-full h-auto ${
              isFullscreen ? "max-h-[85vh]" : ""
            }`}
            style={{
              height: isFullscreen ? "85vh" : "auto",
              width: "auto",
            }}
            priority
          />
          <div
            className="absolute top-[6.2%] left-[11.2%] right-[11.1%] bottom-[10.5%] overflow-hidden"
            style={{ borderRadius: `${cornerRadius}px` }}
          >
            <iframe
              src={websiteUrl}
              className="w-full h-full border-0 bg-white origin-top-left"
              title="Website Preview"
              allow="cookies *"
              allowFullScreen
              style={{
                transform: `scale(${websiteScale})`,
                width: `${100 / websiteScale}%`,
                height: `${100 / websiteScale}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}