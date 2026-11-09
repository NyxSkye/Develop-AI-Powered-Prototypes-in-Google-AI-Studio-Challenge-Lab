import React, { useState } from 'react';
import { 
  Shield, Sparkles, Zap, Compass, Sun, ShieldAlert, 
  TreePine, Music, Eye, Flame, Heart, Swords, 
  BookOpen, MapPin, Copy, Check, Bookmark, 
  BookmarkCheck, Share2, Wand2
} from 'lucide-react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { getStatModifier } from '../utils/characterGenerator';

interface CharacterCardProps {
  character: FantasyCharacter;
  isSaved: boolean;
  onToggleSave: () => void;
  isRolling: boolean;
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

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isSaved,
  onToggleSave,
  isRolling,
}) => {
  const [copied, setCopied] = useState(false);
  const ClassIcon = CLASS_ICONS[character.class] || Swords;

  const handleCopy = () => {
    const textSummary = `
=== ${character.fullName.toUpperCase()} ===
Class: ${character.class} (${character.subclass})
Race: ${character.race}
Alignment: ${character.alignment}
Level: ${character.level} | HP: ${character.hp} | AC: ${character.armorClass}

-- ABILITIES --
STR: ${character.stats.strength} (${getStatModifier(character.stats.strength)})
DEX: ${character.stats.dexterity} (${getStatModifier(character.stats.dexterity)})
CON: ${character.stats.constitution} (${getStatModifier(character.stats.constitution)})
INT: ${character.stats.intelligence} (${getStatModifier(character.stats.intelligence)})
WIS: ${character.stats.wisdom} (${getStatModifier(character.stats.wisdom)})
CHA: ${character.stats.charisma} (${getStatModifier(character.stats.charisma)})

-- GEAR & ABILITIES --
Signature Weapon: ${character.signatureWeapon}
Secondary Relic: ${character.secondaryItem}
Special Feat: ${character.specialAbility}
Origin: ${character.originRealm}

-- BACKSTORY --
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
      className={`relative w-full max-w-4xl mx-auto bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isRolling ? 'opacity-50 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Decorative top border ambient color */}
      <div 
        className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" 
        style={{ backgroundColor: character.accentColor }}
      />

      <div className="p-6 sm:p-8 space-y-8">
        {/* Top Section: Portrait & Identity */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Portrait Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden border border-stone-700/80 bg-stone-950 shadow-inner group">
              {character.portraitUrl ? (
                <img
                  src={character.portraitUrl}
                  alt={`${character.name} the ${character.class}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-600 bg-stone-950">
                  <ClassIcon className="w-16 h-16 text-stone-500 mb-2" />
                  <span className="font-serif text-sm text-stone-400">{character.class}</span>
                </div>
              )}
              {/* Subtle gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Class Insignia Badge on Portrait */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-200">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-950/80 backdrop-blur-sm border border-stone-800 text-amber-300 font-serif">
                  <ClassIcon className="w-3.5 h-3.5" />
                  <span>{character.class}</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-stone-900/80 backdrop-blur-sm border border-stone-800 font-mono text-[11px] text-stone-400">
                  Lvl {character.level}
                </div>
              </div>
            </div>

            {/* Quick Actions underneath portrait */}
            <div className="flex items-center gap-2 mt-4 w-full max-w-[280px]">
              <button
                onClick={onToggleSave}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-stone-850 hover:bg-stone-800 text-stone-300 border-stone-700/60'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? 'In Party Codex' : 'Save to Party'}</span>
              </button>

              <button
                onClick={handleCopy}
                title="Copy character stats to clipboard"
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700/60 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 lg:col-span-8 space-y-5">
            {/* Name & Class Header */}
            <div>
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-xs uppercase tracking-wider text-amber-400/90 font-medium font-mono">
                  {character.race} {character.class}
                </span>
                <span className="text-xs text-stone-500">·</span>
                <span className="text-xs text-stone-400">{character.subclass}</span>
              </div>

              {/* Unique Hero Name */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide text-stone-100 text-balance">
                {character.fullName}
              </h1>

              {/* Zero-Pill Clean Metadata Row */}
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-stone-400">
                <span>{character.alignment}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-500" />
                  {character.originRealm}
                </span>
              </div>
            </div>

            {/* Vital Combat Meters */}
            <div className="grid grid-cols-3 gap-3 p-3.5 bg-stone-950/70 border border-stone-800/80 rounded-xl">
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-stone-900/50">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-400" /> Hit Points
                </span>
                <span className="font-mono text-xl font-bold text-stone-100 tabular-nums mt-0.5">
                  {character.hp}
                </span>
                <span className="text-[10px] text-stone-500">Max HP</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-stone-900/50">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-amber-400" /> Armor Class
                </span>
                <span className="font-mono text-xl font-bold text-stone-100 tabular-nums mt-0.5">
                  {character.armorClass}
                </span>
                <span className="text-[10px] text-stone-500">Defense</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-stone-900/50">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 flex items-center gap-1">
                  <Swords className="w-3 h-3 text-sky-400" /> Level Tier
                </span>
                <span className="font-mono text-xl font-bold text-stone-100 tabular-nums mt-0.5">
                  Lvl {character.level}
                </span>
                <span className="text-[10px] text-stone-500">Adventurer</span>
              </div>
            </div>

            {/* 6 Core RPG Ability Scores */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/60 pb-1.5">
                <span className="font-medium">Core RPG Attributes</span>
                <span className="text-[11px] text-stone-500 font-mono">d20 Modifiers</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {statItems.map((st) => {
                  const mod = getStatModifier(st.val);
                  return (
                    <div 
                      key={st.label}
                      className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 flex flex-col items-center text-center"
                    >
                      <span className="text-[10px] font-mono font-bold text-stone-400 tracking-wider">
                        {st.label}
                      </span>
                      <span className="font-mono text-lg font-bold text-stone-100 tabular-nums">
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

        {/* Hairline Divider */}
        <hr className="border-stone-800" />

        {/* Armaments & Lore Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signature Equipment & Feats */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-stone-200 flex items-center gap-2">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Armament & Capabilities</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-0.5">
                  Primary Weapon
                </span>
                <span className="font-medium text-stone-200">
                  {character.signatureWeapon}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-0.5">
                  Signature Feat / Spell
                </span>
                <span className="font-medium text-amber-300">
                  {character.specialAbility}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/80">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-0.5">
                  Secondary Relic
                </span>
                <span className="text-stone-300">
                  {character.secondaryItem}
                </span>
              </div>
            </div>
          </div>

          {/* Chronicled Lore / Backstory */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-semibold text-stone-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Chronicled Legend</span>
            </h3>

            <div className="p-4 rounded-lg bg-stone-950/60 border border-stone-800/80 h-[calc(100%-2rem)] flex flex-col justify-between">
              <p className="text-xs leading-relaxed text-stone-300 italic font-serif">
                "{character.backstory}"
              </p>
              
              <div className="mt-4 pt-3 border-t border-stone-900 flex items-center justify-between text-[11px] text-stone-500">
                <span>Realm of Heritage:</span>
                <span className="text-stone-400 font-medium">{character.originRealm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
