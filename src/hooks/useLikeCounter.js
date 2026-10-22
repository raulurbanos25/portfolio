import { useCallback, useEffect, useState } from 'react';
import { getVisitSessionStart } from './useVisitDuration';

const API = 'https://abacus.jasoncameron.dev';

export function useLikeCounter(namespace) {
  const [likes, setLikes] = useState(null);
  const [visitStart, setVisitStart] = useState(getVisitSessionStart);
  const storageKey = `portfolio-liked:${namespace}:${visitStart}`;
  const [liked, setLiked] = useState(() => {
    try { return sessionStorage.getItem(storageKey) === '1'; } catch { return false; }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handlePageShow = (event) => {
      if (!event.persisted) return;
      const nextStart = getVisitSessionStart();
      setVisitStart(nextStart);
      try { setLiked(sessionStorage.getItem(`portfolio-liked:${namespace}:${nextStart}`) === '1'); } catch { setLiked(false); }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [namespace]);

  useEffect(() => {
    if (!namespace) return undefined;
    const controller = new AbortController();
    fetch(`${API}/get/${namespace}/likes`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((result) => setLikes(result.value))
      .catch(() => { if (!controller.signal.aborted) setLikes(null); });
    return () => controller.abort();
  }, [namespace]);

  const like = useCallback(async () => {
    if (!namespace || liked || loading) return;
    setLoading(true);
    try { sessionStorage.setItem(storageKey, '1'); } catch { /* el estado local sigue protegiendo esta instancia */ }
    try {
      const response = await fetch(`${API}/hit/${namespace}/likes`);
      if (!response.ok) throw new Error(String(response.status));
      const result = await response.json();
      setLikes(result.value);
      setLiked(true);
      try { sessionStorage.setItem(storageKey, '1'); } catch { /* la página mantiene el estado */ }
    } catch {
      // No se registra como me gusta si el servidor no confirmó la operación.
      try { sessionStorage.removeItem(storageKey); } catch { /* ignorar */ }
    } finally {
      setLoading(false);
    }
  }, [liked, loading, namespace, storageKey]);

  return { likes, liked, like, loading };
}
