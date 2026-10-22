import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Monitor, SlidersHorizontal, Check, RotateCcw, X, Globe, ZoomIn, Dices } from 'lucide-react';
import { useTheme } from '../context/themeContext';

const MODES = [
  { id: 'light', label: 'Claro', icon: Sun },
  { id: 'dark', label: 'Oscuro', icon: Moon },
  { id: 'system', label: 'Sistema', icon: Monitor },
];

const ZOOM_LEVELS = [
  { id: '75', label: '75%', scale: '75%' },
  { id: '90', label: '90%', scale: '90%' },
  { id: '100', label: '100% (Normal)', scale: '100%' },
  { id: '110', label: '110%', scale: '110%' },
  { id: '125', label: '125%', scale: '125%' },
];

const LANGUAGES = [
  { id: 'es', label: 'Español' },
  { id: 'en', label: 'English' },
];

const FONT_SCALES = [
  { value: 0, label: 'Pequeña', scale: 0.9 },
  { value: 1, label: 'Normal', scale: 1 },
  { value: 2, label: 'Grande', scale: 1.1 },
];

const readAccessibilitySettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('portfolio-accessibility'));
    return {
      zoom: ['75', '90', '100', '110', '125'].includes(saved?.zoom) ? saved.zoom : '100',
      fontScale: [0, 1, 2].includes(saved?.fontScale) ? saved.fontScale : 1,
    };
  } catch {
    return { zoom: '100', fontScale: 1 };
  }
};

export const SettingsDock = () => {
  const { mode, resolved, accent, accents, setMode, setAccent, reset } = useTheme();
  const [open, setOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState(readAccessibilitySettings);
  const { zoom: currentZoom, fontScale } = accessibilitySettings;
  const [currentLang, setCurrentLang] = useState('es');
  const [randomAccentLabel, setRandomAccentLabel] = useState('');

  // Cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Guardar accesibilidad y aplicar zoom junto con el tamaño de letra.
  useEffect(() => {
    const root = document.documentElement;
    const fontMultiplier = FONT_SCALES.find((item) => item.value === fontScale)?.scale ?? 1;
    root.style.fontSize = `${Number(currentZoom) * fontMultiplier}%`;
    try {
      localStorage.setItem('portfolio-accessibility', JSON.stringify(accessibilitySettings));
    } catch {
      /* ignorar */
    }
  }, [accessibilitySettings, currentZoom, fontScale]);

  const handleZoomChange = (zoomId) => {
    setAccessibilitySettings((current) => ({ ...current, zoom: zoomId }));
  };

  const handleFontScaleChange = (value) => {
    setAccessibilitySettings((current) => ({ ...current, fontScale: Number(value) }));
  };

  const handleRandomAccent = () => {
    const choices = accents.filter((item) => item.id !== accent);
    const choice = choices[Math.floor(Math.random() * choices.length)];
    if (!choice) return;
    setAccent(choice.id);
    setRandomAccentLabel(choice.label);
  };

  const dockBtn =
    'p-3.5 rounded-xl text-slate-300 hover:text-primary-400 hover:bg-primary-500/10 transition-colors cursor-pointer';

  return (
    <>
      {/* Dock fijo con UN SOLO BOTÓN de Ajustes */}
      <div className="fixed z-40 right-4 bottom-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2">
        <div className="glass-panel rounded-2xl p-1.5 flex md:flex-col gap-1.5 shadow-xl shadow-black/20">
          <button
            onClick={() => setOpen(true)}
            className={dockBtn}
            aria-label="Abrir panel de ajustes"
            title="Ajustes y Personalización"
          >
            <SlidersHorizontal size={22} />
          </button>
        </div>
      </div>

      {/* Panel lateral de Ajustes Avanzados */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Panel de ajustes del portfolio"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-[70] h-full w-full max-w-sm bg-dark-900 border-l border-white/15 p-6 overflow-y-auto shadow-2xl"
            >
              {/* Cabecera */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary-500/15 text-primary-400 border border-primary-500/30">
                    <SlidersHorizontal size={18} />
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-100">Ajustes del Portfolio</h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Cerrar ajustes"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 1. Modo (Claro / Oscuro / Sistema) */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <Sun size={14} className="text-primary-400" />
                  Modo de Visualización
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {MODES.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setMode(id)}
                      aria-pressed={mode === id}
                      className={`flex flex-col items-center gap-2 py-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        mode === id
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 border border-primary-400/50'
                          : 'glass-panel text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      <Icon size={18} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Tamaño de letra</h3>
                  <span className="text-xs font-semibold text-primary-400">
                    {FONT_SCALES.find((item) => item.value === fontScale)?.label}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl glass-panel border border-white/10 px-4 py-3">
                  <span aria-hidden="true" className="text-sm font-bold text-slate-400">A−</span>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={fontScale}
                    onChange={(event) => handleFontScaleChange(event.target.value)}
                    aria-label="Tamaño de letra"
                    aria-valuetext={FONT_SCALES.find((item) => item.value === fontScale)?.label}
                    className="w-full accent-primary-500 cursor-pointer"
                  />
                  <span aria-hidden="true" className="text-lg font-bold text-slate-200">A+</span>
                </div>
                <div className="flex justify-between px-9 mt-2 text-[10px] text-slate-500">
                  <span>Pequeña</span><span>Normal</span><span>Grande</span>
                </div>
              </div>

              {/* 2. Color de Acento */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-primary-500 inline-block" />
                  Color de Acento
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {accents.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setAccent(a.id)}
                      aria-pressed={accent === a.id}
                      className={`flex flex-col items-center gap-2 py-3 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                        accent === a.id
                          ? 'border-primary-500 bg-primary-500/15 text-slate-100 shadow-md'
                          : 'border-white/10 text-slate-400 hover:text-slate-100 glass-panel'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ background: a.c500 }}
                      >
                        {accent === a.id && <Check size={14} />}
                      </span>
                      {a.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleRandomAccent}
                  className="mt-3 flex w-full items-center gap-3 rounded-xl border border-white/10 px-3.5 py-3 text-left text-slate-300 transition-all glass-panel hover:border-primary-500/40 hover:text-white cursor-pointer"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 via-violet-500 to-cyan-400 text-white"><Dices size={18} /></span>
                  <span className="flex-1">
                    <span className="block text-xs font-semibold">Aleatorio</span>
                    <span aria-live="polite" className="mt-0.5 block text-[10px] text-slate-500">
                      {randomAccentLabel ? `Color elegido: ${randomAccentLabel}` : 'Elegir un color al azar'}
                    </span>
                  </span>
                  {randomAccentLabel && <span className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: accents.find((item) => item.label === randomAccentLabel)?.c500 }} />}
                </button>
              </div>


              {/* 4. Zoom / Escala del Portfolio */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                  <ZoomIn size={14} className="text-accent-purple" />
                  Zoom de Interfaz
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {ZOOM_LEVELS.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => handleZoomChange(z.id)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        currentZoom === z.id
                          ? 'bg-primary-600 text-white shadow-md border border-primary-400/50'
                          : 'glass-panel text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botón Restablecer */}
              <button
                onClick={() => {
                  reset();
                  setAccessibilitySettings({ zoom: '100', fontScale: 1 });
                  setCurrentLang('es');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl glass-panel text-sm font-semibold text-slate-300 hover:text-primary-400 hover:bg-white/5 transition-colors border border-white/10 cursor-pointer"
              >
                <RotateCcw size={16} />
                Restablecer Valores
              </button>

              <p className="mt-5 text-xs text-slate-500 text-center leading-relaxed">
                Tus preferencias se guardan automáticamente en este navegador.
              </p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
