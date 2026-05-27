import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreaturePage } from "@/components/CreaturePage";
import { getCreature } from "@/data/creatures";

function CreatureRoute() {
  const { creature } = Route.useLoaderData();
  return <CreaturePage creature={creature} />;
}

function CreatureNotFound() {
  const { id } = Route.useParams();
  return (
    <SiteShell>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="font-rune text-xs text-gold/70">Unknown specimen</div>
        <h1 className="font-display text-4xl gold-gradient mt-3">No entry for {id}</h1>
        <p className="text-muted-foreground mt-3">This creature is not recorded in the Ancient Bestiary.</p>
        <Link to="/bestiary" className="inline-block mt-6 font-rune text-xs px-5 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10">
          Return to the Archive
        </Link>
      </div>
    </SiteShell>
  );
}

function CreatureError({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <SiteShell>
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-display text-4xl gold-gradient">The codex page failed to open</h1>
        <p className="text-muted-foreground mt-3">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 font-rune text-xs px-5 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10">
          Try again
        </button>
      </div>
    </SiteShell>
  );
}

export const Route = createFileRoute("/$id")({
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
  component: CreatureRoute,
  errorComponent: CreatureError,
  notFoundComponent: CreatureNotFound,
});