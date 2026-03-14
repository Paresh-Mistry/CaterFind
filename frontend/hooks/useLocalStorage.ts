import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });
 
  const set = useCallback((val: T) => {
    setValue(val);
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* noop */ }
  }, [key]);
 
  return [value, set] as const;
}