import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SettingsDock } from './components/SettingsDock';
import { LiveStatsBar } from './components/LiveStatsBar';
import { Intro } from './components/Intro';
import { IntroContext } from './context/introContext';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import { AcademicPage } from './pages/AcademicPage';
import { CvPage } from './pages/CvPage';

// Rutas que apuntan a la página académica. Una de ellas tiene que coincidir
// con el "to" del botón en Navbar.jsx. Cuando lo tengas claro, deja solo una.
const ACADEMIC_PATHS = ['/academico', '/academic', '/academica', '/formacion', '/estudios'];

const INTRO_KEY = 'portfolio-intro-seen';

// La intro sale una vez por sesión, y nunca con "reducir movimiento"
const shouldPlayIntro = () => {
  try {
    if (sessionStorage.getItem(INTRO_KEY)) return false;
  } catch {
    /* sin sessionStorage */
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 selection:bg-primary-500 selection:text-white relative">
      <ScrollToTop />
      <Navbar />
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Outlet />
        {pathname !== '/' && <LiveStatsBar key={pathname} />}
      </motion.main>
      <Footer />
      <SettingsDock />
    </div>
  );
}

function NotFound() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 pt-24">
      <h1 className="text-6xl font-extrabold text-primary-500">404</h1>
      <p className="text-slate-400">Esta página no existe.</p>
      {/* Te dice a qué ruta ha intentado ir, para depurar */}
      <code className="text-xs text-slate-500">{pathname}</code>
      <Link to="/" className="text-primary-400 hover:text-primary-300 font-medium">
        Volver al inicio
      </Link>
    </div>
  );
}

function App() {
  const { loading, error } = usePortfolioData();

  // 'intro' → 'revealing' (se abre) → 'done'
  const [phase, setPhase] = useState(() => (shouldPlayIntro() ? 'intro' : 'done'));

  const reveal = useCallback(() => setPhase((p) => (p === 'intro' ? 'revealing' : p)), []);
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignorar */
    }
    setPhase('done');
  }, []);

  const introValue = useMemo(() => ({ ready: phase !== 'intro' }), [phase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-slate-100 gap-4">
        <Loader2 size={40} className="animate-spin text-primary-500" />
        <p className="text-sm font-medium tracking-wide text-slate-400">Cargando portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-slate-100 gap-2">
        <p className="text-rose-400 font-medium">{error}</p>
        <span className="text-xs text-slate-500">Por favor, recarga la página.</span>
      </div>
    );
  }

  return (
    <IntroContext.Provider value={introValue}>
      {phase !== 'done' && <Intro onReveal={reveal} onDone={finish} />}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/proyectos" element={<ProjectsPage />} />
          <Route path="/experiencia" element={<ExperiencePage />} />
          {ACADEMIC_PATHS.map((path) => (
            <Route key={path} path={path} element={<AcademicPage />} />
          ))}
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cv" element={<CvPage />} />
        </Route>
      </Routes>
      <Analytics />
    </IntroContext.Provider>
  );
}

export default App;
