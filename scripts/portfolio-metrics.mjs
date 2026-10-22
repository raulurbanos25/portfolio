import { writeFile } from 'node:fs/promises';

const namespace = 'raul-urbanos-portfolio';
const api = 'https://abacus.jasoncameron.dev';

async function readCounter(name) {
  const response = await fetch(`${api}/get/${namespace}/${name}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`No se pudo leer el contador "${name}": HTTP ${response.status}`);
  const data = await response.json();
  return Number(data.value) || 0;
}

try {
  const [visits, likes] = await Promise.all([readCounter('visitas'), readCounter('likes')]);
  const metrics = {
    portfolio: namespace,
    updatedAt: new Date().toISOString(),
    visits,
    likes,
  };

  await writeFile(new URL('../portfolio-metrics.json', import.meta.url), `${JSON.stringify(metrics, null, 2)}\n`);
  console.log(`Visitas: ${visits}`);
  console.log(`Me gusta: ${likes}`);
  console.log('Datos guardados en portfolio-metrics.json');
} catch (error) {
  console.error(`No se pudieron actualizar las métricas: ${error.message}`);
  process.exitCode = 1;
}
