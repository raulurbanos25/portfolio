import React, { useEffect, useState } from 'react';
import { Clock, Eye, Heart, Timer } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useVisitCounter } from '../hooks/useVisitCounter';
import { useLikeCounter } from '../hooks/useLikeCounter';
import { useVisitDuration } from '../hooks/useVisitDuration';

export function LiveStatsBar() {
  const { profile } = portfolioData;
  const { visits } = useVisitCounter(profile.visitsNamespace);
  const { likes, liked, like, loading } = useLikeCounter(profile.visitsNamespace);
  const [now, setNow] = useState(() => new Date());
  const seconds = useVisitDuration();

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 15000);
    return () => {
      clearInterval(clock);
    };
  }, []);

  const localTime = new Intl.DateTimeFormat('es-ES', {
    timeZone: profile.timeZone || 'Europe/Madrid',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
  const elapsed = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const count = visits === null ? '—' : visits.toLocaleString('es-ES');

  return (
    <div className="relative z-10 border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/10 px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-8">
        <div className="flex items-center gap-3 px-3 py-4 sm:px-5">
          <span className="rounded-xl bg-primary-500/10 p-2.5 text-primary-400"><Eye size={17} /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Visitas</p><p className="text-lg font-bold tabular-nums text-slate-100">{count}</p></div>
        </div>
        <div className="flex items-center gap-3 px-3 py-4 sm:px-5">
          <span className="rounded-xl bg-primary-500/10 p-2.5 text-primary-400"><Clock size={17} /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Hora local</p><p className="text-lg font-bold tabular-nums text-slate-100">{localTime}</p></div>
        </div>
        <div className="flex items-center gap-3 px-3 py-4 sm:px-5">
          <span className="rounded-xl bg-primary-500/10 p-2.5 text-primary-400"><Timer size={17} /></span>
          <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Tu visita</p><p className="text-lg font-bold tabular-nums text-slate-100">{elapsed}</p></div>
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-rose-500/10 p-2.5 text-rose-400"><Heart size={17} /></span>
            <div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Me gusta</p><p className="text-lg font-bold tabular-nums text-slate-100">{likes === null ? '—' : likes.toLocaleString('es-ES')}</p></div>
          </div>
          <button type="button" onClick={like} disabled={liked || loading} aria-pressed={liked} aria-label={liked ? 'Ya te gusta este portfolio' : 'Me gusta este portfolio'} className={`rounded-xl border p-2.5 transition-colors ${liked ? 'border-rose-500/40 bg-rose-500/15 text-rose-400' : 'border-white/10 text-slate-400 hover:border-rose-500/40 hover:text-rose-400'}`}>
            <Heart size={17} className={liked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
