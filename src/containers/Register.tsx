import { ChangeEvent, FormEvent } from 'react';
import { RouterProps } from 'react-router-dom';

import { usePlayerContext } from '../context/PlayerContext';
import { Routes } from '../utils/routes';

export default function Register({ history }: RouterProps): JSX.Element {
  const player = usePlayerContext();

  if (player === null) {
    throw new Error('Register is not wrapped by a PlayerContext!');
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    history.replace(Routes.GAME);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    player?.setName(() => event.target.value);
  }

  return (
    <div id="registration">
      <form id="registration-form" onSubmit={onSubmit}>
        <label>
          Player name
          <input value={player.name} onChange={onChange} required />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
