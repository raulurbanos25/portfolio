import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Share2, Globe, Mail, Sparkles, UserCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Hero = () => {
  const { profile } = portfolioData;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-28 pb-20 overflow-hidden">
      {/* Luces ambientales de fondo estilo estudio fotográfico */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-primary-500/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-accent-purple/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Columna Izquierda: Identidad, Nombre y Propuesta de Valor */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Badge de Disponibilidad */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-primary-500/30 text-primary-400 text-xs sm:text-sm font-semibold mb-8 shadow-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
              </span>
              <Sparkles size={14} className="text-primary-400" />
              {profile.availability}
            </motion.div>

            {/* Saludo y Nombre Destacado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <span className="block text-slate-400 text-base sm:text-lg font-medium mb-1">
                Hola, encantado de conocerte. Me llamo
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-100 leading-[1.1]">
                Raúl <span className="bg-gradient-to-r from-primary-400 via-accent-purple to-accent-cyan bg-clip-text text-transparent">Urbanos</span>
              </h1>
            </motion.div>

            {/* Subtítulo / Rol */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 font-medium mb-6 max-w-xl leading-relaxed"
            >
              {profile.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-slate-400 text-sm sm:text-base mb-10 max-w-xl leading-relaxed"
            >
              Especializado en desarrollar soluciones digitales que combinan creatividad visual, diseño funcional, programación y tecnología para transformar ideas en proyectos innovadores.
            </motion.p>

            {/* Botones de Acción (CTAs) con Link configurado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <Link
                to="/proyectos"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-500 text-white font-semibold flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary-600/30 hover:scale-[1.02] active:scale-95"
              >
                Proyectos Destacados
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contacto"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 text-slate-200 font-semibold flex items-center justify-center gap-3 transition-all border border-white/10 hover:scale-[1.02] active:scale-95"
              >
                <Mail size={18} />
                Contacta Conmigo
              </Link>
            </motion.div>

            {/* Redes Sociales / Enlaces rápidos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 text-slate-400"
            >
              <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mr-1">Perfiles:</span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-panel hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Globe size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl glass-panel hover:text-white hover:border-primary-500/50 transition-all hover:scale-110">
                <Share2 size={18} />
              </a>
            </motion.div>

          </div>

          {/* Columna Derecha: Tarjeta Fotográfica / Retrato de Estudio Profesional */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Marco decorativo difuminado detrás */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary-500 to-accent-purple rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt pointer-events-none" />

              {/* Tarjeta principal contenedora de la foto / avatar */}
              <div className="glass-panel p-4 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden bg-dark-900/90">
                <div className="relative h-[420px] rounded-2xl overflow-hidden bg-dark-950 border border-white/5 flex items-center justify-center group">
                  
                  {/* Imagen de perfil profesional */}
                  <img
                    src="foto/raul.jpg"
                    alt="Raúl Urbanos Esteban - Desarrollador Frontend"
                    className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-70" />

                  {/* Badge flotante inferior sobre la foto */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel border border-white/10 backdrop-blur-md flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary-500/20 text-primary-400">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-100">Raúl Urbanos Esteban</span>
                        <span className="text-[11px] text-slate-400">Desarrollador Full Stack Junior</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
                      Activo
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};