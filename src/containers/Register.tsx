import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import WavesBottom from '../components/WavesBottom';
import WavesTop from '../components/WavesTop';
import { usePlayerContext } from '../context/PlayerContext';
import { Routes } from '../utils/routes';

export default function Register(): JSX.Element {
  const history = useHistory();
  const [value, setValue] = useState('');
  const { setName } = usePlayerContext();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setName(() => value);
    history.push(Routes.GAME);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(() => event.target.value);
  }

  return (
    <div id="registration">
      <WavesBottom />
      <form id="registration-form" onSubmit={onSubmit}>
        <label>
          Player name
          <input value={value} onChange={onChange} required />
        </label>
        <button type="submit">Start</button>
      </form>
      <WavesTop />
    </div>
  );
}
