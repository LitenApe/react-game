import { useState, useCallback, ReactNode, ReactElement } from 'react';

import Battle from '../containers/Battle';
import Entity from '../service/Entity';
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

export default function Game(props: GameProps): ReactElement {
  const { player: PV, enemy: EV } = props;
  const [attempts, setAttempts] = useState<number>(1);
  const [state, setState] = useState<GameState>(GameState.Battle);
  const [round, setRound] = useState<number>(1);
  const [player, setPlayer] = useState(new Entity(4, 20));
  const [enemy, setEnemy] = useState<Entity>(new Entity());

  const progressGame = useCallback(
    (gameState: GameState) => {
      setRound((round) => round + 1);
      setEnemy(
        (previousEnemy) => new Entity(round + previousEnemy.getDamage())
      );
      setState(() => gameState);
    },
    [setRound, setEnemy, setState]
  );

  const resetGame = useCallback(() => {
    setAttempts(() => attempts + 1);
    setRound(() => 1);
    setEnemy(() => new Entity());
    setPlayer(() => new Entity(attempts + 4, 20));
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
      <p>Attempts: {attempts}</p>
      <p>Round: {round}</p>
      <p>Player Stats: {JSON.stringify(player.getStats())}</p>
      <p>Enemy Stats: {JSON.stringify(enemy.getStats())}</p>

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
