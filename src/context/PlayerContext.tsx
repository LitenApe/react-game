import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import Entity from '../service/Entity';

type PlayerContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  entity: Entity | null;
  revive: () => void;
} | null;

const context = createContext<PlayerContextType>(null);

export default function PlayerContext({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const [name, setName] = useState('');
  const [entity, setEntity] = useState<Entity | null>(null);

  useEffect(() => {
    setEntity(() => new Entity(name));
  }, [name]);

  function revive() {
    setEntity((dead) => {
      if (dead === null) return new Entity(name);

      const currentStats = dead.getStats();
      return new Entity(
        name,
        currentStats.damage + 5,
        currentStats.originalHealth + 20
      );
    });
  }

  return (
    <context.Provider value={{ name, setName, entity, revive }}>
      {children}
    </context.Provider>
  );
}

export function usePlayerContext(): PlayerContextType {
  return useContext(context);
}
