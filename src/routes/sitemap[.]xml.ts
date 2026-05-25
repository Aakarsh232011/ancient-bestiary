import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { publicCreatures, mythologies, categories } from "@/data/creatures";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/bestiary", "/mythology", "/map",
          ...mythologies.map(m => `/mythology/${m.id.toLowerCase()}`),
          ...categories.map(c => `/categories/${c.id.toLowerCase().replace(/\s+/g, "-")}`),
          ...publicCreatures.map(c => `/bestiary/${c.id}`),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...paths.map(p => `  <url><loc>${BASE_URL}${p}</loc></url>`),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
