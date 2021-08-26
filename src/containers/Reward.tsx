import { Dispatch, ReactElement, SetStateAction } from 'react';
import Entity, { Stats } from '../service/Entity';
import { GameState } from './Game';

type RewardProps = {
  player: Entity;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

const rewards: Array<Stats> = [
  {
    damage: 4,
    health: 0,
  },
  {
    damage: 2,
    health: 2,
  },
  {
    damage: 0,
    health: 4,
  },
];

export default function Reward({
  player,
  setGameState,
}: RewardProps): ReactElement {
  function chooseReward({ damage, health }: Stats) {
    player.levelUp(damage, health);
    setGameState(() => GameState.Battle);
  }

  return (
    <div>
      <div>
        <p>Choose your battle reward!</p>
        <ul>
          {rewards.map(({ damage, health }) => (
            <li key={`reward-${damage}/${health}`}>
              <button onClick={() => chooseReward({ damage, health })}>
                {damage}/{health}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
