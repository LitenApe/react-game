import { ReactNode } from 'react';

type GameEntity = {
  visual: ReactNode;
};

export default function GameEntity({ visual }: GameEntity) {
  return <div>{visual}</div>;
}
