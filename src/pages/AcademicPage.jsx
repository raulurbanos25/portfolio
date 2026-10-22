import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Award, Globe, Calendar, CheckCircle2, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1];

export const AcademicPage = () => {
  const { academic } = portfolioData;
  const [activeTab, setActiveTab] = useState('degrees'); // 'degrees' | 'certifications' | 'languages'
  const [activeCertificate, setActiveCertificate] = useState(null);

  useEffect(() => {
    if (!activeCertificate) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setActiveCertificate(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [activeCertificate]);

  // Línea de progreso del timeline (se va "dibujando" al hacer scroll)
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-dark-900">
      {/* Luces ambientales de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera de la Página */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Formación & Titulaciones
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-100 mb-4">
            Experiencia <span className="text-primary-500">Académica</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Títulos oficiales, bachillerato, certificaciones técnicas especializadas y competencias lingüísticas.
          </p>
        </motion.div>

        {/* Pestañas de Navegación Académica */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          <button
            onClick={() => setActiveTab('degrees')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'degrees'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105 border border-primary-400/50'
                : 'glass-panel text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            <GraduationCap size={18} />
            <span>Títulos & Estudios</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105 border border-primary-400/50'
                : 'glass-panel text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            <Award size={18} />
            <span>Certificaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('languages')}
            className={`px-6 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 cursor-pointer ${
              activeTab === 'languages'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105 border border-primary-400/50'
                : 'glass-panel text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
            }`}
          >
            <Globe size={18} />
            <span>Idiomas</span>
          </button>
        </div>

        {/* --- CONTENIDO SEGÚN LA PESTAÑA ACTIVA --- */}
        <div className="max-w-4xl mx-auto">
          
          {/* 1. Títulos y Estudios → TIMELINE (el más reciente arriba) */}
          {activeTab === 'degrees' && (
            <div ref={timelineRef} className="relative">
              {/* Línea base (gris) */}
              <div className="absolute left-[11px] top-0 bottom-0 w-0.5 rounded-full bg-white/10" />
              {/* Línea de progreso (se rellena al bajar) */}
              <motion.div
                style={{ scaleY: lineScale }}
                className="absolute left-[11px] top-0 bottom-0 w-0.5 rounded-full origin-top bg-gradient-to-b from-primary-500 to-accent-cyan"
              />

              <div className="space-y-10">
                {academic.degrees.map((item, index) => (
                  <div key={item.id} className="relative pl-10 md:pl-14">
                    {/* Imagen del centro en la línea del tiempo */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: index === 0 ? 0.1 : 0 }}
                      className="absolute left-0 top-5 w-12 h-12 rounded-xl bg-dark-950 border-2 border-primary-500 p-0.5 shadow-lg shadow-black/30 overflow-hidden z-10"
                    >
                      <img src={item.institutionImage} alt={`Centro ${item.institution}`} className="w-full h-full object-cover rounded-md" />
                    </motion.div>

                    {/* Tarjeta: aparece al llegar con el scroll (la primera, al abrir la pestaña) */}
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.7, ease: EASE, delay: index === 0 ? 0.15 : 0 }}
                      className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl hover:border-primary-500/40 transition-colors"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold">
                          <Calendar size={13} />
                          {item.period}
                        </span>
                        <span className="px-3 py-1 rounded-lg bg-dark-950 text-slate-300 text-xs font-medium border border-white/5">
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-slate-100 mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-accent-purple mb-4">
                        {item.institution}
                      </h4>

                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {item.skillsLearned.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-dark-950 text-slate-300 border border-white/10 flex items-center gap-1.5"
                          >
                            <CheckCircle2 size={13} className="text-primary-500" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. Certificaciones */}
          {activeTab === 'certifications' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {academic.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-panel p-8 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-primary-500/50 transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
                        <ShieldCheck size={22} />
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-dark-950 text-primary-400 text-xs font-bold border border-white/5">
                        {cert.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
                      {cert.name}
                    </h3>
                    <h4 className="text-xs font-semibold text-accent-cyan mb-4">
                      Emitido por {cert.issuer} • {cert.date}
                    </h4>

                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    {cert.certificateFile ? (
                      <button onClick={() => setActiveCertificate(cert)} className="inline-flex items-center gap-2 rounded-xl bg-primary-600 hover:bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors">
                        <ShieldCheck size={16} /> Ver certificado
                      </button>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium">Verificación oficial acreditada</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeCertificate && (
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveCertificate(null); }}>
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
              <section role="dialog" aria-modal="true" aria-labelledby="certificate-title" className="relative z-10 flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-dark-900 shadow-2xl">
                <header className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-400">Certificado académico</p>
                    <h2 id="certificate-title" className="mt-1 text-xl font-bold text-slate-100 sm:text-2xl">{activeCertificate.name}</h2>
                    <p className="mt-1 text-sm text-slate-400">{activeCertificate.issuer} · {activeCertificate.date}</p>
                  </div>
                  <button onClick={() => setActiveCertificate(null)} aria-label="Cerrar certificado" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={20} /></button>
                </header>
                <p className="px-5 pt-4 text-sm leading-relaxed text-slate-300 sm:px-6">{activeCertificate.description}</p>
                <iframe title={`Documento: ${activeCertificate.name}`} src={activeCertificate.certificateFile} className="mt-4 min-h-[55vh] flex-1 bg-white" />
                <footer className="flex justify-end border-t border-white/10 p-4">
                  <a href={activeCertificate.certificateFile} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-400 hover:text-primary-300">Abrir PDF en otra pestaña <ExternalLink size={15} /></a>
                </footer>
              </section>
            </div>
          )}

          {/* 3. Idiomas */}
          {activeTab === 'languages' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-slate-100 mb-2">
                Competencias Lingüísticas
              </h3>
              <p className="text-slate-400 text-sm mb-6">
                Idiomas hablados y nivel de fluidez aplicado al entorno profesional técnico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {academic.languages.map((lang) => (
                  <article key={lang.language} className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 hover:border-primary-500/40 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-slate-100">{lang.language}</h4>
                        <p className="mt-1 text-xs text-slate-400">{lang.country}</p>
                      </div>
                      <img src={lang.flag} alt={`Bandera de ${lang.country}`} className="h-9 w-14 rounded-md border border-white/10 object-cover shadow-md" />
                    </div>
                    <div className="mt-5 inline-flex rounded-lg bg-primary-500/10 border border-primary-500/20 px-3 py-1.5 text-sm font-bold text-primary-400">{lang.level}</div>
                  </article>
                ))}
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
};
