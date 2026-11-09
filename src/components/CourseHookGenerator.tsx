import React, { useState, useEffect } from 'react';
import { Scroll, Sparkles, Copy, Check, Compass, AlertCircle, MapPin } from 'lucide-react';
import { FantasyCharacter } from '../types/character';
import { playRollSound } from '../utils/audio';

interface CourseHookGeneratorProps {
  character: FantasyCharacter;
  soundEnabled: boolean;
}

export const CourseHookGenerator: React.FC<CourseHookGeneratorProps> = ({
  character,
  soundEnabled,
}) => {
  const [courseHook, setCourseHook] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Clear when character changes
  useEffect(() => {
    setCourseHook('');
    setError(null);
  }, [character.id]);

  const handleGenerateCourseHook = async () => {
    setIsLoading(true);
    setError(null);
    playRollSound(!soundEnabled);

    try {
      const response = await fetch('/api/generate-course-hook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.courseHook) {
        throw new Error('No course hook returned from the questmaster');
      }

      setCourseHook(data.courseHook);
    } catch (err: any) {
      console.warn('API call for course hook failed, using local narrative engine:', err);
      // Fallback: Generate rich adventure hook matching character details
      const fallbackHook = generateLocalCourseHook(character);
      setCourseHook(fallbackHook);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!courseHook) return;
    navigator.clipboard.writeText(courseHook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-6 space-y-4">
      {/* 1. The requested "Generate course Hook" button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleGenerateCourseHook}
          disabled={isLoading}
          id="generate-course-hook-btn"
          aria-label="Generate course Hook based on character backstory"
          className="alchemist-brass-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 text-amber-950 font-['MedievalSharp'] font-bold text-sm sm:text-base rounded-xl transition-all cursor-pointer disabled:opacity-60 shadow-lg shadow-amber-950/60 whitespace-nowrap"
        >
          <Compass className={`w-4 h-4 text-amber-950 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Generate course Hook</span>
          <Sparkles className="w-4 h-4 text-amber-950/80" />
        </button>

        <span className="text-xs text-amber-400/70 font-serif italic text-center sm:text-right">
          Creates a 3-Act Mini-Adventure tailored to {character.name}'s origin & legend
        </span>
      </div>

      {/* 2. Text component directly beneath the button */}
      <div 
        className="parchment-card rounded-2xl border border-amber-800/60 p-6 sm:p-8 transition-all duration-300 relative shadow-2xl min-h-[140px] flex flex-col justify-center"
        aria-live="polite"
      >
        {/* Brass corner brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/70 pointer-events-none" />

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
              <Scroll className="w-5 h-5 text-amber-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="font-['MedievalSharp'] text-base font-bold text-amber-200 tracking-wider">
                Weaving Course Hook & Mini-Adventure...
              </p>
              <p className="text-xs text-amber-500/80 font-serif italic">
                Drawing inspiration from {character.originRealm} and {character.signatureWeapon}
              </p>
            </div>
          </div>
        )}

        {/* Empty State before clicking button */}
        {!isLoading && !courseHook && (
          <div className="flex flex-col items-center justify-center py-6 text-center text-amber-500/60 space-y-2">
            <Scroll className="w-8 h-8 text-amber-700/60" />
            <p className="font-['MedievalSharp'] text-sm text-amber-300/80">
              No active adventure course drafted for {character.fullName} yet.
            </p>
            <p className="text-xs text-amber-600/80 font-serif max-w-md">
              Click the <strong className="text-amber-400 font-semibold font-['MedievalSharp']">"Generate course Hook"</strong> button above to construct a mini-adventure based on their backstory, traits, and armament.
            </p>
          </div>
        )}

        {/* Generated Course Hook Output directly beneath the button */}
        {!isLoading && courseHook && (
          <div className="space-y-4">
            {/* Header with Title and Copy Action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-900/50">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-400" />
                <h4 className="font-['MedievalSharp'] text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                  Course Hook: Mini-Adventure
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  title="Copy course hook details"
                  className="alchemist-slate-btn flex items-center gap-1.5 px-3 py-1 text-xs font-serif text-amber-200 hover:text-amber-100 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copied ? 'Copied' : 'Copy Course Hook'}</span>
                </button>
              </div>
            </div>

            {/* Course Hook Narrative & 3 Act Breakdown */}
            <div className="space-y-3 text-amber-100/90 font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {courseHook}
            </div>

            {/* Footer with Quest Seal */}
            <div className="pt-3 border-t border-amber-950/80 flex items-center justify-between text-[11px] text-amber-500/70 font-serif">
              <span>Origin: {character.originRealm}</span>
              <span className="text-amber-400/80 font-mono">🜚 Quest Module Ready 🜚</span>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/50 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

function generateLocalCourseHook(char: FantasyCharacter): string {
  return `⚔️ QUEST TITLE: The Doom of ${char.originRealm}

📜 THE HOOK & CALL TO ADVENTURE:
A desperate courier arrives at the crucible carrying an urgent parchment bearing the ancient seal of ${char.originRealm}. The forgotten ruins where ${char.fullName} first claimed their ${char.signatureWeapon} have stirred awake. An abyssal warlord is excavating the catacombs, intending to invert the magic of ${char.specialAbility} to enslave the surrounding provinces.

🗺️ THE 3 COURSE MILESTONES:
1. Act I (Shadows Over the Frontier): Traverse the cursed wilderness bordering ${char.originRealm}. Interrogate mercenary scouts and locate the hidden subterranean entrance guarded by corrupted stone sentinels.
2. Act II (The Sunken Vaults Trial): Infiltrate the sunken laboratory. Utilize ${char.secondaryItem} to disarm ancient elemental pressure plates and withstand a wave of animated necrotic guardians.
3. Act III (The Crucible Confrontation): Duel the Void Arch-Sorcerer at the heart of the rift. ${char.name} must coordinate their full ${char.class} might (Health: ${char.health}, Mana: ${char.mana}, Strength: ${char.strength}, Intelligence: ${char.intelligence}, Charisma: ${char.charisma}) to smash the void anchor and seal the realm forever.

🏆 ALCHEMICAL REWARDS & SPOILS:
800 gold crowns, an Exalted Potion of Prime Transmutation, and the hereditary honor 'Champion of ${char.originRealm}'.`;
}
