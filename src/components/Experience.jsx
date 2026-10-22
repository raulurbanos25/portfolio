import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Clock, CheckCircle2, Building2, ChevronRight, ChevronDown, MousePointerClick, FileText, X, Download, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const RECOMMENDATION_FILE = '/CARTA_DE_RECOMENDACI%C3%93N_LABORAL_RAUL_signed.pdf';

export const Experience = () => {
  const { experience } = portfolioData;
  // Iniciamos en null para que ninguna esté abierta por defecto al cargar la página
  const [selectedId, setSelectedId] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const selectedExperience = experience.find((exp) => exp.id === selectedId);
  const [calendarDate, setCalendarDate] = useState(() => new Date());

  const getRange = (item) => ({
    start: item.startDate ? new Date(`${item.startDate}T12:00:00`) : null,
    end: item.endDate ? new Date(`${item.endDate}T12:00:00`) : null,
  });
  const holidays = {
    '2023-10-12': 'Fiesta Nacional de España',
    '2023-11-01': 'Todos los Santos',
    '2023-12-06': 'Día de la Constitución',
    '2023-12-08': 'Inmaculada Concepción',
    '2023-12-25': 'Navidad',
    '2024-01-01': 'Año Nuevo',
    '2024-03-28': 'Jueves Santo',
    '2024-03-29': 'Viernes Santo',
    '2024-05-01': 'Fiesta del Trabajo',
    '2024-05-02': 'Día de la Comunidad de Madrid',
    '2026-04-02': 'Jueves Santo',
    '2026-04-03': 'Viernes Santo',
    '2026-05-01': 'Fiesta del Trabajo',
    '2026-05-02': 'Día de la Comunidad de Madrid',
  };
  const dateKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const getDayOff = (date) => {
    const key = dateKey(date);
    if (holidays[key]) return holidays[key];
    const month = date.getMonth();
    if ((month === 11 && date.getDate() >= 24) || (month === 0 && date.getDate() <= 6)) return 'Vacaciones de Navidad';
    return null;
  };
  const isWeekday = (date) => date.getDay() !== 0 && date.getDay() !== 6;
  const countWeekdays = (start, end) => {
    if (!start || !end || start > end) return 0;
    let count = 0;
    const cursor = new Date(start);
    while (cursor <= end) {
      if (isWeekday(cursor) && !getDayOff(cursor)) count += 1;
      cursor.setDate(cursor.getDate() + 1);
    }
    return count;
  };
  const totalDays = experience.reduce((sum, item) => {
    const { start, end } = getRange(item);
    return sum + countWeekdays(start, end);
  }, 0);
  const selectedRange = selectedExperience ? getRange(selectedExperience) : { start: null, end: null };
  const monthStart = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
  const monthEnd = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
  const activeStart = selectedRange.start && selectedRange.start > monthStart ? selectedRange.start : monthStart;
  const activeEnd = selectedRange.end && selectedRange.end < monthEnd ? selectedRange.end : monthEnd;
  const monthDays = countWeekdays(activeStart, activeEnd);
  const monthWeekdays = countWeekdays(monthStart, monthEnd);
  const monthLabel = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(calendarDate);

  return (
    <section id="experience" className="py-28 relative bg-dark-900/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Línea del Tiempo Interactiva
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Trayectoria & <span className="text-primary-500">Empresas</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Haz clic en cualquiera de los logos de las empresas de la línea temporal para desplegar su desglose completo.
          </p>
        </motion.div>

        <div className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6 mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Experiencia acumulada</p>
              <p className="text-3xl font-extrabold text-slate-100 mt-1">{totalDays} <span className="text-base font-medium text-slate-400">días laborables estimados</span></p>
              <p className="text-xs text-slate-500 mt-1">Lunes a viernes, descontando festivos nacionales y autonómicos y el descanso de Navidad (24 dic.–6 ene.).</p>
            </div>
        </div>

        <section aria-labelledby="compare-companies-title" className="mb-12">
          <button
            type="button"
            aria-expanded={showComparison}
            aria-controls="company-comparison"
            onClick={() => setShowComparison((isOpen) => !isOpen)}
            className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left hover:border-primary-500/40 hover:bg-white/[0.05] transition-colors"
          >
            <span>
              <span id="compare-companies-title" className="block text-sm font-bold text-slate-100">Comparar empresas</span>
              <span className="block text-[11px] text-slate-500 mt-0.5">Días trabajados y equipos</span>
            </span>
            <span className="flex items-center gap-3 text-sm text-slate-400">
              <ChevronDown size={16} className={`transition-transform duration-300 ${showComparison ? 'rotate-180 text-primary-400' : ''}`} />
            </span>
          </button>
          <AnimatePresence initial={false}>
            {showComparison && (
              <motion.div
                id="company-comparison"
                initial={{ height: 0, opacity: 0, y: -8 }}
                animate={{ height: 'auto', opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-5 pt-4">
              {experience.map((item) => {
                const { start, end } = getRange(item);
                const days = countWeekdays(start, end);
                const maxDays = Math.max(...experience.map((entry) => {
                  const range = getRange(entry);
                  return countWeekdays(range.start, range.end);
                }));
                const maxTeamSize = Math.max(...experience.map((entry) => entry.teamSize || 0));
                const color = item.calendarColor === 'red' ? 'bg-red-500' : 'bg-blue-500';
                const accentText = item.calendarColor === 'red' ? 'text-red-300' : 'text-blue-300';
                const accentBorder = item.calendarColor === 'red' ? 'border-red-500/25' : 'border-blue-500/25';
                return (
                  <article key={item.id} className={`relative overflow-hidden rounded-2xl border ${accentBorder} bg-gradient-to-br from-white/[0.07] to-dark-950/80 p-5 sm:p-6 shadow-xl`}>
                    <div className={`absolute -right-8 -top-10 h-36 w-36 rounded-full ${color} opacity-[0.09] blur-3xl pointer-events-none`} />
                    <div className="relative flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <img src={item.logo} alt={`Logo de ${item.company}`} className={`h-12 w-12 rounded-xl border ${accentBorder} bg-dark-900 object-cover shadow-lg`} />
                        <div>
                          <p className="text-base font-bold text-slate-100">{item.company}</p>
                          <p className="mt-1 text-xs text-slate-400">{item.period}</p>
                        </div>
                      </div>
                      <span className={`rounded-full border ${accentBorder} bg-dark-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${accentText}`}>{item.role.includes('Prácticas') || item.role.includes('Practicas') ? 'Prácticas' : 'Experiencia'}</span>
                    </div>
                    <div className="relative grid grid-cols-2 gap-3 py-5">
                      <div className="rounded-xl bg-dark-950/65 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Días estimados</p>
                        <p className={`mt-1 text-2xl font-extrabold ${accentText}`}>{days}<span className="ml-1 text-xs font-semibold">días</span></p>
                      </div>
                      <div className="rounded-xl bg-dark-950/65 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Equipo</p>
                        <p className="mt-1 text-2xl font-extrabold text-slate-100">{item.teamSizeLabel}<span className="ml-1 text-xs font-semibold text-slate-400">personas</span></p>
                      </div>
                    </div>
                    <div className="relative space-y-4">
                      <div>
                        <div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-slate-300">Días trabajados</span><span className={accentText}>{maxDays ? Math.round((days / maxDays) * 100) : 0}%</span></div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-dark-800"><div className={`h-full rounded-full ${color} shadow-[0_0_12px_currentColor]`} style={{ width: `${maxDays ? (days / maxDays) * 100 : 0}%` }} /></div>
                      </div>
                      <div>
                        <div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-slate-300">Tamaño del equipo</span><span className={accentText}>{maxTeamSize ? Math.round((item.teamSize / maxTeamSize) * 100) : 0}%</span></div>
                        <div className="h-2 overflow-hidden rounded-full bg-dark-800"><div className={`h-full rounded-full opacity-80 ${color}`} style={{ width: `${maxTeamSize ? (item.teamSize / maxTeamSize) * 100 : 0}%` }} /></div>
                      </div>
                    </div>
                  </article>
                );
              })}
              <p className="md:col-span-2 text-xs text-slate-500">Estimación de días laborables descontando fines de semana, festivos nacionales y autonómicos y Navidad.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- LÍNEA DEL TIEMPO HORIZONTAL (SELECTORES) --- */}
        <div className="relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-dark-800 -translate-y-1/2 hidden sm:block z-0" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            {experience.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(isSelected ? null : item.id);
                    const rangeStart = item.startDate ? new Date(`${item.startDate}T12:00:00`) : new Date();
                    setCalendarDate(new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1));
                  }} // Permite alternar (abrir/cerrar)
                  className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 w-full sm:w-auto min-w-[280px] glass-panel border ${
                    isSelected
                      ? 'border-primary-500 bg-primary-500/15 shadow-lg shadow-primary-500/25 scale-105'
                      : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
            <div
  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accentColor} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 overflow-hidden`}
>
  <img
    src={item.logo}
    alt={`Logo de ${item.company}`}
    className="w-full h-full object-cover rounded-xl"
  />
</div>

                  <div className="text-left overflow-hidden">
                    <span className="block text-xs text-primary-400 font-semibold truncate">
                      {item.period}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 truncate">
                      {item.company}
                    </h4>
                    <span className="text-xs text-slate-400 truncate block">
                      {item.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- PANEL DESGLOSADO (SOLO SE MUESTRA SI SE HACE CLIC) --- */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {!selectedExperience ? (
              // Estado inicial: Ninguna seleccionada
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-10 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center gap-3 py-16"
              >
                <div className="p-4 rounded-2xl bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-1">
                  <MousePointerClick size={28} className="animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-slate-200">Ninguna empresa seleccionada</h3>
                <p className="text-sm text-slate-400 max-w-sm">
                  Haz clic arriba en cualquiera de los bloques para ver el desglose de tareas, proyectos y tecnologías.
                </p>
              </motion.div>
            ) : (
              // Estado con empresa seleccionada abierta
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10 mb-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold flex items-center gap-1.5">
                        <Calendar size={13} />
                        {selectedExperience.period}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-dark-800 border border-white/5 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                        <Clock size={13} className="text-accent-cyan" />
                        {selectedExperience.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
                      {selectedExperience.role}
                    </h3>
                    <div className="flex items-center gap-2 text-accent-purple font-semibold text-lg">
                      <Building2 size={20} />
                      <span>{selectedExperience.company}</span>
                    </div>
                    {selectedExperience.id === 1 && (
                      <button
                        type="button"
                        onClick={() => setShowRecommendation(true)}
                        className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-200 transition-colors hover:border-red-400/50 hover:bg-red-500/15"
                      >
                        <FileText size={16} /> Carta de recomendación
                      </button>
                    )}
                  </div>

                  <div className="lg:max-w-md p-5 rounded-2xl bg-dark-950/60 border border-white/5">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                      Sobre la empresa
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedExperience.companyDescription}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Briefcase size={16} className="text-primary-400" />
                      Principales tareas & logros
                    </h4>
                    <ul className="space-y-3">
                      {selectedExperience.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                          <CheckCircle2 size={16} className="text-primary-500 shrink-0 mt-1" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                        Tecnologías aplicadas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-dark-800 text-slate-200 border border-white/10 flex items-center gap-1.5 shadow-inner"
                          >
                            <ChevronRight size={12} className="text-primary-500" />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl bg-dark-950/50 border border-white/10 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-slate-100">Calendario de actividad</h4>
                      <p className="text-sm text-slate-400 mt-1">Días laborables estimados en el periodo</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button aria-label="Mes anterior" onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1))} className="p-2.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white"><ChevronRight className="rotate-180" size={17} /></button>
                      <span className="text-sm font-semibold text-slate-200 capitalize min-w-[140px] text-center">{monthLabel}</span>
                      <button aria-label="Mes siguiente" onClick={() => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1))} className="p-2.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white"><ChevronRight size={17} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center">
                    {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => <span key={`${day}-${index}`} className="text-[11px] font-bold text-slate-400 py-1.5">{day}</span>)}
                    {Array.from({ length: (monthStart.getDay() + 6) % 7 }, (_, index) => <span key={`empty-${index}`} />)}
                    {Array.from({ length: monthEnd.getDate() }, (_, index) => {
                      const date = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), index + 1);
                      const inPeriod = selectedRange.start && selectedRange.end && date >= selectedRange.start && date <= selectedRange.end;
                      const dayOff = getDayOff(date);
                      const workday = isWeekday(date) && !dayOff;
                      const activeColor = selectedExperience.calendarColor === 'red'
                        ? 'bg-red-500/25 text-red-100 border-red-400/50'
                        : 'bg-blue-500/25 text-blue-100 border-blue-400/50';
                      return <div key={index} title={dayOff || (inPeriod && workday ? 'Día laborable estimado' : undefined)} className={`min-h-11 sm:min-h-14 rounded-lg border flex flex-col items-center justify-center gap-0.5 ${inPeriod && workday ? activeColor : inPeriod && dayOff ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-white/[0.02] text-slate-600 border-white/5'}`}>
                        <span className="text-xs sm:text-sm font-bold">{index + 1}</span>
                        {inPeriod && workday && <img src={selectedExperience.logo} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded object-cover" />}
                      </div>;
                    })}
                  </div>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2"><span className="font-medium text-slate-300">Actividad de {monthLabel}</span><span className={`font-bold ${selectedExperience.calendarColor === 'red' ? 'text-red-300' : 'text-blue-300'}`}>{monthDays} / {monthWeekdays} días laborables</span></div>
                    <div className="h-2.5 rounded-full bg-dark-800 overflow-hidden"><motion.div initial={false} animate={{ width: `${monthWeekdays ? (monthDays / monthWeekdays) * 100 : 0}%` }} className={`h-full rounded-full ${selectedExperience.calendarColor === 'red' ? 'bg-red-500' : 'bg-blue-500'}`} /></div>
                  </div>
                </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      <AnimatePresence>
        {showRecommendation && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setShowRecommendation(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="recommendation-title"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-dark-900 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl border border-red-400/20 bg-red-500/10 p-2.5 text-red-300"><FileText size={20} /></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Cohen y Aguirre</p>
                    <h2 id="recommendation-title" className="mt-1 text-lg font-bold text-slate-100">Carta de recomendación</h2>
                  </div>
                </div>
                <button type="button" onClick={() => setShowRecommendation(false)} aria-label="Cerrar ventana" className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"><X size={19} /></button>
              </div>
              <div className="min-h-0 flex-1 p-4 sm:p-5">
                <iframe
                  title="Carta de recomendación laboral de Raúl"
                  src={RECOMMENDATION_FILE}
                  className="h-[58vh] min-h-[320px] w-full rounded-xl bg-white"
                />
                <div className="mt-4 flex flex-wrap justify-end gap-3">
                  <a
                    href={RECOMMENDATION_FILE}
                    download="Carta de recomendación laboral Raúl.pdf"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
                  >
                    <Download size={16} /> Descargar carta
                  </a>
                  <a
                    href={RECOMMENDATION_FILE}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <ExternalLink size={16} /> Abrir en otra pestaña
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
