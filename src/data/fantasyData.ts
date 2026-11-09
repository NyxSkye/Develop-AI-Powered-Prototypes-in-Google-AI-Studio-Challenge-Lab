import { CharacterClassType, CharacterRace, Alignment } from '../types/character';

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
