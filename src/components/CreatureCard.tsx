import { Link } from "@tanstack/react-router";
import { Creature } from "@/data/creatures";

const threatColor: Record<string, string> = {
  Benign: "text-emerald",
  Moderate: "text-gold",
  Dangerous: "text-orange-400",
  Cataclysmic: "text-blood",
};

export function CreatureCard({ creature }: { creature: Creature }) {
  const [a, b] = creature.palette;
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
          className="font-display text-[7rem] leading-none text-gold/30 group-hover:text-gold/60 transition-colors duration-500 drop-shadow-[0_0_20px_rgba(212,160,23,0.4)]"
          aria-hidden
        >
          {creature.symbol}
        </span>
        <span className="absolute top-2 left-2 font-rune text-[10px] text-gold/80 bg-background/60 px-2 py-1 rounded">
          {creature.mythology}
        </span>
        <span className={`absolute top-2 right-2 font-rune text-[10px] ${threatColor[creature.threat]} bg-background/60 px-2 py-1 rounded`}>
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
