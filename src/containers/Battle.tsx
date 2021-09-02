import { useEffect, useState } from 'react';
import GameEntity from '../components/GameEntity';
import Entity from '../service/Entity';
import { GameState } from './Game';
import StatusBox from '../components/StatusBox';

type BattleProps = {
  player: Entity;

  enemy: Entity;

  setGameMode(gameState: GameState): void;
};

export default function Battle(props: BattleProps): JSX.Element {
  const { player, enemy, setGameMode } = props;
  const [battleLog, setBattleLog] = useState<Array<string>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const playerDamage = player.getDamage();
      const remainingEnemyHealth = enemy.receiveAttack(playerDamage);
      setBattleLog((log) => [
        ...log,
        `player attacked: ${playerDamage} damage => ${remainingEnemyHealth}`,
      ]);

      const enemyDamage = enemy.getDamage();
      const remainingPlayerHealth = player.receiveAttack(enemyDamage);
      setBattleLog((log) => [
        ...log,
        `enemy attacked: ${enemyDamage} damage => ${remainingPlayerHealth}`,
      ]);

      if (remainingPlayerHealth === 0 || remainingEnemyHealth === 0) {
        setGameMode(
          player.getHealth() === 0 ? GameState.Dead : GameState.Reward
        );
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [player, enemy, setGameMode]);

  return (
    <>
      <div id="arena">
        <StatusBox entity={enemy} />
        <div id="arena-ring">
          <GameEntity entity={enemy} />
          <GameEntity entity={player} />
        </div>
        <StatusBox entity={player} />
      </div>
      <ul>
        {battleLog.map((history, index) => (
          <li key={`battle-log-${index}`}>{history}</li>
        ))}
      </ul>
    </>
  );
}
