import { Dispatch, SetStateAction } from 'react';
import Dice from '../service/Dice';
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
    health: 20,
  },
  {
    damage: 0,
    health: 40,
  },
];

export default function Reward({
  player,
  setGameState,
}: RewardProps): JSX.Element {
  function chooseReward({ damage, health }: Stats) {
    player.levelUp(damage, health);
    setGameState(() => (Dice.roll() >= 6 ? GameState.Bonus : GameState.Battle));
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
