import { useCallback, useState } from 'react';

import Battle from '../containers/Battle';
import { usePlayerContext } from '../context/PlayerContext';
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

const initialPlayerStats: Stats = {
  damage: 4,
  health: 100,
};

export default function Game(): JSX.Element {
  const [attempts, setAttempts] = useState<number>(1);
  const [state, setState] = useState<GameState>(GameState.Battle);
  const [round, setRound] = useState<number>(1);
  const { name } = usePlayerContext();
  const [player, setPlayer] = useState(
    new Entity(name, initialPlayerStats.damage, initialPlayerStats.health)
  );
  const [enemy, setEnemy] = useState<Entity>(
    new Entity(Monster.getMonster(), 1, 100)
  );

  const progressGame = useCallback(
    (gameState: GameState) => {
      setRound((round) => round + 1);
      setEnemy((previousEnemy) => {
        const previousStats = previousEnemy.getStats();
        return new Entity(
          Monster.getMonster(),
          previousStats.damage + round,
          initialPlayerStats.health + round
        );
      });
      setState(() => gameState);
    },
    [setRound, setEnemy, setState, round]
  );

  const resetGame = useCallback(() => {
    setAttempts(() => attempts + 1);
    setRound(() => 1);
    setEnemy(() => new Entity(Monster.getMonster()));
    setPlayer(
      () =>
        new Entity(
          name,
          attempts + initialPlayerStats.damage,
          initialPlayerStats.health
        )
    );
    setState(() => GameState.Battle);
  }, [attempts, setAttempts, setRound, setEnemy, setState, name]);

  if (state === GameState.Dead) {
    return <GameOver resetGame={resetGame} />;
  }

  if (state === GameState.Reward) {
    return <Reward player={player} setGameState={setState} />;
  }

  return (
    <>
      <p>
        Attempts: {attempts} | Round: {round}
      </p>

      <Battle player={player} enemy={enemy} setGameMode={progressGame} />
    </>
  );
}
