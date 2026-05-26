import { Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreatureEffect } from "@/components/CreatureEffect";
import { publicCreatures, type Creature } from "@/data/creatures";

export function CreaturePage({ creature }: { creature: Creature }) {
  const [a, b] = creature.palette;
  const related = publicCreatures
    .filter(c => c.id !== creature.id && (c.mythology === creature.mythology || c.category === creature.category))
    .slice(0, 4);

  return (
    <SiteShell>
      <section
        className="relative pt-16 pb-12 px-6"
        style={{ background: `linear-gradient(180deg, ${a}33, transparent 70%)` }}
      >
        <div className="absolute inset-0 fog opacity-40" aria-hidden />
        <div className="relative max-w-6xl mx-auto">
          <Link to="/bestiary" className="font-rune text-[10px] text-gold/70 hover:text-gold">← The Archive</Link>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 mt-6 items-center">
            <div
              className="relative aspect-[4/5] rounded-md gold-frame border border-gold/30 overflow-hidden flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at center, ${a}, ${b})` }}
            >
              <CreatureEffect creature={creature} />
              <span className="relative font-display text-[10rem] leading-none text-gold/60 drop-shadow-[0_0_30px_rgba(212,160,23,0.6)]" aria-hidden>
                {creature.symbol}
              </span>
            </div>
            <div>
              <div className="font-rune text-xs text-gold/70">{creature.epithet}</div>
              <h1 className="font-display text-5xl md:text-6xl gold-gradient mt-2">{creature.name}</h1>
              <div className="flex flex-wrap gap-2 mt-4">
                <Tag>{creature.mythology}</Tag>
                <Tag>{creature.category}</Tag>
                <Tag tone="gold">{creature.rarity}</Tag>
                <Tag tone="blood">{creature.threat}</Tag>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl text-gold flex items-center gap-2">📜 Lore &amp; Essence</h2>
            <p className="text-foreground/85 leading-relaxed mt-4">{creature.lore}</p>
          </div>
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl text-gold">⚡ Powers</h2>
            <div className="mt-4 space-y-4">
              {creature.powers.map(p => (
                <div key={p.name} className="flex gap-4">
                  <div className="w-1 self-stretch bg-gradient-to-b from-gold/60 to-transparent rounded-full" />
                  <div>
                    <div className="font-display text-lg text-foreground">{p.name}</div>
                    <div className="text-sm text-muted-foreground">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card p-8">
            <h2 className="font-display text-2xl text-blood">☠ Weaknesses</h2>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2">
              {creature.weaknesses.map(w => (
                <li key={w} className="text-sm text-foreground/80 border-l-2 border-blood/40 pl-3 py-1">{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-rune text-xs text-gold/70 mb-3">Habitat</h3>
            <div className="flex flex-wrap gap-1.5">
              {creature.habitat.map(h => (
                <span key={h} className="text-xs font-rune px-2 py-1 rounded bg-secondary/60 border border-gold/15">{h}</span>
              ))}
            </div>
            <div className="mt-4 font-rune text-xs text-gold/70">Region</div>
            <div className="text-sm">{creature.region}</div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-rune text-xs text-gold/70 mb-3">Classification</h3>
            <Row k="Rarity" v={creature.rarity} />
            <Row k="Threat" v={creature.threat} />
            <Row k="Order" v={creature.category} />
            <Row k="Origin" v={creature.mythology} />
          </div>
          {related.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-rune text-xs text-gold/70 mb-3">Related Entities</h3>
              <div className="grid grid-cols-2 gap-3">
                {related.map(r => (
                  <Link
                    key={r.id} to="/bestiary/$id" params={{ id: r.id }}
                    className="aspect-square rounded border border-gold/20 flex flex-col items-center justify-center text-center p-2 hover:border-gold/50 transition"
                    style={{ background: `radial-gradient(ellipse, ${r.palette[0]}55, ${r.palette[1]})` }}
                  >
                    <span className="text-2xl">{r.symbol}</span>
                    <span className="font-rune text-[9px] text-gold/80 mt-1">{r.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </section>
    </SiteShell>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone?: "gold" | "blood" }) {
  const cls = tone === "gold" ? "text-gold border-gold/30"
    : tone === "blood" ? "text-blood border-blood/30"
    : "text-emerald border-emerald/30";
  return <span className={`text-xs font-rune px-3 py-1 rounded border bg-secondary/40 ${cls}`}>{children}</span>;
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-1.5 border-b border-gold/10 last:border-0 text-sm">
      <span className="font-rune text-[10px] text-gold/60">{k}</span>
      <span>{v}</span>
    </div>
  );
}
