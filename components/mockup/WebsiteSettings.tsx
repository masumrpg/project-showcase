import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Smartphone, Laptop, RefreshCw } from "lucide-react";

interface WebsiteSettingsProps {
  websiteUrl: string;
  activeDevice: string;
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
  onUrlChange: (url: string) => void;
  onRefreshWebsite: () => void;
  onIphoneScaleChange: (scale: number) => void;
  onMacbookScaleChange: (scale: number) => void;
  onIphoneCornerRadiusChange: (radius: number) => void;
  onMacbookCornerRadiusChange: (radius: number) => void;
  onIphoneDeviceScaleChange: (scale: number) => void;
  onMacbookDeviceScaleChange: (scale: number) => void;
  isDarkMode: boolean;
}

export function WebsiteSettings({
  websiteUrl,
  activeDevice,
  iphoneSettings,
  macbookSettings,
  onUrlChange,
  onRefreshWebsite,
  onIphoneScaleChange,
  onMacbookScaleChange,
  onIphoneCornerRadiusChange,
  onMacbookCornerRadiusChange,
  onIphoneDeviceScaleChange,
  onMacbookDeviceScaleChange,
  isDarkMode,
}: WebsiteSettingsProps) {
  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle>Website Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Website URL - Shared */}
        <div className="space-y-2">
          <Label htmlFor="website-url">Enter Website URL</Label>
          <div className="flex gap-2">
            <input
              id="website-url"
              type="url"
              value={websiteUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              className={`flex-1 px-3 py-2 border rounded text-sm ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : ""
              }`}
              placeholder="https://example.com"
            />
            <button
              onClick={onRefreshWebsite}
              className="px-3 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center gap-2"
              title="Refresh Website"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* iPhone Settings */}
        {(activeDevice === "iphone" || activeDevice === "both") && (
          <div className={`space-y-4 p-4 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <Label className="font-semibold">iPhone Settings</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iphone-scale">
                Website Scale: {(iphoneSettings.websiteScale ?? 1).toFixed(1)}x
              </Label>
              <input
                id="iphone-scale"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={iphoneSettings.websiteScale ?? 1}
                onChange={(e) => onIphoneScaleChange(Number.parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iphone-radius">
                Corner Radius: {(iphoneSettings.cornerRadius ?? 50)}px
              </Label>
              <input
                id="iphone-radius"
                type="range"
                min="0"
                max="50"
                step="1"
                value={iphoneSettings.cornerRadius ?? 50}
                onChange={(e) => onIphoneCornerRadiusChange(Number.parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0px</span>
                <span>50px</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iphone-device-scale">
                Device Scale: {(iphoneSettings.deviceScale ?? 1).toFixed(1)}x
              </Label>
              <input
                id="iphone-device-scale"
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={iphoneSettings.deviceScale ?? 1}
                onChange={(e) => onIphoneDeviceScaleChange(Number.parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>1.5x</span>
              </div>
            </div>
          </div>
        )}

        {/* MacBook Settings */}
        {(activeDevice === "macbook" || activeDevice === "both") && (
          <div className={`space-y-4 p-4 rounded-lg border ${
            isDarkMode ? "bg-gray-900 border-gray-600" : "bg-gray-50 border-gray-200"
          }`}>
            <div className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              <Label className="font-semibold">MacBook Settings</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="macbook-scale">
                Website Scale: {(macbookSettings.websiteScale ?? 1).toFixed(1)}x
              </Label>
              <input
                id="macbook-scale"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={macbookSettings.websiteScale ?? 1}
                onChange={(e) => onMacbookScaleChange(Number.parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>2.0x</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="macbook-radius">
                Corner Radius: {(macbookSettings.cornerRadius ?? 0)}px
              </Label>
              <input
                id="macbook-radius"
                type="range"
                min="0"
                max="50"
                step="1"
                value={macbookSettings.cornerRadius ?? 0}
                onChange={(e) => onMacbookCornerRadiusChange(Number.parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0px</span>
                <span>50px</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="macbook-device-scale">
                Device Scale: {(macbookSettings.deviceScale ?? 1).toFixed(1)}x
              </Label>
              <input
                id="macbook-device-scale"
                type="range"
                min="0.5"
                max="1.5"
                step="0.1"
                value={macbookSettings.deviceScale ?? 1}
                onChange={(e) => onMacbookDeviceScaleChange(Number.parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>1.5x</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Adjust scale and corners for better presentation. Settings are independent for each device.
        </p>
      </CardContent>
    </Card>
  );
}