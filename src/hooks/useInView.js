import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight viewport-visibility hook backed by a single IntersectionObserver.
 * Returns [ref, inView]. `inView` toggles both ways so CSS can play enter AND exit transitions.
 *
 * WHY: lets components drive pure-CSS (compositor-thread) animations instead of
 * per-frame JS animation, which stutters while the main thread is busy on page load.
 *
 * @param {IntersectionObserverInit} options - pass a module-level constant to keep the observer stable.
 */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    // Defensive fallback: very old browsers without IO just show the content.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
