export type Rarity = "Common" | "Rare" | "Legendary" | "Mythic" | "Forbidden";
export type Threat = "Benign" | "Moderate" | "Dangerous" | "Cataclysmic";

export type Mythology =
  | "Hindu" | "Greek" | "Norse" | "Egyptian"
  | "Japanese" | "Celtic" | "Chinese" | "Mesopotamian";

export type Category =
  | "Dragons" | "Celestial Creatures" | "Sea Monsters"
  | "Forest Spirits" | "Underworld Beasts" | "Titans" | "Sacred Beasts";

export interface Creature {
  id: string;
  name: string;
  epithet: string;
  mythology: Mythology;
  category: Category;
  rarity: Rarity;
  threat: Threat;
  habitat: string[];
  region: string;
  symbol: string;
  palette: [string, string];
  lore: string;
  powers: { name: string; desc: string }[];
  weaknesses: string[];
  forbidden?: boolean;
}

const c = (x: Creature) => x;

export const mythologies: { id: Mythology; glyph: string; blurb: string }[] = [
  { id: "Hindu", glyph: "ॐ", blurb: "The eternal cycle of devas, asuras, and divine beasts of the Vedas." },
  { id: "Greek", glyph: "Δ", blurb: "Heroes, gods of Olympus, and the monsters they must overcome." },
  { id: "Norse", glyph: "ᚦ", blurb: "Wolves, world serpents, and the cold roar of Ragnarök." },
  { id: "Egyptian", glyph: "𓂀", blurb: "The Eye of Ra, jackal-headed gods, and beasts of the Duat." },
  { id: "Japanese", glyph: "神", blurb: "Yōkai, kami, and shapeshifters of the misted islands." },
  { id: "Celtic", glyph: "☘", blurb: "Druidic spirits, faerie hosts, and beasts of the misted moors." },
  { id: "Chinese", glyph: "龍", blurb: "Imperial dragons, qilin, and guardians of the four directions." },
  { id: "Mesopotamian", glyph: "𒀭", blurb: "First kings of the gods and chaos-mothers of the deep." },
];

export const categories: { id: Category; icon: string; desc: string }[] = [
  { id: "Dragons", icon: "🐲", desc: "Wyrms and serpents whose breath shaped the first mountains." },
  { id: "Celestial Creatures", icon: "✦", desc: "Beings of pure light bound to the wheel of stars." },
  { id: "Sea Monsters", icon: "🌊", desc: "Leviathans dwelling in the lightless trenches of the world." },
  { id: "Forest Spirits", icon: "🌿", desc: "Guardians of root, moss, and the green silence." },
  { id: "Underworld Beasts", icon: "☠", desc: "Wardens of the lands beyond the river of the dead." },
  { id: "Titans", icon: "⛰", desc: "Primordial giants who walked before the gods were named." },
  { id: "Sacred Beasts", icon: "✧", desc: "Holy mounts and companions revered across temples." },
];

