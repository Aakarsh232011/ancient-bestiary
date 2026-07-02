import type { Creature } from "@/data/creatures";
import { CREATURE_MEDIA } from "@/lib/creature-media";

const POLLI = "https://image.pollinations.ai/prompt/";
const STYLE_SUFFIX =
  "ancient mythological manuscript illustration, golden ink, dark parchment, ornate codex, painterly, cinematic, intricate detail";
const FORBIDDEN_SUFFIX =
  "forbidden grimoire illustration, blood-red ink, charred parchment, occult sigils, eldritch, ominous, painterly";

function seedFor(id: string) {
  let s = 0;
  for (let i = 0; i < id.length; i++) s = (s * 31 + id.charCodeAt(i)) >>> 0;
  return s % 100000;
}

export function pollinationsImage(creature: Creature, w = 512, h = 640) {
  const suffix = creature.forbidden ? FORBIDDEN_SUFFIX : STYLE_SUFFIX;
  const prompt = `${creature.name}, ${creature.mythology} mythology, ${creature.epithet}, full body portrait, dramatic lighting, ${suffix}`;
  const q = encodeURIComponent(prompt);
  return `${POLLI}${q}?width=${w}&height=${h}&seed=${seedFor(creature.id)}&nologo=true`;
}

/** Primary card image — reliable Wikimedia URL when available. */
export function creatureImage(creature: Creature, _w = 512, _h = 640) {
  const media = CREATURE_MEDIA[creature.id];
  if (media?.hero) return media.hero;
  return pollinationsImage(creature, _w, _h);
}

/** Hero image for creature page. */
export function creatureHero(creature: Creature) {
  return CREATURE_MEDIA[creature.id]?.hero ?? pollinationsImage(creature, 1024, 1024);
}

/** Gallery images (always returns at least 4 entries). */
export function creatureGallery(creature: Creature): string[] {
  const media = CREATURE_MEDIA[creature.id];
  const hero = creatureHero(creature);
  const gal = media?.gallery?.filter(Boolean) ?? [];
  const out = [...gal];
  while (out.length < 4) out.push(hero);
  return out.slice(0, 6);
}
