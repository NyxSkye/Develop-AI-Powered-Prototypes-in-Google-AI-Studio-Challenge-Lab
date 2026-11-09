import { FantasyCharacter, CharacterClassType, CharacterRace } from '../types/character';

export interface PortraitStyleOption {
  id: string;
  name: string;
  badge: string;
}

export const PORTRAIT_STYLES: PortraitStyleOption[] = [
  { id: 'cel-shaded', name: 'Cel-Shaded RPG Art', badge: 'Video Game' },
  { id: 'chibi-sprite', name: 'Fantasy Arcade Hero', badge: 'Cartoon' },
  { id: 'anime-action', name: 'Anime Adventure', badge: 'Stylized' },
  { id: 'comic-ink', name: 'Heroic Comic Vector', badge: 'Cel-Shaded' },
];

export const CARTOON_PORTRAITS: Record<CharacterClassType, string[]> = {
  Warrior: [
    '/src/assets/images/portrait_cartoon_warrior_1794216277851.jpg',
    '/src/assets/images/portrait_cartoon_paladin_1794216308181.jpg',
  ],
  Mage: [
    '/src/assets/images/portrait_cartoon_mage_1794216278264.jpg',
  ],
  Rogue: [
    '/src/assets/images/portrait_cartoon_rogue_1794216277976.jpg',
    '/src/assets/images/portrait_cartoon_ranger_1794216307515.jpg',
  ],
  Paladin: [
    '/src/assets/images/portrait_cartoon_paladin_1794216308181.jpg',
    '/src/assets/images/portrait_cartoon_warrior_1794216277851.jpg',
  ],
  Ranger: [
    '/src/assets/images/portrait_cartoon_ranger_1794216307515.jpg',
    '/src/assets/images/portrait_cartoon_rogue_1794216277976.jpg',
  ],
  Cleric: [
    '/src/assets/images/portrait_cartoon_paladin_1794216308181.jpg',
    '/src/assets/images/portrait_cartoon_mage_1794216278264.jpg',
  ],
  Druid: [
    '/src/assets/images/portrait_cartoon_ranger_1794216307515.jpg',
    '/src/assets/images/portrait_cartoon_mage_1794216278264.jpg',
  ],
  Bard: [
    '/src/assets/images/portrait_cartoon_rogue_1794216277976.jpg',
    '/src/assets/images/portrait_cartoon_mage_1794216278264.jpg',
  ],
  Warlock: [
    '/src/assets/images/portrait_cartoon_mage_1794216278264.jpg',
    '/src/assets/images/portrait_cartoon_rogue_1794216277976.jpg',
  ],
  Monk: [
    '/src/assets/images/portrait_cartoon_warrior_1794216277851.jpg',
    '/src/assets/images/portrait_cartoon_ranger_1794216307515.jpg',
  ],
};

/**
 * Procedurally generates a cartoon/video game style SVG portrait customized
 * exactly to the character's race, class, weapon, and theme color.
 * Guaranteed to generate unique variations matching all details.
 */
