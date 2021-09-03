import GameEntity from '../components/GameEntity';
import Entity, { Skill } from '../service/Entity';
import { GameState } from './Game';
import StatusBox from '../components/StatusBox';
import { useCallback } from 'react';
import { useState } from 'react';
import { useMount } from '../utils/hooks/useMount';

type BattleProps = {
  player: Entity;

  enemy: Entity;

  setGameMode(gameState: GameState): void;
};

export default function Battle(props: BattleProps): JSX.Element {
  const { player, enemy, setGameMode } = props;

  // Task: Remove game timer and have the
  // participant debug why it there are no updates
  const [, setgametimer] = useState(0);

  useMount(() => {
    const timer = setInterval(() => {
      setgametimer((current) => current + 1);
    }, 150);

    return () => {
      clearInterval(timer);
    };
  });

  const executeSkill = useCallback(
    (skill: Skill) => {
      const damage = skill.action(player);
      enemy.receiveAttack(damage);
      player.receiveAttack(enemy.getDamage());

      if (player.getHealth() === 0) {
        setGameMode(GameState.Dead);
      } else if (enemy.getHealth() === 0) {
        setGameMode(GameState.Reward);
      }
    },
    [player, enemy, setGameMode]
  );

  return (
    <>
      <section id="arena">
        <h2>Battle!</h2>
        <StatusBox entity={enemy} />
        <div id="arena-ring">
          <GameEntity entity={enemy} />
          <GameEntity entity={player} />
        </div>
        <StatusBox entity={player} />
      </section>
      <section>
        <h2>skills</h2>
        <ul>
          {player.getSkills().map((skill) => (
            <li key={skill.name}>
              <button onClick={() => executeSkill(skill)}>{skill.name}</button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
