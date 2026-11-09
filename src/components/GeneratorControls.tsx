import React from 'react';
import { Dices, Sparkles, Flame, RotateCcw, Compass } from 'lucide-react';
import { CharacterClassType } from '../types/character';

interface GeneratorControlsProps {
  onGenerate: () => void;
  lockedClass: CharacterClassType | null;
  onSelectLockedClass: (cls: CharacterClassType | null) => void;
  isRolling: boolean;
}

const POPULAR_CLASSES: { label: string; value: CharacterClassType | null }[] = [
  { label: 'Unbound (All Classes)', value: null },
  { label: 'Warrior', value: 'Warrior' },
  { label: 'Mage', value: 'Mage' },
  { label: 'Rogue', value: 'Rogue' },
  { label: 'Paladin', value: 'Paladin' },
  { label: 'Ranger', value: 'Ranger' },
  { label: 'Cleric', value: 'Cleric' },
];

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  lockedClass,
  onSelectLockedClass,
  isRolling,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Prominent Transmutation Crucible Button */}
      <div className="relative group w-full max-w-lg">
        {/* Arcane Ember Glow aura */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-600/30 via-orange-500/40 to-amber-600/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />

        <button
          onClick={onGenerate}
          disabled={isRolling}
          id="prominent-generate-button"
          aria-label="Generate Random Fantasy Character"
          className="alchemist-brass-btn relative w-full flex items-center justify-center gap-3.5 px-8 py-5 text-amber-100 font-['MedievalSharp'] font-bold text-xl sm:text-2xl tracking-wider rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          {/* Alchemical decorative symbols */}
          <span className="text-amber-300/80 text-lg select-none">🜂</span>
          <Dices className={`w-7 h-7 text-amber-200 transition-transform duration-300 ${isRolling ? 'rotate-180 scale-110' : 'group-hover:rotate-12'}`} />
          <span className="whitespace-nowrap tracking-wide text-amber-50 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] font-bold">
            Transmute Fantasy Character
          </span>
          <Sparkles className="w-6 h-6 text-amber-300" />
          <span className="text-amber-300/80 text-lg select-none">🜄</span>
        </button>
      </div>

      {/* Alchemical subtext & keyboard hotkey reminder */}
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

      {/* Alchemical Reagent Filter bar */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5 p-1.5 bg-stone-950/85 border border-amber-900/50 rounded-xl shadow-lg shadow-stone-950 max-w-2xl">
        <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-amber-300/80 font-serif">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-semibold">Alchemical Affinity:</span>
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
  );
};
