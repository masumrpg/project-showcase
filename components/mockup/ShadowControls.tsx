import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ShadowControlsProps {
  shadowEnabled: boolean;
  shadowBlur: number;
  shadowSpread: number;
  shadowOpacity: number;
  onShadowToggle: () => void;
  onShadowBlurChange: (blur: number) => void;
  onShadowSpreadChange: (spread: number) => void;
  onShadowOpacityChange: (opacity: number) => void;
  isDarkMode: boolean;
}

export function ShadowControls({
  shadowEnabled,
  shadowBlur,
  shadowSpread,
  shadowOpacity,
  onShadowToggle,
  onShadowBlurChange,
  onShadowSpreadChange,
  onShadowOpacityChange,
  isDarkMode,
}: ShadowControlsProps) {
  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle>Shadow Effects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="shadow-toggle">Enable Shadow</Label>
          <button
            id="shadow-toggle"
            onClick={onShadowToggle}
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
                onChange={(e) => onShadowBlurChange(Number.parseInt(e.target.value))}
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
                onChange={(e) => onShadowSpreadChange(Number.parseInt(e.target.value))}
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
                  onShadowOpacityChange(Number.parseFloat(e.target.value))
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
  );
}