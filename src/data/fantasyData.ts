import { 
  CharacterClassType, 
  CharacterRace, 
  Alignment,
  CharacterRarity,
  CharacterGender
} from '../types/character';

export interface RarityConfig {
  name: CharacterRarity;
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  cardGlow: string;
  accentColor: string;
  statBonus: number;
  healthBonus: number;
  manaBonus: number;
  description: string;
}

export const RARITY_CONFIGS: Record<CharacterRarity, RarityConfig> = {
  Common: {
    name: 'Common',
    label: 'Common',
    badgeBg: 'bg-stone-800/90 text-stone-200',
    badgeText: 'text-stone-300',
    badgeBorder: 'border-stone-500/80',
    cardBorder: 'border-stone-700/80',
    cardGlow: 'shadow-xl shadow-black/80',
    accentColor: '#a8a29e',
    statBonus: 0,
    healthBonus: 0,
    manaBonus: 0,
    description: 'A standard adventurer forging their nascent legend.',
  },
  Rare: {
    name: 'Rare',
    label: 'Rare',
    badgeBg: 'bg-sky-950/95 text-sky-100',
    badgeText: 'text-sky-300',
    badgeBorder: 'border-sky-500',
    cardBorder: 'border-sky-500',
    cardGlow: 'shadow-[0_0_35px_rgba(56,189,248,0.35)] ring-1 ring-sky-500/50',
    accentColor: '#38bdf8',
    statBonus: 2,
    healthBonus: 15,
    manaBonus: 15,
    description: 'An exceptional champion gifted with resonant arcana.',
  },
  Epic: {
    name: 'Epic',
    label: 'Epic',
    badgeBg: 'bg-purple-950/95 text-purple-100',
    badgeText: 'text-purple-300',
    badgeBorder: 'border-purple-500',
    cardBorder: 'border-purple-500',
    cardGlow: 'shadow-[0_0_40px_rgba(192,132,252,0.45)] ring-1 ring-purple-500/60',
    accentColor: '#c084fc',
    statBonus: 4,
    healthBonus: 35,
    manaBonus: 35,
    description: 'A legendary Paragon revered throughout kingdoms.',
  },
  Legendary: {
    name: 'Legendary',
    label: 'Legendary',
    badgeBg: 'bg-gradient-to-r from-amber-950 via-yellow-900/90 to-amber-950 text-amber-100',
    badgeText: 'text-amber-300 font-extrabold',
    badgeBorder: 'border-amber-400',
    cardBorder: 'border-amber-400',
    cardGlow: 'shadow-[0_0_50px_rgba(251,191,36,0.6)] ring-2 ring-amber-400/80',
    accentColor: '#fbbf24',
    statBonus: 6,
    healthBonus: 60,
    manaBonus: 60,
    description: 'A mythic demigod whose deeds echo across eternity.',
  },
};

