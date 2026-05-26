import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreaturePage } from "@/components/CreaturePage";
import { getCreature } from "@/data/creatures";

export const Route = createFileRoute("/bestiary/$id")({
  loader: ({ params }) => {
    const creature = getCreature(params.id);
    if (!creature) throw notFound();
    return { creature };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.creature.name} — Ancient Bestiary` },
      { name: "description", content: `${loaderData.creature.epithet}. ${loaderData.creature.lore.slice(0, 140)}…` },
    ] : [{ title: "Creature — Ancient Bestiary" }],
  }),
  component: () => {
    const { creature } = Route.useLoaderData();
    return <CreaturePage creature={creature} />;
  },
  notFoundComponent: () => (
    <SiteShell>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="font-rune text-xs text-gold/70">Unknown specimen</div>
        <h1 className="font-display text-4xl gold-gradient mt-3">This entry is sealed</h1>
        <p className="text-muted-foreground mt-3">No creature by that name exists in our archive.</p>
        <Link to="/bestiary" className="inline-block mt-6 font-rune text-xs px-5 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10">
          Return to the Archive
        </Link>
      </div>
    </SiteShell>
  ),
});
