import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2, FileText, Briefcase, MessageSquare, Clock, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Contact = () => {
  const { profile } = portfolioData;

  // Estado para el propósito del contacto (permite a los reclutadores elegir el motivo)
  const [contactIntent, setContactIntent] = useState('job'); // 'job' | 'freelance' | 'chat'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const intentLabels = { job: 'Oferta de empleo', freelance: 'Proyecto', chat: 'Saludo' };
    const subject = `${intentLabels[contactIntent] || 'Mensaje'} — ${formData.name}`;
    const body = [
      `Nombre: ${formData.name}`,
      `Correo: ${formData.email}`,
      formData.company ? `Empresa o institución: ${formData.company}` : null,
      `Motivo: ${intentLabels[contactIntent] || 'Mensaje'}`,
      '',
      'Mensaje:',
      formData.message,
    ].filter((line) => line !== null).join('\n');
    const gmailCompose = new URL('https://mail.google.com/mail/');
    gmailCompose.searchParams.set('view', 'cm');
    gmailCompose.searchParams.set('fs', '1');
    gmailCompose.searchParams.set('to', profile.email);
    gmailCompose.searchParams.set('su', subject);
    gmailCompose.searchParams.set('body', body);
    window.open(gmailCompose.toString(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="py-28 relative bg-dark-900/60">
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
            Conectemos
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Contacto & <span className="text-primary-500">Oportunidades</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            ¿Buscas talento frontend para tu equipo o tienes un proyecto en mente? Hablemos de cómo puedo aportar valor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* --- COLUMNA IZQUIERDA: INFORMACIÓN Y NUEVOS RECURSOS PARA EMPRESAS --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Tarjeta Principal de Info */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

              <h3 className="text-2xl font-bold text-slate-100 mb-4">
                Información Directa
              </h3>
              <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                Actualmente abierto a ofertas de empleo en desarrollo frontend, prácticas profesionales avanzadas y retos de ingeniería web.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl glass-panel border border-white/10 text-primary-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">Correo Electrónico</span>
                    <a href={`mailto:${profile.email}`} className="text-slate-100 hover:text-primary-400 font-semibold text-sm transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl glass-panel border border-white/10 text-accent-cyan">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">Ubicación</span>
                    <span className="text-slate-100 font-semibold text-sm">{profile.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl glass-panel border border-white/10 text-accent-purple">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">Tiempo de respuesta</span>
                    <span className="text-slate-100 font-semibold text-sm">Menos de 24 horas</span>
                  </div>
                </div>
              </div>

              {/* Botón de descarga de CV (Aporte clave para reclutadores) */}
              <div className="pt-6 border-t border-white/10">
                <a
                  href="/cv-raul.pdf"
                  download="Currículum - Raúl Urbanos Esteban.pdf"
                  className="w-full py-3.5 px-4 rounded-xl bg-dark-950 hover:bg-dark-800 text-slate-200 border border-white/10 font-medium flex items-center justify-center gap-2.5 transition-all text-sm group shadow-md"
                >
                  <FileText size={18} className="text-primary-400 group-hover:scale-110 transition-transform" />
                  Descargar Currículum (PDF)
                </a>
              </div>
            </div>

            {/* Badge de disponibilidad en tiempo real */}
            <div className="glass-panel p-5 rounded-2xl border border-primary-500/30 flex items-center gap-4 bg-primary-500/5">
              <div className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </div>
              <div className="text-xs text-slate-300">
                <span className="font-bold text-slate-100 block mb-0.5">{profile.availability}</span>
                Disponible para incorporación inmediata en proyectos y equipos tecnológicos.
              </div>
            </div>

          </motion.div>

          {/* --- COLUMNA DERECHA: FORMULARIO INTERACTIVO AVANZADO --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Envía un mensaje directo
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Selecciona el motivo de tu mensaje para personalizar la consulta:
              </p>

              {/* Selector de Intención de Contacto */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setContactIntent('job')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all border ${
                    contactIntent === 'job'
                      ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-600/30'
                      : 'bg-dark-950 text-slate-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  <Briefcase size={14} />
                  <span>Oferta Empleo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContactIntent('freelance')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all border ${
                    contactIntent === 'freelance'
                      ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-600/30'
                      : 'bg-dark-950 text-slate-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>Proyecto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setContactIntent('chat')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all border ${
                    contactIntent === 'chat'
                      ? 'bg-primary-600 text-white border-primary-500 shadow-lg shadow-primary-600/30'
                      : 'bg-dark-950 text-slate-400 border-white/10 hover:border-white/30'
                  }`}
                >
                  <MessageSquare size={14} />
                  <span>Saludar</span>
                </button>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Tu Nombre / Reclutador *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Laura Gómez"
                    className="w-full px-4 py-3 rounded-xl bg-dark-950/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ej. laura@empresa.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-950/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Empresa o Institución (Opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ej. Tech Solutions S.L."
                  className="w-full px-4 py-3 rounded-xl bg-dark-950/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Mensaje o Detalles de la Oferta *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    contactIntent === 'job' 
                      ? "Cuéntame sobre la posición vacante, requisitos o detalles del equipo..."
                      : contactIntent === 'freelance'
                      ? "Describe brevemente los objetivos del proyecto y plazos previstos..."
                      : "Escribe tu mensaje o saludo..."
                  }
                  className="w-full px-4 py-3 rounded-xl bg-dark-950/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:bg-primary-600/50 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/30 active:scale-95 cursor-pointer"
              >
                {status === 'sending' && (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando mensaje...
                  </>
                )}
                {status === 'idle' && (
                  <>
                    <Send size={18} />
                    Enviar Mensaje Directo
                  </>
                )}
                {status === 'success' && (
                  <>
                    <CheckCircle size={18} className="text-emerald-400" />
                    ¡Mensaje enviado con éxito! Te responderé pronto.
                  </>
                )}
                {status === 'error' && (
                  <>
                    <AlertCircle size={18} className="text-rose-400" />
                    Error al enviar. Inténtalo de nuevo.
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
