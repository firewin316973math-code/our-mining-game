import type { GameState } from '../game/types';
import { MISSIONS } from '../game/missions';

export function MissionsPanel({ state }: { state: GameState }) {
  return (
    <div className="mission-list">
      {MISSIONS.map((mission) => {
        const complete = mission.isComplete(state) || state.completedMissions.includes(mission.id);

        return (
          <div key={mission.id} className={`mission-card ${complete ? 'complete' : ''}`}>
            <h3 className="card-title">{mission.title}</h3>
            <p className="card-body">{mission.description}</p>
            <div className="small-note">{complete ? 'Completed' : 'In progress'}</div>
          </div>
        );
      })}
    </div>
  );
}
