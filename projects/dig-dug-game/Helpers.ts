import { useCallback, useEffect, useRef } from 'react';
import _ from 'lodash'

// Taken from Dan Abramov and wonderfully explained in his blog post here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useInterval(callback: any, delay: number) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// THANK YOU, this was a nasty thing to figure out: https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
export function useThrottle(cb: any, delay: any) {
  const options = { leading: true, trailing: false }; // add custom lodash options
  const cbRef = useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => { cbRef.current = cb; });
  return useCallback(
    _.throttle((...args: any) => cbRef.current(...args), delay, options),
    [delay]
  );
}