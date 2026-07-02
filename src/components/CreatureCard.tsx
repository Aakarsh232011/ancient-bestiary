import { Link } from "@tanstack/react-router";
import { Creature } from "@/data/creatures";
import { creatureImage, pollinationsImage } from "@/lib/creature-image";

const threatColor: Record<string, string> = {
  Benign: "text-emerald",
  Moderate: "text-gold",
  Dangerous: "text-orange-400",
  Cataclysmic: "text-blood",
};

export function CreatureCard({ creature }: { creature: Creature }) {
  const [a, b] = creature.palette;
  const img = creatureImage(creature);
  return (
    <Link
      to="/$id"
      params={{ id: creature.id }}
      className="group glass-card gold-frame p-5 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300"
    >
      <div
        className="aspect-[4/5] rounded-md overflow-hidden relative flex items-center justify-center border border-gold/20"
        style={{ background: `radial-gradient(ellipse at center, ${a}, ${b})` }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-[7rem] leading-none text-gold/25 drop-shadow-[0_0_20px_rgba(212,160,23,0.4)]"
          aria-hidden
        >
          {creature.symbol}
        </span>
        <img
          src={img}
          alt={`${creature.name} portrait`}
          loading="lazy"
          className="relative z-[1] w-full h-full object-cover opacity-90 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal transition-all duration-500"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/70 via-transparent to-transparent" aria-hidden />
        <span className="absolute top-2 left-2 z-[3] font-rune text-[10px] text-gold/90 bg-background/70 px-2 py-1 rounded">
          {creature.mythology}
        </span>
        <span className={`absolute top-2 right-2 z-[3] font-rune text-[10px] ${threatColor[creature.threat]} bg-background/70 px-2 py-1 rounded`}>
          {creature.threat}
        </span>
      </div>
      <div>
        <div className="font-rune text-[10px] text-gold/70">{creature.epithet}</div>
        <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors">{creature.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-[10px] font-rune px-2 py-0.5 rounded bg-secondary/60 text-emerald border border-emerald/20">
            {creature.category}
          </span>
          <span className="text-[10px] font-rune px-2 py-0.5 rounded bg-secondary/60 text-gold border border-gold/20">
            {creature.rarity}
          </span>
        </div>
      </div>
    </Link>
  );
}
