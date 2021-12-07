import { useEffect, useRef } from 'react';

export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current && savedCallback.current();
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
