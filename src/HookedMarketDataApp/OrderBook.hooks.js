import {useState, useRef, useEffect, useMemo} from 'react';

export function useAutoClearTimeout() {
  let timeoutRef = useRef(null);
  const clearAutoTimeout = useMemo(() => () => clearTimeout(timeoutRef.current), []);

  useEffect(() => clearAutoTimeout, [clearAutoTimeout]);

  const setAutoClearTimeout = useMemo(() => (callback, ms) => {
      clearAutoTimeout();
      timeoutRef.current = setTimeout(callback, ms);
    }, [clearAutoTimeout]);

  return setAutoClearTimeout;
}

export function useTimedResetState(initialState, resetTimeMs=150) {
  const [state, setStateNow] = useState(initialState);
  const setAutoClearTimeout = useAutoClearTimeout();

  const resetInitialStateLater = useMemo(() => () => setAutoClearTimeout(() => setStateNow(initialState), resetTimeMs),[initialState,resetTimeMs, setAutoClearTimeout]);

  const setTimedState = useMemo(() => (newState) => {
      setStateNow(newState);
      resetInitialStateLater();
    }, [resetInitialStateLater]);

  return [state, setTimedState];
}

export function useOnValueChange(currentValue, onValueChange) {
  const valueRef = useRef(0);
  useEffect(() => {
    let lastValue = valueRef.current;
    valueRef.current = currentValue;
    onValueChange(lastValue, currentValue);
  },[currentValue]);
}