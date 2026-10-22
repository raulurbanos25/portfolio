import { useCallback, useEffect, useState } from 'react';

const API = 'https://abacus.jasoncameron.dev';

export function useProjectAnalytics(namespace, projectId, imageCount) {
  const [projectViews, setProjectViews] = useState(null);
  const [imageViews, setImageViews] = useState([]);

  const projectKey = `proyecto-${projectId}-visitas`;
  const imageKey = (index) => `proyecto-${projectId}-imagen-${index + 1}-vistas`;

  useEffect(() => {
    if (!namespace || !projectId) return undefined;
    const controller = new AbortController();
    const getCounter = (key) => fetch(`${API}/get/${namespace}/${key}`, { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((data) => Number(data.value) || 0);

    Promise.all([
      getCounter(projectKey).then((value) => setProjectViews((current) => current === null ? value : Math.max(current, value))),
      ...Array.from({ length: imageCount }, (_, index) => getCounter(imageKey(index))
        .then((value) => setImageViews((current) => {
          const next = [...current];
          next[index] = Math.max(next[index] || 0, value);
          return next;
        }))),
    ]).catch(() => { /* Las métricas siguen disponibles aunque el servicio no responda. */ });

    return () => controller.abort();
  }, [namespace, projectId, imageCount, projectKey]);

  const recordView = useCallback(async (key, setValue, index) => {
    if (!namespace || !projectId) return;
    try {
      const response = await fetch(`${API}/hit/${namespace}/${key}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(String(response.status));
      const data = await response.json();
      const value = Number(data.value) || 0;
      setValue((current) => {
        if (index === undefined) return current === null ? value : Math.max(current, value);
        const next = [...current];
        next[index] = Math.max(next[index] || 0, value);
        return next;
      });
    } catch {
      /* No mostramos una vista que el contador remoto no haya confirmado. */
    }
  }, [namespace, projectId]);

  const recordProjectView = useCallback(() => recordView(projectKey, setProjectViews), [projectKey, recordView]);
  const recordImageView = useCallback((index) => recordView(imageKey(index), setImageViews, index), [projectId, recordView]);

  return { projectViews, imageViews, recordProjectView, recordImageView };
}
