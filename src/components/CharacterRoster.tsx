import React from 'react';
import { X, Trash2, ExternalLink, Download, BookMarked, Shield } from 'lucide-react';
import { FantasyCharacter } from '../types/character';

interface CharacterRosterProps {
  isOpen: boolean;
  onClose: () => void;
  savedCharacters: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onRemoveCharacter: (id: string) => void;
  onClearAll: () => void;
}

export const CharacterRoster: React.FC<CharacterRosterProps> = ({
  isOpen,
  onClose,
  savedCharacters,
  onSelectCharacter,
  onRemoveCharacter,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const handleExportParty = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedCharacters, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `grimoire_codex_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#140e0b] border-l-2 border-amber-800/60 h-full flex flex-col shadow-2xl p-6 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roster-heading"
      >
        {/* Brass corner brackets */}
        <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-500/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-500/80 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-900/40">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <h2 id="roster-heading" className="font-['MedievalSharp'] text-xl font-bold text-amber-100">
              Grimoire Codex
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300">
              {savedCharacters.length} Adepts
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-amber-400/70 hover:text-amber-200 hover:bg-stone-900 transition-colors cursor-pointer"
            aria-label="Close party roster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedCharacters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-amber-500/60">
              <Shield className="w-10 h-10 mb-2 text-amber-800/60" />
              <p className="text-sm font-['MedievalSharp'] text-amber-200/90">No heroes inscribed in the Codex yet.</p>
              <p className="text-xs text-amber-600 mt-1 font-serif">
                Click "Bind to Codex" on any transmuted character to preserve their formula here.
              </p>
            </div>
          ) : (
            savedCharacters.map((hero) => (
              <div
                key={hero.id}
                className="group p-3.5 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-amber-900/40 hover:border-amber-500/60 transition-all flex items-center justify-between gap-3 shadow-md"
              >
                <div 
                  onClick={() => {
                    onSelectCharacter(hero);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-['MedievalSharp'] font-bold text-amber-200 text-sm truncate group-hover:text-amber-300 transition-colors">
                      {hero.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-amber-300/70 font-serif">
                    <span className="text-amber-400 font-semibold">{hero.class}</span>
                    <span aria-hidden="true" className="text-amber-700">·</span>
                    <span>{hero.race}</span>
                    <span aria-hidden="true" className="text-amber-700">·</span>
                    <span className="font-mono text-[11px] text-amber-500">Lvl {hero.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectCharacter(hero);
                      onClose();
                    }}
                    title="Examine this adept"
                    className="p-1.5 text-amber-400 hover:text-amber-200 hover:bg-amber-950/80 rounded-lg transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveCharacter(hero.id)}
                    title="Dissolve formula"
                    className="p-1.5 text-amber-600/70 hover:text-rose-400 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {savedCharacters.length > 0 && (
          <div className="pt-4 border-t border-amber-900/40 flex items-center gap-3">
            <button
              onClick={handleExportParty}
              className="alchemist-brass-btn flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-['MedievalSharp'] font-bold text-amber-950 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-amber-950" />
              <span>Export Codex JSON</span>
            </button>
            <button
              onClick={onClearAll}
              className="alchemist-slate-btn px-3.5 py-2 text-xs font-serif font-medium text-amber-400/80 hover:text-rose-400 rounded-xl transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
