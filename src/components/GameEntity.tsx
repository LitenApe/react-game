import { ReactNode } from 'react';

type GameEntityProps = {
  visual: ReactNode;
};

export default function GameEntity({ visual }: GameEntityProps): JSX.Element {
  return <div>{visual}</div>;
}
