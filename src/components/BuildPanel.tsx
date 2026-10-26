import type { BuildingType } from '../game/types';

export function BuildPanel({
  selectedTool,
  onSelect,
  options,
}: {
  selectedTool: BuildingType | null;
  onSelect: (tool: BuildingType) => void;
  options: Array<{ type: BuildingType; label: string; accent: string }>;
}) {
  return (
    <div className="toolbar">
      {options.map((option) => (
        <button
          key={option.type}
          type="button"
          className={`build-button ${selectedTool === option.type ? 'active' : ''}`}
          onClick={() => onSelect(option.type)}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: option.accent,
              display: 'inline-block',
              boxShadow: '0 0 0 2px rgba(255,255,255,0.6)',
            }}
          />
          {option.label}
        </button>
      ))}
    </div>
  );
}
