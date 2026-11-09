import {
  CharacterClassType,
  CharacterRace,
  FantasyCharacter,
  CharacterStats
} from '../types/character';
import {
  FIRST_NAMES,
  SURNAMES,
  TITLES,
  CLASSES,
  ORIGIN_REALMS,
  ALIGNMENTS,
  BACKSTORY_TEMPLATES
} from '../data/fantasyData';

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function rollD20Stat(isPrimary: boolean = false): number {
  // Roll 4d6 drop lowest
  const rolls = [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
  ];
  rolls.sort((a, b) => a - b);
  const total = rolls[1] + rolls[2] + rolls[3];
  
  // Ensure primary stat is heroic (at least 14)
  if (isPrimary && total < 14) {
    return 14 + Math.floor(Math.random() * 5); // 14 to 18
  }
  return total;
}

export function getStatModifier(statValue: number): string {
  const mod = Math.floor((statValue - 10) / 2);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function generateRandomCharacter(options?: {
  lockedClass?: CharacterClassType | null;
  lockedRace?: CharacterRace | null;
}): FantasyCharacter {
  const availableClasses = Object.keys(CLASSES) as CharacterClassType[];
  const selectedClassType = options?.lockedClass || getRandomElement(availableClasses);
  const classDef = CLASSES[selectedClassType];

  const availableRaces: CharacterRace[] = [
    'Human', 'High Elf', 'Wood Elf', 'Mountain Dwarf',
    'Dragonborn', 'Tiefling', 'Halfling', 'Orc', 'Aasimar', 'Gnome'
  ];
  const selectedRace = options?.lockedRace || getRandomElement(availableRaces);

  // Generate unique name
  const firstName = getRandomElement(FIRST_NAMES[selectedRace]);
  const surname = getRandomElement(SURNAMES);
  const title = getRandomElement(TITLES);

  // Vary name format: 40% First + Surname, 30% First + Title, 30% First + Surname + Title
  const nameStyleRoll = Math.random();
  let fullName = `${firstName} ${surname}`;
  if (nameStyleRoll < 0.35) {
    fullName = `${firstName} ${title}`;
  } else if (nameStyleRoll < 0.65) {
    fullName = `${firstName} ${surname}`;
  } else {
    fullName = `${firstName} ${surname} ${title}`;
  }

  const subclass = getRandomElement(classDef.subclasses);
  const alignment = getRandomElement(ALIGNMENTS);
  const originRealm = getRandomElement(ORIGIN_REALMS);
  const signatureWeapon = getRandomElement(classDef.weapons);
  const secondaryItem = getRandomElement(classDef.secondaryItems);
  const specialAbility = getRandomElement(classDef.abilities);

  // Generate stats tailored to class archetype
  const stats: CharacterStats = {
    strength: rollD20Stat(classDef.primaryStat === 'strength'),
    dexterity: rollD20Stat(classDef.primaryStat === 'dexterity'),
    constitution: rollD20Stat(classDef.primaryStat === 'constitution'),
    intelligence: rollD20Stat(classDef.primaryStat === 'intelligence'),
    wisdom: rollD20Stat(classDef.primaryStat === 'wisdom'),
    charisma: rollD20Stat(classDef.primaryStat === 'charisma'),
  };

  const level = Math.floor(Math.random() * 6) + 3; // Heroic adventurers levels 3-8
  const conMod = Math.floor((stats.constitution - 10) / 2);
  const hp = (classDef.hitDie + conMod) + (level - 1) * (Math.floor(classDef.hitDie / 2) + 1 + conMod);
  const dexMod = Math.floor((stats.dexterity - 10) / 2);
  const armorClass = classDef.armorClassBase + Math.min(2, Math.max(0, dexMod));

  const backstoryTemplate = getRandomElement(BACKSTORY_TEMPLATES);
  const backstory = backstoryTemplate({
    name: firstName,
    race: selectedRace,
    class: selectedClassType,
    realm: originRealm,
    weapon: signatureWeapon
  });

  return {
    id: `hero-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: firstName,
    title,
    fullName,
    class: selectedClassType,
    subclass,
    race: selectedRace,
    alignment,
    level,
    hp: Math.max(12, hp),
    armorClass,
    stats,
    signatureWeapon,
    secondaryItem,
    specialAbility,
    originRealm,
    backstory,
    portraitUrl: classDef.portraitPath,
    themeColor: classDef.themeColor,
    accentColor: classDef.accentColor,
    timestamp: Date.now()
  };
}