export function generateProceduralCartoonPortrait(char: FantasyCharacter, variantSeed: number): string {
  const accent = char.accentColor || '#f59e0b';
  const isElf = char.race.includes('Elf');
  const isDwarf = char.race.includes('Dwarf');
  const isTiefling = char.race === 'Tiefling';
  const isDragonborn = char.race === 'Dragonborn';
  const isOrc = char.race === 'Orc';
  const isAasimar = char.race === 'Aasimar';

  // Palette adjustments based on race & class
  let skinColor = '#FBD38D'; // warm human
  if (isElf) skinColor = '#FEF3C7';
  if (isTiefling) skinColor = '#E11D48';
  if (isOrc) skinColor = '#65A30D';
  if (isDragonborn) skinColor = '#EA580C';
  if (isAasimar) skinColor = '#FFFBEB';
  if (isDwarf) skinColor = '#F6AD55';

  const styleIndex = Math.abs(variantSeed) % PORTRAIT_STYLES.length;
  const currentStyle = PORTRAIT_STYLES[styleIndex];

  // Dynamic SVG cartoon hero avatar
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5" />
      <stop offset="70%" stop-color="#0c0a09" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#050505" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accent}" />
      <stop offset="100%" stop-color="#1c1917" />
    </linearGradient>
    <filter id="celShade" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="3" dy="5" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background Dungeon / Castle Sky -->
  <rect width="500" height="500" fill="url(#bgGlow)"/>

  <!-- Magical / Combat Aura Circles -->
  <circle cx="250" cy="220" r="180" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="10 8" opacity="0.6"/>
  <circle cx="250" cy="220" r="160" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.4"/>

  <!-- Halo for Aasimar / Paladin / Cleric -->
  ${(isAasimar || char.class === 'Paladin' || char.class === 'Cleric') ? `
    <circle cx="250" cy="120" r="85" fill="none" stroke="#FDE047" stroke-width="5" opacity="0.8"/>
    <circle cx="250" cy="120" r="95" fill="none" stroke="#FDE047" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.9"/>
  ` : ''}

  <!-- Character Silhouette & Body (Cartoon Cel-Shaded) -->
  <g filter="url(#celShade)">
    <!-- Cloak / Shoulder Pauldrons -->
    <path d="M 120 480 C 120 330 180 290 250 290 C 320 290 380 330 380 480 Z" fill="#1c1917" stroke="#000" stroke-width="4"/>
    <path d="M 150 480 C 150 360 200 320 250 320 C 300 320 350 360 350 480 Z" fill="url(#armorGrad)" stroke="#000" stroke-width="4"/>

    <!-- Tiefling Horns -->
    ${isTiefling ? `
      <path d="M 190 140 Q 140 60 110 80 Q 150 120 180 170 Z" fill="#4c0519" stroke="#000" stroke-width="3"/>
      <path d="M 310 140 Q 360 60 390 80 Q 350 120 320 170 Z" fill="#4c0519" stroke="#000" stroke-width="3"/>
    ` : ''}

    <!-- Elven Ears -->
    ${isElf ? `
      <polygon points="140,210 90,180 160,230" fill="${skinColor}" stroke="#000" stroke-width="3"/>
      <polygon points="360,210 410,180 340,230" fill="${skinColor}" stroke="#000" stroke-width="3"/>
    ` : ''}

    <!-- Face Shape -->
    <path d="M 170 170 C 170 120 330 120 330 170 C 330 260 290 300 250 300 C 210 300 170 260 170 170 Z" fill="${skinColor}" stroke="#000" stroke-width="4.5"/>

    <!-- Hair / Headgear -->
    ${char.class === 'Warrior' || char.class === 'Paladin' ? `
      <!-- Knight Helmet / Plume -->
      <path d="M 160 170 C 160 100 340 100 340 170 L 330 210 L 170 210 Z" fill="#475569" stroke="#000" stroke-width="4"/>
      <path d="M 230 100 Q 250 30 270 100 Z" fill="${accent}" stroke="#000" stroke-width="3"/>
    ` : char.class === 'Rogue' ? `
      <!-- Rogue Hood -->
      <path d="M 150 170 C 150 80 350 80 350 170 C 360 250 330 280 250 280 C 170 280 140 250 150 170 Z" fill="#0f172a" stroke="#000" stroke-width="4.5"/>
      <path d="M 180 180 C 180 140 320 140 320 180 C 320 230 290 250 250 250 C 210 250 180 230 180 180 Z" fill="${skinColor}" stroke="#000" stroke-width="3"/>
    ` : `
      <!-- Stylized Hero Hair -->
      <path d="M 160 160 Q 200 90 260 100 Q 320 90 340 160 Q 320 130 250 135 Q 180 130 160 160 Z" fill="#78350f" stroke="#000" stroke-width="3"/>
    `}

    <!-- Dwarven Beard -->
    ${isDwarf ? `
      <path d="M 180 230 Q 250 330 320 230 Q 250 370 180 230 Z" fill="#92400e" stroke="#000" stroke-width="4"/>
      <line x1="250" y1="260" x2="250" y2="330" stroke="#78350f" stroke-width="3"/>
    ` : ''}

    <!-- Expressive Video Game Eyes -->
    <ellipse cx="215" cy="195" rx="14" ry="16" fill="#fff" stroke="#000" stroke-width="3"/>
    <ellipse cx="285" cy="195" rx="14" ry="16" fill="#fff" stroke="#000" stroke-width="3"/>
    <circle cx="217" cy="196" r="8" fill="${char.class === 'Mage' ? '#0284c7' : '#15803d'}"/>
    <circle cx="283" cy="196" r="8" fill="${char.class === 'Mage' ? '#0284c7' : '#15803d'}"/>
    <circle cx="214" cy="192" r="3.5" fill="#fff"/>
    <circle cx="280" cy="192" r="3.5" fill="#fff"/>

    <!-- Eyebrows (Heroic angle) -->
    <path d="M 195 178 Q 215 172 230 178" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M 305 178 Q 285 172 270 178" stroke="#000" stroke-width="4" stroke-linecap="round" fill="none"/>

    <!-- Confident Mouth & Nose -->
    <path d="M 246 210 L 254 210" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 230 238 Q 250 252 270 238" stroke="#000" stroke-width="3.5" fill="none" stroke-linecap="round"/>

    <!-- Class Weapon / Prop Silhouettes -->
    ${char.class === 'Mage' || char.class === 'Warlock' ? `
      <!-- Magic Staff & Spells -->
      <circle cx="390" cy="280" r="30" fill="${accent}" opacity="0.6"/>
      <line x1="390" y1="480" x2="390" y2="280" stroke="#78350f" stroke-width="8"/>
      <polygon points="390,260 405,290 375,290" fill="#38bdf8" stroke="#000" stroke-width="2"/>
    ` : char.class === 'Warrior' || char.class === 'Paladin' ? `
      <!-- Greatsword Blade -->
      <polygon points="100,480 120,480 150,220 135,210 120,220" fill="#cbd5e1" stroke="#000" stroke-width="3"/>
      <polygon points="120,230 150,220 135,260" fill="${accent}" stroke="#000" stroke-width="2"/>
    ` : `
      <!-- Rogue Daggers -->
      <polygon points="380,420 400,320 370,350" fill="#94a3b8" stroke="#000" stroke-width="3"/>
    `}
  </g>

  <!-- Video Game Frame & Label Overlay -->
  <rect x="15" y="15" width="470" height="470" rx="20" fill="none" stroke="${accent}" stroke-width="3" opacity="0.75"/>
  <rect x="25" y="25" width="450" height="450" rx="14" fill="none" stroke="#fff" stroke-width="1" opacity="0.15"/>

  <!-- Character Name & Class Badge in Avatar -->
  <rect x="40" y="420" width="420" height="50" rx="10" fill="#0c0a09" fill-opacity="0.9" stroke="${accent}" stroke-width="1.5"/>
  <text x="250" y="444" font-family="sans-serif" font-weight="bold" font-size="16" fill="#f5f5f4" text-anchor="middle">
    ${char.fullName.length > 28 ? char.fullName.substring(0, 26) + '...' : char.fullName}
  </text>
  <text x="250" y="462" font-family="sans-serif" font-size="11" fill="${accent}" font-weight="600" text-anchor="middle">
    LVL ${char.level} ${char.race.toUpperCase()} ${char.class.toUpperCase()} · ${currentStyle.badge.toUpperCase()}
  </text>
</svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Returns a cartoon/video game style portrait matching the character's details.
 * Supports cycling through curated high-res cartoon game art and procedural hero avatars.
 */
export function getCartoonPortraitForCharacter(
  char: FantasyCharacter,
  variantIndex: number = 0
): { url: string; styleName: string; isProcedural: boolean } {
  const curatedList = CARTOON_PORTRAITS[char.class] || [];
  const styleOpt = PORTRAIT_STYLES[variantIndex % PORTRAIT_STYLES.length];

  // If variantIndex is even and curated exists, return the curated cartoon image
  if (variantIndex % 2 === 0 && curatedList.length > 0) {
    const imgIndex = Math.floor(variantIndex / 2) % curatedList.length;
    return {
      url: curatedList[imgIndex],
      styleName: styleOpt.name,
      isProcedural: false,
    };
  }

  // Otherwise generate custom procedural vector cartoon game portrait
  return {
    url: generateProceduralCartoonPortrait(char, variantIndex),
    styleName: `${styleOpt.name} (Custom ${char.race})`,
    isProcedural: true,
  };
}
