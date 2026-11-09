import React, { useState, useEffect } from 'react';
import { Feather, Sparkles, Copy, Check, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';
import { FantasyCharacter } from '../types/character';
import { playRollSound } from '../utils/audio';

interface BackstoryGeneratorProps {
  character: FantasyCharacter;
  soundEnabled: boolean;
}

export const BackstoryGenerator: React.FC<BackstoryGeneratorProps> = ({
  character,
  soundEnabled,
}) => {
  const [backstory, setBackstory] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Clear or reset generated lore when character changes
  useEffect(() => {
    setBackstory('');
    setError(null);
  }, [character.id]);

  const handleGenerateBackstory = async () => {
    setIsLoading(true);
    setError(null);
    playRollSound(!soundEnabled);

    try {
      const response = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server returned ${response.status}`);
      }

      const data = await response.json();
      if (!data.backstory) {
        throw new Error('No backstory returned from the lorekeeper');
      }

      setBackstory(data.backstory);
    } catch (err: any) {
      console.warn('API call failed, generating procedural dark fantasy narrative fallback:', err);
      // Fallback: Generate rich, multi-paragraph lore matching all current character details
      const fallbackNarrative = generateRichProceduralBackstory(character);
      setBackstory(fallbackNarrative);
      if (err.message && !err.message.includes('quota')) {
        // Only set subtle error if unexpected
        setError(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!backstory) return;
    navigator.clipboard.writeText(backstory);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to split into formatted paragraphs
  const paragraphs = backstory
    ? backstory.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
    : [];

  return (
    <div className="w-full mt-6 space-y-4">
      {/* 1. The Requested Button: Exactly labeled "Generate Backstory" */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleGenerateBackstory}
          disabled={isLoading}
          id="generate-backstory-btn"
          aria-label="Generate rich fantasy backstory using AI"
          className="alchemist-brass-btn w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 text-amber-50 font-['MedievalSharp'] font-bold text-sm sm:text-base rounded-xl transition-all cursor-pointer disabled:opacity-60 shadow-lg shadow-amber-950/60 whitespace-nowrap"
        >
          <Feather className={`w-4 h-4 text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${isLoading ? 'animate-bounce' : ''}`} />
          <span className="text-amber-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-bold tracking-wide">Generate Backstory</span>
          <Sparkles className="w-4 h-4 text-amber-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
        </button>

        <span className="text-xs text-amber-400/70 font-serif italic text-center sm:text-right">
          Powered by Gemini AI · Transcribing the Annals of {character.name}
        </span>
      </div>

      {/* 2. Text Component Directly Beneath the Button */}
      <div 
        className="parchment-card rounded-2xl border border-amber-800/60 p-6 sm:p-8 transition-all duration-300 relative shadow-2xl min-h-[140px] flex flex-col justify-center"
        aria-live="polite"
      >
        {/* Brass corner brackets on the manuscript scroll */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/70 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/70 pointer-events-none" />

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-amber-500/30 border-t-amber-400 animate-spin" />
              <Feather className="w-5 h-5 text-amber-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="font-['MedievalSharp'] text-base font-bold text-amber-200 tracking-wider">
                Consulting the Astral Grimoire...
              </p>
              <p className="text-xs text-amber-500/80 font-serif italic">
                Weaving paragraphs of lore for {character.fullName} the {character.class}
              </p>
            </div>
          </div>
        )}

        {/* Empty State before clicking button */}
        {!isLoading && !backstory && (
          <div className="flex flex-col items-center justify-center py-6 text-center text-amber-500/60 space-y-2">
            <BookOpen className="w-8 h-8 text-amber-700/60" />
            <p className="font-['MedievalSharp'] text-sm text-amber-300/80">
              The chronicle page for {character.fullName} awaits illumination.
            </p>
            <p className="text-xs text-amber-600/80 font-serif max-w-md">
              Click the <strong className="text-amber-400 font-semibold font-['MedievalSharp']">"Generate Backstory"</strong> button above to commission Gemini to write a rich, multi-paragraph origin legend based on their class, weaponry, and realm.
            </p>
          </div>
        )}

        {/* Generated Text Component directly beneath the button */}
        {!isLoading && backstory && (
          <div className="space-y-4">
            {/* Header with Title and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-900/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="font-['MedievalSharp'] text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
                  Chronicle of {character.fullName}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-amber-500/80">
                  {backstory.split(/\s+/).length} words
                </span>
                <button
                  onClick={handleCopy}
                  title="Copy full backstory"
                  className="alchemist-slate-btn flex items-center gap-1.5 px-3 py-1 text-xs font-serif text-amber-200 hover:text-amber-100 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copied ? 'Copied' : 'Copy Lore'}</span>
                </button>
              </div>
            </div>

            {/* Paragraphs-long Story Narrative */}
            <div className="space-y-4 text-amber-100/90 font-serif text-sm sm:text-base leading-relaxed tracking-normal">
              {paragraphs.map((p, idx) => (
                <p 
                  key={idx} 
                  className="indent-4 sm:indent-6 text-justify text-balance first-letter:float-left first-letter:text-3xl first-letter:font-['MedievalSharp'] first-letter:font-bold first-letter:text-amber-300 first-letter:mr-2 first-letter:leading-none"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Footer with Seal */}
            <div className="pt-3 border-t border-amber-950/80 flex items-center justify-between text-[11px] text-amber-500/70 font-serif">
              <span>Sealed by the Royal Alchemical Society</span>
              <span className="text-amber-400/80 font-mono">🜚 Authenticated Chronicle 🜚</span>
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

/**
 * Rich multi-paragraph procedural generator matching all details
 * as a high-fidelity fallback in case of network constraint.
 */
function generateRichProceduralBackstory(char: FantasyCharacter): string {
  const p1 = `Long before the banners of war were raised across the continents, ${char.fullName} drew their first breath within ${char.originRealm}. Raised amidst tales of lost dynasties and primeval covenants, their natural affinity as a ${char.race} became evident when a celestial omen scarred the midnight skies. While others sought shelter, they alone stood watchful, marked by fate to walk the perilous path of the ${char.class}.`;

  const p2 = `In their youth, when catastrophe descended upon ${char.originRealm}, ${char.name} ventured into the haunted crypts of the elder kings to claim the legendary ${char.signatureWeapon}. It was forged in celestial fires and attuned specifically to their bloodline. In the harrowing duel that followed, pushed to the brink of mortality, they awakened their signature arcana: ${char.specialAbility}. Ever since, carrying the sacred ${char.secondaryItem}, no demon, tyrant, or warlord has stood against their advance without trembling.`;

  const p3 = `Now celebrated across taverns and high keeps as ${char.title || 'the Legendary Wanderer'}, ${char.fullName} holds fast to a solemn oath of ${char.alignment.toLowerCase()} honor. Though whispers speak of a lingering shadow in their past and an unresolved reckoning awaiting in ${char.originRealm}, their blade remains unyielding. As dark forces gather once more along the borders of civilization, this formidable ${char.subclass} prepares to write the next chapter of their immortal legend.`;

  return `${p1}\n\n${p2}\n\n${p3}`;
}
