import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { forbiddenCreatures } from "@/data/creatures";
import { creatureImage } from "@/lib/creature-image";
import forbiddenImg from "@/assets/forbidden.jpg";

export const Route = createFileRoute("/forbidden")({
  head: () => ({
    meta: [
      { title: "Forbidden Archive — Ancient Bestiary" },
      { name: "description", content: "Entries sealed by the archivists. Read at your own peril." },
    ],
  }),
  component: ForbiddenPage,
});

function ForbiddenPage() {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <SiteShell>
      {!unlocked ? (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <img src={forbiddenImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
          <div className="relative z-10 max-w-xl mx-auto text-center px-6">
            <div className="font-rune text-xs text-blood">⛧ Sealed Archive ⛧</div>
            <h1 className="font-display text-5xl text-blood mt-3" style={{ textShadow: "0 0 30px rgba(180,40,30,0.5)" }}>Forbidden Creatures</h1>
            <p className="text-muted-foreground mt-4">
              The entries beyond this seal were redacted from every pantheon's official codex. To unbind them is to accept their gaze upon you.
            </p>
            <button
              onClick={() => setUnlocked(true)}
              className="mt-8 font-rune text-xs px-6 py-3 border border-blood/60 text-blood rounded hover:bg-blood/10 transition-colors"
            >
              Break the Seal
            </button>
            <div className="mt-8">
              <Link to="/" className="font-rune text-[10px] text-muted-foreground hover:text-gold">← Return to the Archive</Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="max-w-7xl mx-auto px-6 pt-12 pb-6 text-center">
            <div className="font-rune text-xs text-blood">⛧ Archive Unbound ⛧</div>
            <h1 className="font-display text-5xl mt-2" style={{ background: "linear-gradient(135deg, oklch(0.7 0.18 25), oklch(0.5 0.15 20))", WebkitBackgroundClip: "text", color: "transparent" }}>
              Forbidden Creatures
            </h1>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              {forbiddenCreatures.length} entries. May the archivists forgive you.
            </p>
          </section>
          <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {forbiddenCreatures.map(c => (
              <Link
                key={c.id} to="/$id" params={{ id: c.id }}
                className="group glass-card p-5 hover:-translate-y-1 transition border-blood/40"
                style={{ borderColor: "rgba(180,40,30,0.35)" }}
              >
                <div
                  className="aspect-[4/5] rounded-md overflow-hidden relative border border-blood/30 flex items-center justify-center"
                  style={{ background: `radial-gradient(ellipse, ${c.palette[0]}, ${c.palette[1]})` }}
                >
                  <span className="absolute inset-0 flex items-center justify-center font-display text-[8rem] leading-none text-blood/30" aria-hidden>{c.symbol}</span>
                  <img
                    src={creatureImage(c)}
                    alt={`${c.name} forbidden plate`}
                    loading="lazy"
                    className="relative z-[1] w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/80 via-background/20 to-transparent" aria-hidden />
                  <div className="absolute inset-0 z-[2] bg-blood/10 mix-blend-multiply" aria-hidden />
                </div>
                <div className="mt-4">
                  <div className="font-rune text-[10px] text-blood">{c.epithet}</div>
                  <div className="font-display text-2xl mt-1">{c.name}</div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{c.lore}</p>
                </div>
              </Link>
            ))}
          </section>
        </>
      )}
    </SiteShell>
  );
}
