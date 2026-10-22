import { createContext, useContext } from 'react';

export const ACCENTS = [
  { id: 'indigo',  label: 'Índigo',    c400: '#818cf8', c500: '#6366f1', c600: '#4f46e5' },
  { id: 'violet',  label: 'Violeta',   c400: '#a78bfa', c500: '#8b5cf6', c600: '#7c3aed' },
  { id: 'cyan',    label: 'Cian',      c400: '#22d3ee', c500: '#06b6d4', c600: '#0891b2' },
  { id: 'emerald', label: 'Esmeralda', c400: '#34d399', c500: '#10b981', c600: '#059669' },
  { id: 'rose',    label: 'Rosa',      c400: '#fb7185', c500: '#f43f5e', c600: '#e11d48' },
  { id: 'amber',   label: 'Ámbar',     c400: '#fbbf24', c500: '#f59e0b', c600: '#d97706' },
];

export const ThemeContext = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  return ctx;
};