import { useEffect, useState } from 'react';

const SESSION_START_KEY = 'portfolio-visit-started-at';
const LEFT_SITE_KEY = 'portfolio-left-site';
let memoryStart = null;
let lifecycleInstalled = false;

function clearVisitSession() {
  memoryStart = null;
  try {
    sessionStorage.removeItem(SESSION_START_KEY);
    for (let i = sessionStorage.length - 1; i >= 0; i -= 1) {
      const key = sessionStorage.key(i);
      if (key?.startsWith('visit-counted:') || key?.startsWith('portfolio-liked:')) {
        sessionStorage.removeItem(key);
      }
    }
    sessionStorage.removeItem(LEFT_SITE_KEY);
  } catch {
    /* la sesión en memoria se reinicia igualmente */
  }
}

function markLeavingSite() {
  try { sessionStorage.setItem(LEFT_SITE_KEY, '1'); } catch { /* ignorar */ }
}

function installLifecycleHandlers() {
  if (lifecycleInstalled || typeof window === 'undefined') return;
  window.addEventListener('pagehide', markLeavingSite);
  lifecycleInstalled = true;
}

export function getVisitSessionStart() {
  installLifecycleHandlers();
  try {
    const leftSite = sessionStorage.getItem(LEFT_SITE_KEY) === '1';
    const navigationType = performance.getEntriesByType('navigation')[0]?.type;
    if (leftSite) {
      // Una recarga conserva la visita; volver desde otra página inicia otra.
      if (navigationType !== 'reload') clearVisitSession();
      else sessionStorage.removeItem(LEFT_SITE_KEY);
    }
    const stored = Number(sessionStorage.getItem(SESSION_START_KEY));
    if (stored) return stored;
    const startedAt = Date.now();
    sessionStorage.setItem(SESSION_START_KEY, String(startedAt));
    return startedAt;
  } catch {
    memoryStart ??= Date.now();
    return memoryStart;
  }
}

export function useVisitDuration() {
  const [startedAt, setStartedAt] = useState(getVisitSessionStart);
  const [seconds, setSeconds] = useState(() => Math.floor((Date.now() - startedAt) / 1000));

  useEffect(() => {
    const onPageShow = (event) => {
      if (!event.persisted) return;
      const nextStart = getVisitSessionStart();
      setStartedAt(nextStart);
      setSeconds(0);
    };
    window.addEventListener('pageshow', onPageShow);
    const timer = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => {
      clearInterval(timer);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [startedAt]);

  return seconds;
}
