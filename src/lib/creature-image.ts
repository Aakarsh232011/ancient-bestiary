import type { Creature } from "@/data/creatures";

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

export function creatureImage(creature: Creature, w = 512, h = 640) {
  const suffix = creature.forbidden ? FORBIDDEN_SUFFIX : STYLE_SUFFIX;
  const prompt = `${creature.name}, ${creature.mythology} mythology, ${creature.epithet}, full body portrait, dramatic lighting, ${suffix}`;
  const q = encodeURIComponent(prompt);
  return `${POLLI}${q}?width=${w}&height=${h}&seed=${seedFor(creature.id)}&nologo=true&model=flux`;
}
