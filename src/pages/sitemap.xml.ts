import type { APIRoute } from 'astro';
import { work } from '../data/work';
export const GET: APIRoute = ({ site }) => {
  const pages = ['/', '/about/', '/research/', '/projects/', '/experience/', '/cv/', '/work/', '/writing/', '/writing/from-digital-twins-to-routing-decisions/', '/writing/digital-twins-as-control-loops/', '/writing/state-information-and-model-fidelity/', ...work.map(item=>`/work/${item.slug}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(path=>`<url><loc>${new URL(path, site)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
