import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterCard } from './components/CharacterCard';
import { CharacterRoster } from './components/CharacterRoster';
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

  // Saved characters roster
  const [savedCharacters, setSavedCharacters] = useState<FantasyCharacter[]>(() => {
    try {
      const stored = localStorage.getItem('arcane_saved_characters');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isRosterOpen, setIsRosterOpen] = useState(false);

  // Save sound setting
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

    // Instant zero-delay character calculation
    const newHero = generateRandomCharacter({ lockedClass });
    setCharacter(newHero);

    // Micro-settle for dice roll tactile feedback
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [soundEnabled, lockedClass]);

  // Keyboard shortcut listener (Spacebar or 'R' to roll)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
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

  // Toggle saving to party codex
  const handleToggleSave = () => {
    setSavedCharacters((prev) => {
      const exists = prev.some((c) => c.id === character.id);
      let updated: FantasyCharacter[];
      if (exists) {
        updated = prev.filter((c) => c.id !== character.id);
      } else {
        playSaveSound(!soundEnabled);
        updated = [character, ...prev];
      }
      try {
        localStorage.setItem('arcane_saved_characters', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleRemoveFromRoster = (id: string) => {
    setSavedCharacters((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem('arcane_saved_characters', JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleClearAllRoster = () => {
    setSavedCharacters([]);
    try {
      localStorage.removeItem('arcane_saved_characters');
    } catch {
      // Ignore
    }
  };

  const isCurrentHeroSaved = savedCharacters.some((c) => c.id === character.id);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Navigation */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        savedCount={savedCharacters.length}
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

        {/* The Random Character Display Card */}
        <section aria-label="Active Character Sheet" className="w-full mt-4">
          <CharacterCard
            character={character}
            isSaved={isCurrentHeroSaved}
            onToggleSave={handleToggleSave}
            isRolling={isRolling}
          />
        </section>
      </main>

      {/* Clean quiet footer */}
      <footer className="w-full border-t border-stone-850 py-6 text-center text-xs text-stone-500 bg-stone-950">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-serif font-semibold text-stone-400">Fantasy Character Creator</span>
            <span aria-hidden="true">·</span>
            <span>Instant Tabletop Hero Forge</span>
          </div>
          <div className="text-stone-600">
            Click Generate or press Space to roll random heroes
          </div>
        </div>
      </footer>

      {/* Party Codex Drawer */}
      <CharacterRoster
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        savedCharacters={savedCharacters}
        onSelectCharacter={setCharacter}
        onRemoveCharacter={handleRemoveFromRoster}
        onClearAll={handleClearAllRoster}
      />
    </div>
  );
}
