import { FormEvent } from "react";
import { RouterProps } from "react-router-dom";

import { Routes } from "../utils/routes";

export default function Register({ history }: RouterProps): JSX.Element {
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    history.push(Routes.GAME);
  }

  return (
    <div id="registration">
      <form id="registration-form" onSubmit={onSubmit}>
        <label>
          Player name
          <input required />
        </label>
        <button type="submit">Start</button>
      </form>
    </div>
  );
}
