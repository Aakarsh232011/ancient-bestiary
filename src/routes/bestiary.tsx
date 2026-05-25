import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/SiteShell";
import { CreatureCard } from "@/components/CreatureCard";
import {
  publicCreatures, mythologies, categories,
  type Mythology, type Category, type Rarity, type Threat,
} from "@/data/creatures";

export const Route = createFileRoute("/bestiary")({
  head: () => ({
    meta: [
      { title: "Bestiary — Ancient Bestiary" },
      { name: "description", content: "Search and filter dozens of mythical creatures by mythology, habitat, rarity, and threat level." },
    ],
  }),
  component: BestiaryPage,
});

const rarities: Rarity[] = ["Common", "Rare", "Legendary", "Mythic"];
const threats: Threat[] = ["Benign", "Moderate", "Dangerous", "Cataclysmic"];

function BestiaryPage() {
  const [q, setQ] = useState("");
  const [myth, setMyth] = useState<Mythology | "All">("All");
  const [cat, setCat] = useState<Category | "All">("All");
  const [rarity, setRarity] = useState<Rarity | "All">("All");
  const [threat, setThreat] = useState<Threat | "All">("All");

  const filtered = useMemo(() => publicCreatures.filter(c => {
    if (myth !== "All" && c.mythology !== myth) return false;
    if (cat !== "All" && c.category !== cat) return false;
    if (rarity !== "All" && c.rarity !== rarity) return false;
    if (threat !== "All" && c.threat !== threat) return false;
    if (q) {
      const s = q.toLowerCase();
      if (!c.name.toLowerCase().includes(s) &&
          !c.epithet.toLowerCase().includes(s) &&
          !c.lore.toLowerCase().includes(s) &&
          !c.habitat.join(" ").toLowerCase().includes(s)) return false;
    }
    return true;
  }), [q, myth, cat, rarity, threat]);

  return (
    <SiteShell>
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <div className="font-rune text-xs text-gold/70">The Archive</div>
        <h1 className="font-display text-5xl gold-gradient mt-2">The Bestiary</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Every recorded specimen, indexed by origin, order, rarity, and danger. Search by name, lore, or habitat.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="glass-card p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search the archive…"
            className="lg:col-span-1 bg-background/50 border border-gold/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold/60"
          />
          <FilterSelect label="Mythology" value={myth} onChange={v => setMyth(v as Mythology | "All")} options={mythologies.map(m=>m.id)} />
          <FilterSelect label="Category" value={cat} onChange={v => setCat(v as Category | "All")} options={categories.map(c=>c.id)} />
          <FilterSelect label="Rarity" value={rarity} onChange={v => setRarity(v as Rarity | "All")} options={rarities} />
          <FilterSelect label="Threat" value={threat} onChange={v => setThreat(v as Threat | "All")} options={threats} />
        </div>
        <div className="font-rune text-[10px] text-muted-foreground mt-3">
          {filtered.length} specimen{filtered.length === 1 ? "" : "s"} found
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="font-display text-2xl text-gold/80">The archive holds nothing here.</div>
            <p className="text-muted-foreground mt-2">Try widening your search.</p>
            <Link to="/bestiary" className="inline-block mt-4 font-rune text-xs text-gold hover:underline">Reset filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(c => <CreatureCard key={c.id} creature={c} />)}
          </div>
        )}
      </section>
    </SiteShell>
  );
}

function FilterSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <label className="block">
      <span className="font-rune text-[10px] text-gold/60 block mb-1">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-background/50 border border-gold/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold/60"
      >
        <option value="All">All</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
