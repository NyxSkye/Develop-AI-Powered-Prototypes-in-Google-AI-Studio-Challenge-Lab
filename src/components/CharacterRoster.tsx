import React from 'react';
import { X, Trash2, ExternalLink, Download, Users, Shield, Sparkles, Zap, Swords } from 'lucide-react';
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
    downloadAnchor.setAttribute("download", `fantasy_party_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-stone-950 border-l border-stone-800 h-full flex flex-col shadow-2xl p-6 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roster-heading"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-amber-400" />
            <h2 id="roster-heading" className="font-serif text-lg font-bold text-stone-100">
              Party Codex
            </h2>
            <span className="text-xs font-mono text-stone-400">
              ({savedCharacters.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-900 transition-colors"
            aria-label="Close party roster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {savedCharacters.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-stone-500">
              <Shield className="w-10 h-10 mb-2 text-stone-700" />
              <p className="text-sm font-serif text-stone-400">No heroes saved to the Codex yet.</p>
              <p className="text-xs text-stone-600 mt-1">
                Click "Save to Party" on any generated character to preserve them here.
              </p>
            </div>
          ) : (
            savedCharacters.map((hero) => (
              <div
                key={hero.id}
                className="group p-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3"
              >
                <div 
                  onClick={() => {
                    onSelectCharacter(hero);
                    onClose();
                  }}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-stone-200 text-sm truncate group-hover:text-amber-300 transition-colors">
                      {hero.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                    <span className="text-amber-400 font-medium">{hero.class}</span>
                    <span aria-hidden="true">·</span>
                    <span>{hero.race}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[11px]">Lvl {hero.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onSelectCharacter(hero);
                      onClose();
                    }}
                    title="View this character"
                    className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveCharacter(hero.id)}
                    title="Remove from codex"
                    className="p-1.5 text-stone-500 hover:text-rose-400 hover:bg-stone-800 rounded-lg transition-colors"
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
          <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
            <button
              onClick={handleExportParty}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-stone-200 bg-stone-900 hover:bg-stone-850 border border-stone-700/80 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Export Party JSON</span>
            </button>
            <button
              onClick={onClearAll}
              className="px-3 py-2 text-xs font-medium text-stone-400 hover:text-rose-400 hover:bg-stone-900 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
