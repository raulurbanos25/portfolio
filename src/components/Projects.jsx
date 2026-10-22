import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Globe, Folder, Eye, X, ChevronLeft, ChevronRight, Sparkles, Maximize2, Users } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useProjectAnalytics } from '../hooks/useProjectAnalytics';

export const Projects = () => {
  const { projects } = portfolioData;
  const [filter, setFilter] = useState('Todos');
  const [activeProject, setActiveProject] = useState(null); // Proyecto seleccionado para el Modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Índice del carrusel en el modal
  const [viewerIndex, setViewerIndex] = useState(null);
  const analyticsProject = projects[0];
  const analyticsImageCount = analyticsProject
    ? analyticsProject.images.length + (analyticsProject.galleryImages?.length || 0)
    : 0;
  const { projectViews, imageViews, recordProjectView, recordImageView } = useProjectAnalytics(
    portfolioData.profile.visitsNamespace,
    analyticsProject?.id,
    analyticsImageCount,
  );

  const categories = ['Todos', ...new Set(projects.map((p) => p.category))];

  const filteredProjects = filter === 'Todos' 
    ? projects 
    : projects.filter((p) => p.category === filter);

  // Abrir modal y reiniciar carrusel
  const handleOpenModal = (project) => {
    setActiveProject(project);
    setCurrentImageIndex(0);
    recordProjectView();
    recordImageView(0);
  };

  const handleCloseModal = () => {
    setActiveProject(null);
    setViewerIndex(null);
  };

  const allProjectImages = activeProject
    ? [...activeProject.images, ...(activeProject.galleryImages || [])]
    : [];

  useEffect(() => {
    if (viewerIndex === null) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setViewerIndex(null);
      if (event.key === 'ArrowRight') {
        const nextIndex = (viewerIndex + 1) % allProjectImages.length;
        setViewerIndex(nextIndex);
        recordImageView(nextIndex);
      }
      if (event.key === 'ArrowLeft') {
        const previousIndex = (viewerIndex - 1 + allProjectImages.length) % allProjectImages.length;
        setViewerIndex(previousIndex);
        recordImageView(previousIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewerIndex, allProjectImages.length, recordImageView]);

  const nextImage = () => {
    if (activeProject && activeProject.images) {
      const nextIndex = (currentImageIndex + 1) % activeProject.images.length;
      setCurrentImageIndex(nextIndex);
      recordImageView(nextIndex);
    }
  };

  const prevImage = () => {
    if (activeProject && activeProject.images) {
      const previousIndex = (currentImageIndex - 1 + activeProject.images.length) % activeProject.images.length;
      setCurrentImageIndex(previousIndex);
      recordImageView(previousIndex);
    }
  };

  const stepViewer = (direction) => {
    const nextIndex = (viewerIndex + direction + allProjectImages.length) % allProjectImages.length;
    setViewerIndex(nextIndex);
    recordImageView(nextIndex);
  };

  return (
    <section id="projects" className="py-28 relative bg-dark-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título de la Sección */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Galería de Trabajos
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
            Proyectos <span className="text-primary-500">Destacados</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Haz clic en cualquier tarjeta para ver el resumen detallado, vistas previas y capturas antes de visitar la demo.
          </p>
        </motion.div>

        {/* Filtros (se muestran cuando haya varios proyectos) */}
        {projects.length > 1 && <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:bg-white/5 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>}

        {/* Grid de Proyectos */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleOpenModal(project)}
                className="glass-panel rounded-3xl overflow-hidden border border-white/10 group hover:border-primary-500/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-primary-500/10"
              >
                <div>
                  {/* Imagen y Badge con efecto hover */}
                  <div className="relative h-56 overflow-hidden bg-dark-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-xl text-xs font-semibold bg-dark-950/80 backdrop-blur-md text-primary-400 border border-white/10 shadow-md">
                      {project.category}
                    </span>

                    {/* Botón flotante para ver resumen */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dark-950/40 backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-xl bg-primary-600 text-white text-xs font-semibold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={16} />
                        Ver Resumen y Vistas Previas
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-dark-900 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer de la tarjeta */}
                <div className="px-6 pb-6 pt-0 flex items-center justify-between border-t border-white/5 pt-4 text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5 text-primary-400">
                    <Sparkles size={14} />
                    Ver detalles completos
                  </span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform text-slate-300" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* --- MODAL DE RESUMEN Y VISTAS PREVIAS (CARRUSEL) --- */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-dark-950/80 backdrop-blur-md"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) handleCloseModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="glass-panel w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 shadow-2xl relative bg-dark-900/95"
            >
              {/* Botón Cerrar Modal */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-dark-950/80 text-slate-300 hover:text-white hover:bg-rose-500/20 border border-white/10 transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-10">
                {/* Cabecera del Modal */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold mb-3">
                    {activeProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
                    {activeProject.title}
                  </h3>
                </div>

                {/* --- CARRUSEL DE IMÁGENES / VISTAS PREVIAS --- */}
                <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden bg-dark-950 mb-8 border border-white/10 shadow-xl">
                  <img
                    src={activeProject.images[currentImageIndex]}
                    alt={`${activeProject.title} preview`}
                    className="w-full h-full object-contain transition-all duration-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setViewerIndex(currentImageIndex);
                      recordImageView(currentImageIndex);
                    }}
                    className="absolute right-4 top-4 rounded-xl border border-white/15 bg-dark-950/75 p-2.5 text-white shadow-lg backdrop-blur transition-colors hover:bg-primary-600"
                    aria-label="Ampliar imágenes del proyecto"
                    title="Ver imágenes en grande"
                  >
                    <Maximize2 size={18} />
                  </button>
                  
                  {/* Controles del Carrusel */}
                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-dark-950/70 text-white hover:bg-primary-600 border border-white/10 transition-colors"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-dark-950/70 text-white hover:bg-primary-600 border border-white/10 transition-colors"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md text-xs font-medium text-slate-300 border border-white/10">
                        {currentImageIndex + 1} / {activeProject.images.length}
                      </div>
                    </>
                  )}
                </div>
                <p className="-mt-6 mb-8 flex items-center gap-1.5 text-xs text-slate-500">
                  <Eye size={13} /> Imagen {currentImageIndex + 1}: <span className="font-semibold tabular-nums text-slate-300">{imageViews[currentImageIndex]?.toLocaleString('es-ES') ?? '—'} vistas</span>
                </p>

                {activeProject.galleryImages?.length > 0 && (
                  <div className="mb-8">
                    <div className="mb-4 flex items-end justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Galería del proyecto</h4>
                        <p className="mt-1 text-xs text-slate-500">Selecciona una imagen para verla en grande.</p>
                      </div>
                      <span className="text-xs tabular-nums text-slate-500">{activeProject.galleryImages.length} imágenes</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {activeProject.galleryImages.map((image, index) => {
                        const imageNumber = activeProject.images.length + index;
                        return (
                          <div key={image}>
                            <button
                              type="button"
                              onClick={() => {
                                setViewerIndex(imageNumber);
                                recordImageView(imageNumber);
                              }}
                              className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-dark-950 focus:outline-none focus:ring-2 focus:ring-primary-500"
                              aria-label={`Ampliar imagen ${imageNumber + 1}`}
                            >
                              <img src={image} alt={`${activeProject.title} — captura ${imageNumber + 1}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <span className="absolute inset-0 flex items-center justify-center bg-dark-950/0 text-white opacity-0 transition-all group-hover:bg-dark-950/35 group-hover:opacity-100"><Maximize2 size={20} /></span>
                            </button>
                            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-500"><Eye size={12} /> Imagen {imageNumber + 1}: <span className="font-semibold tabular-nums text-slate-300">{imageViews[imageNumber]?.toLocaleString('es-ES') ?? '—'} vistas</span></p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Descripción Ampliada y Resumen */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
                  <div className="lg:col-span-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Acerca del Proyecto
                    </h4>
                    <p className="text-slate-300 text-base leading-relaxed">
                      {activeProject.longDescription}
                    </p>
                  </div>

                  <div className="lg:col-span-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                        Tecnologías
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs font-medium bg-dark-950 text-slate-200 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción Finales en el Modal */}
                <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:min-w-52">
                    <span className="rounded-lg bg-primary-500/10 p-2 text-primary-400"><Users size={17} /></span>
                    <span><span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">Visitas al proyecto</span><span className="mt-0.5 block text-lg font-bold tabular-nums text-slate-100">{projectViews?.toLocaleString('es-ES') ?? '—'}</span></span>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl glass-panel hover:bg-white/10 text-slate-200 font-medium flex items-center justify-center gap-2 transition-all border border-white/10"
                  >
                    <Globe size={18} />
                    Ver Código Fuente
                  </a>
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary-600/30"
                  >
                    <ExternalLink size={18} />
                    Visitar Demo en Vivo
                  </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewerIndex !== null && activeProject && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setViewerIndex(null); }}
          >
            <button type="button" onClick={() => setViewerIndex(null)} aria-label="Cerrar visor de imágenes" className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/10 p-3 text-white transition-colors hover:bg-rose-500/80"><X size={22} /></button>
            <button type="button" onClick={() => stepViewer(-1)} aria-label="Imagen anterior" className="absolute left-3 sm:left-8 z-10 rounded-full border border-white/15 bg-black/45 p-3 text-white transition-colors hover:bg-primary-600"><ChevronLeft size={26} /></button>
            <motion.img
              key={allProjectImages[viewerIndex]}
              src={allProjectImages[viewerIndex]}
              alt={`${activeProject.title} — imagen ${viewerIndex + 1} de ${allProjectImages.length}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[86vh] max-w-[84vw] select-none object-contain"
            />
            <button type="button" onClick={() => stepViewer(1)} aria-label="Imagen siguiente" className="absolute right-3 sm:right-8 z-10 rounded-full border border-white/15 bg-black/45 p-3 text-white transition-colors hover:bg-primary-600"><ChevronRight size={26} /></button>
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-sm tabular-nums text-white">{viewerIndex + 1} / {allProjectImages.length}</span>
            <span className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs tabular-nums text-slate-200"><Eye size={13} /> {imageViews[viewerIndex]?.toLocaleString('es-ES') ?? '—'} vistas</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
