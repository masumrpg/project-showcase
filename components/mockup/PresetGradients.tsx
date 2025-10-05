interface PresetGradientsProps {
  gradientDirection: string;
  onPresetSelect: (start: string, end: string) => void;
}

const presets = [
  { name: "Ocean", start: "#667eea", end: "#764ba2" },
  { name: "Sunset", start: "#ff9a9e", end: "#fecfef" },
  { name: "Forest", start: "#56ab2f", end: "#a8e6cf" },
  { name: "Fire", start: "#ff512f", end: "#f09819" },
  { name: "Purple", start: "#667eea", end: "#764ba2" },
  { name: "Pink", start: "#ffecd2", end: "#fcb69f" },
];

export function PresetGradients({ gradientDirection, onPresetSelect }: PresetGradientsProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Quick Presets</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.name}
            onClick={() => onPresetSelect(preset.start, preset.end)}
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
  );
}