import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { mythologies, publicCreatures } from "@/data/creatures";

export const Route = createFileRoute("/mythology/")({
  head: () => ({
    meta: [
      { title: "Mythologies — Ancient Bestiary" },
      { name: "description", content: "Explore the eight foundational mythologies of the bestiary." },
    ],
  }),
  component: MythologyIndex,
});

function MythologyIndex() {
  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="font-rune text-xs text-gold/70">Pantheons</div>
        <h1 className="font-display text-5xl gold-gradient mt-2">Mythology Collections</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">Eight ancient traditions, each with their own beasts, gods, and cosmologies.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {mythologies.map(m => {
          const count = publicCreatures.filter(c => c.mythology === m.id).length;
          return (
            <Link
              key={m.id}
              to="/mythology/$slug"
              params={{ slug: m.id.toLowerCase() }}
              className="glass-card p-8 text-center hover:border-gold/60 hover:-translate-y-1 transition-all"
            >
              <div className="font-rune text-4xl text-gold mb-4">{m.glyph}</div>
              <div className="font-display text-2xl">{m.id}</div>
              <div className="font-rune text-[10px] text-emerald mt-1">{count} specimens</div>
              <div className="mt-3 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              <p className="text-xs text-muted-foreground mt-3">{m.blurb}</p>
            </Link>
          );
        })}
      </section>
    </SiteShell>
  );
}
