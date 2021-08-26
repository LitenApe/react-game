import { ReactElement, ReactNode } from 'react';

type GameEntityProps = {
  visual: ReactNode;
};

export default function GameEntity({ visual }: GameEntityProps): ReactElement {
  return <div>{visual}</div>;
}
