export type CharacterClassType = 
  | 'Warrior' 
  | 'Mage' 
  | 'Rogue' 
  | 'Ranger' 
  | 'Cleric' 
  | 'Paladin' 
  | 'Druid' 
  | 'Bard' 
  | 'Warlock' 
  | 'Monk';

export type CharacterRace = 
  | 'Human' 
  | 'High Elf' 
  | 'Wood Elf' 
  | 'Mountain Dwarf' 
  | 'Dragonborn' 
  | 'Tiefling' 
  | 'Halfling' 
  | 'Orc' 
  | 'Aasimar' 
  | 'Gnome';

export type CharacterRarity = 
  | 'Common' 
  | 'Rare' 
  | 'Epic' 
  | 'Legendary';

export type CharacterGender = 
  | 'Male' 
  | 'Female' 
  | 'Non-binary';

export type Alignment = 
  | 'Lawful Good' 
  | 'Neutral Good' 
  | 'Chaotic Good' 
  | 'Lawful Neutral' 
  | 'True Neutral' 
  | 'Chaotic Neutral' 
  | 'Lawful Evil' 
  | 'Neutral Evil' 
  | 'Chaotic Evil';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  fullName: string;
  class: CharacterClassType;
  subclass: string;
  race: CharacterRace;
  rarity: CharacterRarity;
  gender: CharacterGender;
  alignment: Alignment;
  level: number;
  health: number;
  mana: number;
  strength: number;
  intelligence: number;
  charisma: number;
  hp: number;
  armorClass: number;
  stats: CharacterStats;
  signatureWeapon: string;
  secondaryItem: string;
  specialAbility: string;
  originRealm: string;
  backstory: string;
  portraitUrl?: string;
  customPortraitUrl?: string;
  portraitStyle?: string;
  portraitSeed?: number;
  themeColor: string;
  accentColor: string;
  timestamp: number;
}
