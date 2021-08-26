import { ReactElement, ReactNode } from 'react';

type GameEntity = {
  visual: ReactNode;
};

export default function GameEntity({ visual }: GameEntity): ReactElement {
  return <div>{visual}</div>;
}
