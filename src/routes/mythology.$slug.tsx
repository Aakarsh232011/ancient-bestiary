import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreatureCard } from "@/components/CreatureCard";
import { mythologies, getByMythology, type Mythology, type Creature } from "@/data/creatures";

export const Route = createFileRoute("/mythology/$slug")({
  loader: ({ params }) => {
    const m = mythologies.find(x => x.id.toLowerCase() === params.slug.toLowerCase());
    if (!m) throw notFound();
    return { mythology: m, list: getByMythology(m.id as Mythology) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.mythology.id} Mythology — Ancient Bestiary` },
      { name: "description", content: loaderData.mythology.blurb },
    ] : [],
  }),
  component: MythologyPage,
  notFoundComponent: () => (
    <SiteShell>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl gold-gradient">Unknown pantheon</h1>
        <Link to="/mythology" className="inline-block mt-6 font-rune text-xs text-gold hover:underline">Browse all pantheons →</Link>
      </div>
    </SiteShell>
  ),
});

function MythologyPage() {
  const { mythology, list } = Route.useLoaderData();
  return (
    <SiteShell>
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
        <div className="font-rune text-6xl text-gold/80 mb-4">{mythology.glyph}</div>
        <div className="font-rune text-xs text-gold/70">Pantheon Archive</div>
        <h1 className="font-display text-5xl gold-gradient mt-2">{mythology.id} Mythology</h1>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{mythology.blurb}</p>
        <div className="rune-divider mt-10 font-rune text-[10px]">{list.length} Specimens</div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((c: Creature) => <CreatureCard key={c.id} creature={c} />)}
      </section>
    </SiteShell>
  );
}
