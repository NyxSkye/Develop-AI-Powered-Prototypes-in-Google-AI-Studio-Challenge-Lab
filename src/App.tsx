import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterCard } from './components/CharacterCard';
import { CharacterRoster } from './components/CharacterRoster';
import { MyDeck } from './components/MyDeck';
import { FantasyCharacter, CharacterClassType } from './types/character';
import { generateRandomCharacter } from './utils/characterGenerator';
import { playRollSound, playSaveSound } from './utils/audio';

export default function App() {
  // Sound setting state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('arcane_sound_fx');
      return stored !== null ? JSON.parse(stored) : true;
    } catch {
      return true;
    }
  });

  // Filter locking state
  const [lockedClass, setLockedClass] = useState<CharacterClassType | null>(null);

  // Active generated character
  const [character, setCharacter] = useState<FantasyCharacter>(() => 
    generateRandomCharacter({ lockedClass: null })
  );

  // Rolling animation state for smooth visual feedback
  const [isRolling, setIsRolling] = useState(false);

  // "My Deck" state persisted in localStorage
  const [deck, setDeck] = useState<FantasyCharacter[]>(() => {
    try {
      const stored = localStorage.getItem('arcane_my_deck');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isRosterOpen, setIsRosterOpen] = useState(false);

  // Toggle sound setting
  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('arcane_sound_fx', JSON.stringify(next));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Instant generation handler
  const handleGenerate = useCallback(() => {
    playRollSound(!soundEnabled);
    setIsRolling(true);

    const newHero = generateRandomCharacter({ lockedClass });
    setCharacter(newHero);

    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [soundEnabled, lockedClass]);

  // Keyboard shortcut listener (Spacebar or 'R' to roll)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.code === 'Space' || e.code === 'KeyR') {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  // "Save to Deck" action handler
  const handleSaveToDeck = () => {
    playSaveSound(!soundEnabled);
    setDeck((prev) => {
      // Check if this exact character ID already exists in deck
      const exists = prev.some((c) => c.id === character.id);
      let updated: FantasyCharacter[];
      if (exists) {
        // If already in deck, remove/toggle or keep
        updated = prev.filter((c) => c.id !== character.id);
      } else {
        // Append into My Deck list
        updated = [character, ...prev];
      }
      try {
        localStorage.setItem('arcane_my_deck', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('arcane_my_deck', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearDeck = () => {
    setDeck([]);
    try {
      localStorage.removeItem('arcane_my_deck');
    } catch {
      // Ignore
    }
  };

  const handleUpdatePortrait = (url: string, styleName: string) => {
    setCharacter((prev) => ({
      ...prev,
      customPortraitUrl: url,
      portraitStyle: styleName,
    }));
  };

  const isCurrentHeroInDeck = deck.some((c) => c.id === character.id);

  return (
    <div className="min-h-screen workbench-bg text-amber-100/90 flex flex-col font-serif selection:bg-amber-600/30 selection:text-amber-200 relative">
      {/* Top Navigation */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        savedCount={deck.length}
        onOpenRoster={() => setIsRosterOpen(true)}
        onGenerateNew={handleGenerate}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex flex-col items-center">
        {/* Prominent Generator Button & Controls */}
        <section aria-label="Character Generation Controls" className="w-full">
          <GeneratorControls
            onGenerate={handleGenerate}
            lockedClass={lockedClass}
            onSelectLockedClass={setLockedClass}
            isRolling={isRolling}
          />
        </section>

        {/* 1. SINGLE BORDERED PLAYER CARD: Containing Name, Class, Portrait, Stats (Health, Mana, Strength), and Backstory */}
        <section aria-label="Active Character Sheet" className="w-full mt-4">
          <CharacterCard
            character={character}
            isInDeck={isCurrentHeroInDeck}
            onSaveToDeck={handleSaveToDeck}
            isRolling={isRolling}
            soundEnabled={soundEnabled}
            onUpdatePortrait={handleUpdatePortrait}
          />
        </section>

        {/* 2. LIST SECTION AT BOTTOM TITLED "My Deck" */}
        <MyDeck
          deck={deck}
          onSelectCharacter={(hero) => {
            setCharacter(hero);
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onRemoveFromDeck={handleRemoveFromDeck}
          onClearDeck={handleClearDeck}
        />
      </main>

      {/* Ancient Alchemist Workbench Themed Footer */}
      <footer className="w-full border-t border-amber-900/40 py-6 text-center text-xs text-amber-400/60 bg-stone-950/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-['MedievalSharp'] font-bold text-amber-300 text-sm">
              Ancient Alchemist's Workbench
            </span>
            <span aria-hidden="true" className="text-amber-700">·</span>
            <span className="text-amber-500/70 font-mono text-[11px]">
              🜚 Magnum Opus Heroica 🜚
            </span>
          </div>
          <div className="text-amber-400/60 text-xs font-serif">
            Click crucible or press Space to transmute random heroes · Save to My Deck anytime
          </div>
        </div>
      </footer>

      {/* Grimoire Codex Drawer */}
      <CharacterRoster
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        savedCharacters={deck}
        onSelectCharacter={(hero) => {
          setCharacter(hero);
          window.scrollTo({ top: 120, behavior: 'smooth' });
        }}
        onRemoveCharacter={handleRemoveFromDeck}
        onClearAll={handleClearDeck}
      />
    </div>
  );
}
