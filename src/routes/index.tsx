import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreatureCard } from "@/components/CreatureCard";
import { mythologies, categories, publicCreatures } from "@/data/creatures";
import hero from "@/assets/hero.jpg";
import map from "@/assets/map.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ancient Bestiary — Creatures of the Forgotten World" },
      { name: "description", content: "An interactive codex of dragons, celestial creatures, and forgotten beasts from eight ancient mythologies." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = ["garuda", "hydra", "kitsune", "fenrir", "long", "ryu"]
    .map(id => publicCreatures.find(c => c.id === id)!)
    .filter(Boolean);

  return (
    <SiteShell>
      <section className="relative h-[88vh] min-h-[600px] overflow-hidden flex items-center justify-center">
        <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1088} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="fog" />
        {["ᚦ","ॐ","龍","𓋹","Ψ","ᚱ","☘","𒀭"].map((r, i) => (
          <span
            key={i}
            className="absolute font-rune text-gold/40 text-xl float-rune select-none"
            style={{ top: `${10 + (i * 11) % 75}%`, left: `${5 + (i * 13) % 90}%`, animationDelay: `${i * 0.6}s` }}
            aria-hidden
          >{r}</span>
        ))}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="font-rune text-gold/80 text-xs mb-4">⸙ Codex Mythologica ⸙</div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl gold-gradient leading-tight">
            Bestiary of the<br/>Forgotten World
          </h1>
          <p className="mt-6 text-foreground/80 text-base sm:text-lg max-w-xl mx-auto">
            A cinematic archive of dragons, titans, sacred beasts and underworld wardens — drawn from eight ancient mythologies.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link to="/bestiary" className="font-rune text-xs px-6 py-3 bg-gold text-primary-foreground rounded hover:opacity-90 glow">
              Enter the Archive
            </Link>
            <Link to="/map" className="font-rune text-xs px-6 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10 transition-colors">
              Open the Map
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <div className="font-rune text-xs text-gold/70">The Eight Pantheons</div>
          <h2 className="font-display text-4xl gold-gradient mt-2">Sacred Origins</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mythologies.map(m => (
            <Link
              key={m.id}
              to="/mythology/$slug"
              params={{ slug: m.id.toLowerCase() }}
              className="glass-card p-6 text-center hover:border-gold/60 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-rune text-3xl text-gold mb-3">{m.glyph}</div>
              <div className="font-display text-xl">{m.id}</div>
              <div className="mt-2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <p className="text-xs text-muted-foreground mt-3">{m.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="rune-divider mb-8 font-rune text-xs">Creature Orders</div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to="/categories/$slug"
              params={{ slug: cat.id.toLowerCase().replace(/\s+/g, "-") }}
              className="glass-card p-4 text-center hover:border-emerald/40 group transition-colors"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-rune text-[10px] text-gold/80 group-hover:text-emerald transition-colors">{cat.id}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="font-rune text-xs text-gold/70">Curated Specimens</div>
            <h2 className="font-display text-4xl gold-gradient mt-2">Museum Exhibit</h2>
          </div>
          <Link to="/bestiary" className="font-rune text-xs text-gold hover:underline">View Archive →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(c => <CreatureCard key={c.id} creature={c} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 glass-card p-8 items-center">
          <div className="rounded-md overflow-hidden gold-frame border border-gold/30">
            <img src={map} alt="Ancient world map" width={1600} height={992} loading="lazy" className="w-full h-auto" />
          </div>
          <div>
            <div className="font-rune text-xs text-gold/70">Geographical Archives</div>
            <h2 className="font-display text-3xl gold-gradient mt-2">Cartography of the Arcane</h2>
            <p className="text-muted-foreground mt-3">
              Trace migratory patterns and legendary sightings across the ancient continents. Our atlas combines historical cartography with mystical tracking.
            </p>
            <Link to="/map" className="inline-block mt-6 font-rune text-xs px-5 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10">
              Enter the Cartography Room →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
