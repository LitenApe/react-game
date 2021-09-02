import { EffectCallback, useEffect } from 'react';

export function useMount(f: EffectCallback): null {
  // eslint-disable-next-line
  useEffect(f, []);
  return null;
}
