import { useEffect } from 'react';

/**
 * useKeyPress
 * Adds event listener to call handler function whenever one
 * of the specified keys is pressed.
 * @param {Array.<string>} keys - the keys to respond to.
 * @param {function} handler - the function to call on key press.
 */
export default function useKeypress(keys, handler) {
  useEffect(() => {
    function onKeyup(e) {
      if (keys.includes(e.key)) handler(e.key)
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [keys, handler]);
}
