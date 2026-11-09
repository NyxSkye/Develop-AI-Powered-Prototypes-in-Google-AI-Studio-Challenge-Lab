import React from 'react';
import { Dices, Sparkles, Flame, RotateCcw, Compass, User, Crown, Gem, Shield, Heart } from 'lucide-react';
import { CharacterClassType, CharacterRace, CharacterGender, CharacterRarity } from '../types/character';
import { RACE_STAT_INFLUENCES, RARITY_CONFIGS } from '../data/fantasyData';

interface GeneratorControlsProps {
  onGenerate: () => void;
  lockedClass: CharacterClassType | null;
  onSelectLockedClass: (cls: CharacterClassType | null) => void;
  lockedRace: CharacterRace | null;
  onSelectLockedRace: (race: CharacterRace | null) => void;
  lockedGender: CharacterGender | null;
  onSelectLockedGender: (gender: CharacterGender | null) => void;
  lockedRarity: CharacterRarity | null;
  onSelectLockedRarity: (rarity: CharacterRarity | null) => void;
  isRolling: boolean;
}

const POPULAR_CLASSES: { label: string; value: CharacterClassType | null }[] = [
  { label: 'Any Class (Random)', value: null },
  { label: 'Warrior', value: 'Warrior' },
  { label: 'Mage', value: 'Mage' },
  { label: 'Rogue', value: 'Rogue' },
  { label: 'Paladin', value: 'Paladin' },
  { label: 'Ranger', value: 'Ranger' },
  { label: 'Cleric', value: 'Cleric' },
];

const RACES_LIST: { name: CharacterRace; bonusLabel: string }[] = [
  { name: 'Human', bonusLabel: '+10 HP, +10 MP, +2 All Stats' },
  { name: 'High Elf', bonusLabel: '+35 MP, +4 INT, +2 CHA' },
  { name: 'Wood Elf', bonusLabel: '+15 HP, +20 MP, +1 STR/INT/CHA' },
  { name: 'Mountain Dwarf', bonusLabel: '+35 HP, +4 STR, -10 MP' },
  { name: 'Dragonborn', bonusLabel: '+25 HP, +4 STR, +3 CHA' },
  { name: 'Tiefling', bonusLabel: '+30 MP, +3 INT, +4 CHA' },
  { name: 'Halfling', bonusLabel: '+15 MP, +4 CHA, -2 STR' },
  { name: 'Orc', bonusLabel: '+45 HP, +6 STR, -20 MP, -2 INT' },
  { name: 'Aasimar', bonusLabel: '+20 HP, +30 MP, +5 CHA' },
  { name: 'Gnome', bonusLabel: '+30 MP, +5 INT, +2 CHA' },
];

const GENDERS_LIST: { label: string; value: CharacterGender | null; symbol: string }[] = [
  { label: 'Any Gender', value: null, symbol: '✦' },
  { label: 'Male', value: 'Male', symbol: '♂' },
  { label: 'Female', value: 'Female', symbol: '♀' },
  { label: 'Non-binary', value: 'Non-binary', symbol: '⚧' },
];

