import { useMemo, useState } from 'react';
import { CityScene } from './CityScene';
import { BuildPanel } from './BuildPanel';
import { GameHud } from './GameHud';
import { MissionsPanel } from './MissionsPanel';
import { createInitialState } from './game/levels';
import { TOOL_OPTIONS } from './game/levels';
import { simulateTurn } from './game/simulation';
import type { BuildingType, GameState } from './game/types';

const createReport = (state: GameState) => {
  const strongest = state.greed ?? 0;

  return [
    'EcoCity 2040 simulation report:',
    '- Solar panels reduce electricity demand over time.',
    '- Green infrastructure raises comfort and resident happiness.',
    '- Recycling and farming reduce waste and improve neighbourhood resilience.',
    '- A mixed strategy works better than relying on one solution alone.',
    `Overall score: ${state.score}.`,
  ].join('\n');
};

export default function App() {
  const [state, setState] = useState<GameState>(createInitialState());

  const report = useMemo(() => createReport(state), [state]);

  const handlePlace = (row: number, col: number) => {
    setState((previous) => {
      if (previous.grid[row]?.[col]) {
        return previous;
      }

      const nextGrid = previous.grid.map((item) => [...item]);
      nextGrid[row][col] = previous.selectedTool ?? 'solar';

      return {
        ...previous,
        grid: nextGrid,
        money: previous.money - 6,
      };
    });
  };

  const handleToolSelect = (tool: BuildingType) => {
    setState((previous) => ({ ...previous, selectedTool: tool }));
  };

  const handleAdvanceDay = () => {
    setState((previous) => simulateTurn(previous));
  };

  const handleReset = () => {
    setState(createInitialState());
  };

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark">E</div>
          <div>
            <h1>EcoCity 2040</h1>
            <p className="subtitle">A local, offline sustainability city simulator.</p>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={handleAdvanceDay}>
          Advance day
        </button>
      </div>

      <div className="layout">
        <section className="panel game-panel">
          <GameHud
            day={state.day}
            carbon={state.carbon}
            energy={state.energy}
            waste={state.waste}
            greenCoverage={state.greenCoverage}
            happiness={state.happiness}
            score={state.score}
            level={state.level}
          />

          <BuildPanel selectedTool={state.selectedTool} onSelect={handleToolSelect} options={TOOL_OPTIONS} />

          <CityScene grid={state.grid} onCellClick={handlePlace} />

          <div className="control-row">
            <button type="button" className="secondary-button" onClick={handleReset}>
              Reset neighbourhood
            </button>
            <button type="button" className="secondary-button" onClick={() => setState((p) => ({ ...p, level: Math.min(5, p.level + 1) }))}>
              Increase level
            </button>
          </div>
        </section>

        <aside className="panel side-panel">
          <div className="challenge-list">
            <div className="challenge-card">
              <h3 className="card-title">Current challenge</h3>
              <p className="card-body">
                {state.challenge ? `${state.challenge.title}: ${state.challenge.description}` : 'No active challenge — the city is stable.'}
              </p>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <h3 className="card-title">Missions</h3>
            <MissionsPanel state={state} />
          </div>

          <div className="report-box">
            <h3 className="card-title">Final report</h3>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, fontFamily: 'inherit' }}>{report}</pre>
          </div>
        </aside>
      </div>
    </div>
  );
}
