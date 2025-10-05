"use client";

import { useRef } from "react";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { BackgroundImageSettings } from "./types";

interface BackgroundImageControlsProps {
  settings: BackgroundImageSettings;
  onUpdate: (updates: Partial<BackgroundImageSettings>) => void;
  onClear: () => void;
  isDarkMode: boolean;
  idPrefix?: string;
}

export function BackgroundImageControls({
  settings,
  onUpdate,
  onClear,
  isDarkMode,
  idPrefix,
}: BackgroundImageControlsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onUpdate({ imageData: result, enabled: true });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onClear();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const controlsDisabled = !settings.enabled || !settings.imageData;
  const prefix = idPrefix ?? "background";

  return (
    <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Custom Background Image
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex items-center justify-between">
          <Label htmlFor={`${prefix}-toggle`}>Enable Background Image</Label>
          <button
            id={`${prefix}-toggle`}
            onClick={() => onUpdate({ enabled: !settings.enabled })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.enabled ? "bg-blue-600" : "bg-gray-200"
            }`}
            type="button"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleFileSelect}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded border transition-colors ${
              isDarkMode
                ? "border-gray-600 text-white hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Upload className="w-4 h-4" />
            {settings.imageData ? "Ganti Gambar" : "Upload Gambar"}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={!settings.imageData}
            className={`flex items-center gap-2 px-3 py-2 text-sm rounded border transition-colors ${
              !settings.imageData
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : isDarkMode
                ? "border-red-500 text-red-400 hover:bg-red-500/10"
                : "border-red-500 text-red-500 hover:bg-red-50"
            }`}
          >
            <Trash2 className="w-4 h-4" />
            Hapus
          </button>
        </div>

        {settings.imageData && (
          <div className="space-y-2">
            <Label>Preview</Label>
            <div
              className="w-full h-32 rounded border bg-gray-100 dark:bg-gray-900 bg-center bg-cover"
              style={{ backgroundImage: `url(${settings.imageData})` }}
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${prefix}-offset-x`}>
              Posisi Horizontal: {settings.offsetX}px
            </Label>
            <input
              id={`${prefix}-offset-x`}
              type="range"
              min="-400"
              max="400"
              step="5"
              value={settings.offsetX}
              onChange={(event) =>
                onUpdate({ offsetX: Number.parseInt(event.target.value, 10) })
              }
              className="w-full"
              disabled={controlsDisabled}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-400px</span>
              <span>400px</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${prefix}-offset-y`}>
              Posisi Vertikal: {settings.offsetY}px
            </Label>
            <input
              id={`${prefix}-offset-y`}
              type="range"
              min="-400"
              max="400"
              step="5"
              value={settings.offsetY}
              onChange={(event) =>
                onUpdate({ offsetY: Number.parseInt(event.target.value, 10) })
              }
              className="w-full"
              disabled={controlsDisabled}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-400px</span>
              <span>400px</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${prefix}-scale`}>
              Skala: {settings.scale.toFixed(2)}x
            </Label>
            <input
              id={`${prefix}-scale`}
              type="range"
              min="0.5"
              max="3"
              step="0.05"
              value={settings.scale}
              onChange={(event) =>
                onUpdate({ scale: Number.parseFloat(event.target.value) })
              }
              className="w-full"
              disabled={controlsDisabled}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5x</span>
              <span>3.0x</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${prefix}-rotation`}>
              Rotasi: {Math.round(settings.rotation)}°
            </Label>
            <input
              id={`${prefix}-rotation`}
              type="range"
              min="-180"
              max="180"
              step="1"
              value={settings.rotation}
              onChange={(event) =>
                onUpdate({ rotation: Number.parseInt(event.target.value, 10) })
              }
              className="w-full"
              disabled={controlsDisabled}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-180°</span>
              <span>180°</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Gunakan gambar latar belakang kustom untuk memberikan nuansa unik pada
          mockup kamu.
        </p>
      </CardContent>
    </Card>
  );
}
