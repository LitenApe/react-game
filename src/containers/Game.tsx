import { useState } from 'react';

import Battle from '../containers/Battle';
import { usePlayerContext } from '../context/PlayerContext';
import Entity from '../service/Entity';
import Monster from '../service/Monsters';
import GameOver from './GameOver';
import Reward from './Reward';

export enum EntityType {
  Player,
  Enemy,
}

export enum GameState {
  Battle,
  Reward,
  Dead,
}

export default function Game(): JSX.Element {
  const player = usePlayerContext();
  const [attempts, setAttempts] = useState<number>(1);
  const [round, setRound] = useState<number>(1);
  const [state, setState] = useState<GameState>(GameState.Battle);

  if (player === null || player?.entity === null) {
    throw new Error(
      'Game is either not wrapped by a PlayerContext or player entity is yet to be created'
    );
  }

  const [enemy, setEnemy] = useState<Entity>(new Entity(Monster.getMonster()));

  /**
   * Task: create a new enemy which is guaranteed
   * to be stronger then the previous enemy.
   */
  function progressGame(gameState: GameState) {
    setRound((round) => round + 1);
    setEnemy((dead) => {
      const currentStats = dead.getStats();
      return new Entity(
        Monster.getMonster(),
        currentStats.damage + 2,
        currentStats.originalHealth + 5
      );
    });
    setState(gameState);
  }

  function resetGame() {
    setAttempts(attempts + 1);
    setRound(1);
    player?.revive();
    setEnemy(new Entity(Monster.getMonster()));
    setState(GameState.Battle);
  }

  /**
   * Task: Refactor the Game component to have a dedicated context,
   * which is where the logic will live. Afterward, set each game
   * screen as their own path.
   */
  if (state === GameState.Dead) {
    return <GameOver resetGame={resetGame} />;
  }

  if (state === GameState.Reward) {
    return <Reward player={player.entity} setGameMode={setState} />;
  }

  return (
    <>
      <p>
        Attempts: {attempts} | Round: {round}
      </p>

      <Battle player={player.entity} enemy={enemy} setGameMode={progressGame} />
    </>
  );
}
