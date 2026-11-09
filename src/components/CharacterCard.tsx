import React, { useState } from 'react';
import { 
  Shield, Sparkles, Zap, Compass, Sun, ShieldAlert, 
  TreePine, Music, Eye, Flame, Heart, Swords, 
  BookOpen, MapPin, Copy, Check, PlusCircle, CheckCircle2,
  Crown, Brain, Gem
} from 'lucide-react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { getStatModifier } from '../utils/characterGenerator';
import { RARITY_CONFIGS } from '../data/fantasyData';
import { CharacterPortrait } from './CharacterPortrait';
import { BackstoryGenerator } from './BackstoryGenerator';
import { CourseHookGenerator } from './CourseHookGenerator';

interface CharacterCardProps {
  character: FantasyCharacter;
  isInDeck: boolean;
  onSaveToDeck: () => void;
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

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isInDeck,
  onSaveToDeck,
  isRolling,
  soundEnabled,
  onUpdatePortrait,
}) => {
  const [copied, setCopied] = useState(false);
  const ClassIcon = CLASS_ICONS[character.class] || Swords;
  const rarity = character.rarity || 'Common';
  const rarityConfig = RARITY_CONFIGS[rarity] || RARITY_CONFIGS.Common;

  const handleCopy = () => {
    const textSummary = `
=== 🜚 ${character.fullName.toUpperCase()} 🜚 ===
Rarity: ${character.rarity || 'Common'} Tier
Gender: ${character.gender || 'Unknown'}
Class: ${character.class} (${character.subclass})
Race: ${character.race}
Alignment: ${character.alignment}
Level: ${character.level}

-- PRIMARY FIVE NUMERIC STATS --
Health: ${character.health}
Mana: ${character.mana}
Strength: ${character.strength}
Intelligence: ${character.intelligence}
Charisma: ${character.charisma}

-- CORE D20 MODIFIERS --
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

  const auxiliaryStats = [
    { label: 'DEX', name: 'Agility', val: character.stats.dexterity },
    { label: 'CON', name: 'Vitality', val: character.stats.constitution },
    { label: 'WIS', name: 'Wisdom', val: character.stats.wisdom },
    { label: 'AC', name: 'Armor Class', val: character.armorClass },
    { label: 'PROF', name: 'Proficiency', val: `+${Math.floor((character.level - 1) / 4) + 2}` },
  ];

  return (
    /* A single, neatly bounded player card with colored border & glow reflecting Rarity */
    <article 
      className={`parchment-card relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 transition-all duration-300 ${rarityConfig.cardBorder} ${rarityConfig.cardGlow} ${
        isRolling ? 'opacity-50 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ornate Brass Corner Brackets */}
      <div className="absolute top-2.5 left-2.5 w-7 h-7 border-t-2 border-l-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-7 h-7 border-t-2 border-r-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-7 h-7 border-b-2 border-l-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 border-b-2 border-r-2 border-amber-400/90 z-20 pointer-events-none" />

      {/* Runic Accent Top Banner with Rarity Color Theme */}
      <div 
        className="h-2.5 w-full bg-gradient-to-r transition-colors duration-500" 
        style={{
          background: rarity === 'Legendary'
            ? 'linear-gradient(90deg, #b45309, #fbbf24, #f59e0b, #fbbf24, #b45309)'
            : rarity === 'Epic'
            ? 'linear-gradient(90deg, #581c87, #c084fc, #9333ea, #c084fc, #581c87)'
            : rarity === 'Rare'
            ? 'linear-gradient(90deg, #0369a1, #38bdf8, #0284c7, #38bdf8, #0369a1)'
            : 'linear-gradient(90deg, #44403c, #a8a29e, #78716c, #a8a29e, #44403c)'
        }}
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* 1. Header: Name & Class with Rarity Badge and Gender */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/50">
          <div>
            {/* Badges Bar: Rarity Badge, Gender, Race & Class */}
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              {/* Colored Rarity Badge to clearly indicate status */}
              <span 
                id="character-rarity-badge"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-['MedievalSharp'] font-bold uppercase tracking-wider border shadow-md transition-all ${rarityConfig.badgeBg} ${rarityConfig.badgeBorder} ${rarityConfig.badgeText}`}
              >
                {rarity === 'Legendary' && <Crown className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
                {rarity === 'Epic' && <Gem className="w-3.5 h-3.5 text-purple-300" />}
                {rarity === 'Rare' && <Sparkles className="w-3.5 h-3.5 text-sky-300" />}
                {rarity === 'Common' && <Shield className="w-3.5 h-3.5 text-stone-400" />}
                <span>{rarity} Tier</span>
              </span>

              {/* Gender Badge */}
              <span 
                id="character-gender-badge"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif font-medium bg-stone-900/90 border border-amber-800/60 text-amber-100 shadow-sm"
              >
                <span className="font-bold text-amber-400 text-sm leading-none">
                  {character.gender === 'Female' ? '♀' : character.gender === 'Male' ? '♂' : '⚧'}
                </span>
                <span>{character.gender}</span>
              </span>

              <span className="text-amber-700">·</span>

              <span className="font-mono font-bold tracking-widest text-amber-400 uppercase">
                {character.race} · {character.class}
              </span>
              <span className="text-amber-700">·</span>
              <span className="text-amber-200/80 font-serif italic">{character.subclass}</span>
              <span className="text-amber-700">·</span>
              <span className="font-mono text-amber-400/90 text-[11px]">Level {character.level}</span>
            </div>

            {/* Distinct Stylized Fantasy Font for Character's Name */}
            <h1 className="font-['MedievalSharp'] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-200 drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)] leading-tight text-balance">
              {character.fullName}
            </h1>
          </div>

          {/* "Save to Deck" button right in the card header for quick action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onSaveToDeck}
              id="save-to-deck-btn"
              aria-label="Save character to My Deck"
              className={`alchemist-brass-btn flex items-center justify-center gap-2 py-2.5 px-5 text-xs sm:text-sm text-amber-50 font-['MedievalSharp'] font-bold rounded-xl transition-all cursor-pointer shadow-md ${
                isInDeck ? 'opacity-90 ring-2 ring-amber-300' : ''
              }`}
            >
              {isInDeck ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span className="text-amber-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Saved to Deck</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                  <span className="text-amber-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">Save to Deck</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              title="Transcribe full card to clipboard"
              className="alchemist-slate-btn p-2.5 rounded-xl text-amber-300 hover:text-amber-100 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. FIVE PRIMARY NUMERIC STATS: Health, Mana, Strength, Intelligence, and Charisma */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-2xl bg-stone-950/85 border border-amber-900/60 shadow-inner">
          {/* Health Stat */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-rose-900/40 relative overflow-hidden group">
            <div className="w-9 h-9 rounded-lg bg-rose-950/80 border border-rose-600/50 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-500/20 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-['MedievalSharp'] font-bold uppercase tracking-wider text-rose-300/90 block">
                Health
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-rose-100 tabular-nums">
                  {character.health}
                </span>
                <span className="text-[9px] font-mono text-rose-400/80">HP</span>
              </div>
            </div>
          </div>

          {/* Mana Stat */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-sky-900/40 relative overflow-hidden group">
            <div className="w-9 h-9 rounded-lg bg-sky-950/80 border border-sky-600/50 flex items-center justify-center text-sky-400 shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-['MedievalSharp'] font-bold uppercase tracking-wider text-sky-300/90 block">
                Mana
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-sky-100 tabular-nums">
                  {character.mana}
                </span>
                <span className="text-[9px] font-mono text-sky-400/80">MP</span>
              </div>
            </div>
          </div>

          {/* Strength Stat */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-amber-900/40 relative overflow-hidden group">
            <div className="w-9 h-9 rounded-lg bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Swords className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-['MedievalSharp'] font-bold uppercase tracking-wider text-amber-300/90 block">
                Strength
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-amber-100 tabular-nums">
                  {character.strength}
                </span>
                <span className="text-[9px] font-mono text-amber-400/80">STR</span>
              </div>
            </div>
          </div>

          {/* Intelligence Stat */}
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-indigo-900/40 relative overflow-hidden group">
            <div className="w-9 h-9 rounded-lg bg-indigo-950/80 border border-indigo-600/50 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner">
              <Brain className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-['MedievalSharp'] font-bold uppercase tracking-wider text-indigo-300/90 block">
                Intellect
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-100 tabular-nums">
                  {character.intelligence}
                </span>
                <span className="text-[9px] font-mono text-indigo-400/80">INT</span>
              </div>
            </div>
          </div>

          {/* Charisma Stat */}
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-900/70 border border-purple-900/40 relative overflow-hidden group">
            <div className="w-9 h-9 rounded-lg bg-purple-950/80 border border-purple-600/50 flex items-center justify-center text-purple-400 shrink-0 shadow-inner">
              <Crown className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-['MedievalSharp'] font-bold uppercase tracking-wider text-purple-300/90 block">
                Charisma
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-purple-100 tabular-nums">
                  {character.charisma}
                </span>
                <span className="text-[9px] font-mono text-purple-400/80">CHA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Center Grid: Portrait (with Generate/Regenerate buttons) + Armaments & Lore */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Portrait Column */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-center">
            <CharacterPortrait
              character={character}
              onUpdatePortrait={onUpdatePortrait}
              isRolling={isRolling}
              soundEnabled={soundEnabled}
            />
          </div>

          {/* Attributes, Armament & Origin Column */}
          <div className="md:col-span-7 lg:col-span-7 space-y-4">
            {/* Origin & Alignment */}
            <div className="p-3.5 rounded-xl bg-stone-950/95 border border-amber-600/60 flex flex-wrap items-center justify-between gap-2.5 text-sm font-serif shadow-sm">
              <div className="flex items-center gap-2 text-amber-100">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-300 font-bold tracking-wide">Origin Realm:</span>
                <span className="text-amber-50 font-semibold drop-shadow-xs">{character.originRealm}</span>
              </div>
              <div className="px-3 py-1 rounded-md bg-amber-950/90 border border-amber-500/70 text-amber-200 font-mono text-xs font-bold tracking-wider shadow-xs">
                {character.alignment}
              </div>
            </div>

            {/* Armament & Abilities */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-800/60 shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-serif font-bold block mb-0.5">
                  Signature Weapon
                </span>
                <span className="font-serif font-semibold text-amber-50 text-sm">
                  {character.signatureWeapon}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-800/60 shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-serif font-bold block mb-0.5">
                  Special Arcana / Feat
                </span>
                <span className="font-serif font-semibold text-amber-300 text-sm">
                  {character.specialAbility}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-amber-800/60 shadow-inner">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-serif font-bold block mb-0.5">
                  Secondary Relic
                </span>
                <span className="font-serif font-semibold text-amber-100 text-sm">
                  {character.secondaryItem}
                </span>
              </div>
            </div>

            {/* Auxiliary Attributes */}
            <div className="grid grid-cols-5 gap-1.5">
              {auxiliaryStats.map((st) => (
                <div 
                  key={st.label} 
                  className="p-2 rounded-lg bg-stone-950/60 border border-amber-950/80 text-center"
                >
                  <span className="text-[9px] font-mono font-bold text-amber-500 block">
                    {st.label}
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-200 tabular-nums">
                    {st.val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Backstory & Course Hook Section: Fully Contained Inside This Single Card */}
        <div className="pt-4 border-t border-amber-900/40 space-y-6">
          {/* Short Inscribed Legend */}
          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-900/40 shadow-inner">
            <span className="text-[10px] font-['MedievalSharp'] uppercase tracking-wider text-amber-400 block mb-1">
              Short Inscribed Legend
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 font-serif italic leading-relaxed">
              "{character.backstory}"
            </p>
          </div>

          {/* AI Lorekeeper: "Generate Backstory" Button and its output directly beneath */}
          <BackstoryGenerator
            character={character}
            soundEnabled={soundEnabled}
          />

          {/* AI Mini-Adventure: "Generate course Hook" Button and its output directly beneath */}
          <CourseHookGenerator
            character={character}
            soundEnabled={soundEnabled}
          />
        </div>
      </div>
    </article>
  );
};
