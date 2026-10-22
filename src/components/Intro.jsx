import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const BUILD_MS = 3000; // tiempo que tarda en formarse
const OPEN_MS = 1300;  // tiempo que tarda en abrirse
const EASE = [0.76, 0, 0.24, 1];

export const Intro = ({ onReveal, onDone }) => {
  const { profile } = portfolioData;
  const [opening, setOpening] = useState(false);
  const open = useCallback(() => setOpening(true), []);

  // Se abre solo al terminar de formarse
  useEffect(() => {
    const t = setTimeout(open, BUILD_MS);
    return () => clearTimeout(t);
  }, [open]);

  // Al abrirse: avisa al hero y, al final, se desmonta
  useEffect(() => {
    if (!opening) return;
    onReveal();
    const t = setTimeout(onDone, OPEN_MS);
    return () => clearTimeout(t);
  }, [opening, onReveal, onDone]);

  // Saltar con teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ') open();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Bloquea el scroll mientras dura
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const chars = profile.name.split('');

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden cursor-pointer select-none"
      onClick={open}
      role="status"
      aria-label="Cargando portfolio"
    >
      {/* Mitades que se abren */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-dark-950"
        animate={{ y: opening ? '-101%' : '0%' }}
        transition={{ duration: 1, ease: EASE, delay: opening ? 0.25 : 0 }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-dark-950"
        animate={{ y: opening ? '101%' : '0%' }}
        transition={{ duration: 1, ease: EASE, delay: opening ? 0.25 : 0 }}
      />

      {/* Línea de luz central al abrirse */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-px bg-primary-400 shadow-[0_0_24px_4px] shadow-primary-500/60 origin-center z-20"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={opening ? { scaleX: [0, 1, 1], opacity: [1, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, times: [0, 0.45, 1], ease: 'easeOut' }}
      />

      {/* Contenido central */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-8"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.12 : 1 }}
        transition={{ duration: 0.45, ease: 'easeIn' }}
      >
        <div className="absolute w-[420px] h-[420px] rounded-full bg-primary-500/15 blur-[110px] pointer-events-none" />

        <motion.div
          className="relative h-40 w-40 sm:h-48 sm:w-48"
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.45 }}
          animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          transition={{ duration: 2.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logo/logo.png"
            alt=""
            className="h-full w-full object-contain drop-shadow-[0_0_24px_rgba(129,140,248,0.32)]"
          />
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-0 w-1 bg-primary-300 shadow-[0_0_18px_5px] shadow-primary-400/80"
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* Nombre letra a letra */}
        <div className="relative flex overflow-hidden pb-1" aria-hidden="true">
          {chars.map((c, i) => (
            <motion.span
              key={i}
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="text-xl sm:text-2xl font-semibold tracking-[0.35em] uppercase text-slate-200"
            >
              {c === ' ' ? '\u00A0' : c}
            </motion.span>
          ))}
        </div>

        {/* Barra de progreso */}
        <div className="relative w-44 h-px bg-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-primary-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: BUILD_MS / 1000, ease: 'linear' }}
          />
        </div>
      </motion.div>

      <motion.p
        className="absolute bottom-8 inset-x-0 text-center text-[11px] uppercase tracking-[0.3em] text-slate-500 z-10"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Toca para saltar
      </motion.p>
    </div>
  );
};
