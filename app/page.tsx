"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  LoadingScreen,
  DeviceSelector,
  WebsiteSettings,
  ShadowControls,
  GradientControls,
  ActionButtons,
  MockupDisplay,
  PresetGradients,
} from "@/components/mockup";

export default function MockupScreenshotApp() {
  const defaultSettings = {
    gradientStart: "#56ab2f",
    gradientEnd: "#a8e6cf",
    gradientDirection: "135deg",
    activeDevice: "iphone",
    websiteUrl: "https://example.com",
    iphoneSettings: {
      websiteScale: 1,
      cornerRadius: 50,
      deviceScale: 1,
    },
    macbookSettings: {
      websiteScale: 1,
      cornerRadius: 0,
      deviceScale: 1,
    },
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
  const [iphoneSettings, setIphoneSettings] = useState(
    defaultSettings.iphoneSettings
  );
  const [macbookSettings, setMacbookSettings] = useState(
    defaultSettings.macbookSettings
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

  // Helper functions to get current device settings
  const getCurrentDeviceScale = () => {
    if (activeDevice === "iphone") return iphoneSettings.websiteScale;
    if (activeDevice === "macbook") return macbookSettings.websiteScale;
    return { iphone: iphoneSettings.websiteScale, macbook: macbookSettings.websiteScale };
  };

  const getCurrentDeviceRadius = () => {
    if (activeDevice === "iphone") return iphoneSettings.cornerRadius;
    if (activeDevice === "macbook") return macbookSettings.cornerRadius;
    return { iphone: iphoneSettings.cornerRadius, macbook: macbookSettings.cornerRadius };
  };

  const getCurrentDeviceScale2 = () => {
    if (activeDevice === "iphone") return iphoneSettings.deviceScale;
    if (activeDevice === "macbook") return macbookSettings.deviceScale;
    return { iphone: iphoneSettings.deviceScale, macbook: macbookSettings.deviceScale };
  };

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
          setIphoneSettings({
            websiteScale: settings.iphoneSettings?.websiteScale ?? defaultSettings.iphoneSettings.websiteScale,
            cornerRadius: settings.iphoneSettings?.cornerRadius ?? defaultSettings.iphoneSettings.cornerRadius,
            deviceScale: settings.iphoneSettings?.deviceScale ?? defaultSettings.iphoneSettings.deviceScale,
          });
          setMacbookSettings({
            websiteScale: settings.macbookSettings?.websiteScale ?? defaultSettings.macbookSettings.websiteScale,
            cornerRadius: settings.macbookSettings?.cornerRadius ?? defaultSettings.macbookSettings.cornerRadius,
            deviceScale: settings.macbookSettings?.deviceScale ?? defaultSettings.macbookSettings.deviceScale,
          });
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
          iphoneSettings,
          macbookSettings,
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
    setIphoneSettings(defaultSettings.iphoneSettings);
    setMacbookSettings(defaultSettings.macbookSettings);
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
    iphoneSettings,
    macbookSettings,
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
    return <LoadingScreen isDarkMode={isDarkMode} />;
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
                <DeviceSelector
                  activeDevice={activeDevice}
                  onDeviceChange={setActiveDevice}
                  isDarkMode={isDarkMode}
                />

                <WebsiteSettings
                  websiteUrl={websiteUrl}
                  activeDevice={activeDevice}
                  iphoneSettings={iphoneSettings}
                  macbookSettings={macbookSettings}
                  onUrlChange={setWebsiteUrl}
                  onIphoneScaleChange={(scale) => setIphoneSettings(prev => ({ ...prev, websiteScale: scale }))}
                  onMacbookScaleChange={(scale) => setMacbookSettings(prev => ({ ...prev, websiteScale: scale }))}
                  onIphoneCornerRadiusChange={(radius) => setIphoneSettings(prev => ({ ...prev, cornerRadius: radius }))}
                  onMacbookCornerRadiusChange={(radius) => setMacbookSettings(prev => ({ ...prev, cornerRadius: radius }))}
                  onIphoneDeviceScaleChange={(scale) => setIphoneSettings(prev => ({ ...prev, deviceScale: scale }))}
                  onMacbookDeviceScaleChange={(scale) => setMacbookSettings(prev => ({ ...prev, deviceScale: scale }))}
                  isDarkMode={isDarkMode}
                />

                <ShadowControls
                  shadowEnabled={shadowEnabled}
                  shadowBlur={shadowBlur}
                  shadowSpread={shadowSpread}
                  shadowOpacity={shadowOpacity}
                  onShadowToggle={() => setShadowEnabled(!shadowEnabled)}
                  onShadowBlurChange={setShadowBlur}
                  onShadowSpreadChange={setShadowSpread}
                  onShadowOpacityChange={setShadowOpacity}
                  isDarkMode={isDarkMode}
                />

                <GradientControls
                  gradientStart={gradientStart}
                  gradientEnd={gradientEnd}
                  gradientDirection={gradientDirection}
                  onStartColorChange={setGradientStart}
                  onEndColorChange={setGradientEnd}
                  onDirectionChange={setGradientDirection}
                  isDarkMode={isDarkMode}
                />
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
              <ActionButtons
                isFullscreen={isFullscreen}
                isDarkMode={isDarkMode}
                onFullscreenToggle={toggleFullscreen}
                onDarkModeToggle={toggleDarkMode}
                onResetSettings={resetSettings}
              />
            </div>
          </div>

          {/* Mockup Display */}
          <div className="lg:col-span-3" ref={mockupRef}>
            <MockupDisplay
              activeDevice={activeDevice}
              websiteUrl={websiteUrl}
              iphoneSettings={iphoneSettings}
              macbookSettings={macbookSettings}
              shadowEnabled={shadowEnabled}
              shadowBlur={shadowBlur}
              shadowSpread={shadowSpread}
              shadowOpacity={shadowOpacity}
              isFullscreen={isFullscreen}
              isDarkMode={isDarkMode}
              currentTime={currentTime}
              gradientStyle={gradientStyle}
            />
          </div>
        </div>

        <PresetGradients
          gradientDirection={gradientDirection}
          onPresetSelect={(start, end) => {
            setGradientStart(start);
            setGradientEnd(end);
          }}
        />
      </div>
    </div>
  );
}