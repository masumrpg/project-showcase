import {
  ArrowDown,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GradientControlsProps {
  gradientStart: string;
  gradientEnd: string;
  gradientDirection: string;
  onStartColorChange: (color: string) => void;
  onEndColorChange: (color: string) => void;
  onDirectionChange: (direction: string) => void;
  isDarkMode: boolean;
}

export function GradientControls({
  gradientStart,
  gradientEnd,
  gradientDirection,
  onStartColorChange,
  onEndColorChange,
  onDirectionChange,
  isDarkMode,
}: GradientControlsProps) {
  const gradientStyle = {
    background: `linear-gradient(${gradientDirection}, ${gradientStart}, ${gradientEnd})`,
  };

  const directionButtons = [
    { direction: "270deg", icon: ArrowUp, title: "Vertical" },
    { direction: "45deg", icon: ArrowUpRight, title: "Diagonal" },
    { direction: "0deg", icon: ArrowRight, title: "Horizontal" },
    { direction: "180deg", icon: ArrowLeft, title: "Horizontal" },
    { direction: "135deg", icon: ArrowDownLeft, title: "Diagonal" },
    { direction: "90deg", icon: ArrowDown, title: "Vertical" },
  ];

  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
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
              onChange={(e) => onStartColorChange(e.target.value)}
              className="w-12 h-10 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={gradientStart}
              onChange={(e) => onStartColorChange(e.target.value)}
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
              onChange={(e) => onEndColorChange(e.target.value)}
              className="w-12 h-10 rounded border cursor-pointer"
            />
            <input
              type="text"
              value={gradientEnd}
              onChange={(e) => onEndColorChange(e.target.value)}
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
            onValueChange={onDirectionChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gradient direction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="135deg">Diagonal ↘</SelectItem>
              <SelectItem value="90deg">Vertical ↓</SelectItem>
              <SelectItem value="0deg">Horizontal →</SelectItem>
              <SelectItem value="45deg">Diagonal ↗</SelectItem>
              <SelectItem value="180deg">Horizontal ←</SelectItem>
              <SelectItem value="270deg">Vertical ↑</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Quick Direction</Label>
          <div className="grid grid-cols-3 gap-2">
            {directionButtons.map(({ direction, icon: Icon, title }) => (
              <button
                key={direction}
                onClick={() => onDirectionChange(direction)}
                className={`p-2 border rounded flex items-center justify-center transition-colors ${
                  gradientDirection === direction
                    ? "bg-blue-500 text-white border-blue-500"
                    : isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                title={title}
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
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
  );
}