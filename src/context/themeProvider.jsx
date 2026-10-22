import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ThemeContext, ACCENTS } from './themeContext';

const STORAGE_KEY = 'portfolio-settings';
const DEFAULTS = { mode: 'dark', accent: 'indigo' };

const readSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      const settings = { ...DEFAULTS, ...saved };
      if (settings.accent === 'random') settings.accent = settings.lastAccent || DEFAULTS.accent;
      delete settings.lastAccent;
      return settings;
    }
  } catch {
    /* sin localStorage o JSON inválido */
  }
  return DEFAULTS;
};

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(readSettings);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const activeAccentId = settings.accent;

  // Escucha cambios del sistema operativo (para el modo "Sistema")
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e) => setSystemTheme(e.matches ? 'light' : 'dark');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const resolved = settings.mode === 'system' ? systemTheme : settings.mode;

  // Aplica tema y color de acento al <html>
  useLayoutEffect(() => {
    const root = document.documentElement;
    const accent = ACCENTS.find((a) => a.id === activeAccentId) ?? ACCENTS[0];
    root.dataset.theme = resolved;
    // En modo claro, el tono "400" (texto) se oscurece para tener buen contraste
    root.style.setProperty('--color-primary-400', resolved === 'light' ? accent.c600 : accent.c400);
    root.style.setProperty('--color-primary-500', accent.c500);
    root.style.setProperty('--color-primary-600', accent.c600);
  }, [resolved, activeAccentId]);

  // Persistencia
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignorar */
    }
  }, [settings]);

  const value = useMemo(
    () => ({
      mode: settings.mode,
      resolved,
      accent: settings.accent,
      accents: ACCENTS,
      setMode: (mode) => setSettings((s) => ({ ...s, mode })),
      setAccent: (accent) => setSettings((s) => {
        if (accent !== 'random') return { ...s, accent };
        const choices = ACCENTS.filter((item) => item.id !== s.accent);
        const nextAccent = choices[Math.floor(Math.random() * choices.length)];
        return { ...s, accent: nextAccent.id };
      }),
      reset: () => setSettings(DEFAULTS),
    }),
    [settings, resolved],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
