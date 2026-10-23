import React, { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
import { ArrowUpRight, Clock, Code2, Eye, Heart, Timer } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useVisitCounter } from '../hooks/useVisitCounter';
import { useGithubStats } from '../hooks/useGithubStats';
import { useLikeCounter } from '../hooks/useLikeCounter';
import { useVisitDuration } from '../hooks/useVisitDuration';

const LANG_COLORS = ['#6366f1', '#a855f7', '#06b6d4', '#10b981'];

// ── Utilidades ─────────────────────────────────────────────────
function partsIn(date, timeZone) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hourCycle: 'h23',
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  return f.formatToParts(date).reduce((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.type === 'weekday' ? p.value : Number(p.value);
    return acc;
  }, {});
}

function timeAgo(iso) {
  if (!iso) return null;
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs) return rtf.format(Math.round(diff / secs), unit);
  }
  return 'ahora mismo';
}

// ── Piezas ─────────────────────────────────────────────────────
function CountUp({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{display.toLocaleString('es-ES')}</>;
}

// Tarjeta con foco de luz que sigue al ratón
function Card({ className = '', delay = 0, children }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden glass-panel rounded-3xl border border-white/10 p-6 sm:p-7 hover:border-primary-500/30 transition-colors ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-primary-500) 16%, transparent), transparent 70%)',
        }}
      />
      <div className="relative h-full flex flex-col">{children}</div>
    </motion.div>
  );
}

function CardHead({ icon: Icon, label, right }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="p-2 rounded-xl bg-primary-500/10 text-primary-400">
          <Icon size={16} />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</span>
      </div>
      {right}
    </div>
  );
}

// ── Tarjeta: visitas ───────────────────────────────────────────
function VisitsCard({ visits, failed, hasNamespace }) {
  const content =
    visits !== null ? <CountUp value={visits} /> : failed || !hasNamespace ? '—' : '…';

  return (
    <Card className="md:col-span-1" delay={0}>
      <CardHead icon={Eye} label="Visitas" />
      <div
        className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-tighter leading-none tabular-nums"
      >
        <span className="bg-gradient-to-br from-primary-400 to-accent-cyan bg-clip-text text-transparent">
          {content}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-400 leading-relaxed">
        Cada nueva visita a la web suma al contador.
      </p>
    </Card>
  );
}

// ── Tarjeta: hora local y horario ──────────────────────────────
function TimeCard({ timeZone, location }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

  const p = partsIn(now, timeZone);
  const time = `${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`;

  return (
    <Card className="md:col-span-1 !p-4 sm:!p-5" delay={0.1}>
      <CardHead icon={Clock} label="Hora local" />
      <div className="mt-5 text-4xl font-display font-bold tracking-tight tabular-nums text-slate-100">{time}</div>
      <p className="mt-2 text-xs text-slate-400">{location}</p>
    </Card>
  );
}

function LikesCard({ namespace }) {
  const { likes, liked, like, loading } = useLikeCounter(namespace);
  return (
    <Card className="md:col-span-1 !p-4 sm:!p-5" delay={0.35}>
      <CardHead icon={Heart} label="Me gusta" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold tabular-nums text-slate-100">{likes === null ? '—' : likes.toLocaleString('es-ES')}</p>
          <p className="mt-1 text-xs text-slate-400">{liked ? 'Ya has votado en esta visita' : 'Un voto por visita'}</p>
        </div>
        <button type="button" onClick={like} disabled={liked || loading} aria-pressed={liked} aria-label={liked ? 'Ya te gusta este portfolio' : 'Me gusta este portfolio'} className={`rounded-xl border p-3 transition-all ${liked ? 'border-rose-500/40 bg-rose-500/15 text-rose-400' : 'border-white/10 bg-white/5 text-slate-300 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400'}`}>
          <Heart size={22} className={liked ? 'fill-current' : ''} />
        </button>
      </div>
    </Card>
  );
}

// ── Tarjeta: GitHub ────────────────────────────────────────────
function GithubCard({ user, profileUrl }) {
  const gh = useGithubStats(user);
  const ago = gh ? timeAgo(gh.lastPush) : null;

  return (
    <Card className="md:col-span-2" delay={0.2}>
      <CardHead
        icon={Code2}
        label="GitHub"
        right={
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            @{user} <ArrowUpRight size={13} />
          </a>
        }
      />

      <div className="mt-6 flex gap-10">
        <div>
          <div className="font-display text-5xl font-bold tracking-tighter tabular-nums text-slate-100">
            {gh === null ? '…' : (gh.repos ?? '—')}
          </div>
          <div className="mt-1 text-xs text-slate-500">repos públicos</div>
        </div>
        <div>
          <div className="font-display text-5xl font-bold tracking-tighter tabular-nums text-slate-100">
            {gh === null ? '…' : (gh.followers ?? '—')}
          </div>
          <div className="mt-1 text-xs text-slate-500">seguidores</div>
        </div>
      </div>

      {gh && gh.languages.length > 0 && (
        <div className="mt-7">
          <div className="flex h-2.5 rounded-full overflow-hidden gap-0.5">
            {gh.languages.map((l, i) => (
              <span
                key={l.name}
                title={`${l.name} ${l.pct}%`}
                style={{ width: `${l.pct}%`, background: LANG_COLORS[i % LANG_COLORS.length] }}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
            {gh.languages.map((l, i) => (
              <span key={l.name} className="inline-flex items-center gap-2 text-xs text-slate-400">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: LANG_COLORS[i % LANG_COLORS.length] }}
                />
                {l.name} <span className="text-slate-500">{l.pct}%</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {ago && (
        <p className="mt-5 text-xs text-slate-500">
          Último push <span className="text-slate-300">{ago}</span>
        </p>
      )}
    </Card>
  );
}

// ── Tarjeta: tu visita (anillo de segundos) ────────────────────
function SessionCard({ wide }) {
  const s = useVisitDuration();

  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  const R = 40;
  const C = 2 * Math.PI * R;
  const offset = C * (1 - (s % 60) / 60);

  return (
    <Card className={wide ? 'md:col-span-2' : 'md:col-span-1'} delay={0.3}>
      <CardHead icon={Timer} label="Tu visita" />

      <div className="mt-6 flex items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="6" className="stroke-white/10" />
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              className="stroke-primary-500"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold tabular-nums text-slate-100">
            {mm}:{ss}
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          Tiempo desde que entraste en la web. Se mantiene mientras navegas por ella.
        </p>
      </div>
    </Card>
  );
}

// ── Sección ────────────────────────────────────────────────────
export const StatsStrip = () => {
  const { profile } = portfolioData;
  const { visits, failed } = useVisitCounter(profile.visitsNamespace);
  const hasGithub = Boolean(profile.githubUser);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Datos en directo
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">
            Panel <span className="text-primary-500">en vivo</span>
          </h2>
          <p className="mt-2 text-slate-400 max-w-xl">
            Información real de este portfolio, actualizada al momento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <VisitsCard visits={visits} failed={failed} hasNamespace={Boolean(profile.visitsNamespace)} />
          <TimeCard timeZone={profile.timeZone} location={profile.location} />
          <SessionCard />
          <LikesCard namespace={profile.visitsNamespace} />
          {hasGithub && <GithubCard user={profile.githubUser} profileUrl={profile.github} />}
        </div>
      </div>
    </section>
  );
};
