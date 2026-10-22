import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Share2, ArrowUpRight, ArrowUp, Check, Sparkles, Code2, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

/* ---------- Iconos de marcas (SVG propios) ---------- */
const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
  </svg>
);

const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
  </svg>
);

/* ---------- Datos de navegación ---------- */
const pages = [
  { name: 'Inicio', to: '/' },
  { name: 'Sobre Mí', to: '/sobre-mi' },
  { name: 'Proyectos', to: '/proyectos' },
  { name: 'Experiencia', to: '/experiencia' },
  { name: 'Académico', to: '/academic' },
  { name: 'Contacto', to: '/contacto' },
];

/* ---------- Animaciones ---------- */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ColumnTitle({ children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.25em] text-slate-400 mb-6">
      <span className="w-6 h-px bg-gradient-to-r from-primary-500 to-transparent" />
      {children}
    </h3>
  );
}

export const Footer = () => {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleShare = async () => {
    const url = window.location.origin;
    const data = {
      title: `Portfolio de ${profile.name}`,
      text: `Explora el portfolio profesional de ${profile.name}`,
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (err) {
        if (err?.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt('Copia el enlace de la web:', url);
    }
  };

  const socials = [
    { label: 'Correo', href: `mailto:${profile.email}`, icon: Mail, external: false },
    { label: 'LinkedIn', href: profile.linkedin, icon: LinkedInIcon, external: true },
    { label: 'TikTok', href: profile.tiktok, icon: TikTokIcon, external: true },
    { label: 'GitHub', href: profile.github, icon: GitHubIcon, external: true },
  ].filter((s) => s.href);

  const btnBase =
    'group relative flex items-center gap-3 px-4 py-3 rounded-2xl glass-panel border border-white/10 text-sm font-medium text-slate-300 hover:text-primary-400 hover:border-primary-500/50 transition-all duration-300 overflow-hidden shadow-lg';

  return (
    <footer className="relative bg-dark-950 overflow-hidden border-t border-white/10">
      {/* Línea superior con gradiente animado de alta producción */}
      <motion.div
        aria-hidden="true"
        className="h-1 w-full"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent, var(--color-primary-500), var(--color-accent-purple), var(--color-accent-cyan), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Iluminación ambiental difusa de fondo */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[350px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-accent-purple/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Patrón de malla geométrica sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_100%,#000_20%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 items-start"
        >
          {/* 1. Columna del Logo y Presentación (Ancho Principal) */}
          <motion.div variants={item} className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-flex items-center gap-4 group" aria-label="Ir al inicio">
              <motion.div
                whileHover={{ rotate: -5, scale: 1.06 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl glass-panel p-2.5 flex items-center justify-center shadow-2xl shadow-primary-500/20 border border-white/20 bg-dark-900/90"
              >
                <img 
                  src="/logo/logo.png" 
                  alt="Raúl Urbanos Logo" 
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
                <span className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary-500/10 to-transparent pointer-events-none" />
              </motion.div>
              <div>
                <span className="block text-2xl font-black tracking-tight text-slate-100 group-hover:text-primary-400 transition-colors">
                  {profile.name}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-400 mt-1 px-2.5 py-0.5 rounded-full bg-primary-500/10 border border-primary-500/20">
                  <Sparkles size={12} />
                  {profile.role || profile.roles?.[0] || 'Desarrollador Web'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md font-normal">
              {profile.subtitle || 'Creando experiencias digitales interactivas, interfaces limpias y sistemas automatizados con alto rendimiento.'}
            </p>

            {/* Badge de Disponibilidad Animado */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-primary-500/30 text-xs font-semibold text-slate-200 shadow-lg">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <span>{profile.availability || 'Disponible para nuevos proyectos'}</span>
            </div>
          </motion.div>

          {/* 2. Columna de Navegación de Páginas */}
          <motion.nav variants={item} className="lg:col-span-2" aria-label="Páginas del sitio">
            <ColumnTitle>Navegación</ColumnTitle>
            <ul className="space-y-3.5">
              {pages.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="group inline-flex items-center gap-2.5 text-sm font-medium text-slate-300 hover:text-primary-400 transition-all duration-300 hover:translate-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500/50 group-hover:bg-primary-400 transition-colors" />
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* 3. Columna de Contacto Directo */}
          <motion.div variants={item} className="lg:col-span-2">
            <ColumnTitle>Contacto</ColumnTitle>
            <ul className="space-y-4">
              <li>
                <a href={`mailto:${profile.email}`} className="group flex items-center gap-3">
                  <span className="p-2.5 rounded-xl glass-panel border border-white/10 text-primary-400 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 transition-all">
                    <Mail size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Email</span>
                    <span className="block text-xs font-medium text-slate-200 group-hover:text-primary-400 transition-colors truncate">
                      {profile.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl glass-panel border border-white/10 text-accent-cyan">
                  <MapPin size={16} />
                </span>
                <span>
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Ubicación</span>
                  <span className="block text-xs font-medium text-slate-200">{profile.location}</span>
                </span>
              </li>
            </ul>

            <Link
              to="/contacto"
              className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Enviar mensaje</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>

          {/* 4. Columna de Redes y Compartir */}
          <motion.div variants={item} className="lg:col-span-3">
            <ColumnTitle>Redes y Social</ColumnTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={btnBase}
                >
                  <s.icon size={16} />
                  <span className="text-xs">{s.label}</span>
                </motion.a>
              ))}

              {/* Botón interactivo de Compartir Portfolio */}
              <div className="relative col-span-2 mt-1">
                <motion.button
                  type="button"
                  onClick={handleShare}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className={`${btnBase} w-full justify-center bg-primary-500/15 !border-primary-500/40 text-primary-300 hover:text-white`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span
                        key="ok"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-400"
                      >
                        <Check size={16} />
                        ¡Enlace copiado al portapapeles!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="share"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 text-xs font-semibold"
                      >
                        <Share2 size={16} />
                        Compartir portfolio
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Barra de Copyright inferior y botón "Volver arriba" */}
        <div className="relative mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 flex items-center gap-1.5 text-center sm:text-left">
            <span>© {year} <strong className="text-slate-300 font-semibold">{profile.name}</strong>. Todos los derechos reservados.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              SUBIR AL PRINCIPIO
            </span>

            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Volver arriba"
              title="Volver arriba"
              className="p-3 rounded-2xl glass-panel border border-white/10 text-slate-300 hover:text-primary-400 hover:border-primary-500/50 transition-all shadow-lg cursor-pointer"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};