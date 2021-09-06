import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';
import WavesBottom from '../components/WavesBottom';
import WavesTop from '../components/WavesTop';
import { usePlayerContext } from '../context/PlayerContext';

export default function Register(): JSX.Element {
  const [value, setValue] = useState('');
  const { setName } = usePlayerContext();

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    setName(() => value);
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
