import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

/**
 * Task: Create a context which holds the players name.
 * After the name has been set, "push" the user to the game
 */
// eslint-disable-next-line
interface IPlayerContext {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export default function PlayerContext({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  return <>{children}</>;
}

export const usePlayerContext = (): unknown => ({});
