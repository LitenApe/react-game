import { ChangeEvent, FormEvent, useState } from 'react';
import { RouterProps } from 'react-router-dom';

import { Routes } from '../utils/routes';

export default function Register({ history }: RouterProps): JSX.Element {
  const [value, setValue] = useState('');

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    history.push(Routes.GAME);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(() => event.target.value);
  }

  return (
    <div id="registration">
      <form id="registration-form" onSubmit={onSubmit}>
        <label>
          Player name
          <input value={value} onChange={onChange} required />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
