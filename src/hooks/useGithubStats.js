import { useEffect, useState } from 'react';

export function useGithubStats(user) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    const { signal } = controller;

    const get = (url) =>
      fetch(url, { signal }).then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))));

    Promise.all([
      get(`https://api.github.com/users/${user}`),
      get(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`).catch(() => []),
    ])
      .then(([profile, repos]) => {
        if (signal.aborted) return;

        // Lenguajes más usados (solo repos propios, sin forks)
        const counts = {};
        repos
          .filter((r) => !r.fork && r.language)
          .forEach((r) => {
            counts[r.language] = (counts[r.language] || 0) + 1;
          });
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        const languages = Object.entries(counts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([name, count]) => ({ name, pct: Math.max(1, Math.round((count / total) * 100)) }));

        setStats({
          repos: profile.public_repos,
          followers: profile.followers,
          languages,
          lastPush: repos.length ? repos[0].pushed_at : null,
        });
      })
      .catch(() => {
        if (!signal.aborted) {
          setStats({ repos: null, followers: null, languages: [], lastPush: null });
        }
      });

    return () => controller.abort();
  }, [user]);

  return stats;
}