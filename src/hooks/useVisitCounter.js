import { useEffect, useState } from 'react';
import { getVisitSessionStart } from './useVisitDuration';

const API = 'https://abacus.jasoncameron.dev';
const visitRequests = new Map();

function getVisitRequest(namespace, key) {
  const storageKey = `visit-counted:${namespace}:${getVisitSessionStart()}`;
  let request = visitRequests.get(storageKey);
  if (request) return request;

  let shouldCount = true;
  try {
    shouldCount = sessionStorage.getItem(storageKey) !== '1';
    // Marcar antes de la petición evita duplicados si se recarga mientras responde el servidor.
    if (shouldCount) sessionStorage.setItem(storageKey, '1');
  } catch {
    /* Si sessionStorage no está disponible, el módulo deduplica mientras viva la página. */
  }

  request = fetch(`${API}/${shouldCount ? 'hit' : 'get'}/${namespace}/${key}`, { cache: 'no-store' })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((data) => data.value)
    .catch((error) => {
      visitRequests.delete(storageKey);
      // No quitar la marca: el servidor pudo procesar /hit aunque se perdiera
      // la respuesta. Reintentar en esta visita podría incrementar dos veces.
      throw error;
    });

  visitRequests.set(storageKey, request);
  return request;
}

export function useVisitCounter(namespace, key = 'visitas-v2') {
  const [state, setState] = useState({ visits: null, failed: false });

  useEffect(() => {
    if (!namespace) return;
    let active = true;
    const countSession = () => getVisitRequest(namespace, key)
      .then((visits) => { if (active) setState({ visits, failed: false }); })
      .catch(() => { if (active) setState({ visits: null, failed: true }); });

    countSession();
    const onPageShow = (event) => {
      // Una página recuperada desde la caché vuelve tras haber salido del sitio.
      if (event.persisted) countSession();
    };
    window.addEventListener('pageshow', onPageShow);

    return () => {
      active = false;
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [namespace, key]);

  return state;
}
