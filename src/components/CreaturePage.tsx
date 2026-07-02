import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { SiteShell } from "@/components/SiteShell";
import { CreatureEffect } from "@/components/CreatureEffect";
import { creatures, type Creature } from "@/data/creatures";
import { creatureHero, creatureGallery, pollinationsImage } from "@/lib/creature-image";

function handleImgError(e: React.SyntheticEvent<HTMLImageElement>, fallback: string) {
  const img = e.currentTarget;
  if (img.dataset.fallback === "1") { img.style.visibility = "hidden"; return; }
  img.dataset.fallback = "1";
  img.src = fallback;
}

type CreatureStyle = CSSProperties & {
  "--creature-a": string;
  "--creature-b": string;
  "--creature-glow": string;
};

type VisualProfile = {
  kind: string;
  scene: string;
  relic: string;
  funFact: string;
};

const featuredProfiles: Record<string, VisualProfile> = {
  phoenix: { kind: "phoenix", scene: "Rebirth pyre of myrrh, cinnamon smoke, and first-light ash", relic: "A warm ash plume rises behind the sun-disc whenever the entry is opened.", funFact: "The Phoenix does not remember death as pain; it remembers it as the precise note of its next song." },
  kraken: { kind: "kraken", scene: "A moonless sea shelf where tentacles move beneath the map ink", relic: "The waterline never stays still, and the deep arms surface when the codex breathes.", funFact: "Many 'lost islands' on medieval charts were Kraken backs seen by crews too frightened to sail closer." },
  garuda: { kind: "garuda", scene: "Solar aeries above Mount Meru, strewn with gold feathers", relic: "Feathers drift upward instead of down, answering the wind of Vishnu's banner.", funFact: "Garuda is so feared by serpents that some traditions carved his image above doorways to keep venom away." },
  naga: { kind: "naga", scene: "A sacred subterranean river flowing below jeweled cobra hoods", relic: "Emerald scales pulse like lamps beneath slow temple water.", funFact: "Naga kings were often treated as rain-bringers; offending one could mean drought, flood, or both." },
  airavata: { kind: "airavata", scene: "Storm clouds gathering around Indra's white elephant", relic: "Lightning crawls through cloud-banks around the ivory tusks.", funFact: "Airavata is sometimes called the ancestor of all elephants because he rose from the cosmic ocean itself." },
  fenrir: { kind: "fenrir", scene: "Moonlit snow over the island where Gleipnir still cuts the dark", relic: "A cold moon hangs behind the muzzle and the binding-ribbon glints like a wound.", funFact: "Gleipnir was forged from impossible things, including the sound of a cat's footfall and the roots of a mountain." },
  griffin: { kind: "griffin", scene: "High gold-veined cliffs where eagle shadows cross lion tracks", relic: "Sun feathers sweep across the aery whenever the guardian turns its gaze.", funFact: "Ancient writers placed griffins near gold deposits, making them both monster and warning sign on treasure maps." },
  cerberus: { kind: "cerberus", scene: "The black threshold of Hades, lit by three underworld flames", relic: "The gate-fire burns low until a living visitor approaches.", funFact: "Honey cakes were the favored bribe for slipping past Cerberus, though very few travelers returned to recommend the recipe." },
  dragon: { kind: "dragon", scene: "A volcanic treasury where molten light shines between bronze scales", relic: "Gold sparks orbit the heart-scale and flare when the hoard is threatened.", funFact: "Dragon-slaying tales often hide a legal lesson: the hoard belongs to whoever survives the contract written in fire." },
};

const POLLI = "https://image.pollinations.ai/prompt/";
const STYLE_SUFFIX = "ancient mythological manuscript illustration, golden ink, dark parchment, ornate codex, painterly, cinematic, intricate detail";

function imgUrl(prompt: string, seed: number, w = 768, h = 768) {
  const q = encodeURIComponent(`${prompt}, ${STYLE_SUFFIX}`);
  return `${POLLI}${q}?width=${w}&height=${h}&seed=${seed}&nologo=true`;
}

function seedFor(id: string) {
  let s = 0; for (let i = 0; i < id.length; i++) s = (s * 31 + id.charCodeAt(i)) >>> 0;
  return s % 100000;
}

