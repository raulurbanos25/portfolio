import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Monitor, SlidersHorizontal, Check, RotateCcw, X } from 'lucide-react';
import { useTheme } from '../context/themeContext';

const MODES = [
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'dark', label: 'Oscuro', icon: Moon },
  { id: 'system', label: 'Sistema', icon: Monitor },
];

export const SettingsDock = () => {
  const { mode, resolved, accent, accents, setMode, setAccent, reset } = useTheme();
  const [open, setOpen] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const QuickIcon = resolved === 'dark' ? Sun : Moon;
  const dockBtn =
    'p-3 rounded-xl text-slate-300 hover:text-primary-400 hover:bg-primary-500/10 transition-colors';

  return (
    <>
      {/* Dock fijo */}
      <div className="fixed z-40 right-4 bottom-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <div className="glass-panel rounded-2xl p-1.5 flex md:flex-col gap-1.5 shadow-xl shadow-black/20">
          <button
            onClick={() => setMode(resolved === 'dark' ? 'light' : 'dark')}
            className={dockBtn}
            aria-label={resolved === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={resolved === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            <QuickIcon size={20} />
          </button>
          <button
            onClick={() => setOpen(true)}
            className={dockBtn}
            aria-label="Abrir ajustes"
            title="Ajustes"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Panel lateral */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Ajustes de apariencia"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-dark-800 border-l border-white/10 p-6 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-100">Apariencia</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Cerrar ajustes"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modo */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Modo</h3>
              <div className="grid grid-cols-3 gap-2 mb-8">
                {MODES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setMode(id)}
                    aria-pressed={mode === id}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl text-sm font-medium transition-all ${
                      mode === id
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                        : 'glass-panel text-slate-300 hover:text-primary-400'
                    }`}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </div>

              {/* Color de acento */}
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Color de acento
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {accents.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAccent(a.id)}
                    aria-pressed={accent === a.id}
                    className={`flex flex-col items-center gap-2 py-3 rounded-xl text-xs font-medium transition-all border ${
                      accent === a.id
                        ? 'border-primary-500 bg-primary-500/10 text-slate-100'
                        : 'border-white/10 text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                      style={{ background: a.c500 }}
                    >
                      {accent === a.id && <Check size={16} />}
                    </span>
                    {a.label}
                  </button>
                ))}
              </div>

              <button
                onClick={reset}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl glass-panel text-sm font-medium text-slate-300 hover:text-primary-400 transition-colors"
              >
                <RotateCcw size={16} />
                Restablecer
              </button>
              <p className="mt-4 text-xs text-slate-500 text-center">
                Tus preferencias se guardan en este navegador.
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};