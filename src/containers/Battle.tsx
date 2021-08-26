import { useState, ReactNode, useEffect, ReactElement } from 'react';
import GameEntity from '../components/GameEntity';
import Entity from '../service/Entity';
import { GameState } from './Game';

type BattleProps = {
  player: Entity;
  playerVisual: ReactNode;

  enemy: Entity;
  enemyVisual: ReactNode;

  setGameMode(gameState: GameState): void;
};

export default function Battle(props: BattleProps): ReactElement {
  const { player, playerVisual, enemy, enemyVisual, setGameMode } = props;
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
  }, []);

  return (
    <>
      <div id="arena">
        <GameEntity visual={playerVisual} />
        <GameEntity visual={enemyVisual} />
      </div>
      <ul>
        {battleLog.map((history, index) => (
          <li key={`battle-log-${index}`}>{history}</li>
        ))}
      </ul>
    </>
  );
}
