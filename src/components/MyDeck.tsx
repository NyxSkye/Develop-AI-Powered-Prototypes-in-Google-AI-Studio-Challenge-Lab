import React from 'react';
import { Layers, Heart, Sparkles, Swords, Trash2, ExternalLink, Shield } from 'lucide-react';
import { FantasyCharacter } from '../types/character';

interface MyDeckProps {
  deck: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  return (
    <section aria-labelledby="my-deck-heading" className="w-full mt-10 mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-900/40 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-600/50 flex items-center justify-center text-amber-400 shadow-inner">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 id="my-deck-heading" className="font-['MedievalSharp'] text-2xl font-bold text-amber-100 tracking-wide">
              My Deck
            </h2>
            <p className="text-xs text-amber-500/70 font-serif">
              Archived Transmutation Folios ({deck.length} {deck.length === 1 ? 'card' : 'cards'})
            </p>
          </div>
        </div>

        {deck.length > 0 && (
          <button
            onClick={onClearDeck}
            className="alchemist-slate-btn px-3 py-1.5 text-xs font-serif font-medium text-amber-400/80 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
          >
            Clear Deck
          </button>
        )}
      </div>

      {/* Deck Grid / List Section */}
      {deck.length === 0 ? (
        <div className="parchment-card rounded-2xl border border-amber-900/40 p-8 text-center flex flex-col items-center justify-center space-y-2">
          <Shield className="w-10 h-10 text-amber-800/60 mb-1" />
          <p className="font-['MedievalSharp'] text-base text-amber-200/90">
            Your deck currently holds no adventurer cards.
          </p>
          <p className="text-xs text-amber-600 font-serif max-w-sm">
            Click the <strong className="text-amber-400 font-semibold font-['MedievalSharp']">"Save to Deck"</strong> button on the character card above to append heroes into your collection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {deck.map((hero) => (
            <div
              key={hero.id}
              className="parchment-card rounded-xl border border-amber-800/50 hover:border-amber-500/60 p-4 transition-all duration-200 shadow-lg group relative flex flex-col justify-between"
            >
              {/* Brass mini corner accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-amber-500/60 pointer-events-none" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-amber-500/60 pointer-events-none" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-amber-500/60 pointer-events-none" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-amber-500/60 pointer-events-none" />

              <div>
                {/* Header row: Thumbnail & Basic Info */}
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-amber-700/60 bg-stone-950 shrink-0 shadow-inner">
                    <img
                      src={hero.customPortraitUrl || hero.portraitUrl || '/src/assets/images/portrait_cartoon_warrior_1794216277851.jpg'}
                      alt={hero.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold">
                      <span>{hero.race}</span>
                      <span className="text-amber-700">·</span>
                      <span>{hero.class}</span>
                    </div>

                    <h3 className="font-['MedievalSharp'] text-base font-bold text-amber-200 truncate group-hover:text-amber-100 transition-colors">
                      {hero.fullName}
                    </h3>

                    <p className="text-[11px] text-amber-500/70 font-serif italic truncate">
                      Lvl {hero.level} · {hero.subclass}
                    </p>
                  </div>
                </div>

                {/* Clearly displayed numeric stats: Health, Mana, Strength */}
                <div className="grid grid-cols-3 gap-2 mt-3.5 p-2 rounded-lg bg-stone-950/80 border border-amber-900/40 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-serif uppercase tracking-wider text-rose-400 flex items-center gap-0.5">
                      <Heart className="w-2.5 h-2.5 text-rose-400" /> HP
                    </span>
                    <span className="font-mono text-xs font-bold text-rose-200 tabular-nums">
                      {hero.health}
                    </span>
                  </div>

                  <div className="flex flex-col items-center border-x border-amber-950">
                    <span className="text-[9px] font-serif uppercase tracking-wider text-sky-400 flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-sky-400" /> MP
                    </span>
                    <span className="font-mono text-xs font-bold text-sky-200 tabular-nums">
                      {hero.mana}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-serif uppercase tracking-wider text-amber-400 flex items-center gap-0.5">
                      <Swords className="w-2.5 h-2.5 text-amber-400" /> STR
                    </span>
                    <span className="font-mono text-xs font-bold text-amber-200 tabular-nums">
                      {hero.strength}
                    </span>
                  </div>
                </div>

                {/* Backstory snippet */}
                <p className="mt-3 text-xs text-amber-200/75 font-serif italic line-clamp-2">
                  "{hero.backstory}"
                </p>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-2.5 border-t border-amber-950/80">
                <button
                  onClick={() => onSelectCharacter(hero)}
                  className="alchemist-slate-btn flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-serif font-medium text-amber-300 hover:text-amber-100 rounded-lg transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Inspect Card</span>
                </button>

                <button
                  onClick={() => onRemoveFromDeck(hero.id)}
                  title="Remove from deck"
                  className="p-1.5 text-amber-700 hover:text-rose-400 hover:bg-stone-900 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
