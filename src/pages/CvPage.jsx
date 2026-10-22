import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Code2, Wrench, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CvPage = () => {
  const { profile } = portfolioData;

  return (
    <div className="min-h-screen pt-32 pb-24 relative bg-dark-900">
      {/* Luz ambiental de fondo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabecera del CV con foto y botón de descarga */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Foto del CV */}
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary-500/40 shadow-lg bg-dark-950 shrink-0">
              <img 
                src="/foto/raul.jpg" 
                alt="Raúl Urbanos Esteban" 
                className="w-full h-full object-cover object-[center_30%]"
              />
            </div>
            <div>
              <div className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-2">
                Currículum Vitae Oficial
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
                Raúl Urbanos Esteban
              </h1>
              <p className="text-primary-400 font-medium text-sm mt-1">
                Desarrollador de Aplicaciones Web & Multiplataforma
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-primary-400" /> Travesía Sereni N°5, Pbj.</span>
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary-400" /> raul.urbanos.esteban@gmail.com</span>
                <span className="flex items-center gap-1.5"><Phone size={14} className="text-primary-400" /> 609063160</span>
              </div>
            </div>
          </div>

          {/* Botón de Descarga Directa del PDF */}
          <a
  href="/cv.pdf" 
  download="Currículum - Raúl Urbanos Esteban.pdf"
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary-600/30 hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
          >
            <Download size={18} />
            Descargar PDF
          </a>
        </motion.div>

        {/* Grid de Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Columna Izquierda (Perfil, Idiomas, Habilidades y Programas) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Sobre mí */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-base font-bold text-slate-100 mb-3 flex items-center gap-2">
                <FileText size={18} className="text-primary-400" />
                Sobre Mí
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Me considero una persona responsable, organizada y con una capacidad de trabajar en equipo. Con interés en seguir aprendiendo y mejorando mis habilidades técnicas.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-xs text-slate-400">
                <p>• Carné de conducir</p>
                <p>• Vehículo propio</p>
                <p>• Disponibilidad total</p>
              </div>
            </motion.div>

            {/* Idiomas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Globe size={18} className="text-accent-cyan" />
                Idiomas
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Castellano</span>
                  <span className="text-primary-400 text-xs font-bold">Nativo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Inglés</span>
                  <span className="text-primary-400 text-xs font-bold">Nivel B1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Francés</span>
                  <span className="text-slate-400 text-xs">Nivel básico</span>
                </div>
              </div>
            </motion.div>

            {/* Lenguajes de Programación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Code2 size={18} className="text-accent-purple" />
                Lenguajes
              </h2>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'Java', 'Python', 'MySQL', 'JavaScript', 'PHP'].map((lang, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-dark-950 text-slate-200 border border-white/10">
                    {lang}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Programas y Competencias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Wrench size={18} className="text-amber-400" />
                Programas & Áreas
              </h2>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Diseño de páginas web y logotipos</li>
                <li>• Gestión de redes sociales y cartelería</li>
                <li>• Diseño de aplicaciones y creación de contenido</li>
                <li>• Definición de estrategias y proyectos</li>
                <li>• Desarrollo y creación de programas</li>
              </ul>
            </motion.div>

          </div>

          {/* Columna Derecha (Experiencia Laboral y Datos Académicos) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Experiencia Laboral */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2.5">
                <Briefcase size={20} className="text-primary-400" />
                Experiencia Laboral
              </h2>
              
              <div className="space-y-8">
                {/* Experiencia 2 */}
                <div className="relative pl-6 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary-500 shadow-md" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-100">Paralegal Iberconsulting Team, S.L (COHEN Y AGUIRRE)</h3>
                    <span className="text-xs font-semibold text-primary-400">Marzo 2026 - Julio 2026</span>
                  </div>
                  <h4 className="text-xs font-semibold text-accent-cyan">Desarrollo y Automatización</h4>
                  <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                    <li>Diseño y desarrollo de páginas web para clientes y proyectos internos.</li>
                    <li>Desarrollo de una aplicación web para la gestión y control de clientes y consultorías.</li>
                    <li>Automatización de procesos mediante flujos de trabajo e implementación para reducir tareas manuales.</li>
                  </ul>
                </div>

                {/* Experiencia 1 */}
                <div className="relative pl-6 border-l border-white/10 space-y-2">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500 shadow-md" />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-bold text-slate-100">Mediacom 360</h3>
                    <span className="text-xs font-semibold text-slate-400">Octubre 2023 - Junio 2024</span>
                  </div>
                  <h4 className="text-xs font-semibold text-accent-purple">Marketing Interactivo & Diseño Web</h4>
                  <ul className="text-slate-300 text-sm space-y-1 list-disc list-inside">
                    <li>Gestión y diseño de redes sociales. Análisis de métricas clave para evaluar rendimiento.</li>
                    <li>Creación y diseño web para clientes, además de su justificación técnica.</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Datos Académicos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl"
            >
              <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2.5">
                <GraduationCap size={20} className="text-amber-400" />
                Datos Académicos
              </h2>
              
              <div className="space-y-6">
                <div className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-100">Grado Superior - Desarrollo de Aplicaciones Web (DAW)</h3>
                    <span className="text-xs text-amber-400 font-medium">2024-2026</span>
                  </div>
                  <p className="text-xs text-slate-400">LINKIA FP</p>
                </div>

                <div className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-100">Máster Inteligencia Artificial y Big Data</h3>
                    <span className="text-xs text-amber-400 font-medium">2024-2025</span>
                  </div>
                  <p className="text-xs text-slate-400">LINKIA FP</p>
                </div>

                <div className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-100">Grado Superior - Desarrollo de Aplicaciones Multiplataforma (DAM)</h3>
                    <span className="text-xs text-amber-400 font-medium">2022-2024</span>
                  </div>
                  <p className="text-xs text-slate-400">CESUR Madrid</p>
                </div>

                <div className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-100">Bachillerato</h3>
                    <span className="text-xs text-slate-400 font-medium">2020-2022</span>
                  </div>
                  <p className="text-xs text-slate-400">I.E.S Gaspar Sanz</p>
                </div>

                <div className="relative pl-6 border-l border-white/10 space-y-1">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-500" />
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-100">Educación Secundaria Obligatoria (ESO)</h3>
                    <span className="text-xs text-slate-400 font-medium">2016-2020</span>
                  </div>
                  <p className="text-xs text-slate-400">I.E.S Gaspar Sanz</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </div>
  );
};