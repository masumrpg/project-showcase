import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface WebsiteSettingsProps {
  websiteUrl: string;
  websiteScale: number;
  cornerRadius: number;
  onUrlChange: (url: string) => void;
  onScaleChange: (scale: number) => void;
  onCornerRadiusChange: (radius: number) => void;
  isDarkMode: boolean;
}

export function WebsiteSettings({
  websiteUrl,
  websiteScale,
  cornerRadius,
  onUrlChange,
  onScaleChange,
  onCornerRadiusChange,
  isDarkMode,
}: WebsiteSettingsProps) {
  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
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
            onChange={(e) => onUrlChange(e.target.value)}
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
            onChange={(e) => onScaleChange(Number.parseFloat(e.target.value))}
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
            onChange={(e) => onCornerRadiusChange(Number.parseInt(e.target.value))}
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
  );
}