export const creatures: Creature[] = [
  // ───── HINDU (strong representation) ─────
  c({
    id: "garuda", name: "Garuda", epithet: "Sun-Eagle of Vishnu",
    mythology: "Hindu", category: "Celestial Creatures",
    rarity: "Mythic", threat: "Dangerous",
    habitat: ["Sky Realms", "Mount Meru"], region: "Indian Subcontinent",
    symbol: "𓅃", palette: ["#d4a017", "#5a1a00"],
    lore: "Born of the sage Kashyapa and Vinata, Garuda is the lord of birds and the eternal mount of Vishnu. With wings that span the firmament, he slew serpents to free his enslaved mother and drank the nectar of immortality before returning it untouched.",
    powers: [
      { name: "Sun Wings", desc: "Beats that blot out the sky and scatter monsoon clouds." },
      { name: "Naga-Bane", desc: "Talons that pierce the scales of any serpent." },
      { name: "Amrita Sense", desc: "Tracks the scent of immortality across worlds." },
    ],
    weaknesses: ["Vows made to the devout", "The will of Vishnu"],
  }),
  c({
    id: "naga", name: "Naga", epithet: "Serpent Lords of the Patala",
    mythology: "Hindu", category: "Sea Monsters",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Subterranean Rivers", "Patala"], region: "Indian Subcontinent",
    symbol: "𑀵", palette: ["#1d6f5a", "#08221c"],
    lore: "Shape-shifting cobra spirits who guard hidden treasures and sacred wells. The greatest of them — Vasuki, Shesha, Takshaka — coil beneath the world and uphold its foundations.",
    powers: [
      { name: "Venom of Eons", desc: "A single drop curdles oceans." },
      { name: "Patala Step", desc: "Slips between the seven netherworlds at will." },
      { name: "Boon Granting", desc: "Bestows wealth on the worthy mortal." },
    ],
    weaknesses: ["Garuda's shadow", "Iron forged with mantras"],
  }),
  c({
    id: "makara", name: "Makara", epithet: "River-Beast of Ganga",
    mythology: "Hindu", category: "Sea Monsters",
    rarity: "Rare", threat: "Moderate",
    habitat: ["Sacred Rivers", "Coastal Estuaries"], region: "Indian Subcontinent",
    symbol: "♑", palette: ["#0f5a73", "#04222b"],
    lore: "A chimerical leviathan — crocodile body, elephant tusks, fish tail — and the steed of Ganga and Varuna. Carved on temple gates, it devours all uncleanliness from those who pass beneath.",
    powers: [
      { name: "Tidal Roar", desc: "Summons monsoon swells on command." },
      { name: "Threshold Guardian", desc: "None impure may cross its arch." },
    ],
    weaknesses: ["Drought", "Broken vows of pilgrimage"],
  }),
  c({
    id: "sharabha", name: "Sharabha", epithet: "Eight-Legged Wrath of Shiva",
    mythology: "Hindu", category: "Titans",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["Himalayan Peaks"], region: "Northern Mountains",
    symbol: "𑀫", palette: ["#7a1f1f", "#1a0606"],
    lore: "An eight-legged beast — part lion, part bird — that Shiva became to subdue Narasimha's blazing fury. He stands as proof that no rage is so great that the cosmos cannot answer it.",
    powers: [
      { name: "Cosmic Restraint", desc: "Binds even avatars of Vishnu." },
      { name: "Eightfold Stride", desc: "Crosses the three worlds in a single leap." },
    ],
    weaknesses: ["The cooling word of Parvati"],
  }),
  c({
    id: "kamadhenu", name: "Kamadhenu", epithet: "The Wish-Fulfilling Cow",
    mythology: "Hindu", category: "Sacred Beasts",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Ashrams", "Celestial Pastures"], region: "Heavenly Realms",
    symbol: "ॐ", palette: ["#c89b3c", "#3a2607"],
    lore: "Mother of all cattle, she rose from the Churning of the Ocean. Her udder pours every wish the heart can name — milk that has fed sages for ten thousand years.",
    powers: [
      { name: "Wish Milk", desc: "Any boon a pure-hearted soul speaks aloud." },
      { name: "Devic Host", desc: "Houses all 330 million devas within her form." },
    ],
    weaknesses: ["Greed of the petitioner"],
  }),
  c({
    id: "airavata", name: "Airavata", epithet: "White Elephant of Indra",
    mythology: "Hindu", category: "Sacred Beasts",
    rarity: "Legendary", threat: "Moderate",
    habitat: ["Indra's Heaven (Svarga)"], region: "Celestial Realms",
    symbol: "🐘", palette: ["#e8e3d3", "#5b5847"],
    lore: "Snow-white with seven trunks and four tusks, Airavata is the cloud-elephant of Indra. From his trunks rain pours into the world below — every monsoon is his breath.",
    powers: [
      { name: "Cloud Drawing", desc: "Pulls oceans into the heavens." },
      { name: "Thunder Mount", desc: "Bears Indra into every cosmic war." },
    ],
    weaknesses: ["Drought-curses"],
  }),
  c({
    id: "vali", name: "Vali", epithet: "Monkey-King of Kishkindha",
    mythology: "Hindu", category: "Forest Spirits",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Kishkindha Forest"], region: "Southern Jungles",
    symbol: "🐒", palette: ["#b87333", "#2b1306"],
    lore: "A vanara king of impossible strength — the gods themselves granted him half the might of any opponent he faced, making him undefeated in single combat until felled by Rama's hidden arrow.",
    powers: [
      { name: "Half-Strength Boon", desc: "Saps half the foe's power in any duel." },
      { name: "Mountain-Hurl", desc: "Throws peaks as if pebbles." },
    ],
    weaknesses: ["Ambush from concealment", "Dharmic justice"],
  }),
  c({
    id: "kinnara", name: "Kinnara", epithet: "Celestial Musicians",
    mythology: "Hindu", category: "Celestial Creatures",
    rarity: "Rare", threat: "Benign",
    habitat: ["Mount Kailash", "Heavenly Gardens"], region: "Himalayas",
    symbol: "𝄞", palette: ["#a87cc7", "#1c0d2c"],
    lore: "Half-human, half-bird beings whose love songs sustain marriages across lifetimes. To hear a kinnara sing is to remember every soul one has ever been.",
    powers: [
      { name: "Eternal Devotion", desc: "Their music binds two souls beyond death." },
      { name: "Veena of Memory", desc: "Restores lost lives to the listener." },
    ],
    weaknesses: ["Separation", "Silence"],
  }),
  c({
    id: "gandharva", name: "Gandharva", epithet: "Skyborn Heralds",
    mythology: "Hindu", category: "Celestial Creatures",
    rarity: "Rare", threat: "Moderate",
    habitat: ["Cloud Cities"], region: "Aerial Realms",
    symbol: "♪", palette: ["#3a6ea5", "#0a1828"],
    lore: "Male attendants of the devas who craft soma, the drink of the gods, and sing the dawn into being. They are the heralds at every celestial wedding.",
    powers: [
      { name: "Soma Brewing", desc: "Distills immortality from moonlight." },
      { name: "Dawn Song", desc: "Their voice lifts the sun above the horizon." },
    ],
    weaknesses: ["Wine of mortals", "Their own jealousy"],
  }),
  c({
    id: "vanara", name: "Vanara", epithet: "Forest-Born of the South",
    mythology: "Hindu", category: "Forest Spirits",
    rarity: "Common", threat: "Moderate",
    habitat: ["Southern Jungles"], region: "Southern Forests",
    symbol: "🐒", palette: ["#7a4a1f", "#1a0a02"],
    lore: "Tribes of intelligent, virtuous monkey-folk whose army built the bridge to Lanka. Loyal beyond measure — Hanuman, son of the wind, is the greatest of their kind.",
    powers: [
      { name: "Bridge-Builders", desc: "Move mountains across the sea." },
      { name: "Devotion of Hanuman", desc: "Loyalty that splits oceans." },
    ],
    weaknesses: ["Internal politics", "Demon trickery"],
  }),

  // ───── GREEK ─────
  c({
    id: "hydra", name: "The Lernaean Hydra", epithet: "Many-Headed Mire",
    mythology: "Greek", category: "Sea Monsters",
    rarity: "Legendary", threat: "Cataclysmic",
    habitat: ["Lake Lerna", "Swamps"], region: "Argolid",
    symbol: "Ψ", palette: ["#1d4f3b", "#06150f"],
    lore: "A serpentine horror whose every severed head birthed two more. Heracles, with the help of Iolaus and a torch, finally cauterized the last neck and ended the cycle.",
    powers: [
      { name: "Regeneration", desc: "Two heads for every one struck." },
      { name: "Toxic Bile", desc: "A single drop dissolves bronze." },
    ],
    weaknesses: ["Fire to the stumps", "An immortal head buried beneath stone"],
  }),
  c({
    id: "cerberus", name: "Cerberus", epithet: "Hound of Hades",
    mythology: "Greek", category: "Underworld Beasts",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Gates of Hades"], region: "Underworld",
    symbol: "☠", palette: ["#3a1f5a", "#0c0518"],
    lore: "Three-headed warden of the dead. He lets the dead in and never out, soothed only by honeyed cakes and Orpheus's lyre.",
    powers: [
      { name: "Three-Fold Watch", desc: "Past, present, and future at a glance." },
      { name: "Soul-Bind Bite", desc: "Tears a shade from its body." },
    ],
    weaknesses: ["Music", "Honeyed offerings"],
  }),
  c({
    id: "pegasus", name: "Pegasus", epithet: "Winged Stallion of the Dawn",
    mythology: "Greek", category: "Sacred Beasts",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Mount Helicon", "Olympus"], region: "Hellenic Peaks",
    symbol: "♞", palette: ["#e8e3d3", "#1a2d4a"],
    lore: "Sprung from the severed neck of Medusa, Pegasus carries thunderbolts for Zeus and now gallops eternally among the stars.",
    powers: [
      { name: "Skybound Flight", desc: "Outruns storms with ease." },
      { name: "Hoof of Inspiration", desc: "Wherever he strikes, a poet's spring bursts forth." },
    ],
    weaknesses: ["Pride of his rider"],
  }),
  c({
    id: "griffin", name: "Griffin", epithet: "Gold-Warden of the High Aeries",
    mythology: "Greek", category: "Sacred Beasts",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Wind-Sheared Cliffs", "Gold Veins"], region: "Scythian Mountains",
    symbol: "𓅓", palette: ["#d6a545", "#201006"],
    lore: "Lion-bodied and eagle-crowned, the Griffin nests where mountain gold breaks through stone. It does not hoard from greed; it guards the metal of the sun from hands too small and hungry to hold it wisely.",
    powers: [
      { name: "Sun-Talon Dive", desc: "Falls from the clouds with enough force to split shields." },
      { name: "Goldwake Cry", desc: "Reveals hidden ore and blinds thieves with reflected light." },
      { name: "Royal Vigil", desc: "Keeps watch for days without sleep or hunger." },
    ],
    weaknesses: ["A gift freely offered", "Cloudless noon glare", "Broken trust with a rightful monarch"],
  }),
  c({
    id: "minotaur", name: "Minotaur", epithet: "The Bull of Knossos",
    mythology: "Greek", category: "Underworld Beasts",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["The Labyrinth"], region: "Crete",
    symbol: "♉", palette: ["#6b2b1a", "#1a0805"],
    lore: "Born of Pasiphaë's cursed union with a sacred bull, he was hidden in Daedalus's labyrinth and fed on tribute youths until Theseus followed Ariadne's thread to his lair.",
    powers: [
      { name: "Labyrinth Mastery", desc: "Knows every false turn of stone." },
      { name: "Goring Charge", desc: "Splinters bronze shields." },
    ],
    weaknesses: ["A thread back to the door"],
  }),
  c({
    id: "chimera", name: "Chimera", epithet: "The Triple-Beast",
    mythology: "Greek", category: "Dragons",
    rarity: "Legendary", threat: "Cataclysmic",
    habitat: ["Lycian Volcanoes"], region: "Anatolia",
    symbol: "𐀂", palette: ["#a83a1f", "#1c0703"],
    lore: "Lion in front, goat in the middle, serpent for a tail — and fire from every mouth. Bellerophon and Pegasus drove a lead-tipped spear down its gullet to end its reign of ash.",
    powers: [
      { name: "Triune Breath", desc: "Flame, venom, and devouring jaws at once." },
    ],
    weaknesses: ["Molten lead", "Aerial attack"],
  }),
  c({
    id: "dragon", name: "Dragon", epithet: "The Gold-Hoard Wyrm",
    mythology: "Greek", category: "Dragons",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["Volcanic Caverns", "Ancient Treasury Vaults"], region: "Colchis & the Black Sea",
    symbol: "🐉", palette: ["#b3411f", "#160503"],
    lore: "The old dragon is not a species but a calamity wearing scales: furnace-breath, bronze talons, and a mind patient enough to guard a sacred fleece for centuries. Kings call it a monster; priests call it a test placed at the edge of forbidden wealth.",
    powers: [
      { name: "Furnace Breath", desc: "Melts iron doors into rivers of slag." },
      { name: "Hoard-Sense", desc: "Feels the theft of a single coin through leagues of stone." },
      { name: "Scale Citadel", desc: "Turns blades unless they strike beneath the heart-plate." },
    ],
    weaknesses: ["A sleepless hero", "The soft scale beneath the left breast", "Flattery that becomes a riddle"],
  }),
  c({
    id: "phoenix", name: "Phoenix", epithet: "The Reborn Flame",
    mythology: "Egyptian", category: "Celestial Creatures",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Sun Temples", "Ash Gardens"], region: "Heliopolis & Eastern Deserts",
    symbol: "☀", palette: ["#f07a22", "#2a0702"],
    lore: "At the end of a thousand years the Phoenix builds a nest of myrrh, cinnamon, and sacred cedar, then sings itself into fire. From the fragrant ash rises a bright-eyed chick carrying the memory of every dawn before it.",
    powers: [
      { name: "Rebirth Pyre", desc: "Returns from ash with wounds and curses burned away." },
      { name: "Solar Benediction", desc: "Purifies plague, rot, and despair with a sweep of its wings." },
      { name: "Ash Memory", desc: "Recalls the last words of every age it has survived." },
    ],
    weaknesses: ["Eternal night", "Rain gathered during an eclipse", "A nest built without sacred aromatics"],
  }),

  // ───── NORSE ─────
  c({
    id: "kraken", name: "Kraken", epithet: "The Island Below",
    mythology: "Norse", category: "Sea Monsters",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["Black Fjords", "Open Ocean Trenches"], region: "Northern Seas",
    symbol: "≋", palette: ["#0e5f78", "#021018"],
    lore: "Sailors first mistake the Kraken for land: a dark back rising from fog, ringed with gulls and weed. Then the island breathes, tentacles climb the mast, and the sea itself begins to close its fist around the ship.",
    powers: [
      { name: "Abyssal Grasp", desc: "Tentacles coil around hull, harbor, and lighthouse alike." },
      { name: "Maelstrom Wake", desc: "Creates whirlpools that swallow entire fleets." },
      { name: "Island Mimicry", desc: "Sleeps at the surface disguised as safe shore." },
    ],
    weaknesses: ["Still weather", "Harpoons carved with storm-runes", "The retreat of deep tides"],
  }),
  c({
    id: "fenrir", name: "Fenrir", epithet: "The Unbound",
    mythology: "Norse", category: "Underworld Beasts",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["Lyngvi Isle"], region: "Northern Wilds",
    symbol: "ᚠ", palette: ["#4a4f5a", "#0a0c10"],
    lore: "The monstrous wolf-child of Loki, foretold to swallow Odin whole at Ragnarök. He is bound only by Gleipnir, a ribbon forged from impossible things.",
    powers: [
      { name: "Jaws of Doom", desc: "Maw that touches earth and sky." },
      { name: "Unbreakable Hunger", desc: "Eats stars and gods alike." },
    ],
    weaknesses: ["Gleipnir's ribbon", "Víðarr's iron shoe"],
  }),
  c({
    id: "jormungandr", name: "Jörmungandr", epithet: "The World Serpent",
    mythology: "Norse", category: "Sea Monsters",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["The World Ocean"], region: "Midgard's Edge",
    symbol: "∞", palette: ["#1f4a5a", "#04161c"],
    lore: "He encircles Midgard, tail in mouth. When he lets go, the seas will rise and the world will end. Thor will fell him at Ragnarök — and die nine steps later.",
    powers: [
      { name: "Ocean Crush", desc: "His coils raise tidal walls." },
      { name: "Venom Storm", desc: "Spits poison miles into the sky." },
    ],
    weaknesses: ["Mjölnir's hammer"],
  }),
  c({
    id: "sleipnir", name: "Sleipnir", epithet: "Eight-Legged Steed of Odin",
    mythology: "Norse", category: "Sacred Beasts",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Asgard"], region: "The Nine Realms",
    symbol: "ᛟ", palette: ["#5a5a6a", "#101216"],
    lore: "Born of Loki and the stallion Svadilfari, Sleipnir runs between all nine realms — across sky, sea, and the road to Hel.",
    powers: [
      { name: "Realm-Stride", desc: "Crosses any world in a single canter." },
    ],
    weaknesses: ["Loyalty to Odin alone"],
  }),
  c({
    id: "nidhogg", name: "Níðhöggr", epithet: "Corpse-Tearer",
    mythology: "Norse", category: "Dragons",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Roots of Yggdrasil"], region: "Niflheim",
    symbol: "ᚾ", palette: ["#3a1a1a", "#0a0303"],
    lore: "The dragon that gnaws at the deepest root of the world tree, chewing the corpses of oathbreakers in Náströnd while waiting for the world to end.",
    powers: [
      { name: "Root-Gnaw", desc: "Each bite weakens the foundations of the cosmos." },
    ],
    weaknesses: ["The eagle atop Yggdrasil"],
  }),
  c({
    id: "huginn-muninn", name: "Huginn & Muninn", epithet: "Thought and Memory",
    mythology: "Norse", category: "Celestial Creatures",
    rarity: "Rare", threat: "Benign",
    habitat: ["Asgard's Spires"], region: "The Nine Realms",
    symbol: "ᚱ", palette: ["#2a2a3a", "#06070c"],
    lore: "Twin ravens that fly across Midgard each dawn and return at dusk to whisper every secret of the realms into Odin's ear. Should they fail to return, the All-Father fears for thought itself.",
    powers: [
      { name: "All-Sight Flight", desc: "See every corner of the nine worlds in a single day." },
      { name: "Tongue of Odin", desc: "Recite a perfect record of all they have witnessed." },
    ],
    weaknesses: ["Silence imposed by sorcery"],
  }),

  // ───── EGYPTIAN ─────
  c({
    id: "sphinx", name: "Sphinx", epithet: "Guardian of the Riddle",
    mythology: "Egyptian", category: "Sacred Beasts",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Desert Temples"], region: "Nile Delta",
    symbol: "𓋹", palette: ["#c89b3c", "#3a2607"],
    lore: "Lion-bodied, woman-faced (or pharaoh-faced) wardens of sacred grounds. Pose a question wrongly and the desert keeps you forever.",
    powers: [
      { name: "Binding Riddle", desc: "Question that paralyzes the unwise." },
    ],
    weaknesses: ["The correct answer"],
  }),
  c({
    id: "bennu", name: "Bennu", epithet: "Heron of the First Sunrise",
    mythology: "Egyptian", category: "Celestial Creatures",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Heliopolis"], region: "Nile Valley",
    symbol: "𓅣", palette: ["#d96b1c", "#2a0c03"],
    lore: "The original phoenix — said to have flown above the primordial waters and cried the first sound, beginning the universe's heartbeat.",
    powers: [
      { name: "Rebirth Fire", desc: "Burns and returns each dawn." },
      { name: "Cosmic Cry", desc: "Sets the rhythm of all creation." },
    ],
    weaknesses: ["Eternal sleep"],
  }),
  c({
    id: "ammit", name: "Ammit", epithet: "Devourer of the Unworthy",
    mythology: "Egyptian", category: "Underworld Beasts",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Hall of Ma'at"], region: "Duat",
    symbol: "𓆊", palette: ["#5c1a1a", "#0d0303"],
    lore: "Crocodile-head, lion-fore, hippopotamus-hind. She waits beside the scales of judgment. If your heart weighs heavier than Ma'at's feather, she eats your soul.",
    powers: [
      { name: "Soul Devouring", desc: "Erases the unworthy from all rebirth." },
    ],
    weaknesses: ["A heart light as a feather"],
  }),
  c({
    id: "apep", name: "Apep", epithet: "The Serpent of Chaos",
    mythology: "Egyptian", category: "Underworld Beasts",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["The Western Horizon"], region: "Duat",
    symbol: "𓆙", palette: ["#3a0d0d", "#0a0202"],
    lore: "Every night Apep coils beneath the world to swallow Ra's solar barque. Each dawn the gods must cut him to pieces — and each dusk he is whole again, hungry, hateful, eternal.",
    powers: [
      { name: "Sun-Eating Coil", desc: "Crushes light from the sky itself." },
      { name: "Endless Return", desc: "Reforms with every sunset, regardless of the wounds dealt." },
    ],
    weaknesses: ["The spear of Set", "Spells of the Book of Apophis"],
  }),
  c({
    id: "khepri", name: "Khepri", epithet: "Scarab of the Rising Sun",
    mythology: "Egyptian", category: "Celestial Creatures",
    rarity: "Legendary", threat: "Benign",
    habitat: ["Eastern Horizon"], region: "Nile Valley",
    symbol: "𓆣", palette: ["#1f6b3a", "#04150a"],
    lore: "A great scarab that rolls the sun across the morning sky as a dung-beetle rolls its sphere. He is the daily promise that the world will be reborn from the dark.",
    powers: [
      { name: "Dawn-Rolling", desc: "Lifts the disk of Ra above the horizon each morning." },
      { name: "Self-Creation", desc: "Births himself anew from no parent, as the sun does." },
    ],
    weaknesses: ["Eclipses", "The shadow of Apep"],
  }),

  // ───── JAPANESE ─────
  c({
    id: "kitsune", name: "Nine-Tailed Kitsune", epithet: "Vixen of a Thousand Years",
    mythology: "Japanese", category: "Forest Spirits",
    rarity: "Legendary", threat: "Moderate",
    habitat: ["Bamboo Forests", "Shrines"], region: "Japanese Islands",
    symbol: "狐", palette: ["#e8c074", "#2c1306"],
    lore: "A fox-spirit that grows a new tail every century. At nine tails, she is silver-gold, omniscient, and may pass freely between mortal and divine worlds.",
    powers: [
      { name: "Fox-fire", desc: "Cold blue flame conjured from a heartbeat." },
      { name: "Shape Theft", desc: "Wears the face of anyone she's met." },
    ],
    weaknesses: ["Dogs of pure breed", "A revealed shadow"],
  }),
  c({
    id: "tengu", name: "Tengu", epithet: "Mountain-Goblin of the Sword",
    mythology: "Japanese", category: "Forest Spirits",
    rarity: "Rare", threat: "Moderate",
    habitat: ["Sacred Peaks"], region: "Japanese Highlands",
    symbol: "天", palette: ["#a0301f", "#1c0604"],
    lore: "Long-nosed warrior spirits who teach martial arts to those they deem worthy — and humiliate the prideful. Masters of wind and the blade.",
    powers: [
      { name: "Wind-Cut", desc: "Slices clouds with a fan." },
      { name: "Warrior Tutelage", desc: "Trains heroes in a single mountain night." },
    ],
    weaknesses: ["Buddhist mantras", "Genuine humility"],
  }),
  c({
    id: "ryu", name: "Ryū", epithet: "Sky-Dragon of the Eastern Seas",
    mythology: "Japanese", category: "Dragons",
    rarity: "Mythic", threat: "Dangerous",
    habitat: ["Pacific Storms"], region: "Japanese Seas",
    symbol: "龍", palette: ["#1f5a73", "#04161c"],
    lore: "Serpentine dragons of rain and benevolence — wingless, yet they fly through the storm by sheer command. They guard wisdom rather than gold.",
    powers: [
      { name: "Storm Command", desc: "Calls typhoons from a still sea." },
      { name: "Pearl of Wisdom", desc: "Clutches an orb of infinite knowledge." },
    ],
    weaknesses: ["Loss of the pearl"],
  }),
  c({
    id: "kappa", name: "Kappa", epithet: "River-Imp",
    mythology: "Japanese", category: "Sea Monsters",
    rarity: "Common", threat: "Moderate",
    habitat: ["Rivers", "Ponds"], region: "Japanese Lowlands",
    symbol: "河", palette: ["#2a6e3a", "#06180a"],
    lore: "Turtle-shelled trickster with a water-filled dish atop its head. Drown a horse, steal a cucumber — bow politely, and it must spill its water and lose its strength.",
    powers: [
      { name: "Drowning Grip", desc: "Pulls swimmers beneath the current." },
    ],
    weaknesses: ["A polite bow", "Cucumbers as bribes"],
  }),
  c({
    id: "orochi", name: "Yamata-no-Orochi", epithet: "Eight-Headed, Eight-Tailed Doom",
    mythology: "Japanese", category: "Dragons",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["Mountains of Izumo"], region: "Japanese Highlands",
    symbol: "八", palette: ["#5a1f3a", "#0f0509"],
    lore: "A serpent so vast its eight heads spanned eight valleys, its body draped with cedars and moss. Susanoo lured it with eight vats of sake and split it head-from-head — finding the sword Kusanagi within its tail.",
    powers: [
      { name: "Eight-Fold Devouring", desc: "Eight maws strike at once across a battlefield." },
      { name: "Moss-Mountain Hide", desc: "Forests grow upon its back; arrows take root, not flesh." },
    ],
    weaknesses: ["Wine of unbearable strength", "A blade hidden in its tail"],
  }),

  // ───── CELTIC ─────
  c({
    id: "cu-sith", name: "Cù Sìth", epithet: "Faerie Hound of the Mounds",
    mythology: "Celtic", category: "Forest Spirits",
    rarity: "Rare", threat: "Dangerous",
    habitat: ["Highland Mounds"], region: "Scottish Highlands",
    symbol: "☘", palette: ["#2e5a3a", "#070f0a"],
    lore: "A great green dog the size of a bull. It hunts silently, but every third bound it howls — three bays, and the listener dies of fear.",
    powers: [
      { name: "Three-Bay Curse", desc: "A heart fails on the third howl." },
    ],
    weaknesses: ["Cold iron", "Crossed thresholds"],
  }),
  c({
    id: "selkie", name: "Selkie", epithet: "Seal-Folk of the Hebrides",
    mythology: "Celtic", category: "Sea Monsters",
    rarity: "Rare", threat: "Benign",
    habitat: ["Northern Seas"], region: "Hebrides",
    symbol: "❀", palette: ["#3a5a73", "#0a1218"],
    lore: "Shed their seal-skin to walk as humans on moonlit shores. Steal the skin and they must love you — until the day they find it again.",
    powers: [
      { name: "Skin-Shift", desc: "Becomes seal or human at will." },
    ],
    weaknesses: ["A lost skin"],
  }),
  c({
    id: "each-uisge", name: "Each-Uisge", epithet: "The Water Horse",
    mythology: "Celtic", category: "Sea Monsters",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Highland Lochs"], region: "Scottish Highlands",
    symbol: "♞", palette: ["#1f3a5a", "#04101c"],
    lore: "Appears as a docile horse on the shoreline. The moment a rider mounts, its skin becomes adhesive — it bolts into the loch and devours all but the liver, which floats ashore by morning.",
    powers: [
      { name: "Adhesive Hide", desc: "Pulls any who touch it beneath the water." },
      { name: "Shapeshift", desc: "Becomes pony, stallion, or comely youth at will." },
    ],
    weaknesses: ["Bridle of iron and silver"],
  }),
  c({
    id: "banshee", name: "Banshee", epithet: "Wailing Woman of the Sídhe",
    mythology: "Celtic", category: "Underworld Beasts",
    rarity: "Rare", threat: "Moderate",
    habitat: ["Ancestral Ruins"], region: "Ireland",
    symbol: "𓂀", palette: ["#5a3a73", "#0e0818"],
    lore: "A keening spirit attached to the oldest families. To hear her cry beneath your window at midnight is to know that one beneath your roof will not see the dawn.",
    powers: [
      { name: "Death Knell", desc: "Foretells the passing of any soul she knows by name." },
      { name: "Veil Walk", desc: "Crosses between the living and the Otherworld unseen." },
    ],
    weaknesses: ["A spoken blessing", "The breaking of dawn"],
  }),
  c({
    id: "dagda-stag", name: "Cernunnos's Stag", epithet: "Antlered Lord of the Greenwood",
    mythology: "Celtic", category: "Forest Spirits",
    rarity: "Legendary", threat: "Benign",
    habitat: ["Sacred Groves"], region: "Gaul & Britain",
    symbol: "ᚷ", palette: ["#3a5a2a", "#0a1208"],
    lore: "A white stag whose antlers branch into every season at once — spring leaf, summer bough, autumn ember, winter bone. Hunters who pursue it find themselves seven years older when they return.",
    powers: [
      { name: "Seasons-in-One-Crown", desc: "Bends time within its grove." },
      { name: "Greenwarden", desc: "Every beast of the forest answers its call." },
    ],
    weaknesses: ["Iron axes on holy nights"],
  }),

  // ───── CHINESE ─────

  c({
    id: "long", name: "Long", epithet: "Imperial Dragon of the Five Claws",
    mythology: "Chinese", category: "Dragons",
    rarity: "Mythic", threat: "Dangerous",
    habitat: ["Heavenly Rivers"], region: "Middle Kingdom",
    symbol: "龍", palette: ["#c89b3c", "#3a1a06"],
    lore: "Serpent-bodied, deer-antlered, scaled in jade and gold. The five-clawed dragon is the emperor's own; lesser dragons bear four, three, or none, and may dwell in any river or sky.",
    powers: [
      { name: "Rain Bringer", desc: "Commands every drop from cloud to crop." },
      { name: "Imperial Mandate", desc: "Acclaims or unmakes dynasties." },
    ],
    weaknesses: ["Dishonor of the throne"],
  }),
  c({
    id: "qilin", name: "Qilin", epithet: "The Gentle Chimera",
    mythology: "Chinese", category: "Sacred Beasts",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Sage Forests"], region: "Middle Kingdom",
    symbol: "麒", palette: ["#e8c074", "#2a1a06"],
    lore: "A dragon-headed, deer-bodied beast that appears only when a true sage walks the earth. So gentle it will not bend a blade of grass beneath its hooves.",
    powers: [
      { name: "Sage Sight", desc: "Recognizes righteousness across lifetimes." },
    ],
    weaknesses: ["A corrupt age"],
  }),
  c({
    id: "fenghuang", name: "Fenghuang", epithet: "Phoenix of the Five Virtues",
    mythology: "Chinese", category: "Celestial Creatures",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Wutong Trees"], region: "Imperial Skies",
    symbol: "鳳", palette: ["#d96b1c", "#1c0703"],
    lore: "Body composed of five sacred birds, plumage of five colors, song of five notes. Appears only above a virtuous empress's reign.",
    powers: [
      { name: "Harmony Cry", desc: "Restores peace to warring lands." },
    ],
    weaknesses: ["Discord in the realm"],
  }),
  c({
    id: "bai-ze", name: "Bai Ze", epithet: "The All-Knowing Beast",
    mythology: "Chinese", category: "Sacred Beasts",
    rarity: "Mythic", threat: "Benign",
    habitat: ["Sacred Mountain of Kunlun"], region: "Middle Kingdom",
    symbol: "白", palette: ["#e8e3c8", "#3a3322"],
    lore: "A lion-bodied beast with nine eyes and six horns, said to speak every human tongue. To the Yellow Emperor he dictated the names and natures of eleven thousand five hundred and twenty spirits.",
    powers: [
      { name: "Omniscient Tongue", desc: "Names every demon, ghost, and god that walks the world." },
      { name: "Ward of the Sage", desc: "Its likeness on a banner repels misfortune." },
    ],
    weaknesses: ["A questioner without virtue"],
  }),
  c({
    id: "pixiu", name: "Pixiu", epithet: "Devourer of Treasure",
    mythology: "Chinese", category: "Sacred Beasts",
    rarity: "Legendary", threat: "Moderate",
    habitat: ["Imperial Tombs", "Counting Houses"], region: "Middle Kingdom",
    symbol: "貔", palette: ["#a87632", "#241405"],
    lore: "Winged lion-dragon with no anus — it consumes wealth eternally and never lets a coin escape. Cherished by merchants; cursed by tax collectors.",
    powers: [
      { name: "Endless Hoarding", desc: "Draws gold to itself from every horizon." },
      { name: "Ward Against Misfortune", desc: "Devours bad luck before it reaches its owner." },
    ],
    weaknesses: ["A turned head", "Greed of its master"],
  }),

  // ───── MESOPOTAMIAN ─────
  c({
    id: "lamassu", name: "Lamassu", epithet: "Winged Bull of the Gate",
    mythology: "Mesopotamian", category: "Sacred Beasts",
    rarity: "Legendary", threat: "Benign",
    habitat: ["Palace Gates"], region: "Fertile Crescent",
    symbol: "𒀭", palette: ["#c89b3c", "#3a2607"],
    lore: "Carved colossi at every Assyrian doorway — bull-bodied, eagle-winged, bearded as a king. They guard against the chaos that prowls beyond the walls.",
    powers: [
      { name: "Threshold Ward", desc: "No malevolent spirit passes the gate." },
    ],
    weaknesses: ["A fallen empire"],
  }),
  c({
    id: "anzu", name: "Anzû", epithet: "Storm-Bird Thief",
    mythology: "Mesopotamian", category: "Celestial Creatures",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Mountain Aeries"], region: "Zagros Peaks",
    symbol: "𒀭", palette: ["#5a3a1a", "#120a04"],
    lore: "Lion-headed eagle that stole the Tablet of Destinies from Enlil himself. Even the gods feared him until Ninurta loosed his arrow.",
    powers: [
      { name: "Tempest Wings", desc: "Beats summon storms across cities." },
      { name: "Destiny Theft", desc: "Steals fate from any unguarded soul." },
    ],
    weaknesses: ["A god-forged arrow"],
  }),
  c({
    id: "tiamat", name: "Tiamat", epithet: "Mother of Chaos",
    mythology: "Mesopotamian", category: "Titans",
    rarity: "Mythic", threat: "Cataclysmic",
    habitat: ["The Primal Salt Sea"], region: "Pre-creation",
    symbol: "𒀭", palette: ["#4a1f5a", "#0c0518"],
    lore: "Primordial saltwater serpent-goddess. From her sundered body, Marduk shaped the earth and sky. The world is her corpse — and she still dreams beneath it.",
    powers: [
      { name: "Chaos Spawn", desc: "Births eleven monstrous champions on a whim." },
    ],
    weaknesses: ["The four winds in her mouth"],
  }),
  c({
    id: "mushussu", name: "Mušḫuššu", epithet: "Dragon of Marduk",
    mythology: "Mesopotamian", category: "Dragons",
    rarity: "Legendary", threat: "Dangerous",
    habitat: ["Ishtar Gate", "Babylon's Walls"], region: "Fertile Crescent",
    symbol: "𒈩", palette: ["#3a5a73", "#06121c"],
    lore: "Serpent-necked, lion-pawed, eagle-taloned — the heraldic beast of Marduk that flanks the Ishtar Gate of Babylon. It walks beside the storm-god into every divine war.",
    powers: [
      { name: "Storm-March", desc: "Strides at Marduk's heel as lightning splits the field." },
      { name: "Gate-Glare", desc: "Its painted gaze on a wall halts invaders mid-step." },
    ],
    weaknesses: ["The fall of its city"],
  }),
  c({
    id: "gallu", name: "Gallu", epithet: "Demons of the Underworld Steppe",
    mythology: "Mesopotamian", category: "Underworld Beasts",
    rarity: "Rare", threat: "Dangerous",
    habitat: ["Kur, the Land of No Return"], region: "Underworld",
    symbol: "𒀴", palette: ["#3a1f3a", "#08040a"],
    lore: "Seven hounds with no faces, sent up from Kur to drag the dead — or the living — back into the dust. When Inanna fled, the gallu pursued her until a substitute was found.",
    powers: [
      { name: "Soul-Drag", desc: "Hauls any named target down into the underworld." },
      { name: "Faceless Hunt", desc: "Cannot be reasoned with, distracted, or bribed." },
    ],
    weaknesses: ["A willing substitute", "The intercession of Enki"],
  }),

  // ───── FORBIDDEN ─────
  c({
    id: "leviathan", name: "Leviathan", epithet: "The Sea That Hungers",
    mythology: "Mesopotamian", category: "Sea Monsters",
    rarity: "Forbidden", threat: "Cataclysmic", forbidden: true,
    habitat: ["The Trench Beyond Maps"], region: "Unknown",
    symbol: "𒀭", palette: ["#1a1a4a", "#02020c"],
    lore: "A coiled void with scales that shine like burnished bronze. To name him aloud at sea is to summon storms; to read his entry without consent of the archivist is to dream of drowning until you wake.",
    powers: [
      { name: "Ocean Swallow", desc: "Drinks fleets in a single throat." },
    ],
    weaknesses: ["No mortal weapon"],
  }),
  c({
    id: "behemoth", name: "Behemoth", epithet: "The Land That Walks",
    mythology: "Hindu", category: "Titans",
    rarity: "Forbidden", threat: "Cataclysmic", forbidden: true,
    habitat: ["The First Continent"], region: "Forgotten Earth",
    symbol: "⛰", palette: ["#3a1f0a", "#0c0603"],
    lore: "Older than mountain ranges, his footprints are the seas. Sleeping, he is mistaken for a continent. Should he wake, geography ends.",
    powers: [
      { name: "Continental Stride", desc: "Rearranges the map with every step." },
    ],
    weaknesses: ["Only the maker may end him"],
  }),
  c({
    id: "ouroboros", name: "Ouroboros", epithet: "The Self-Devouring",
    mythology: "Egyptian", category: "Dragons",
    rarity: "Forbidden", threat: "Cataclysmic", forbidden: true,
    habitat: ["The Edge of Time"], region: "Beyond the Veil",
    symbol: "∞", palette: ["#5a3a1a", "#0c0603"],
    lore: "A serpent biting its own tail, eternally consuming and recreating itself. To witness it complete one full revolution is to forget your own name and remember every other.",
    powers: [
      { name: "Cycle Eternal", desc: "Resets all time within its coil." },
    ],
    weaknesses: ["Breaking the circle"],
  }),
];

export const getCreature = (id: string) => creatures.find(c => c.id === id);
export const getByMythology = (m: Mythology) => creatures.filter(c => c.mythology === m && !c.forbidden);
export const getByCategory = (cat: Category) => creatures.filter(c => c.category === cat && !c.forbidden);
export const publicCreatures = creatures.filter(c => !c.forbidden);
export const forbiddenCreatures = creatures.filter(c => c.forbidden);
