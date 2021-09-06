import { Dispatch, SetStateAction } from 'react';
import Entity from '../service/Entity';
import { GameState } from './Game';

type BonusProps = {
  player: Entity;
  setGameState: Dispatch<SetStateAction<GameState>>;
};

export default function Bonus({
  player,
  setGameState,
}: BonusProps): JSX.Element {
  function onSelect() {
    setGameState(() => GameState.Battle);
  }

  return (
    <section id="bonus">
      <h1>Choose bonus item!</h1>
      <ul>
        {Array.from(Array(4)).map((_, index) => (
          <li key={`skill-option-${index}}`}>
            <button onClick={onSelect}>item/skill</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
