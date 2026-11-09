import React from 'react';
import { Dices, Sparkles, Filter, RotateCcw } from 'lucide-react';
import { CharacterClassType } from '../types/character';

interface GeneratorControlsProps {
  onGenerate: () => void;
  lockedClass: CharacterClassType | null;
  onSelectLockedClass: (cls: CharacterClassType | null) => void;
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

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  lockedClass,
  onSelectLockedClass,
  isRolling,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Prominent Generator Button */}
      <div className="relative group w-full max-w-md">
        {/* Ambient glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300" />

        <button
          onClick={onGenerate}
          disabled={isRolling}
          id="prominent-generate-button"
          aria-label="Generate Random Fantasy Character"
          className="relative w-full flex items-center justify-center gap-3 px-8 py-4.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 active:scale-[0.985] text-stone-950 font-serif font-bold text-lg sm:text-xl tracking-wider rounded-xl shadow-lg shadow-amber-950/60 border border-amber-300/60 transition-all duration-150 cursor-pointer disabled:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
        >
          <Dices className={`w-6 h-6 transition-transform duration-300 ${isRolling ? 'rotate-180 scale-110' : 'group-hover:rotate-12'}`} />
          <span className="whitespace-nowrap">Generate Fantasy Character</span>
          <Sparkles className="w-5 h-5 text-amber-950/70" />
        </button>
      </div>

      {/* Subtext info with keyboard hotkey reminder */}
      <div className="flex items-center gap-2 mt-3 text-xs text-stone-500">
        <span>Instant Generation</span>
        <span aria-hidden="true">·</span>
        <span>Click button or press <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 font-mono text-[10px]">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 font-mono text-[10px]">R</kbd></span>
      </div>

      {/* Optional archetype filter segmented bar (Zero-Pill discipline compliant) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 mt-5 p-1 bg-stone-900/80 border border-stone-800/80 rounded-xl max-w-2xl">
        <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-stone-400">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <span className="font-medium">Class Filter:</span>
        </div>
        {POPULAR_CLASSES.map((item) => {
          const isActive = lockedClass === item.value;
          return (
            <button
              key={item.label}
              onClick={() => onSelectLockedClass(item.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 border border-transparent'
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
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
