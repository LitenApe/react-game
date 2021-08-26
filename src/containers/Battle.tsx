import { ReactNode, useEffect, ReactElement } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingPlayerHealth = player.setHealth(enemy.getDamage());
      const remainingEnemyHealth = enemy.setHealth(player.getDamage());

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
    <div id="arena">
      <GameEntity visual={playerVisual} />
      <GameEntity visual={enemyVisual} />
    </div>
  );
}
