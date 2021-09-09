import { ChangeEvent, useState } from 'react';
import { FormEvent } from 'react';

export default function Register(): JSX.Element {
  const [value, setValue] = useState('');

  function onSubmit(event: FormEvent) {
    event.preventDefault();
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
