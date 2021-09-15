import { Dispatch, SetStateAction } from 'react';

import Entity from '../service/Entity';
import { GameState } from './Game';

type RewardProps = {
  player: Entity;
  setGameMode: Dispatch<SetStateAction<GameState>>;
};

const rewards = [
  {
    damage: 4,
    health: 0,
  },
  {
    damage: 2,
    health: 20,
  },
  {
    damage: 0,
    health: 40,
  },
];

export default function Reward({
  player,
  setGameMode,
}: RewardProps): JSX.Element {
  function chooseReward({
    damage,
    health,
  }: {
    damage: number;
    health: number;
  }) {
    player.levelUp(damage, health);
    setGameMode(() => GameState.Battle);
  }

  return (
    <section id="reward">
      <h2>You won!</h2>
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
    </section>
  );
}
