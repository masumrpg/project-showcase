"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Moon,
  Sun,
  Smartphone,
  Laptop,
  Maximize,
  Minimize,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function MockupScreenshotApp() {
  const [gradientStart, setGradientStart] = useState("#56ab2f");
  const [gradientEnd, setGradientEnd] = useState("#a8e6cf");
  const [gradientDirection, setGradientDirection] = useState("135deg");
  const [activeDevice, setActiveDevice] = useState("iphone");
  const mockupRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [websiteUrl, setWebsiteUrl] = useState("https://example.com");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [websiteScale, setWebsiteScale] = useState(1);
  const [cornerRadius, setCornerRadius] = useState(20);
  const [shadowEnabled, setShadowEnabled] = useState(true);
  const [shadowBlur, setShadowBlur] = useState(40);
  const [shadowSpread, setShadowSpread] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.3);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
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

  const gradientStyle = {
    background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`,
  };

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
                        step="2"
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
                      <select
                        id="gradient-direction"
                        value={gradientDirection}
                        onChange={(e) => setGradientDirection(e.target.value)}
                        className={`w-full px-3 py-2 border rounded text-sm ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : ""
                        }`}
                      >
                        <option value="135deg">Diagonal ↘</option>
                        <option value="90deg">Vertical ↓</option>
                        <option value="0deg">Horizontal →</option>
                        <option value="45deg">Diagonal ↗</option>
                        <option value="180deg">Horizontal ←</option>
                        <option value="270deg">Vertical ↑</option>
                      </select>
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
                    <iframe
                      src={websiteUrl}
                      className="w-full h-full border-0 bg-white origin-top-left"
                      title="Website Preview"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      style={{
                        transform: `scale(${websiteScale})`,
                        width: `${100 / websiteScale}%`,
                        height: `${100 / websiteScale}%`,
                      }}
                    />
                  </div>
                </div>
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
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
