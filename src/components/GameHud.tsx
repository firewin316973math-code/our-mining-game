export function GameHud({
  day,
  carbon,
  energy,
  waste,
  greenCoverage,
  happiness,
  score,
  level,
}: {
  day: number;
  carbon: number;
  energy: number;
  waste: number;
  greenCoverage: number;
  happiness: number;
  score: number;
  level: number;
}) {
  const statCards = [
    { label: 'Carbon', value: `${carbon.toFixed(1)} kg` },
    { label: 'Energy', value: `${energy.toFixed(1)} kWh` },
    { label: 'Waste', value: `${waste.toFixed(1)} kg` },
    { label: 'Green', value: `${greenCoverage.toFixed(0)}%` },
    { label: 'Happiness', value: `${happiness.toFixed(0)}%` },
    { label: 'Score', value: `${score}` },
    { label: 'Day', value: `${day}` },
    { label: 'Level', value: `${level}` },
  ];

  return (
    <div className="hud">
      {statCards.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
