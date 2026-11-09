import React from 'react';
import { Volume2, VolumeX, Shield, Bookmark } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  savedCount: number;
  onOpenRoster: () => void;
  onGenerateNew: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  savedCount,
  onOpenRoster,
  onGenerateNew,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Brand wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm shadow-amber-950">
          <Shield className="w-4 h-4" />
        </div>
        <span className="font-serif text-lg font-bold tracking-wider text-stone-100 whitespace-nowrap">
          ArcaneForge
        </span>
      </div>

      {/* Zone 2: Clean single-line navigation & utilities */}
      <nav className="hidden sm:flex items-center gap-6 text-xs text-stone-400">
        <span className="text-stone-500">Tabletop RPG Generator</span>
        <span aria-hidden="true">·</span>
        <span className="text-stone-500">d20 Standard Ruleset</span>
        <span aria-hidden="true">·</span>
        <span className="text-stone-400">Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 font-mono text-[10px] border border-stone-700">Space</kbd> to roll</span>
      </nav>

      {/* Zone 3: Primary utility actions */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
          aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors whitespace-nowrap shrink-0"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-600" />}
        </button>

        <button
          onClick={onOpenRoster}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-900 hover:bg-stone-850 border border-stone-800 rounded-lg hover:border-stone-700 transition-colors whitespace-nowrap shrink-0"
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Party Codex</span>
          {savedCount > 0 && (
            <span className="text-[11px] font-mono tabular-nums text-amber-400/90 ml-0.5">
              ({savedCount})
            </span>
          )}
        </button>

        <button
          onClick={onGenerateNew}
          className="px-3.5 py-1.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-sm shadow-amber-950 whitespace-nowrap shrink-0"
        >
          Roll Hero
        </button>
      </div>
    </header>
  );
};
