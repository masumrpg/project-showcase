import { Smartphone, Laptop, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DeviceSelectorProps {
  activeDevice: string;
  onDeviceChange: (device: string) => void;
  isDarkMode: boolean;
}

export function DeviceSelector({
  activeDevice,
  onDeviceChange,
  isDarkMode,
}: DeviceSelectorProps) {
  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5" />
          Device Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeDevice} onValueChange={onDeviceChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="iphone" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="macbook" className="flex items-center gap-2">
              <Laptop className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="both" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