function getCreatureImages(creature: Creature) {
  const seed = seedFor(creature.id);
  return {
    hero: creatureHero(creature),
    scene: imgUrl(`${creature.name} in ${creature.habitat[0]}, sweeping landscape`, seed + 1, 1280, 720),
    gallery: creatureGallery(creature),
  };
}

export function CreaturePage({ creature }: { creature: Creature }) {
  const [a, b] = creature.palette;
  const profile = getVisualProfile(creature);
  const images = getCreatureImages(creature);
  const related = creatures
    .filter(c => c.id !== creature.id && (c.mythology === creature.mythology || c.category === creature.category))
    .slice(0, 4);
  const stats = getStats(creature);
  const style: CreatureStyle = { "--creature-a": a, "--creature-b": b, "--creature-glow": `${a}88` };

  return (
    <SiteShell>
      <section className={`creature-hero creature-hero--${profile.kind}`} style={style}>
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{ backgroundImage: `url(${images.scene})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" aria-hidden />
        <div className="absolute inset-0 fog opacity-35" aria-hidden />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-14">
          <Link to="/bestiary" className="font-rune text-[10px] text-gold/70 hover:text-gold">← Return to the Archive</Link>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(320px,520px)_1fr] gap-10 items-center">
            <CreatureArtwork creature={creature} profile={profile} heroImage={images.hero} />
            <div className="max-w-2xl">
              <div className="font-rune text-xs text-gold/70">{creature.epithet}</div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl gold-gradient mt-2 leading-none">{creature.name}</h1>
              <p className="mt-6 text-lg text-foreground/82 leading-relaxed">{profile.scene}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{creature.mythology} Mythology</Tag>
                <Tag>{creature.region}</Tag>
                <Tag tone="gold">{creature.rarity}</Tag>
                <Tag tone="blood">{creature.threat}</Tag>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <div className="glass-card p-8 creature-manuscript">
            <div className="font-rune text-[10px] text-gold/65">Mythology &amp; Origin</div>
            <h2 className="font-display text-3xl text-gold mt-2">{creature.mythology} · {creature.region}</h2>
            <p className="text-foreground/82 leading-relaxed mt-4">
              Catalogued from {creature.region}, this {creature.category.toLowerCase()} appears in {creature.mythology} tradition as {creature.epithet.toLowerCase()}. Its known habitats include {creature.habitat.join(", ")}, where sightings are treated as {creature.threat.toLowerCase()} encounters.
            </p>
          </div>

          <div className="glass-card p-8 creature-manuscript">
            <div className="font-rune text-[10px] text-gold/65">Detailed Lore</div>
            <p className="text-foreground/88 leading-relaxed mt-4 text-lg">{creature.lore}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{profile.relic}</p>
          </div>

          <div className="glass-card p-6 creature-manuscript">
            <div className="font-rune text-[10px] text-gold/65 mb-4">Visions of the Codex</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.gallery.map((src, i) => (
                <figure key={src} className="codex-plate" style={{ animationDelay: `${i * 0.08}s` }}>
                  <img
                    src={src}
                    alt={`${creature.name} — illuminated plate ${i + 1}`}
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <figcaption className="font-rune text-[9px] text-gold/70">Plate {String(i + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-7">
              <h2 className="font-display text-2xl text-gold">Powers &amp; Abilities</h2>
              <div className="mt-5 space-y-4">
                {creature.powers.map((p, index) => (
                  <div key={p.name} className="creature-power" style={{ animationDelay: `${index * 0.12}s` }}>
                    <div className="font-display text-lg text-foreground">{p.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-7">
              <h2 className="font-display text-2xl text-blood">Weaknesses</h2>
              <ul className="mt-5 space-y-3">
                {creature.weaknesses.map(w => (
                  <li key={w} className="text-sm text-foreground/82 border-l-2 border-blood/45 pl-3 py-1">{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-rune text-xs text-gold/70 mb-4">Animated Threat Matrix</h3>
            <div className="space-y-4">
              {stats.map(stat => <StatBar key={stat.label} {...stat} />)}
            </div>
          </div>
          <div className="glass-card p-6">
            <h3 className="font-rune text-xs text-gold/70 mb-3">Habitat</h3>
            <div className="flex flex-wrap gap-1.5">
              {creature.habitat.map(h => (
                <span key={h} className="text-xs font-rune px-2 py-1 rounded bg-secondary/60 border border-gold/15">{h}</span>
              ))}
            </div>
            <Row k="Origin" v={creature.mythology} />
            <Row k="Region" v={creature.region} />
            <Row k="Rarity" v={creature.rarity} />
            <Row k="Threat" v={creature.threat} />
          </div>
          <div className="glass-card p-6 creature-fact">
            <h3 className="font-rune text-xs text-gold/70">Fun Fact</h3>
            <p className="text-sm leading-relaxed text-foreground/85 mt-3">{profile.funFact}</p>
          </div>
          {related.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-rune text-xs text-gold/70 mb-3">Related Creatures</h3>
              <div className="grid grid-cols-2 gap-3">
                {related.map(r => (
                  <Link
                    key={r.id} to="/$id" params={{ id: r.id }}
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

function CreatureArtwork({ creature, profile, heroImage }: { creature: Creature; profile: VisualProfile; heroImage: string }) {
  return (
    <div className={`creature-art creature-feature--${profile.kind}`} role="img" aria-label={`${creature.name} mythological artwork`}>
      <img
        src={heroImage}
        alt={`${creature.name} portrait`}
        className="creature-art__photo"
        loading="eager"
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
      />
      <CreatureEffect creature={creature} />
      <div className="creature-art__ring" aria-hidden />
      <div className="creature-art__moon" aria-hidden />
      <div className="creature-art__ocean" aria-hidden />
      <div className="creature-art__cloud creature-art__cloud--one" aria-hidden />
      <div className="creature-art__cloud creature-art__cloud--two" aria-hidden />
      <div className="creature-art__tentacle creature-art__tentacle--one" aria-hidden />
      <div className="creature-art__tentacle creature-art__tentacle--two" aria-hidden />
      <div className="creature-art__flame creature-art__flame--one" aria-hidden />
      <div className="creature-art__flame creature-art__flame--two" aria-hidden />
      <div className="creature-art__river" aria-hidden />
      <div className="creature-art__scale-field" aria-hidden />
      <div className="creature-art__lava" aria-hidden />
      <div className="creature-art__sand" aria-hidden />
      <div className="creature-art__foxfire" aria-hidden />
      <div className="creature-art__spiral" aria-hidden />
      <span className="creature-art__symbol" aria-hidden>{creature.symbol}</span>
    </div>
  );
}


function getVisualProfile(creature: Creature): VisualProfile {
  if (featuredProfiles[creature.id]) return featuredProfiles[creature.id];
  const kind = creature.category === "Sea Monsters" ? "kraken"
    : creature.category === "Dragons" ? "dragon"
      : creature.category === "Celestial Creatures" ? "garuda"
        : creature.category === "Underworld Beasts" ? "cerberus"
          : creature.category === "Forest Spirits" ? "naga"
            : creature.category === "Titans" ? "airavata"
              : "griffin";
  return {
    kind,
    scene: `${creature.habitat[0]} rendered as a living manuscript plate, illuminated by the colors of ${creature.mythology} ritual art`,
    relic: `Archivists mark this plate with the ${creature.symbol} sigil because ${creature.name} is most often identified by ${creature.powers[0]?.name.toLowerCase() ?? "its unmistakable omen"}.`,
    funFact: `${creature.name} is catalogued beside ${creature.habitat[0]} because its oldest reliable sightings cluster around ${creature.region}.`,
  };
}

function getStats(creature: Creature) {
  const threat = { Benign: 28, Moderate: 52, Dangerous: 76, Cataclysmic: 96 }[creature.threat];
  const rarity = { Common: 34, Rare: 58, Legendary: 78, Mythic: 94, Forbidden: 100 }[creature.rarity];
  const arcana = Math.min(100, 38 + creature.powers.length * 16 + (creature.mythology.length % 5) * 5);
  const endurance = Math.min(100, 46 + creature.weaknesses.length * 8 + creature.habitat.length * 7);
  return [
    { label: "Threat", value: threat },
    { label: "Rarity", value: rarity },
    { label: "Arcana", value: arcana },
    { label: "Endurance", value: endurance },
  ];
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between font-rune text-[10px] text-gold/70 mb-1"><span>{label}</span><span>{value}</span></div>
      <div className="h-2 rounded-full bg-secondary/80 overflow-hidden border border-gold/10">
        <div className="stat-fill h-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Tag({ children, tone }: { children: ReactNode; tone?: "gold" | "blood" }) {
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
