import { EffectCallback, useEffect } from 'react';

export function useMount(f: EffectCallback): null {
  useEffect(f, []);
  return null;
}
