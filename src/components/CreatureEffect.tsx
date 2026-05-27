import { useMemo } from "react";
import type { Creature } from "@/data/creatures";

type EffectKind =
  | "embers" | "ocean" | "feathers" | "scales" | "leaves"
  | "shadow" | "dust" | "sparkles" | "lightning" | "void";

const idOverrides: Record<string, EffectKind> = {
  // Hindu
  garuda: "feathers", naga: "scales", makara: "ocean", airavata: "lightning",
  kamadhenu: "sparkles", kinnara: "sparkles", gandharva: "sparkles",
  sharabha: "lightning", vali: "leaves", vanara: "leaves",
  // Greek
  hydra: "scales", cerberus: "shadow", pegasus: "feathers",
  griffin: "feathers", minotaur: "dust", chimera: "embers",
  dragon: "embers", phoenix: "embers",
  // Norse
  kraken: "ocean", fenrir: "shadow", jormungandr: "ocean", sleipnir: "lightning",
  nidhogg: "embers", "huginn-muninn": "feathers",
  // Egyptian
  sphinx: "dust", bennu: "embers", ammit: "shadow",
  apep: "void", khepri: "sparkles",
  // Japanese
  kitsune: "embers", tengu: "leaves", ryu: "ocean",
  kappa: "ocean", orochi: "leaves",
  // Celtic
  "cu-sith": "leaves", selkie: "ocean", "each-uisge": "ocean",
  banshee: "shadow", "dagda-stag": "leaves",
  // Chinese
  long: "scales", qilin: "sparkles", fenghuang: "embers",
  "bai-ze": "sparkles", pixiu: "sparkles",
  // Mesopotamian
  lamassu: "feathers", anzu: "lightning", tiamat: "void",
  mushussu: "scales", gallu: "shadow",
  // Forbidden
  leviathan: "void", behemoth: "dust", ouroboros: "void",
};

function classify(c: Creature): EffectKind {
  return (
    idOverrides[c.id] ??
    (c.category === "Dragons" ? "embers"
      : c.category === "Sea Monsters" ? "ocean"
      : c.category === "Celestial Creatures" ? "feathers"
      : c.category === "Forest Spirits" ? "leaves"
      : c.category === "Underworld Beasts" ? "shadow"
      : c.category === "Titans" ? "dust"
      : "sparkles")
  );
}

export function CreatureEffect({ creature }: { creature: Creature }) {
  const kind = classify(creature);
  const [a] = creature.palette;

  const particles = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      i,
      left: (i * 53) % 100,
      delay: (i % 7) * 0.4,
      dur: 4 + (i % 5),
      size: 4 + (i % 4) * 2,
    })),
    [creature.id]
  );

  // Per-effect particle shape/color
  const renderParticle = (p: typeof particles[number]) => {
    const base = {
      position: "absolute" as const,
      left: `${p.left}%`,
      animationDelay: `${p.delay}s`,
      animationDuration: `${p.dur}s`,
    };

    switch (kind) {
      case "embers":
        return (
          <span key={p.i} style={{ ...base, bottom: 0, width: p.size, height: p.size, background: "radial-gradient(circle, #ffb347, transparent)", borderRadius: "50%", filter: "blur(1px)" }}
            className="ce-rise" />
        );
      case "ocean":
        return (
          <span key={p.i} style={{ ...base, top: `${(p.i * 17) % 100}%`, width: 30 + p.size * 3, height: 1, background: "linear-gradient(90deg, transparent, rgba(120,200,230,0.55), transparent)" }}
            className="ce-ripple" />
        );
      case "feathers":
        return (
          <span key={p.i} style={{ ...base, top: -20, width: 2, height: 14, background: `linear-gradient(180deg, ${a}, transparent)`, borderRadius: 2, transform: `rotate(${(p.i * 23) % 60 - 30}deg)` }}
            className="ce-fall" />
        );
      case "scales":
        return (
          <span key={p.i} style={{ ...base, top: `${(p.i * 29) % 100}%`, width: p.size + 2, height: p.size + 2, background: a, borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", opacity: 0.5 }}
            className="ce-glow-pulse" />
        );
      case "leaves":
        return (
          <span key={p.i} style={{ ...base, top: -10, width: 6, height: 8, background: "#6a8a4a", borderRadius: "50% 0", opacity: 0.7 }}
            className="ce-fall" />
        );
      case "shadow":
        return (
          <span key={p.i} style={{ ...base, top: `${(p.i * 19) % 100}%`, width: 60, height: 60, background: "radial-gradient(circle, rgba(20,5,20,0.5), transparent 70%)", borderRadius: "50%" }}
            className="ce-drift" />
        );
      case "dust":
        return (
          <span key={p.i} style={{ ...base, bottom: 0, width: 1, height: 1, background: "rgba(212,180,120,0.7)", boxShadow: "0 0 4px rgba(212,180,120,0.6)" }}
            className="ce-rise" />
        );
      case "lightning":
        return (
          <span key={p.i} style={{ ...base, top: 0, width: 1, height: "100%", background: "linear-gradient(180deg, transparent, rgba(255,240,180,0.6), transparent)", opacity: 0 }}
            className="ce-flash" />
        );
      case "void":
        return (
          <span key={p.i} style={{ ...base, top: `${(p.i * 23) % 100}%`, width: 12, height: 12, border: "1px solid rgba(180,140,255,0.4)", borderRadius: "50%" }}
            className="ce-glow-pulse" />
        );
      case "sparkles":
      default:
        return (
          <span key={p.i} style={{ ...base, top: `${(p.i * 37) % 100}%`, width: 3, height: 3, background: "#f0d78c", borderRadius: "50%", boxShadow: "0 0 8px #f0d78c" }}
            className="ce-glow-pulse" />
        );
    }
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-md" aria-hidden>
      {particles.map(renderParticle)}
    </div>
  );
}
