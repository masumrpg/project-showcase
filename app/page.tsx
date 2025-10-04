"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronUp,
  Wifi,
  Loader2,
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MockupScreenshotApp() {
  const defaultSettings = {
    gradientStart: "#56ab2f",
    gradientEnd: "#a8e6cf",
    gradientDirection: "135deg",
    activeDevice: "iphone",
    websiteUrl: "https://example.com",
    websiteScale: 1,
    cornerRadius: 50,
    shadowEnabled: true,
    shadowBlur: 40,
    shadowSpread: 0,
    shadowOpacity: 0.3,
    isDarkMode: false,
  };

  // Initialize with default values first
  const [gradientStart, setGradientStart] = useState(
    defaultSettings.gradientStart
  );
  const [gradientEnd, setGradientEnd] = useState(defaultSettings.gradientEnd);
  const [gradientDirection, setGradientDirection] = useState(
    defaultSettings.gradientDirection
  );
  const [activeDevice, setActiveDevice] = useState(
    defaultSettings.activeDevice
  );
  const mockupRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [websiteUrl, setWebsiteUrl] = useState(defaultSettings.websiteUrl);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [websiteScale, setWebsiteScale] = useState(
    defaultSettings.websiteScale
  );
  const [cornerRadius, setCornerRadius] = useState(
    defaultSettings.cornerRadius
  );
  const [shadowEnabled, setShadowEnabled] = useState(
    defaultSettings.shadowEnabled
  );
  const [shadowBlur, setShadowBlur] = useState(defaultSettings.shadowBlur);
  const [shadowSpread, setShadowSpread] = useState(
    defaultSettings.shadowSpread
  );
  const [shadowOpacity, setShadowOpacity] = useState(
    defaultSettings.shadowOpacity
  );
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(defaultSettings.isDarkMode);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("mockupSettings");
        if (stored) {
          const settings = JSON.parse(stored);
          setGradientStart(
            settings.gradientStart || defaultSettings.gradientStart
          );
          setGradientEnd(settings.gradientEnd || defaultSettings.gradientEnd);
          setGradientDirection(
            settings.gradientDirection || defaultSettings.gradientDirection
          );
          setActiveDevice(
            settings.activeDevice || defaultSettings.activeDevice
          );
          setWebsiteUrl(settings.websiteUrl || defaultSettings.websiteUrl);
          setWebsiteScale(
            settings.websiteScale || defaultSettings.websiteScale
          );
          setCornerRadius(
            settings.cornerRadius || defaultSettings.cornerRadius
          );
          setShadowEnabled(
            settings.shadowEnabled !== undefined
              ? settings.shadowEnabled
              : defaultSettings.shadowEnabled
          );
          setShadowBlur(settings.shadowBlur || defaultSettings.shadowBlur);
          setShadowSpread(
            settings.shadowSpread || defaultSettings.shadowSpread
          );
          setShadowOpacity(
            settings.shadowOpacity || defaultSettings.shadowOpacity
          );
          setIsDarkMode(
            settings.isDarkMode !== undefined
              ? settings.isDarkMode
              : defaultSettings.isDarkMode
          );

          // Apply dark mode immediately if stored
          if (settings.isDarkMode) {
            document.documentElement.classList.add("dark");
          }
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const saveSettings = () => {
    if (typeof window !== "undefined" && isLoaded) {
      try {
        const currentSettings = {
          gradientStart,
          gradientEnd,
          gradientDirection,
          activeDevice,
          websiteUrl,
          websiteScale,
          cornerRadius,
          shadowEnabled,
          shadowBlur,
          shadowSpread,
          shadowOpacity,
          isDarkMode,
        };
        localStorage.setItem("mockupSettings", JSON.stringify(currentSettings));
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const resetSettings = () => {
    setGradientStart(defaultSettings.gradientStart);
    setGradientEnd(defaultSettings.gradientEnd);
    setGradientDirection(defaultSettings.gradientDirection);
    setActiveDevice(defaultSettings.activeDevice);
    setWebsiteUrl(defaultSettings.websiteUrl);
    setWebsiteScale(defaultSettings.websiteScale);
    setCornerRadius(defaultSettings.cornerRadius);
    setShadowEnabled(defaultSettings.shadowEnabled);
    setShadowBlur(defaultSettings.shadowBlur);
    setShadowSpread(defaultSettings.shadowSpread);
    setShadowOpacity(defaultSettings.shadowOpacity);
    setIsDarkMode(defaultSettings.isDarkMode);

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("mockupSettings");
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (mockupRef.current?.requestFullscreen) {
          await mockupRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
    } catch (error) {
      console.error("Fullscreen failed:", error);
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, []);

  useEffect(() => {
    setCornerRadius(activeDevice === "iphone" ? 50 : 0);
  }, [activeDevice]);

  // Save settings whenever any setting changes (but only after loaded)
  useEffect(() => {
    if (isLoaded) {
      saveSettings();
    }
  }, [
    gradientStart,
    gradientEnd,
    gradientDirection,
    activeDevice,
    websiteUrl,
    websiteScale,
    cornerRadius,
    shadowEnabled,
    shadowBlur,
    shadowSpread,
    shadowOpacity,
    isDarkMode,
    isLoaded,
  ]);

  const gradientStyle = {
    background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`,
  };

  // Show loading screen while localStorage is loading
  if (!isLoaded) {
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

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Device Mockup Studio</h1>
          <p className="text-muted-foreground">
            Create beautiful device mockups with custom gradient backgrounds
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 flex flex-col h-fit">
            <div className="relative">
              {/* Scroll Up Indicator */}
              {canScrollUp && (
                <div
                  className={`absolute top-0 left-0 right-0 h-8 bg-gradient-to-b ${
                    isDarkMode
                      ? "from-gray-900 to-transparent"
                      : "from-white to-transparent"
                  } z-10 flex items-start justify-center pt-1`}
                >
                  <ChevronUp className="w-4 h-4 text-gray-400 animate-bounce" />
                </div>
              )}

              {/* Scrollable Content */}
              <div
                ref={scrollRef}
                className="max-h-[70vh] overflow-y-auto pr-2 space-y-6"
                onScroll={checkScrollPosition}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 #f1f5f9",
                }}
              >
                <Card
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      Device Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeDevice} onValueChange={setActiveDevice}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger
                          value="iphone"
                          className="flex items-center gap-2"
                        >
                          <Smartphone className="w-4 h-4" />
                          iPhone
                        </TabsTrigger>
                        <TabsTrigger
                          value="macbook"
                          className="flex items-center gap-2"
                        >
                          <Laptop className="w-4 h-4" />
                          MacBook
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <CardHeader>
                    <CardTitle>Website Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website-url">Enter Website URL</Label>
                      <input
                        id="website-url"
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className={`w-full px-3 py-2 border rounded text-sm ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            : ""
                        }`}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website-scale">
                        Website Scale: {websiteScale.toFixed(1)}x
                      </Label>
                      <input
                        id="website-scale"
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={websiteScale}
                        onChange={(e) =>
                          setWebsiteScale(Number.parseFloat(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0.5x</span>
                        <span>2.0x</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="corner-radius">
                        Corner Radius: {cornerRadius}px
                      </Label>
                      <input
                        id="corner-radius"
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={cornerRadius}
                        onChange={(e) =>
                          setCornerRadius(Number.parseInt(e.target.value))
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0px</span>
                        <span>50px</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Adjust scale and corners for better presentation
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <CardHeader>
                    <CardTitle>Shadow Effects</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="shadow-toggle">Enable Shadow</Label>
                      <button
                        id="shadow-toggle"
                        onClick={() => setShadowEnabled(!shadowEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          shadowEnabled ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            shadowEnabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>

                    {shadowEnabled && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="shadow-blur">
                            Shadow Blur: {shadowBlur}px
                          </Label>
                          <input
                            id="shadow-blur"
                            type="range"
                            min="0"
                            max="80"
                            step="5"
                            value={shadowBlur}
                            onChange={(e) =>
                              setShadowBlur(Number.parseInt(e.target.value))
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0px</span>
                            <span>80px</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shadow-spread">
                            Shadow Spread: {shadowSpread}px
                          </Label>
                          <input
                            id="shadow-spread"
                            type="range"
                            min="-20"
                            max="20"
                            step="2"
                            value={shadowSpread}
                            onChange={(e) =>
                              setShadowSpread(Number.parseInt(e.target.value))
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>-20px</span>
                            <span>20px</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="shadow-opacity">
                            Shadow Opacity: {Math.round(shadowOpacity * 100)}%
                          </Label>
                          <input
                            id="shadow-opacity"
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={shadowOpacity}
                            onChange={(e) =>
                              setShadowOpacity(
                                Number.parseFloat(e.target.value)
                              )
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>0%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Add realistic shadows to enhance the mockup
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}
                >
                  <CardHeader>
                    <CardTitle>Gradient Background</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="gradient-start">Start Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="gradient-start"
                          type="color"
                          value={gradientStart}
                          onChange={(e) => setGradientStart(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={gradientStart}
                          onChange={(e) => setGradientStart(e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded text-sm ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : ""
                          }`}
                          placeholder="#667eea"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gradient-end">End Color</Label>
                      <div className="flex items-center gap-2">
                        <input
                          id="gradient-end"
                          type="color"
                          value={gradientEnd}
                          onChange={(e) => setGradientEnd(e.target.value)}
                          className="w-12 h-10 rounded border cursor-pointer"
                        />
                        <input
                          type="text"
                          value={gradientEnd}
                          onChange={(e) => setGradientEnd(e.target.value)}
                          className={`flex-1 px-3 py-2 border rounded text-sm ${
                            isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : ""
                          }`}
                          placeholder="#764ba2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gradient-direction">Direction</Label>
                      <Select
                        value={gradientDirection}
                        onValueChange={setGradientDirection}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gradient direction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="135deg">Diagonal</SelectItem>
                          <SelectItem value="90deg">Vertical</SelectItem>
                          <SelectItem value="0deg">Horizontal</SelectItem>
                          <SelectItem value="45deg">Diagonal</SelectItem>
                          <SelectItem value="180deg">Horizontal</SelectItem>
                          <SelectItem value="270deg">Vertical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Quick Direction</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setGradientDirection("270deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "270deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Vertical ↑"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setGradientDirection("45deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "45deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Diagonal ↗"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setGradientDirection("0deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "0deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Horizontal →"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setGradientDirection("180deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "180deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Horizontal ←"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setGradientDirection("135deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "135deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Diagonal ↘"
                        >
                          <ArrowDownLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setGradientDirection("90deg")}
                          className={`p-2 border rounded flex items-center justify-center transition-colors ${
                            gradientDirection === "90deg"
                              ? "bg-blue-500 text-white border-blue-500"
                              : isDarkMode
                              ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                          title="Vertical ↓"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div
                        className="w-full h-16 rounded border"
                        style={gradientStyle}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Scroll Down Indicator */}
              {canScrollDown && (
                <div
                  className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t ${
                    isDarkMode
                      ? "from-gray-900 to-transparent"
                      : "from-white to-transparent"
                  } z-10 flex items-end justify-center pb-1`}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" />
                </div>
              )}
            </div>

            {/* Actions - Always visible at bottom */}
            <div className="mt-4">
              <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={toggleFullscreen}
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    {isFullscreen ? (
                      <>
                        <Minimize className="w-4 h-4 mr-2" />
                        Exit Fullscreen
                      </>
                    ) : (
                      <>
                        <Maximize className="w-4 h-4 mr-2" />
                        Enter Fullscreen
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={toggleDarkMode}
                    className="w-full"
                    size="lg"
                    variant={isDarkMode ? "secondary" : "default"}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={resetSettings}
                    className="w-full"
                    variant="destructive"
                    size="sm"
                  >
                    Reset All Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mockup Display */}
          <div className="lg:col-span-3">
            <div
              ref={mockupRef}
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
                          filter: shadowEnabled
                            ? `drop-shadow(0 ${
                                shadowBlur / 2
                              }px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})) drop-shadow(0 ${shadowSpread}px ${
                                shadowSpread * 2
                              }px rgba(0, 0, 0, ${shadowOpacity * 0.5}))`
                            : "none",
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
                            height: isFullscreen ? "85vh" : "auto",
                            width: "auto",
                          }}
                          priority
                        />
                        <div
                          className="absolute top-[2.4%] left-[5.5%] right-[5.5%] bottom-[2.5%] overflow-hidden"
                          style={{
                            borderRadius: `${cornerRadius}px`,
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
                            src={websiteUrl}
                            className="w-full h-full border-0 bg-white origin-top-left"
                            title="Website Preview"
                            allow="cookies *"
                            allowFullScreen
                            style={{
                              transform: `scale(${websiteScale})`,
                              width: `${100 / websiteScale}%`,
                              height: `${100 / websiteScale}%`,
                              marginTop: "44px", // Push content below status bar
                              overflow: "hidden",
                              scrollbarWidth: "none", // Firefox
                              msOverflowStyle: "none", // IE and Edge
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
                    filter: shadowEnabled
                      ? `drop-shadow(0 ${
                          shadowBlur / 2
                        }px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})) drop-shadow(0 ${shadowSpread}px ${
                          shadowSpread * 2
                        }px rgba(0, 0, 0, ${shadowOpacity * 0.5}))`
                      : "none",
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
                      height: isFullscreen ? "85vh" : "auto",
                      width: "auto",
                    }}
                    priority
                  />
                  <div
                    className="absolute top-[6.2%] left-[11.2%] right-[11.1%] bottom-[10.5%] overflow-hidden"
                    style={{
                      borderRadius: `${cornerRadius}px`,
                    }}
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
          </div>
        </div>

        {/* Quick Gradient Presets */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Quick Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: "Ocean", start: "#667eea", end: "#764ba2" },
              { name: "Sunset", start: "#ff9a9e", end: "#fecfef" },
              { name: "Forest", start: "#56ab2f", end: "#a8e6cf" },
              { name: "Fire", start: "#ff512f", end: "#f09819" },
              { name: "Purple", start: "#667eea", end: "#764ba2" },
              { name: "Pink", start: "#ffecd2", end: "#fcb69f" },
            ].map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setGradientStart(preset.start);
                  setGradientEnd(preset.end);
                }}
                className="h-16 rounded-lg border-2 border-transparent hover:border-white/50 transition-all duration-200 relative overflow-hidden group"
                style={{
                  background: `linear-gradient(${gradientDirection}, ${preset.start}, ${preset.end})`,
                }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
                <span className="relative text-white text-sm font-medium">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
