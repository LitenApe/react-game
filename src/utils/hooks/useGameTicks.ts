import { useState } from 'react';
import { useMount } from './useMount';

export function useGameTicks(frequency = 150): number {
  const [tick, setTick] = useState(0);

  useMount(() => {
    const timer = setInterval(() => {
      setTick((current) => current + 1);
    }, frequency);

    return () => {
      clearInterval(timer);
    };
  });

  return tick;
}
