import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {Array.<string>} keys - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export default function useKeypress(keys, action) {
  useEffect(() => {
    function onKeyup(e) {
      if (keys.includes(e.key)) action(e.key)
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [keys, action]);
}
