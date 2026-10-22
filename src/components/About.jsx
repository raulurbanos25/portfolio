import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Server, Wrench, Sparkles, Cpu, ExternalLink, X, CheckCircle2, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const About = () => {
  const { about, skills } = portfolioData;
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const getCategoryIcon = (index) => {
    switch (index) {
      case 0:
        return <Code className="text-primary-400" size={20} />;
      case 1:
        return <Server className="text-accent-purple" size={20} />;
      case 2:
        return <Wrench className="text-accent-cyan" size={20} />;
      case 3:
        return <Sparkles className="text-amber-400" size={20} />;
      default:
        return <Code className="text-primary-400" size={20} />;
    }
  };

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Perfil Profesional
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Sobre <span className="text-primary-500">Mí</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Filosofía de trabajo, métricas de rendimiento y stack tecnológico detallado.
          </p>
        </motion.div>

        {/* --- GRID SUPERIOR: MANIFIESTO Y ESTADÍSTICAS --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
                <Cpu size={16} />
                <span>Enfoque & Mentalidad</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Programación & Ingeniería de Software
              </h3>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {about.bio}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <blockquote className="text-slate-400 text-sm italic flex items-start gap-2">
                <Sparkles size={16} className="text-accent-purple shrink-0 mt-1" />
                <span>"{about.philosophy}"</span>
              </blockquote>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
          >
            {about.stats.map((stat, index) => (
              <div
                key={index}
                className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between shadow-lg group hover:border-primary-500/40 transition-all"
              >
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-primary-400 group-hover:scale-105 transition-transform">
                  {stat.value}
                </span>
              </div>
            ))}
          </motion.div>

        </div>

        {/* --- SECCIÓN INFERIOR: STACK TECNOLÓGICO REDISEÑADO (LOGOS GRANDES Y FLOTANTES) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
              Stack Tecnológico Interactivo
            </h3>
            <p className="text-slate-400 text-xs">
              Haz clic en cualquier tecnología para desplegar su ficha técnica.
            </p>
          </div>

          {/* Botones de Categorías */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {skills.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
                  activeCategory === index
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105 border border-primary-400/50'
                    : 'glass-panel text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                {getCategoryIcon(index)}
                <span>{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Grid de Logos Flotantes (Más visuales, sin parecer cajas rígidas) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {skills[activeCategory].items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ scale: 1.08, y: -6 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedSkill(item)}
                    className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-4 text-center group hover:border-primary-500/60 shadow-xl bg-dark-900/60 hover:bg-primary-500/5 cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    {/* Logo grande con mayor protagonismo */}
                    <div className="w-16 h-16 rounded-2xl bg-dark-950/80 p-3.5 border border-white/10 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-full h-full object-contain filter drop-shadow"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div>
                      <span className="block text-sm font-bold text-slate-100 group-hover:text-primary-400 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

      </div>

      {/* --- MODAL EMERGENTE (CIERRE POR CLIC FUERA Y ANIMACIÓN RÁPIDA) --- */}
      <AnimatePresence>
        {selectedSkill && (
          <div 
            onClick={() => setSelectedSkill(null)} // Cierra al hacer clic fuera del modal
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 10 }} // Animación de salida más rápida y sutil
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro de la tarjeta
              className="glass-panel w-full max-w-xl rounded-3xl border border-white/20 shadow-2xl relative bg-dark-900/98 overflow-hidden cursor-default"
            >
              {/* Resplandor ambiental superior */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-500/20 via-primary-500/5 to-transparent pointer-events-none" />

              {/* Botón Cerrar X */}
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-dark-950/80 text-slate-300 hover:text-white hover:bg-rose-500/20 border border-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={18} />
              </button>

              <div className="p-8 sm:p-10 relative z-10">
                
                {/* Cabecera Ficha Técnica */}
                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-white/10">
                  <div className="w-20 h-20 rounded-2xl bg-dark-950 p-4 border border-white/15 flex items-center justify-center shrink-0 shadow-2xl">
                    <img
                      src={selectedSkill.icon}
                      alt={selectedSkill.name}
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-lg bg-primary-500/15 text-primary-400 text-xs font-bold border border-primary-500/30 flex items-center gap-1.5">
                        <ShieldCheck size={14} />
                        Nivel: {selectedSkill.level}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-dark-800 text-slate-300 text-xs font-medium border border-white/5 flex items-center gap-1.5">
                        <Terminal size={13} className="text-accent-cyan" />
                        Verificado
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-100 tracking-tight">
                      {selectedSkill.name}
                    </h3>
                  </div>
                </div>

                {/* Sección de Uso / Aplicación Práctica */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-primary-400" />
                    Aplicación en Proyectos Reales & Enfoque
                  </h4>
                  <div className="p-5 rounded-2xl bg-dark-950/80 border border-white/10 shadow-inner">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {selectedSkill.usage}
                    </p>
                  </div>
                </div>

                {/* Pie con botón a página oficial */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Layers size={14} className="text-primary-400" />
                    <span>Documentación y recursos oficiales</span>
                  </div>
                  <a
                    href={selectedSkill.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-primary-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    <ExternalLink size={16} />
                    Visitar Sitio Oficial
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};