import { useEffect, useRef } from 'react';

export function usePreviousValue<T>(value: T): T {
  const previous = useRef<T>(value);

  useEffect(() => {
    previous.current = value;
  });

  return previous.current;
}
