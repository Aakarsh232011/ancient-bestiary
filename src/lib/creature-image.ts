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

/** Four distinct AI-generated plates — each a different angle/style of the same beast. */
export function creatureGallery(creature: Creature): string[] {
  const seed = seedFor(creature.id);
  const base = `${creature.name}, ${creature.mythology} mythology, ${creature.epithet}`;
  const plates: Array<{ prompt: string; s: number }> = [
    { prompt: `${base}, full body creature portrait, dramatic lighting, cinematic fantasy illustration, highly detailed, painted concept art`, s: seed + 101 },
    { prompt: `${base}, close-up head study, glowing eyes, intricate scales and features, oil painting, museum quality`, s: seed + 202 },
    { prompt: `${base}, ancient stone sculpture carved in ${creature.region}, temple relief, weathered marble, dramatic side lighting, archaeological photograph`, s: seed + 303 },
    { prompt: `${base}, in its habitat of ${creature.habitat[0] ?? "mythic realm"}, wide cinematic landscape shot, epic fantasy environment art`, s: seed + 404 },
  ];
  return plates.map(p => {
    const q = encodeURIComponent(p.prompt);
    return `${POLLI}${q}?width=768&height=960&seed=${p.s}&nologo=true`;
  });
}

