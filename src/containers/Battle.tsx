import { useCallback } from 'react';

import GameEntity from '../components/GameEntity';
import StatusBox from '../components/StatusBox';
import Entity, { Skill } from '../service/Entity';
import { GameState } from './Game';

type BattleProps = {
  player: Entity;

  enemy: Entity;

  setGameMode(gameState: GameState): void;
};

export default function Battle(props: BattleProps): JSX.Element {
  const { player, enemy, setGameMode } = props;

  /**
   * Task: The game seems like it is freezing, find you why and fix it
   */

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
          <GameEntity entity={player} />
          <GameEntity entity={enemy} />
        </div>
        <StatusBox entity={player} />
      </section>
      <section>
        <h2>action</h2>
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
