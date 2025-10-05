import { Moon, Sun, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActionButtonsProps {
  isFullscreen: boolean;
  isDarkMode: boolean;
  onFullscreenToggle: () => void;
  onDarkModeToggle: () => void;
  onResetSettings: () => void;
}

export function ActionButtons({
  isFullscreen,
  isDarkMode,
  onFullscreenToggle,
  onDarkModeToggle,
  onResetSettings,
}: ActionButtonsProps) {
  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onFullscreenToggle}
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
          onClick={onDarkModeToggle}
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
          onClick={onResetSettings}
          className="w-full"
          variant="destructive"
          size="sm"
        >
          Reset All Settings
        </Button>
      </CardContent>
    </Card>
  );
}