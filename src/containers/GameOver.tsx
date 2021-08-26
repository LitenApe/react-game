import { ReactElement } from 'react';

type GameOverProps = {
  resetGame(): void;
};

export default function GameOver({ resetGame }: GameOverProps): ReactElement {
  return (
    <>
      <h1>Game Over!</h1>
      <button onClick={resetGame}>Start new run</button>
    </>
  );
}
