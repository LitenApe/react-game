import { Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

interface IPlayerContext {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const context = createContext<IPlayerContext>({
  name: '',
  setName: () => undefined,
});

export default function PlayerContext({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const [name, setName] = useState('');
  return (
    <context.Provider value={{ name, setName }}>{children}</context.Provider>
  );
}

export const usePlayerContext = (): IPlayerContext => useContext(context);
