import { useState, useEffect } from 'react';

/** Custom hook for keeping state data synced with localStorage.
 *
 * This creates `item` as state and look in localStorage for current value
 * (if not found, defaults to `defaultValue`)
 *
 * When `item` changes, effect re-runs:
 * - updates localStorage
 *
 * To the component, this just acts like state that is also synced to/from
 * localStorage::
 *
 *   const [myThing, setMyThing] = useLocalStorage("myThing")
 */

function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const initial = stored ? JSON.parse(stored) : defaultValue;
  const [value, setValue] = useState(initial);

  useEffect( function updateLocalStorage() {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;