// /llms.txt: short plain-text map of the site for AI assistants (llmstxt.org format).
import type { APIRoute } from 'astro';
import { HOME } from '../data/home.js';
import { COURSES } from '../data/es/fichas.js';

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const H = HOME.es;
  const lines = [
    '# GenioPop',
    '',
    '> Matemáticas de primaria en español: entrenador de tablas de multiplicar, calculadoras que explican cada paso (fracciones, división en columna, sumas y restas llevando, multiplicaciones, operaciones combinadas, porcentajes, números romanos, mcm y mcd, potencias y raíces) y un generador de fichas para imprimir con soluciones. Gratis, sin registro y sin datos de niños.',
    '',
    `Quién revisa los contenidos: ${abs('/es/sobre-nosotros/anna-ryabova/')}`,
    '',
    ...H.groups.flatMap((g) => [`## ${g.title}`, ...g.links.map(([l, h]) => `- [${l}](${abs(h)})`), '']),
    '## Tablas una a una',
    ...Array.from({ length: 13 }, (_, n) => `- [Tabla del ${n}](${abs(`/es/tablas-de-multiplicar/tabla-del-${n}/`)})`),
    '',
    '## Fichas para imprimir',
    `- [Generador de fichas](${abs('/es/fichas/')})`,
    ...COURSES.map((c) => `- [Fichas de ${c.name} (${c.syn})](${abs(`/es/fichas/${c.slug}/`)})`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
