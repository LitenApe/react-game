import { ReactElement, ReactNode, useCallback, useState } from 'react';

import Battle from '../containers/Battle';
import Entity, { Stats } from '../service/Entity';
import GameOver from './GameOver';
import Reward from './Reward';

type GameProps = {
  player: ReactNode;
  enemy: ReactNode;
};

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

export default function Game(props: GameProps): ReactElement {
  const { player: PV, enemy: EV } = props;
  const [attempts, setAttempts] = useState<number>(1);
  const [state, setState] = useState<GameState>(GameState.Battle);
  const [round, setRound] = useState<number>(1);
  const [player, setPlayer] = useState(
    new Entity('Player', initialPlayerStats.damage, initialPlayerStats.health)
  );
  const [enemy, setEnemy] = useState<Entity>(new Entity('Enemy', 1, 100));

  const progressGame = useCallback(
    (gameState: GameState) => {
      setRound((round) => round + 1);
      setEnemy((previousEnemy) => {
        const previousStats = previousEnemy.getStats();
        return new Entity(
          'Enemy',
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
    setEnemy(() => new Entity('Enemy'));
    setPlayer(
      () =>
        new Entity(
          'Player',
          attempts + initialPlayerStats.damage,
          initialPlayerStats.health
        )
    );
    setState(() => GameState.Battle);
  }, [attempts, setAttempts, setRound, setEnemy, setState]);

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

      <Battle
        player={player}
        playerVisual={PV}
        enemy={enemy}
        enemyVisual={EV}
        setGameMode={progressGame}
      />
    </>
  );
}