const RARITIES_LIST: { name: CharacterRarity | null; label: string; bonus: string; color: string }[] = [
  { name: null, label: 'Any Rarity (Random)', bonus: 'Natural Arcana', color: 'text-amber-200' },
  { name: 'Common', label: 'Common', bonus: 'Standard', color: 'text-stone-300' },
  { name: 'Rare', label: 'Rare', bonus: '+15 HP/MP, +2 Stats', color: 'text-sky-300' },
  { name: 'Epic', label: 'Epic', bonus: '+35 HP/MP, +4 Stats', color: 'text-purple-300' },
  { name: 'Legendary', label: 'Legendary', bonus: '+60 HP/MP, +6 Stats', color: 'text-amber-300' },
];

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  lockedClass,
  onSelectLockedClass,
  lockedRace,
  onSelectLockedRace,
  lockedGender,
  onSelectLockedGender,
  lockedRarity,
  onSelectLockedRarity,
  isRolling,
}) => {
  const currentRaceInfluence = lockedRace ? RACE_STAT_INFLUENCES[lockedRace] : null;
  const currentRarityConfig = lockedRarity ? RARITY_CONFIGS[lockedRarity] : null;

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Prominent Transmutation Crucible Button */}
      <div className="relative group w-full max-w-lg">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600/30 via-orange-500/40 to-amber-600/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

        <button
          onClick={onGenerate}
          disabled={isRolling}
          id="prominent-generate-button"
          aria-label="Generate Random Fantasy Character"
          className="alchemist-brass-btn relative w-full flex items-center justify-center gap-3.5 px-8 py-5 text-amber-100 font-['MedievalSharp'] font-bold text-xl sm:text-2xl tracking-wider rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <span className="text-amber-300/80 text-lg select-none">🜂</span>
          <Dices className={`w-7 h-7 text-amber-200 transition-transform duration-300 ${isRolling ? 'rotate-180 scale-110' : 'group-hover:rotate-12'}`} />
          <span className="whitespace-nowrap tracking-wide text-amber-50 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] font-bold">
            Transmute Fantasy Character
          </span>
          <Sparkles className="w-6 h-6 text-amber-300" />
          <span className="text-amber-300/80 text-lg select-none">🜄</span>
        </button>
      </div>

      {/* Subtext info & keyboard hotkey reminder */}
      <div className="flex items-center gap-2 mt-3.5 text-xs text-amber-300/70 font-serif">
        <span className="flex items-center gap-1">
          <Flame className="w-3 h-3 text-amber-500" />
          Instant Crucible Conjuration
        </span>
        <span aria-hidden="true" className="text-amber-800">·</span>
        <span>
          Click crucible or press <kbd className="px-2 py-0.5 rounded bg-stone-900/90 border border-amber-800 text-amber-300 font-mono text-[10px]">Space</kbd> / <kbd className="px-2 py-0.5 rounded bg-stone-900/90 border border-amber-800 text-amber-300 font-mono text-[10px]">R</kbd>
        </span>
      </div>

      {/* Control Filters Container: Race, Gender, Rarity, and Class */}
      <div className="w-full max-w-3xl mt-5 space-y-3">
        {/* Row 1: Race & Gender Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Race Selection Dropdown */}
          <div className="sm:col-span-7 flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl bg-stone-950/85 border border-amber-900/50 shadow-lg">
            <div className="flex items-center gap-2 px-2 text-xs font-serif font-bold text-amber-300 shrink-0">
              <User className="w-4 h-4 text-amber-400" />
              <label htmlFor="character-race-select" className="whitespace-nowrap">
                Race:
              </label>
            </div>

            <div className="relative flex-1 w-full">
              <select
                id="character-race-select"
                value={lockedRace || ''}
                onChange={(e) => onSelectLockedRace((e.target.value as CharacterRace) || null)}
                className="w-full py-2 px-3 text-xs font-serif font-medium bg-stone-900 text-amber-100 rounded-lg border border-amber-700/60 focus:border-amber-400 focus:outline-none cursor-pointer shadow-inner"
              >
                <option value="">Any Race (Random)</option>
                {RACES_LIST.map((r) => (
                  <option key={r.name} value={r.name} className="bg-stone-950 text-amber-100">
                    {r.name} — ({r.bonusLabel})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender Selector */}
          <div className="sm:col-span-5 flex items-center justify-between gap-1 p-2 rounded-xl bg-stone-950/85 border border-amber-900/50 shadow-lg">
            <div className="flex items-center gap-1.5 px-2 text-xs font-serif font-bold text-amber-300 shrink-0">
              <span className="text-amber-400 text-sm">⚧</span>
              <span className="whitespace-nowrap">Gender:</span>
            </div>

            <div className="flex items-center gap-1 flex-1 justify-end">
              {GENDERS_LIST.map((g) => {
                const isActive = lockedGender === g.value;
                return (
                  <button
                    key={g.label}
                    onClick={() => onSelectLockedGender(g.value)}
                    title={g.label}
                    className={`px-2 py-1 text-xs font-serif rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-amber-500/25 text-amber-200 border border-amber-500/70 font-bold shadow-xs'
                        : 'text-amber-300/60 hover:text-amber-100 hover:bg-stone-900/80 border border-transparent'
                    }`}
                  >
                    <span className="mr-0.5">{g.symbol}</span>
                    <span className="hidden sm:inline text-[11px]">{g.label.replace('Any Gender', 'Any')}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Rarity Selection Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl bg-stone-950/85 border border-amber-900/50 shadow-lg">
          <div className="flex items-center gap-2 px-2 text-xs font-serif font-bold text-amber-300 shrink-0">
            <Crown className="w-4 h-4 text-amber-400" />
            <label htmlFor="character-rarity-select" className="whitespace-nowrap">
              Rarity Tier:
            </label>
          </div>

          <div className="relative flex-1 w-full">
            <select
              id="character-rarity-select"
              value={lockedRarity || ''}
              onChange={(e) => onSelectLockedRarity((e.target.value as CharacterRarity) || null)}
              className="w-full py-2 px-3 text-xs font-serif font-medium bg-stone-900 text-amber-100 rounded-lg border border-amber-700/60 focus:border-amber-400 focus:outline-none cursor-pointer shadow-inner"
            >
              {RARITIES_LIST.map((r) => (
                <option key={r.label} value={r.name || ''} className="bg-stone-950 text-amber-100">
                  {r.label} — ({r.bonus})
                </option>
              ))}
            </select>
          </div>

          {currentRarityConfig && (
            <div className={`text-[11px] font-mono px-2.5 py-1 rounded-md border whitespace-nowrap ${currentRarityConfig.badgeBg} ${currentRarityConfig.badgeBorder} ${currentRarityConfig.badgeText}`}>
              Tier Bonus: +{currentRarityConfig.healthBonus} HP · +{currentRarityConfig.statBonus} All Stats
            </div>
          )}
        </div>

        {/* Row 3: Class Filter segmented bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-stone-950/85 border border-amber-900/50 rounded-xl shadow-lg">
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-amber-300/80 font-serif">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold">Class Affinity:</span>
          </div>
          {POPULAR_CLASSES.map((item) => {
            const isActive = lockedClass === item.value;
            return (
              <button
                key={item.label}
                onClick={() => onSelectLockedClass(item.value)}
                className={`px-3 py-1.5 text-xs font-serif font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-500/60 shadow-inner shadow-amber-950'
                    : 'text-amber-200/60 hover:text-amber-100 hover:bg-stone-900/80 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {lockedClass && (
            <button
              onClick={() => onSelectLockedClass(null)}
              title="Reset to completely random"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-amber-400/70 hover:text-amber-200 hover:bg-amber-950/60 rounded-lg border border-amber-900/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="font-serif">Unbind</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
