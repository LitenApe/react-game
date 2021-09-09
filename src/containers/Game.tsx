import { useState } from 'react';

import Battle from '../containers/Battle';
import Entity, { Stats } from '../service/Entity';
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
  Bonus,
  Dead,
}

// eslint-disable-next-line
const initialPlayerStats: Stats = {
  damage: 4,
  health: 100,
};

export default function Game(): JSX.Element {
  const [attempts, setAttempts] = useState<number>(1);
  const [round, setRound] = useState<number>(1);
  const [state, setState] = useState<GameState>(GameState.Battle);

  /**
   * Task: Create a player and enemy entity when
   * the Game renders for the first time.
   */
  // eslint-disable-next-line
  const [player, setPlayer] = useState<Entity>();
  // eslint-disable-next-line
  const [enemy, setEnemy] = useState<Entity>();

  /**
   * Task: create a new enemy which is guaranteed
   * to be stronger then the previous enemy.
   */
  function progressGame(gameState: GameState) {
    setRound((round) => round + 1);
    setState(() => gameState);
  }

  function resetGame() {
    setAttempts(() => attempts + 1);
    setRound(() => 1);
    setEnemy(() => new Entity(Monster.getMonster(), 1, 100));
    setPlayer(() => new Entity('<Player name>'));
    setState(() => GameState.Battle);
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
    return <Reward player={new Entity('')} setGameState={setState} />;
  }

  return (
    <>
      <p>
        Attempts: {attempts} | Round: {round}
      </p>

      <Battle
        player={new Entity('')}
        enemy={new Entity('')}
        setGameMode={progressGame}
      />
    </>
  );
}
