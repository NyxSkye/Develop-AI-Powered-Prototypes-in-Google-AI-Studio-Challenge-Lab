import React, { useState } from 'react';
import { 
  Shield, Sparkles, Zap, Compass, Sun, ShieldAlert, 
  TreePine, Music, Eye, Flame, Heart, Swords, 
  BookOpen, MapPin, Copy, Check, PlusCircle, CheckCircle2
} from 'lucide-react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { getStatModifier } from '../utils/characterGenerator';
import { CharacterPortrait } from './CharacterPortrait';
import { BackstoryGenerator } from './BackstoryGenerator';

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

  const handleCopy = () => {
    const textSummary = `
=== 🜚 ${character.fullName.toUpperCase()} 🜚 ===
Class: ${character.class} (${character.subclass})
Race: ${character.race}
Alignment: ${character.alignment}
Level: ${character.level}

-- THREE NUMERIC STATS --
Health: ${character.health}
Mana: ${character.mana}
Strength: ${character.strength}

-- CORE D20 ATTRIBUTES --
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

  const secondaryStats = [
    { label: 'DEX', name: 'Agility', val: character.stats.dexterity },
    { label: 'CON', name: 'Vitality', val: character.stats.constitution },
    { label: 'INT', name: 'Intellect', val: character.stats.intelligence },
    { label: 'WIS', name: 'Wisdom', val: character.stats.wisdom },
    { label: 'CHA', name: 'Presence', val: character.stats.charisma },
  ];

  return (
    /* A single, neatly bounded and bordered player card containing ALL character information */
    <article 
      className={`parchment-card relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-amber-700/60 shadow-2xl transition-all duration-300 ${
        isRolling ? 'opacity-50 scale-[0.99] filter blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ornate Brass Corner Brackets */}
      <div className="absolute top-2.5 left-2.5 w-7 h-7 border-t-2 border-l-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-7 h-7 border-t-2 border-r-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-7 h-7 border-b-2 border-l-2 border-amber-400/90 z-20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-7 h-7 border-b-2 border-r-2 border-amber-400/90 z-20 pointer-events-none" />

      {/* Runic Accent Top Banner */}
      <div 
        className="h-2 w-full bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" 
        style={{ backgroundColor: character.accentColor }}
      />

      <div className="p-6 sm:p-8 space-y-6">
        {/* 1. Header: Name & Class in Stylized Fantasy Font */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/50">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs">
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

          {/* New "Save to Deck" button right in the card header for quick action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onSaveToDeck}
              id="save-to-deck-btn"
              aria-label="Save character to My Deck"
              className={`alchemist-brass-btn flex items-center justify-center gap-2 py-2.5 px-5 text-xs sm:text-sm font-['MedievalSharp'] font-bold rounded-xl transition-all cursor-pointer shadow-md ${
                isInDeck ? 'opacity-90 ring-2 ring-amber-300' : ''
              }`}
            >
              {isInDeck ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-amber-950" />
                  <span>Saved to Deck</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-amber-950" />
                  <span>Save to Deck</span>
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

        {/* 2. THREE NEW RANDOMLY GENERATED NUMERIC STATS: Health, Mana, and Strength */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 rounded-2xl bg-stone-950/85 border border-amber-900/60 shadow-inner">
          {/* Health Stat */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/70 border border-rose-900/40 relative overflow-hidden group">
            <div className="w-11 h-11 rounded-xl bg-rose-950/80 border border-rose-600/50 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-500/20 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-['MedievalSharp'] font-bold uppercase tracking-widest text-rose-300/90 block">
                Health
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-rose-100 tabular-nums">
                  {character.health}
                </span>
                <span className="text-[10px] font-mono text-rose-400/80">HP</span>
              </div>
            </div>
            <div className="absolute right-2 bottom-1 text-[24px] font-serif text-rose-950/40 select-none pointer-events-none">
              🜂
            </div>
          </div>

          {/* Mana Stat */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/70 border border-sky-900/40 relative overflow-hidden group">
            <div className="w-11 h-11 rounded-xl bg-sky-950/80 border border-sky-600/50 flex items-center justify-center text-sky-400 shrink-0 shadow-inner">
              <Sparkles className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-['MedievalSharp'] font-bold uppercase tracking-widest text-sky-300/90 block">
                Mana
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-sky-100 tabular-nums">
                  {character.mana}
                </span>
                <span className="text-[10px] font-mono text-sky-400/80">MP</span>
              </div>
            </div>
            <div className="absolute right-2 bottom-1 text-[24px] font-serif text-sky-950/40 select-none pointer-events-none">
              🜄
            </div>
          </div>

          {/* Strength Stat */}
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-stone-900/70 border border-amber-900/40 relative overflow-hidden group">
            <div className="w-11 h-11 rounded-xl bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
              <Swords className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-['MedievalSharp'] font-bold uppercase tracking-widest text-amber-300/90 block">
                Strength
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-100 tabular-nums">
                  {character.strength}
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">STR</span>
              </div>
            </div>
            <div className="absolute right-2 bottom-1 text-[24px] font-serif text-amber-950/40 select-none pointer-events-none">
              🜚
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
            <div className="p-3.5 rounded-xl bg-stone-950/70 border border-amber-900/40 flex items-center justify-between text-xs font-serif">
              <div className="flex items-center gap-1.5 text-amber-300/90">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-500 font-semibold">Origin Realm:</span>
                <span>{character.originRealm}</span>
              </div>
              <div className="text-amber-400/80 font-mono text-[11px]">
                {character.alignment}
              </div>
            </div>

            {/* Armament & Abilities */}
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Signature Weapon
                </span>
                <span className="font-serif font-medium text-amber-100">
                  {character.signatureWeapon}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Special Arcana / Feat
                </span>
                <span className="font-serif font-medium text-amber-300">
                  {character.specialAbility}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/70 border border-amber-900/40 shadow-inner">
                <span className="text-[10px] uppercase tracking-wider text-amber-500 font-serif block mb-0.5">
                  Secondary Relic
                </span>
                <span className="font-serif text-amber-200/90">
                  {character.secondaryItem}
                </span>
              </div>
            </div>

            {/* Auxiliary Attributes */}
            <div className="grid grid-cols-5 gap-1.5">
              {secondaryStats.map((st) => (
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

        {/* 4. Backstory Section: Fully Contained Inside This Single Card */}
        <div className="pt-4 border-t border-amber-900/40">
          <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-900/40 mb-3 shadow-inner">
            <span className="text-[10px] font-['MedievalSharp'] uppercase tracking-wider text-amber-400 block mb-1">
              Short Inscribed Legend
            </span>
            <p className="text-xs sm:text-sm text-amber-100/90 font-serif italic leading-relaxed">
              "{character.backstory}"
            </p>
          </div>

          {/* AI Lorekeeper with "Generate Backstory" Button and its output directly beneath */}
          <BackstoryGenerator
            character={character}
            soundEnabled={soundEnabled}
          />
        </div>
      </div>
    </article>
  );
};
