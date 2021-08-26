import { useState, useCallback, useEffect, ReactNode } from 'react';

import Battle from '../containers/Battle';
import Entity from '../service/Entity';

type GameProps = {
  player: ReactNode;
  enemy: ReactNode;
};

export enum EntityType {
  Player,
  Enemy,
}

export default function Game(props: GameProps) {
  const { player: PV, enemy: EV } = props;
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [round, setRound] = useState<number>(1);
  const [player] = useState(new Entity(3));
  const [enemy, setEnemy] = useState<Entity | null>(null);

  const declareWinner = useCallback((winner: EntityType) => {
    if (winner === EntityType.Player) {
      setRound((round) => round + 1);
      setEnemy(() => null);
      player.levelUp();
    } else {
      setIsRunning(() => false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnemy(() => new Entity(round));
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [round]);

  if (!isRunning) {
    return <h1>Game Over!</h1>;
  }

  if (enemy === null) {
    return <h1>preparing battle</h1>;
  }

  return (
    <>
      <p>Round: {round}</p>

      <Battle
        player={player}
        playerVisual={PV}
        enemy={enemy}
        enemyVisual={EV}
        declareWinner={declareWinner}
      />
    </>
  );
}
