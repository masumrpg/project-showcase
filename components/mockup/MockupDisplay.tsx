import Image from "next/image";
import { Wifi, X, Settings, RefreshCw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Smartphone, Laptop } from "lucide-react";

interface MockupDisplayProps {
  activeDevice: string;
  websiteUrl: string;
  iphoneSettings: {
    websiteScale: number;
    cornerRadius: number;
    deviceScale: number;
  };
  macbookSettings: {
    websiteScale: number;
    cornerRadius: number;
    deviceScale: number;
  };
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  isFullscreen: boolean;
  isDarkMode: boolean;
  currentTime: Date;
  gradientStyle: React.CSSProperties;
  refreshKey: number;
  showFullscreenSettings: boolean;
  onToggleFullscreenSettings: () => void;
  onRefreshWebsite: () => void;
  onIphoneScaleChange: (scale: number) => void;
  onMacbookScaleChange: (scale: number) => void;
  onIphoneCornerRadiusChange: (radius: number) => void;
  onMacbookCornerRadiusChange: (radius: number) => void;
  onIphoneDeviceScaleChange: (scale: number) => void;
  onMacbookDeviceScaleChange: (scale: number) => void;
}

export function MockupDisplay({
  activeDevice,
  websiteUrl,
  iphoneSettings,
  macbookSettings,
  shadowEnabled,
  shadowBlur,
  shadowSpread,
  shadowOpacity,
  isFullscreen,
  isDarkMode,
  currentTime,
  gradientStyle,
  refreshKey,
  showFullscreenSettings,
  onToggleFullscreenSettings,
  onRefreshWebsite,
  onIphoneScaleChange,
  onMacbookScaleChange,
  onIphoneCornerRadiusChange,
  onMacbookCornerRadiusChange,
  onIphoneDeviceScaleChange,
  onMacbookDeviceScaleChange,
}: MockupDisplayProps) {
  const shadowFilter = shadowEnabled
    ? `drop-shadow(0 ${
        shadowBlur / 2
      }px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})) drop-shadow(0 ${shadowSpread}px ${
        shadowSpread * 2
      }px rgba(0, 0, 0, ${shadowOpacity * 0.5}))`
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
                style={{
                  filter: shadowFilter,
                  transform: `scale(${iphoneSettings.deviceScale || 1})`,
                }}
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
                    height: isFullscreen
                      ? `${85 * (iphoneSettings.deviceScale || 1)}vh`
                      : "auto",
                    width: "auto",
                  }}
                  priority
                />
                <div
                  className="absolute top-[2.4%] left-[5.5%] right-[5.5%] bottom-[2.5%] overflow-hidden"
                  style={{
                    borderRadius: `${iphoneSettings.cornerRadius ?? 50}px`,
                  }}
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
                    src={`${websiteUrl}${refreshKey ? `#${refreshKey}` : ''}`}
                    className="w-full h-full border-0 bg-white origin-top-left"
                    title="Website Preview"
                    allow="cookies *"
                    allowFullScreen
                    style={{
                      transform: `scale(${iphoneSettings.websiteScale})`,
                      width: `${100 / iphoneSettings.websiteScale}%`,
                      height: `${100 / iphoneSettings.websiteScale}%`,
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
        <div
          className="relative"
          style={{
            filter: shadowFilter,
            transform: `scale(${macbookSettings.deviceScale || 1})`,
          }}
        >
          <Image
            src="/images/macbook-mockup.png"
            alt="MacBook Mockup"
            width={800}
            height={500}
            className={`max-w-full h-auto ${
              isFullscreen ? "max-h-[85vh]" : ""
            }`}
            style={{
              height: isFullscreen
                ? `${85 * (macbookSettings.deviceScale || 1)}vh`
                : "auto",
              width: "auto",
            }}
            priority
          />
          <div
            className="absolute top-[6.2%] left-[11.2%] right-[11.1%] bottom-[10.5%] overflow-hidden"
            style={{ borderRadius: `${macbookSettings.cornerRadius ?? 0}px` }}
          >
            <iframe
              src={`${websiteUrl}${refreshKey ? `#${refreshKey}` : ''}`}
              className="w-full h-full border-0 bg-white origin-top-left"
              title="Website Preview"
              allow="cookies *"
              allowFullScreen
              style={{
                transform: `scale(${macbookSettings.websiteScale})`,
                width: `${100 / macbookSettings.websiteScale}%`,
                height: `${100 / macbookSettings.websiteScale}%`,
              }}
            />
          </div>
        </div>
      )}

      {activeDevice === "both" && (
        <TooltipProvider>
          <div
            className={`flex flex-col lg:flex-row gap-8 items-center justify-center ${
              isFullscreen ? "h-[85vh]" : ""
            }`}
          >
            {/* iPhone */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative cursor-help"
                  style={{
                    filter: shadowFilter,
                    transform: `scale(${iphoneSettings.deviceScale || 1})`,
                  }}
                >
                  <Image
                    src="/images/iphone-mockup.png"
                    alt="iPhone Mockup"
                    width={240}
                    height={480}
                    className={`max-w-full h-auto ${
                      isFullscreen ? "max-h-[70vh]" : ""
                    }`}
                    style={{
                      height: isFullscreen
                        ? `${40 * (iphoneSettings.deviceScale || 1)}vh`
                        : "auto",
                      width: "auto",
                    }}
                    priority
                  />
                  <div
                    className="absolute top-[2.4%] left-[5.5%] right-[5.5%] bottom-[2.5%] overflow-hidden"
                    style={{
                      borderRadius: `${iphoneSettings.cornerRadius ?? 50}px`,
                    }}
                  >
                    {/* iPhone Status Bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 z-10 h-11 flex items-center justify-between px-6 text-sm font-medium ${
                        isDarkMode
                          ? "text-white bg-black"
                          : "text-black bg-white"
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
                      src={`${websiteUrl}${refreshKey ? `#${refreshKey}` : ''}`}
                      className="w-full h-full border-0 bg-white origin-top-left"
                      title="Website Preview - iPhone"
                      allow="cookies *"
                      allowFullScreen
                      style={{
                        transform: `scale(${iphoneSettings.websiteScale})`,
                        width: `${100 / iphoneSettings.websiteScale}%`,
                        height: `${100 / iphoneSettings.websiteScale}%`,
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
                <p className="text-sm">iPhone Mockup</p>
              </TooltipContent>
            </Tooltip>

            {/* MacBook */}
            <div
              className="relative"
              style={{
                filter: shadowFilter,
                transform: `scale(${macbookSettings.deviceScale || 1})`,
              }}
            >
              <Image
                src="/images/macbook-mockup.png"
                alt="MacBook Mockup"
                width={640}
                height={400}
                className={`max-w-full h-auto ${
                  isFullscreen ? "max-h-[70vh]" : ""
                }`}
                style={{
                  height: isFullscreen
                    ? `${50 * (macbookSettings.deviceScale || 1)}vh`
                    : "auto",
                  width: "auto",
                }}
                priority
              />
              <div
                className="absolute top-[6.2%] left-[11.2%] right-[11.1%] bottom-[10.5%] overflow-hidden"
                style={{
                  borderRadius: `${macbookSettings.cornerRadius ?? 0}px`,
                }}
              >
                <iframe
                  src={`${websiteUrl}${refreshKey ? `#${refreshKey}` : ''}`}
                  className="w-full h-full border-0 bg-white origin-top-left"
                  title="Website Preview - MacBook"
                  allow="cookies *"
                  allowFullScreen
                  style={{
                    transform: `scale(${macbookSettings.websiteScale})`,
                    width: `${100 / macbookSettings.websiteScale}%`,
                    height: `${100 / macbookSettings.websiteScale}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </TooltipProvider>
      )}

      {/* Fullscreen Settings Overlay */}
      {isFullscreen && showFullscreenSettings && (
        <div
          data-fullscreen-settings="true"
          className="fixed inset-y-0 left-0 w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 z-50 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Fullscreen Settings</h2>
              </div>
              <button
                onClick={() => onToggleFullscreenSettings()}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Website URL */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Website URL</Label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => console.log("URL change:", e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border rounded bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  disabled
                />
                <button
                  onClick={onRefreshWebsite}
                  className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center gap-2"
                  title="Refresh Website"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                URL cannot be changed in fullscreen mode, but you can refresh the website
              </p>
            </div>

            {/* iPhone Settings */}
            {(activeDevice === "iphone" || activeDevice === "both") && (
              <Card
                className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Smartphone className="w-4 h-4" />
                    iPhone Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Website Scale:{" "}
                      {(iphoneSettings.websiteScale ?? 1).toFixed(1)}x
                    </Label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={iphoneSettings.websiteScale ?? 1}
                      onChange={(e) =>
                        onIphoneScaleChange(Number.parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">
                      Corner Radius: {iphoneSettings.cornerRadius ?? 50}px
                    </Label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={iphoneSettings.cornerRadius ?? 50}
                      onChange={(e) =>
                        onIphoneCornerRadiusChange(
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0px</span>
                      <span>50px</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">
                      Device Scale:{" "}
                      {(iphoneSettings.deviceScale ?? 1).toFixed(1)}x
                    </Label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={iphoneSettings.deviceScale ?? 1}
                      onChange={(e) =>
                        onIphoneDeviceScaleChange(
                          Number.parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.5x</span>
                      <span>1.5x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* MacBook Settings */}
            {(activeDevice === "macbook" || activeDevice === "both") && (
              <Card
                className={`${isDarkMode ? "bg-gray-800 border-gray-700" : ""}`}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Laptop className="w-4 h-4" />
                    MacBook Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm">
                      Website Scale:{" "}
                      {(macbookSettings.websiteScale ?? 1).toFixed(1)}x
                    </Label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={macbookSettings.websiteScale ?? 1}
                      onChange={(e) =>
                        onMacbookScaleChange(Number.parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">
                      Corner Radius: {macbookSettings.cornerRadius ?? 0}px
                    </Label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={macbookSettings.cornerRadius ?? 0}
                      onChange={(e) =>
                        onMacbookCornerRadiusChange(
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0px</span>
                      <span>50px</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">
                      Device Scale:{" "}
                      {(macbookSettings.deviceScale ?? 1).toFixed(1)}x
                    </Label>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={macbookSettings.deviceScale ?? 1}
                      onChange={(e) =>
                        onMacbookDeviceScaleChange(
                          Number.parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0.5x</span>
                      <span>1.5x</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>💡 Move mouse to the left edge to show/hide settings</p>
              <p>⏱️ Settings auto-hide after 3 seconds</p>
              <p>🖱️ Click X button or move mouse away to close</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}