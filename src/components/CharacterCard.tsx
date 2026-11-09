import React, { useState } from 'react';
import { 
  Shield, Sparkles, Zap, Compass, Sun, ShieldAlert, 
  TreePine, Music, Eye, Flame, Heart, Swords, 
  BookOpen, MapPin, Copy, Check, Bookmark, 
  BookmarkCheck
} from 'lucide-react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { getStatModifier } from '../utils/characterGenerator';
import { CharacterPortrait } from './CharacterPortrait';

interface CharacterCardProps {
  character: FantasyCharacter;
  isSaved: boolean;
  onToggleSave: () => void;
  isRolling: boolean;
  soundEnabled: boolean;
  onUpdatePortrait: (url: string, styleName: string) => void;
}

const CLASS_ICONS: Record<CharacterClassType, React.ElementType> = {
  Warrior: Shield,
  Mage: Sparkles,
  Rogue: Zap,
  Ranger: Compass,
  Cleric: Sun,
  Paladin: ShieldAlert,
  Druid: TreePine,
  Bard: Music,
  Warlock: Eye,
  Monk: Flame,
};

// Alchemical elemental correspondence symbols
const STAT_ALCHEMICAL_SYMBOLS: Record<string, string> = {
  STR: '🜂', // Fire / Strength
  DEX: '🜁', // Air / Agility
  CON: '🜃', // Earth / Constitution
  INT: '☿', // Mercury / Intellect
  WIS: '🜄', // Water / Wisdom
  CHA: '☉', // Sol / Charisma
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSaved,
  onToggleSave,
  isRolling,
  soundEnabled,
  onUpdatePortrait,
}) => {
  const [copied, setCopied] = useState(false);
  const ClassIcon = CLASS_ICONS[character.class] || Swords;

  const handleCopy = () => {
    const textSummary = `
=== 🜚 ${character.fullName.toUpperCase()} 🜚 ===
Class: ${character.class} (${character.subclass})
Race: ${character.race}
Alignment: ${character.alignment}
Level: ${character.level} | HP: ${character.hp} | AC: ${character.armorClass}

-- ALCHEMICAL VITAL ATTRIBUTES --
STR: ${character.stats.strength} (${getStatModifier(character.stats.strength)})
DEX: ${character.stats.dexterity} (${getStatModifier(character.stats.dexterity)})
CON: ${character.stats.constitution} (${getStatModifier(character.stats.constitution)})
INT: ${character.stats.intelligence} (${getStatModifier(character.stats.intelligence)})
WIS: ${character.stats.wisdom} (${getStatModifier(character.stats.wisdom)})
CHA: ${character.stats.charisma} (${getStatModifier(character.stats.charisma)})

-- ARMS & TRANSMUTATIONS --
Signature Weapon: ${character.signatureWeapon}
Secondary Relic: ${character.secondaryItem}
Special Feat: ${character.specialAbility}
Origin Realm: ${character.originRealm}

-- GRIMOIRE CHRONICLE --
${character.backstory}
    `.trim();

    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statItems = [
    { label: 'STR', name: 'Strength', val: character.stats.strength },
    { label: 'DEX', name: 'Dexterity', val: character.stats.dexterity },
    { label: 'CON', name: 'Constitution', val: character.stats.constitution },
    { label: 'INT', name: 'Intelligence', val: character.stats.intelligence },
    { label: 'WIS', name: 'Wisdom', val: character.stats.wisdom },
    { label: 'CHA', name: 'Charisma', val: character.stats.charisma },
  ];

  return (
    <article 
      className={`parchment-card relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-amber-800/50 shadow-2xl transition-all duration-300 ${
        isRolling ? 'opacity-50 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Brass corner brackets on the Grimoire folio */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/80 z-20 pointer-events-none" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/80 z-20 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/80 z-20 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/80 z-20 pointer-events-none" />

      {/* Runic gold foil top rule */}
      <div 
        className="h-1.5 w-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" 
        style={{ backgroundColor: character.accentColor }}
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Top Section: Portrait & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Portrait Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
            {/* Dedicated Character Portrait Image Component with Generate & Regenerate Buttons */}
            <CharacterPortrait
              character={character}
              onUpdatePortrait={onUpdatePortrait}
              isRolling={isRolling}
              soundEnabled={soundEnabled}
            />

            {/* Quick Actions underneath portrait buttons */}
            <div className="flex items-center gap-2 mt-4 w-full max-w-[320px]">
              <button
                onClick={onToggleSave}
                className={`alchemist-slate-btn flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-serif font-medium rounded-xl transition-all cursor-pointer ${
                  isSaved
                    ? 'border-amber-400 text-amber-200 bg-amber-950/80 shadow-inner'
                    : 'text-amber-200/80 hover:text-amber-100'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5 text-amber-500" />}
                <span>{isSaved ? 'In Codex' : 'Bind to Codex'}</span>
              </button>

              <button
                onClick={handleCopy}
                title="Transcribe character details to parchment"
                className="alchemist-slate-btn flex items-center justify-center gap-1.5 py-2.5 px-3.5 text-xs font-serif font-medium text-amber-200/80 hover:text-amber-100 rounded-xl transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                <span>{copied ? 'Inscribed!' : 'Transcribe'}</span>
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            {/* Name & Class Header */}
            <div>
              <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-bold font-mono">
                  {character.race} · {character.class}
                </span>
                <span className="text-xs text-amber-700">·</span>
                <span className="text-xs text-amber-200/70 font-serif italic">{character.subclass}</span>
              </div>

              {/* DISTINCT, STYLIZED FANTASY-STYLE FONT FOR THE CHARACTER'S NAME */}
              <div className="relative group">
                <h1 className="font-['MedievalSharp'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)] leading-tight text-balance">
                  {character.fullName}
                </h1>
                {/* Subtle illuminated alchemical flourish line */}
                <div className="h-0.5 w-32 bg-gradient-to-r from-amber-500/80 to-transparent mt-1.5 rounded-full" />
              </div>

              {/* Zero-Pill Clean Metadata Row styled in ancient ink */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-amber-200/70 font-serif">
                <span>{character.alignment}</span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {character.originRealm}
                </span>
              </div>
            </div>

            {/* Vital Combat Transmutation Crucible Meters */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-950/80 border border-amber-900/50 rounded-xl shadow-inner shadow-stone-950">
              <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-stone-900/60 border border-amber-900/30">
                <span className="text-[10px] uppercase tracking-wider text-amber-400/90 font-serif flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" /> Vitality (HP)
                </span>
                <span className="font-mono text-xl font-bold text-amber-100 tabular-nums mt-0.5">
                  {character.hp}
                </span>
                <span className="text-[10px] text-amber-600 font-serif">Life Force</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-stone-900/60 border border-amber-900/30">
                <span className="text-[10px] uppercase tracking-wider text-amber-400/90 font-serif flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" /> Ward (AC)
                </span>
                <span className="font-mono text-xl font-bold text-amber-100 tabular-nums mt-0.5">
                  {character.armorClass}
                </span>
                <span className="text-[10px] text-amber-600 font-serif">Aegis Rating</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-stone-900/60 border border-amber-900/30">
                <span className="text-[10px] uppercase tracking-wider text-amber-400/90 font-serif flex items-center gap-1">
                  <Swords className="w-3 h-3 text-amber-300" /> Circle Tier
                </span>
                <span className="font-mono text-xl font-bold text-amber-100 tabular-nums mt-0.5">
                  Lvl {character.level}
                </span>
                <span className="text-[10px] text-amber-600 font-serif">Adept Rank</span>
              </div>
            </div>

            {/* 6 Core Alchemical Elemental Attributes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-300/80 border-b border-amber-900/40 pb-1.5 font-serif">
                <span className="font-semibold flex items-center gap-1.5">
                  <span>Elemental Matrix</span>
                  <span className="text-amber-600 text-xs select-none">🜁 🜂 🜃 🜄</span>
                </span>
                <span className="text-[11px] text-amber-500/80 font-mono">d20 Modifiers</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {statItems.map((st) => {
                  const mod = getStatModifier(st.val);
                  const alchemicalGlyph = STAT_ALCHEMICAL_SYMBOLS[st.label] || '🜚';
                  return (
                    <div 
                      key={st.label}
                      className="p-2.5 rounded-lg bg-stone-950/75 border border-amber-900/40 shadow-inner flex flex-col items-center text-center group hover:border-amber-600/60 transition-colors"
                    >
                      <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400/80 tracking-wider">
                        <span className="text-amber-500/70">{alchemicalGlyph}</span>
                        <span>{st.label}</span>
                      </div>
                      <span className="font-mono text-lg font-bold text-amber-100 tabular-nums">
                        {st.val}
                      </span>
                      <span className="font-mono text-[11px] text-amber-400 font-semibold tabular-nums">
                        {mod}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Alchemical Grimoire Hairline Divider */}
        <div className="relative flex items-center justify-center my-4">
          <hr className="w-full border-amber-900/40" />
          <span className="absolute px-3 bg-[#17120e] text-amber-600 text-xs font-serif select-none">
            🜚 · ARS MAGNA · 🜚
          </span>
        </div>

        {/* Armaments & Lore Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signature Equipment & Feats */}
          <div className="space-y-3">
            <h3 className="font-['MedievalSharp'] text-base font-bold text-amber-200 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Attuned Armament & Feats</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-950/75 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Forged Weapon
                </span>
                <span className="font-serif font-medium text-amber-100">
                  {character.signatureWeapon}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/75 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Transmutation Feat / Arcana
                </span>
                <span className="font-serif font-medium text-amber-300">
                  {character.specialAbility}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-950/75 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Alchemical Relic
                </span>
                <span className="font-serif text-amber-200/90">
                  {character.secondaryItem}
                </span>
              </div>
            </div>
          </div>

          {/* Chronicled Lore / Backstory in Illuminated Manuscript Style */}
          <div className="space-y-3">
            <h3 className="font-['MedievalSharp'] text-base font-bold text-amber-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Grimoire Transmutation Annals</span>
            </h3>

            <div className="p-4.5 rounded-xl bg-stone-950/75 border border-amber-900/40 shadow-inner h-[calc(100%-2rem)] flex flex-col justify-between">
              <p className="text-xs leading-relaxed text-amber-100/90 italic font-serif">
                "{character.backstory}"
              </p>
              
              <div className="mt-4 pt-3 border-t border-amber-950/80 flex items-center justify-between text-[11px] text-amber-400/70 font-serif">
                <span>Realm of Extraction:</span>
                <span className="text-amber-200 font-medium">{character.originRealm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
