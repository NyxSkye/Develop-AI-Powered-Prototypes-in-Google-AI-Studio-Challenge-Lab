import React from 'react';
import { Volume2, VolumeX, FlaskConical, BookMarked, Sparkles } from 'lucide-react';

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
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-amber-900/40 bg-stone-950/85 backdrop-blur-md sticky top-0 z-40 shadow-xl shadow-stone-950/80">
      {/* Zone 1: Brand wordmark in stylized alchemist font */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-600/50 flex items-center justify-center text-amber-400 shadow-inner shadow-amber-950">
          <FlaskConical className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-['MedievalSharp'] text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100 whitespace-nowrap">
            Alchemist's Crucible
          </span>
          <span className="text-[10px] font-mono tracking-widest text-amber-600/90 uppercase -mt-0.5">
            Heroic Transmutation Forge
          </span>
        </div>
      </div>

      {/* Zone 2: Clean single-line navigation & alchemical notes */}
      <nav className="hidden sm:flex items-center gap-6 text-xs text-amber-200/60 font-serif">
        <span className="text-amber-500/80">Ars Transmutatoria</span>
        <span aria-hidden="true" className="text-amber-700">·</span>
        <span className="text-amber-500/70">d20 Prime Matrix</span>
        <span aria-hidden="true" className="text-amber-700">·</span>
        <span className="text-amber-100 font-serif text-xs font-medium flex items-center gap-1.5 bg-stone-900/90 px-3 py-1 rounded-lg border border-amber-700/60 shadow-sm">
          <span>Press</span>
          <kbd className="px-2 py-0.5 rounded bg-amber-950 text-amber-200 border border-amber-500/80 font-mono text-xs font-bold shadow-xs">Space</kbd>
          <span>to brew</span>
        </span>
      </nav>

      {/* Zone 3: Primary utility actions styled in brass/leather */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute alchemical chimes' : 'Enable alchemical chimes'}
          aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          className="p-2 rounded-lg text-amber-500 hover:text-amber-200 hover:bg-stone-900/80 border border-amber-900/30 hover:border-amber-700/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-600" />}
        </button>

        <button
          onClick={onOpenRoster}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-serif font-medium text-amber-200 bg-stone-900/90 hover:bg-stone-850 border border-amber-800/60 hover:border-amber-600/80 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <BookMarked className="w-3.5 h-3.5 text-amber-400" />
          <span>Grimoire Codex</span>
          {savedCount > 0 && (
            <span className="text-[11px] font-mono tabular-nums text-amber-300 ml-0.5 px-1.5 py-0.2 rounded bg-amber-950/90 border border-amber-800/60">
              {savedCount}
            </span>
          )}
        </button>

        <button
          onClick={onGenerateNew}
          className="alchemist-brass-btn px-4 py-1.5 text-xs font-serif font-bold tracking-wide text-amber-950 rounded-lg whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-950" />
          <span>Transmute Hero</span>
        </button>
      </div>
    </header>
  );
};
