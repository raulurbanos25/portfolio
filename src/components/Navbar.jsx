import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useIntro } from '../context/introContext';

const EASE = [0.22, 1, 0.36, 1];

const navLinks = [
  { name: 'Sobre mí', to: '/sobre-mi' },
  { name: 'Proyectos', to: '/proyectos' },
  { name: 'Experiencia', to: '/experiencia' },
  { name: 'Academico', to: '/academic' },
  { name: 'Contacto', to: '/contacto' },
];

export const Navbar = () => {
  const { profile } = portfolioData;
  const { ready } = useIntro();
  const { pathname } = useLocation();

  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menú móvil: bloquear scroll y cerrar con Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const hidden = { y: -90, opacity: 0 };
  const shown = { y: 0, opacity: 1 };

  return (
    <>
      {/* LOGO: posición "absolute" → se queda arriba de la página y se va con el scroll */}
      <motion.div
        initial={hidden}
        animate={ready ? shown : hidden}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="absolute top-4 inset-x-0 z-50 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link
            to="/"
            onClick={close}
            aria-label="Inicio"
            title={profile.name}
            className="pointer-events-auto -mt-2"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="flex items-center justify-center rounded-3xl w-20 h-20 sm:w-24 sm:h-24 p-2"
            >
              <img
                src="/logo/logo.png"
                alt="Samuel Rivera Logo"
                className="w-full h-full object-contain filter drop-shadow-lg"
              />
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* BARRA CENTRAL (desktop): posición "fixed" → es lo único que acompaña al scroll */}
      <motion.div
        initial={hidden}
        animate={ready ? shown : hidden}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="hidden md:flex fixed top-4 inset-x-0 z-50 h-16 items-center justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 p-1.5 rounded-full glass-panel transition-shadow duration-300 ${
            scrolled ? 'shadow-2xl shadow-black/30' : 'shadow-lg shadow-black/10'
          }`}
        >
          <nav className="flex items-center" onMouseLeave={() => setHover(null)}>
            {navLinks.map((l) => {
              const target = hover ?? pathname;
              const showPill = target === l.to;
              const lit = pathname === l.to || hover === l.to;

              return (
                <Link
                  key={l.to}
                  to={l.to}
                  onMouseEnter={() => setHover(l.to)}
                  className="relative px-4 py-2 text-sm font-medium font-display"
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary-500/15 border border-primary-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      lit ? 'text-primary-400' : 'text-slate-300'
                    }`}
                  >
                    {l.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Botón de CV con descarga directa y icono de Download */}
          <a
            href="/cv-raul.pdf"
            download="Currículum - Raúl Urbanos Esteban.pdf"
            className="group flex items-center gap-3 ml-1 pl-5 pr-1.5 py-1.5 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium font-display transition-colors shadow-lg shadow-primary-600/30 cursor-pointer"
          >
            CV
            <span className="w-8 h-8 rounded-full bg-white text-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Download size={16} />
            </span>
          </a>
        </div>
      </motion.div>

      {/* Botón menú (móvil): fijo para poder abrir el menú en cualquier momento */}
      <motion.div
        initial={hidden}
        animate={ready ? shown : hidden}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="md:hidden fixed top-4 inset-x-0 z-50 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-end h-16">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="pointer-events-auto w-11 h-11 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg shadow-primary-600/30"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Menú a pantalla completa (móvil) */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[45] bg-dark-950/95 backdrop-blur-xl flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: EASE }}
                >
                  <Link
                    to={l.to}
                    onClick={close}
                    className="flex items-baseline gap-4 py-4 border-b border-white/10"
                  >
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                    <span
                      className={`font-display text-4xl font-bold tracking-tight ${
                        pathname === l.to ? 'text-primary-400' : 'text-slate-100'
                      }`}
                    >
                      {l.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.55, ease: EASE }}
              className="mt-10"
            >
              <a
                href="/cv-raul.pdf"
                download="Currículum - Raúl Urbanos Esteban.pdf"
                onClick={close}
                className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-primary-600 text-white font-medium font-display cursor-pointer"
              >
                Descargar CV
                <span className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center">
                  <Download size={18} />
                </span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
