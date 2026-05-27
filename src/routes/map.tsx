import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { publicCreatures } from "@/data/creatures";
import mapImg from "@/assets/map.jpg";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "World Map — Ancient Bestiary" },
      { name: "description", content: "Discover mythological creatures by region across the ancient world." },
    ],
  }),
  component: MapPage,
});

// Regional pins (rough percentages on the parchment map)
const pins: { id: string; label: string; x: number; y: number; region: RegExp }[] = [
  { id: "europe", label: "Hellas & North", x: 52, y: 32, region: /Hellenic|Northern Wilds|Nine Realms|Midgard|Hebrides|Highlands|Anatolia/i },
  { id: "egypt", label: "Nile", x: 56, y: 56, region: /Nile|Duat/i },
  { id: "mesopotamia", label: "Crescent", x: 60, y: 44, region: /Crescent|Zagros|Pre-creation/i },
  { id: "india", label: "Bharat", x: 70, y: 52, region: /Indian|Mountains|Himalayas|Heavenly|Forests|Celestial Realms|Southern Jungles/i },
  { id: "china", label: "Zhongguo", x: 80, y: 44, region: /Middle Kingdom|Imperial Skies/i },
  { id: "japan", label: "Nihon", x: 88, y: 46, region: /Japanese|Pacific/i },
];

function MapPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeMatches = active
    ? publicCreatures.filter(c => pins.find(p => p.id === active)!.region.test(c.region))
    : [];

  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="font-rune text-xs text-gold/70">Cartography Room</div>
        <h1 className="font-display text-5xl gold-gradient mt-2">Atlas of the Arcane</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Click a sigil to reveal the beasts sighted in that region across centuries.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="relative gold-frame border border-gold/30 rounded-md overflow-hidden">
          <img src={mapImg} alt="Ancient world map" width={1600} height={992} className="w-full h-auto" />
          <div className="absolute inset-0">
            {pins.map(p => {
              const isActive = active === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActive(isActive ? null : p.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  aria-label={p.label}
                >
                  <span className={`relative block w-4 h-4 rounded-full border-2 ${isActive ? "bg-blood border-blood" : "bg-gold border-gold"} shadow-[0_0_20px_rgba(212,160,23,0.6)] ember`} />
                  <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap text-[10px] font-rune text-foreground bg-background/80 px-2 py-0.5 rounded border border-gold/30">
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        {active ? (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl text-gold">
                Sightings in {pins.find(p => p.id === active)!.label}
              </h2>
              <button onClick={() => setActive(null)} className="font-rune text-xs text-muted-foreground hover:text-gold">close ✕</button>
            </div>
            {activeMatches.length === 0 ? (
              <p className="text-muted-foreground">No verified sightings recorded.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {activeMatches.map(c => (
                  <Link
                    key={c.id} to="/$id" params={{ id: c.id }}
                    className="aspect-square rounded border border-gold/20 hover:border-gold/60 flex flex-col items-center justify-center text-center p-2 transition"
                    style={{ background: `radial-gradient(ellipse, ${c.palette[0]}66, ${c.palette[1]})` }}
                  >
                    <span className="text-3xl">{c.symbol}</span>
                    <span className="font-rune text-[9px] text-gold/90 mt-1">{c.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card p-8 text-center text-muted-foreground">
            Select a sigil on the map to reveal that region's beasts.
          </div>
        )}
      </section>
    </SiteShell>
  );
}