export const GENDERED_FIRST_NAMES: Record<CharacterRace, Record<CharacterGender, string[]>> = {
  'Human': {
    'Male': ['Alden', 'Baelor', 'Cassian', 'Darius', 'Gawain', 'Jareth', 'Kaelen', 'Leofric', 'Morgath', 'Oswin', 'Cedric', 'Theron'],
    'Female': ['Elysia', 'Helena', 'Isolde', 'Nesta', 'Althea', 'Morrigan', 'Gwendolyn', 'Brianne', 'Maeve', 'Rowena', 'Lyanna'],
    'Non-binary': ['Rowan', 'Valen', 'Thorne', 'Corwin', 'Morgan', 'Ash', 'Peregrine', 'Linden', 'Sterling', 'Wynn']
  },
  'High Elf': {
    'Male': ['Aeldir', 'Faenor', 'Galadhel', 'Maelor', 'Sylas', 'Theren', 'Zephyrion', 'Caelum', 'Eryndor', 'Thalor'],
    'Female': ['Aerith', 'Caelynn', 'Elora', 'Ilyndra', 'Laurelin', 'Nimrodel', 'Quelanna', 'Valariel', 'Astraea', 'Lyariel', 'Vespera'],
    'Non-binary': ['Faelivrin', 'Ilphrin', 'Silvyr', 'Sylvan', 'Zephyr', 'Kael', 'Eirian', 'Rael', 'Alin']
  },
  'Wood Elf': {
    'Male': ['Caelan', 'Garrick', 'Silas', 'Tarkon', 'Corin', 'Fenric', 'Talon', 'Eamon', 'Kaelen'],
    'Female': ['Fawn', 'Lirien', 'Moriel', 'Willow', 'Ysolde', 'Emberlyn', 'Briar', 'Sylvanas', 'Cheryl'],
    'Non-binary': ['Bramble', 'Duskwood', 'Hawthorne', 'Kaelis', 'Oaklyn', 'Rowan', 'Moss', 'Sylvane', 'Brier', 'Rain']
  },
  'Mountain Dwarf': {
    'Male': ['Balin', 'Balgor', 'Brakka', 'Dain', 'Durin', 'Gimrik', 'Harbek', 'Kragan', 'Morgran', 'Orsik', 'Rurik', 'Thorgar', 'Torvald', 'Ulfgar', 'Vondal', 'Bofur', 'Gror'],
    'Female': ['Brunhild', 'Dagmar', 'Helga', 'Mardred', 'Thora', 'Astrid', 'Eldeth', 'Finellen', 'Gurdis', 'Liftrasa'],
    'Non-binary': ['Kaelin', 'Skalgar', 'Durn', 'Korin', 'Torren', 'Barin', 'Flint', 'Bran', 'Rust']
  },
  'Dragonborn': {
    'Male': ['Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Medrash', 'Nadarr', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn'],
    'Female': ['Akra', 'Biri', 'Daar', 'Harann', 'Kava', 'Mishann', 'Nala', 'Surina', 'Sora', 'Korra'],
    'Non-binary': ['Kriv', 'Vraka', 'Pyroth', 'Jax', 'Ignis', 'Sylvan', 'Dran', 'Zeth']
  },
  'Tiefling': {
    'Male': ['Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis', 'Melech', 'Mordai', 'Nirikos', 'Pelaios', 'Skamos', 'Therai'],
    'Female': ['Criella', 'Damaia', 'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta', 'Artora', 'Lilith'],
    'Non-binary': ['Vesper', 'Haven', 'Creed', 'Echo', 'Malice', 'Zephyr', 'Rune', 'Shade', 'Cinder']
  },
  'Halfling': {
    'Male': ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Roscoe', 'Wellby'],
    'Female': ['Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Portia', 'Seraphina', 'Verna'],
    'Non-binary': ['Perrin', 'Reed', 'Robin', 'Pip', 'Clover', 'Dale', 'Wren', 'Sam']
  },
  'Orc': {
    'Male': ['Brak', 'Dench', 'Feng', 'Henk', 'Holg', 'Imsh', 'Kragk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Ugor', 'Vorn', 'Gor'],
    'Female': ['Baggi', 'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha', 'Vola', 'Grusha'],
    'Non-binary': ['Gell', 'Keth', 'Tor', 'Rok', 'Ash', 'Mor', 'Vash', 'Skar']
  },
  'Aasimar': {
    'Male': ['Azariel', 'Cassiel', 'Gabriel', 'Hadriel', 'Jaelen', 'Mikael', 'Nuriel', 'Raziel', 'Sariel', 'Uriel', 'Zadkiel', 'Aurelius'],
    'Female': ['Celestia', 'Elysium', 'Lumiel', 'Seraphina', 'Solaria', 'Valora', 'Angelica', 'Lyra', 'Evangeline'],
    'Non-binary': ['Dawn', 'Hope', 'Justice', 'Patience', 'Radiance', 'Solaria', 'Veritas', 'Pax', 'Halo', 'Haven']
  },
  'Gnome': {
    'Male': ['Boddynock', 'Dimble', 'Fonkin', 'Gerbo', 'Gimble', 'Jebeddo', 'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Zook'],
    'Female': ['Bimpnottin', 'Breena', 'Caramip', 'Donella', 'Duvamil', 'Ella', 'Ellywick', 'Lilli', 'Loopmottin', 'Roywyn', 'Tana'],
    'Non-binary': ['Glim', 'Kellen', 'Fiddle', 'Pip', 'Spark', 'Tock', 'Quill', 'Widget', 'Finch']
  }
};

export const FIRST_NAMES: Record<CharacterRace, string[]> = {
  'Human': [
    'Alden', 'Baelor', 'Cassian', 'Darius', 'Elysia', 'Gawain', 'Helena', 'Isolde',
    'Jareth', 'Kaelen', 'Leofric', 'Morgath', 'Nesta', 'Oswin', 'Rowan', 'Valen',
    'Thorne', 'Althea', 'Corwin', 'Morrigan', 'Theron', 'Gwendolyn', 'Cedric', 'Brianne'
  ],
  'High Elf': [
    'Aeldir', 'Aerith', 'Caelynn', 'Elora', 'Faenor', 'Galadhel', 'Ilyndra', 'Laurelin',
    'Maelor', 'Nimrodel', 'Quelanna', 'Sylas', 'Theren', 'Valariel', 'Zephyrion', 'Astraea',
    'Caelum', 'Faelivrin', 'Ilphrin', 'Silvyr', 'Vespera', 'Eryndor', 'Lyariel', 'Thalor'
  ],
  'Wood Elf': [
    'Bramble', 'Caelan', 'Duskwood', 'Fawn', 'Garrick', 'Hawthorne', 'Kaelis', 'Lirien',
    'Moriel', 'Oaklyn', 'Rowan', 'Silas', 'Tarkon', 'Willow', 'Ysolde', 'Brier',
    'Corin', 'Emberlyn', 'Fenric', 'Moss', 'Sylvane', 'Talon', 'Briar', 'Kaelen'
  ],
  'Mountain Dwarf': [
    'Balin', 'Balgor', 'Brakka', 'Dain', 'Durin', 'Gimrik', 'Harbek', 'Kragan',
    'Morgran', 'Orsik', 'Rurik', 'Thorgar', 'Torvald', 'Ulfgar', 'Vondal', 'Brunhild',
    'Dagmar', 'Helga', 'Kaelin', 'Mardred', 'Thora', 'Bofur', 'Gror', 'Skalgar'
  ],
  'Dragonborn': [
    'Arjhan', 'Balasar', 'Bharash', 'Donaar', 'Ghesh', 'Heskan', 'Kriv', 'Medrash',
    'Nadarr', 'Patrin', 'Rhogar', 'Shamash', 'Shedinn', 'Tarhun', 'Torinn', 'Vraka',
    'Akra', 'Biri', 'Daar', 'Harann', 'Kava', 'Mishann', 'Nala', 'Surina'
  ],
  'Tiefling': [
    'Akmenos', 'Amnon', 'Barakas', 'Damakos', 'Ekemon', 'Iados', 'Kairon', 'Leucis',
    'Melech', 'Mordai', 'Nirikos', 'Pelaios', 'Skamos', 'Therai', 'Criella', 'Damaia',
    'Kallista', 'Lerissa', 'Makaria', 'Nemeia', 'Orianna', 'Phelaia', 'Rieta', 'Vesper'
  ],
  'Halfling': [
    'Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret',
    'Lindal', 'Lyle', 'Merric', 'Milo', 'Osborn', 'Perrin', 'Reed', 'Roscoe',
    'Wellby', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia'
  ],
  'Orc': [
    'Brak', 'Dench', 'Feng', 'Gell', 'Henk', 'Holg', 'Imsh', 'Keth',
    'Kragk', 'Mhurren', 'Ront', 'Shump', 'Thokk', 'Ugor', 'Vorn', 'Baggi',
    'Emen', 'Engong', 'Kansif', 'Myev', 'Neega', 'Ovak', 'Ownka', 'Shautha'
  ],
  'Aasimar': [
    'Azariel', 'Cassiel', 'Gabriel', 'Hadriel', 'Jaelen', 'Mikael', 'Nuriel', 'Raziel',
    'Sariel', 'Uriel', 'Zadkiel', 'Celestia', 'Elysium', 'Lumiel', 'Seraphina', 'Veritas',
    'Dawn', 'Hope', 'Justice', 'Patience', 'Radiance', 'Solaria', 'Aurelius', 'Valora'
  ],
  'Gnome': [
    'Boddynock', 'Dimble', 'Fonkin', 'Gerbo', 'Gimble', 'Glim', 'Jebeddo', 'Kellen',
    'Namfoodle', 'Orryn', 'Roondar', 'Seebo', 'Sindri', 'Warryn', 'Zook', 'Bimpnottin',
    'Breena', 'Caramip', 'Donella', 'Duvamil', 'Ella', 'Ellywick', 'Lilli', 'Loopmottin'
  ]
};

export interface RaceInfluence {
  name: CharacterRace;
  lore: string;
  healthMod: number;
  manaMod: number;
  strengthMod: number;
  intelligenceMod: number;
  charismaMod: number;
}

export const RACE_STAT_INFLUENCES: Record<CharacterRace, RaceInfluence> = {
  'Human': {
    name: 'Human',
    lore: 'Versatile and ambitious, adapting to any alchemical crucible.',
    healthMod: 10,
    manaMod: 10,
    strengthMod: 2,
    intelligenceMod: 2,
    charismaMod: 2,
  },
  'High Elf': {
    name: 'High Elf',
    lore: 'Ancient scholars attuned to astral mana and primeval runes.',
    healthMod: 0,
    manaMod: 35,
    strengthMod: -1,
    intelligenceMod: 4,
    charismaMod: 2,
  },
  'Wood Elf': {
    name: 'Wood Elf',
    lore: 'Agile forest sentinels with swift reflexes and wilderness lore.',
    healthMod: 15,
    manaMod: 20,
    strengthMod: 1,
    intelligenceMod: 1,
    charismaMod: 1,
  },
  'Mountain Dwarf': {
    name: 'Mountain Dwarf',
    lore: 'Unbreakable constitution, stalwart physical might, and dense stone bones.',
    healthMod: 35,
    manaMod: -10,
    strengthMod: 4,
    intelligenceMod: 0,
    charismaMod: -1,
  },
  'Dragonborn': {
    name: 'Dragonborn',
    lore: 'Draconic lineage bearing formidable martial fury and regal presence.',
    healthMod: 25,
    manaMod: 15,
    strengthMod: 4,
    intelligenceMod: 0,
    charismaMod: 3,
  },
  'Tiefling': {
    name: 'Tiefling',
    lore: 'Infernal heritage wielding uncanny occult arcana and bewitching charisma.',
    healthMod: 5,
    manaMod: 30,
    strengthMod: 0,
    intelligenceMod: 3,
    charismaMod: 4,
  },
  'Halfling': {
    name: 'Halfling',
    lore: 'Deceptively light of foot, possessing fearless optimism and social wit.',
    healthMod: 5,
    manaMod: 15,
    strengthMod: -2,
    intelligenceMod: 1,
    charismaMod: 4,
  },
  'Orc': {
    name: 'Orc',
    lore: 'Primal berserker physique boasting peerless muscle and ferocious endurance.',
    healthMod: 45,
    manaMod: -20,
    strengthMod: 6,
    intelligenceMod: -2,
    charismaMod: 0,
  },
  'Aasimar': {
    name: 'Aasimar',
    lore: 'Celestial scions touched by divine radiance and authoritative grace.',
    healthMod: 20,
    manaMod: 30,
    strengthMod: 1,
    intelligenceMod: 2,
    charismaMod: 5,
  },
  'Gnome': {
    name: 'Gnome',
    lore: 'Inquisitive alchemical minds harboring brilliant intellect and arcane zest.',
    healthMod: -5,
    manaMod: 30,
    strengthMod: -2,
    intelligenceMod: 5,
    charismaMod: 2,
  },
};

export const SURNAMES: string[] = [
  'Ironbreaker', 'Shadowveil', 'Stormcaller', 'Starfall', 'Bloodsworn',
  'Frostborne', 'Silverstrand', 'Moonwhisper', 'Fireheart', 'Runechaser',
  'Gloomweaver', 'Dawnstrider', 'Oakenshield', 'Swiftblade', 'Drakesbane',
  'Deepdelver', 'Nightbreeze', 'Sunseeker', 'Thundergale', 'Voidwalker',
  'Emberfall', 'Crowmantle', 'Blackthorn', 'Goldencrest', 'Wildrunner',
  'Grimjaw', 'Duskwalker', 'Winterglen', 'Brightforge', 'Soulreaver'
];

export const TITLES: string[] = [
  'the Valiant', 'the Arcane', 'the Shadow Walker', 'the Unbroken',
  'the Oathkeeper', 'of the Silver Dawn', 'the Spellweaver', 'the Cunning',
  'the Shield of Iron', 'the Silent Blade', 'the Starbound', 'the Cleaver',
  'the Wandering Sage', 'the Storm-Born', 'the Flame Keeper', 'the Warden',
  'the Relentless', 'of the Ashen Wastes', 'the Lionhearted', 'the Forsaken'
];

export interface ClassDefinition {
  name: CharacterClassType;
  subclasses: string[];
  hitDie: number;
  armorClassBase: number;
  primaryStat: 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';
  weapons: string[];
  secondaryItems: string[];
  abilities: string[];
  themeColor: string;
  accentColor: string;
  iconName: string;
  portraitPath: string;
}

export const CLASSES: Record<CharacterClassType, ClassDefinition> = {
  'Warrior': {
    name: 'Warrior',
    subclasses: ['Battlemaster', 'Champion Knight', 'Berserker', 'Shield Warden', 'Warlord', 'Eldritch Knight'],
    hitDie: 10,
    armorClassBase: 16,
    primaryStat: 'strength',
    weapons: [
      'Gilded Runic Zweihänder', 'Engraved Steel Bastard Sword & Crest Shield',
      'Twin Damascus Battleaxes', 'Dragonbone Halberd', 'Meteor-Forged War Pick'
    ],
    secondaryItems: ['Polished Plate Pauldron', 'Oathbound Standard', 'Whetstone of Sharpness', 'Iron Flask of Spirits'],
    abilities: ['Second Wind & Cleave', 'Shield Slam & Fortify', 'Indomitable Battlecry', 'Whirlwind Slash'],
    themeColor: 'from-amber-950 via-stone-900 to-stone-950',
    accentColor: '#f59e0b',
    iconName: 'Shield',
    portraitPath: '/src/assets/images/fantasy_hero_warrior_1794215530398.jpg'
  },
  'Mage': {
    name: 'Mage',
    subclasses: ['Arcanist', 'Elementalist of Cinders', 'Chronomancer', 'Abjuration Scholar', 'Nethermancer'],
    hitDie: 6,
    armorClassBase: 12,
    primaryStat: 'intelligence',
    weapons: [
      'Starlight Sapphire Staff', 'Codex of Primeval Runes',
      'Wand of Prismatic Spark', 'Floating Obsidian Orbs', 'Crystal Focus Athame'
    ],
    secondaryItems: ['Vial of Mercurial Mana', 'Hourglass of Stolen Time', 'Astrolabe of the Outer Astral', 'Rune-Stitched Grimoire'],
    abilities: ['Arcane Singularity', 'Chain Lightning Storm', 'Temporal Displacement', 'Prismatic Aegis'],
    themeColor: 'from-blue-950 via-indigo-950 to-stone-950',
    accentColor: '#38bdf8',
    iconName: 'Sparkles',
    portraitPath: '/src/assets/images/fantasy_hero_mage_1794215530533.jpg'
  },
  'Rogue': {
    name: 'Rogue',
    subclasses: ['Shadow Assassin', 'Phantom Thief', 'Swashbuckler', 'Whisper Spy', 'Acrobat of the Veils'],
    hitDie: 8,
    armorClassBase: 14,
    primaryStat: 'dexterity',
    weapons: [
      'Pair of Shadow-Tempered Daggers', 'Silent Nightshade Hand Crossbow',
      'Silver Serrated Rapier', 'Venomous Stiletto & Smoke Bombs'
    ],
    secondaryItems: ['Masterwork Thieves Tools', 'Grappling Hook & Silk Line', 'Vial of Wyvern Venom', 'Ring of Feather Fall'],
    abilities: ['Shadow Step Ambush', 'Poisoned Flourish', 'Smoke Screen Vanish', 'Flurry of Throwing Daggers'],
    themeColor: 'from-emerald-950 via-stone-900 to-stone-950',
    accentColor: '#34d399',
    iconName: 'Zap',
    portraitPath: '/src/assets/images/fantasy_hero_rogue_1794215530672.jpg'
  },
  'Ranger': {
    name: 'Ranger',
    subclasses: ['Gloomstalker', 'Beastmaster', 'Hunter of Wyrms', 'Horizon Walker'],
    hitDie: 10,
    armorClassBase: 15,
    primaryStat: 'dexterity',
    weapons: [
      'Heartwood Recurve Greatbow', 'Twin Moonlit Scimitars',
      'Heavy Crossbow with Barbed Bolts', 'Hunting Spear & Net'
    ],
    secondaryItems: ['Quiver of Endless Thorns', 'Herbalist Poultice Pouch', 'Whistle of Wild Calling', 'Survivalist Flint & Map'],
    abilities: ['Hail of Piercing Arrows', 'Predator Camouflage', 'Mark of the Hunted', 'Animal Companion Strike'],
    themeColor: 'from-green-950 via-emerald-950 to-stone-950',
    accentColor: '#4ade80',
    iconName: 'Compass',
    portraitPath: '/src/assets/images/fantasy_hero_rogue_1794215530672.jpg'
  },
  'Cleric': {
    name: 'Cleric',
    subclasses: ['Life Domain High Priest', 'War Warpriest', 'Light Illuminator', 'Tempest Herald'],
    hitDie: 8,
    armorClassBase: 16,
    primaryStat: 'wisdom',
    weapons: [
      'Sun-Embossed Flanged Mace', 'Gilded Holy Warhammer',
      'Radiant Scepter of Dawn', 'Silver Censer Flail'
    ],
    secondaryItems: ['Amulet of the Sunfather', 'Sanctified Holy Water', 'Embroidered Prayer Stole', 'Incense of Wardship'],
    abilities: ['Divine Radiance Blast', 'Channel Divinity: Preservation', 'Sanctuary Ward', 'Holy Smite Wave'],
    themeColor: 'from-amber-950 via-yellow-950 to-stone-950',
    accentColor: '#fbbf24',
    iconName: 'Sun',
    portraitPath: '/src/assets/images/fantasy_hero_warrior_1794215530398.jpg'
  },
  'Paladin': {
    name: 'Paladin',
    subclasses: ['Oath of Vengeance', 'Oath of Devotion', 'Oath of the Ancients', 'Oath of Redemption'],
    hitDie: 10,
    armorClassBase: 18,
    primaryStat: 'strength',
    weapons: [
      'Blessed Greatsword of Truth', 'Halberd of the Radiant Host',
      'Sunforged Longsword & Tower Shield'
    ],
    secondaryItems: ['Sacred Relic Reliquary', 'Knightly War Horn', 'Vial of Anointing Oil', 'Ironclad Gauntlets of Grace'],
    abilities: ['Divine Smite', 'Lay on Hands & Purify', 'Aura of Courage', 'Holy Wrath Verdict'],
    themeColor: 'from-amber-950 via-orange-950 to-stone-950',
    accentColor: '#f97316',
    iconName: 'ShieldAlert',
    portraitPath: '/src/assets/images/fantasy_hero_warrior_1794215530398.jpg'
  },
  'Druid': {
    name: 'Druid',
    subclasses: ['Circle of the Moon', 'Circle of Spores', 'Circle of Stars', 'Circle of the Land'],
    hitDie: 8,
    armorClassBase: 13,
    primaryStat: 'wisdom',
    weapons: [
      'Ironwood Staff of Blossoms', 'Scythe of the Solstice',
      'Obsidian Sickle & Wooden Buckler'
    ],
    secondaryItems: ['Pouch of Rare Mistletoe', 'Totem of the Timber Wolf', 'Vial of Dew from the First Spring'],
    abilities: ['Wild Shape Metamorphosis', 'Entangling Bramble Surge', 'Starry Form Astral Gaze', 'Healing Bloom'],
    themeColor: 'from-teal-950 via-emerald-950 to-stone-950',
    accentColor: '#2dd4bf',
    iconName: 'TreePine',
    portraitPath: '/src/assets/images/fantasy_hero_mage_1794215530533.jpg'
  },
  'Bard': {
    name: 'Bard',
    subclasses: ['College of Lore', 'College of Swords', 'College of Glamour', 'College of Whispers'],
    hitDie: 8,
    armorClassBase: 14,
    primaryStat: 'charisma',
    weapons: [
      'Dragon-Gut Strung Lute & Rapier', 'Gilded Dueling Foil',
      'Carved Flute with Concealed Blade'
    ],
    secondaryItems: ['Book of Unwritten Epics', 'Disguise Kit of the Courtier', 'Perfume of Enthrallment'],
    abilities: ['Cutting Words & Mockery', 'Bardic Inspiration Chorus', 'Mesmerizing Serenade', 'Dissonant Whisper'],
    themeColor: 'from-purple-950 via-fuchsia-950 to-stone-950',
    accentColor: '#c084fc',
    iconName: 'Music',
    portraitPath: '/src/assets/images/fantasy_hero_rogue_1794215530672.jpg'
  },
  'Warlock': {
    name: 'Warlock',
    subclasses: ['Pact of the Fiend', 'Great Old One Emissary', 'Archfey Courtier', 'Hexblade Champion'],
    hitDie: 8,
    armorClassBase: 13,
    primaryStat: 'charisma',
    weapons: [
      'Pactblade of Nether Steel', 'Tome of Eldritch Shadows',
      'Rod of the Hellish Gate'
    ],
    secondaryItems: ['Eye of an Abyssal Kraken in Amber', 'Black Velvet Spell Pouch', 'Contract Signed in Blood'],
    abilities: ['Eldritch Blast Barrage', 'Armor of Agathys Frost', 'Hellish Rebuke Ignition', 'Otherworldly Step'],
    themeColor: 'from-violet-950 via-stone-900 to-stone-950',
    accentColor: '#a855f7',
    iconName: 'Eye',
    portraitPath: '/src/assets/images/fantasy_hero_mage_1794215530533.jpg'
  },
  'Monk': {
    name: 'Monk',
    subclasses: ['Way of the Open Hand', 'Way of Shadow', 'Way of the Four Elements', 'Way of the Kensei'],
    hitDie: 8,
    armorClassBase: 15,
    primaryStat: 'dexterity',
    weapons: [
      'Disciplined Quarterstaff & Bare Fists', 'Twin Kamas of the Wind',
      'Nunchaku of Bound Ironwood'
    ],
    secondaryItems: ['Prayer Beads of Meditation', 'Simple Linen Wraps', 'Flask of Mountain Spring Brew'],
    abilities: ['Flurry of Blows', 'Stunning Ki Strike', 'Deflect Missiles & Counter', 'Step of the Wind'],
    themeColor: 'from-stone-900 via-amber-950 to-stone-950',
    accentColor: '#fb923c',
    iconName: 'Flame',
    portraitPath: '/src/assets/images/fantasy_hero_warrior_1794215530398.jpg'
  }
};

export const ORIGIN_REALMS: string[] = [
  'The High Citadel of Sunken Stars',
  'Ironpeak Deep Dwarven Hold',
  'Mistwood Primeval Enclave',
  'Ashen Dunes of Kor-Drakor',
  'Vales of Royal Aethelgard',
  'The Floating Islands of Zephyria',
  'The Abyssal Rift of Morbith',
  'Glimmerport Harbor & The Free Isles',
  'The Whispering Spire of Elenor',
  'Underforge of the Molten Core',
  'Shadowfen Moorlands',
  'The Emerald Glades of Sylvancrest'
];

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

export const BACKSTORY_TEMPLATES: ((char: { name: string; race: string; class: string; realm: string; weapon: string }) => string)[] = [
  ({ name, race, class: cls, realm, weapon }) => 
    `Born in ${realm}, ${name} swore a solemn oath after their homeland was threatened. Wielding their ${weapon}, this ${race} ${cls} travels across kingdoms to dismantle ancient conspiracies and forge their own destiny.`,
  ({ name, race, class: cls, realm, weapon }) => 
    `A legendary wanderer hailed from ${realm}, ${name} spent decades mastering the arts of the ${cls}. Armed with ${weapon}, they seek lost relics of the First Age while defending the vulnerable from encroaching darkness.`,
  ({ name, race, class: cls, realm, weapon }) => 
    `Cast out of ${realm} for uncovering a forgotten forbidden truth, ${name} has become one of the most formidable ${cls}s of their era. With ${weapon} in hand, no monster or tyrant can rest easy.`,
  ({ name, race, class: cls, realm, weapon }) => 
    `Trained in secret beneath the skies of ${realm}, ${name} is an enigmatic ${race} whose loyalty lies not with crowns, but with honor. Their mastery over the ${weapon} is whispered in taverns across every continent.`,
  ({ name, race, class: cls, realm, weapon }) => 
    `Survivors of the cataclysm at ${realm} still remember the day ${name} stood alone against the horde. Now a celebrated ${cls}, their ${weapon} bears the scars of countless victories won against impossible odds.`
];
