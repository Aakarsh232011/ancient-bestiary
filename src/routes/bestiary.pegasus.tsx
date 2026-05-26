import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { CreaturePage } from "@/components/CreaturePage";
import { getCreature } from "@/data/creatures";

const CREATURE_ID = "pegasus";
const creature = getCreature(CREATURE_ID)!;

export const Route = createFileRoute("/bestiary/pegasus")({
  head: () => ({
    meta: [
      { title: `${creature.name} — Ancient Bestiary` },
      { name: "description", content: `${creature.epithet}. ${creature.lore.slice(0, 140)}…` },
    ],
  }),
  component: () => creature
    ? <CreaturePage creature={creature} />
    : (
      <SiteShell>
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <h1 className="font-display text-4xl gold-gradient">Entry sealed</h1>
          <Link to="/bestiary" className="inline-block mt-6 font-rune text-xs px-5 py-3 border border-gold/40 text-gold rounded hover:bg-gold/10">Return to the Archive</Link>
        </div>
      </SiteShell>
    ),
});
