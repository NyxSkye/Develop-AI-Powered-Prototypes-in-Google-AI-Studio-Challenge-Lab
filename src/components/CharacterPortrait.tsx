import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Wand2, Shield, Swords, Zap, Sun, TreePine, Music, Eye, Flame, Compass, ShieldAlert } from 'lucide-react';
import { FantasyCharacter, CharacterClassType } from '../types/character';
import { getCartoonPortraitForCharacter, CARTOON_PORTRAITS } from '../utils/portraitGenerator';
import { playRollSound } from '../utils/audio';

interface CharacterPortraitProps {
  character: FantasyCharacter;
  onUpdatePortrait: (url: string, styleName: string) => void;
  isRolling: boolean;
  soundEnabled: boolean;
}

const CLASS_ICONS: Record<CharacterClassType, React.ElementType> = {
  Warrior: Shield,
  Mage: Sparkles,
  Rogue: Zap,
  Ranger: Compass,
  Cleric: Sun,
  Paladin: ShieldAlert,
  Druid: TreePine,
  Bard: Music,
  Warlock: Eye,
  Monk: Flame,
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  onUpdatePortrait,
  isRolling,
  soundEnabled,
}) => {
  const [variantCount, setVariantCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStyle, setActiveStyle] = useState<string>('Cartoon Video Game Art');

  const ClassIcon = CLASS_ICONS[character.class] || Swords;

  // Reset or initialize portrait when character ID changes
  useEffect(() => {
    // When a brand new character is rolled, match the cartoon portrait for their class
    const initial = getCartoonPortraitForCharacter(character, 0);
    setActiveStyle(initial.styleName);
    onUpdatePortrait(initial.url, initial.styleName);
    setVariantCount(0);
  }, [character.id, character.class]);

  // Handler for 'Generate' button
  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    playRollSound(!soundEnabled);

    setTimeout(() => {
      // Create cartoon / video game style portrait matching current character
      const portrait = getCartoonPortraitForCharacter(character, variantCount);
      setActiveStyle(portrait.styleName);
      onUpdatePortrait(portrait.url, portrait.styleName);
      setIsGenerating(false);
    }, 280);
  };

  // Handler for 'Regenerate' button
  const handleRegenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    playRollSound(!soundEnabled);

    const nextVariant = variantCount + 1;
    setVariantCount(nextVariant);

    setTimeout(() => {
      // Cycle to new variation matching the current character's details
      const portrait = getCartoonPortraitForCharacter(character, nextVariant);
      setActiveStyle(portrait.styleName);
      onUpdatePortrait(portrait.url, portrait.styleName);
      setIsGenerating(false);
    }, 280);
  };

  const currentDisplayUrl = 
    character.customPortraitUrl || 
    character.portraitUrl || 
    (CARTOON_PORTRAITS[character.class] ? CARTOON_PORTRAITS[character.class][0] : undefined);

  return (
    <div className="flex flex-col items-center w-full max-w-[320px] mx-auto">
      {/* 1. Image Component displaying the character portrait */}
      <div 
        className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-stone-700/80 bg-stone-950 shadow-2xl group transition-all duration-300"
        style={{
          boxShadow: `0 10px 30px -10px ${character.accentColor}33`,
          borderColor: isGenerating ? character.accentColor : undefined,
        }}
      >
        {currentDisplayUrl ? (
          <img
            src={currentDisplayUrl}
            alt={`Cartoon video game portrait of ${character.fullName}, ${character.race} ${character.class}`}
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-300 ${
              isGenerating || isRolling ? 'scale-105 filter blur-[2px] opacity-60' : 'scale-100 filter-none opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-500 bg-stone-900">
            <ClassIcon className="w-20 h-20 text-stone-600 mb-2" />
            <span className="font-serif text-sm text-stone-400">{character.class}</span>
          </div>
        )}

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20 pointer-events-none" />

        {/* Shimmer loading effect while generating */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/70 backdrop-blur-xs">
            <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
            <span className="font-serif text-xs text-amber-200 mt-2 tracking-wider">
              Forging Portrait...
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-950/85 backdrop-blur-sm border border-stone-800 text-stone-200 font-mono text-[11px]">
            <ClassIcon className="w-3.5 h-3.5" style={{ color: character.accentColor }} />
            <span>{character.class}</span>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-stone-950/85 backdrop-blur-sm border border-stone-800 text-[10px] font-mono text-amber-400">
            Video Game Style
          </div>
        </div>

        {/* Bottom Details Banner */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
          <div className="px-2.5 py-1 rounded-md bg-stone-950/90 backdrop-blur-sm border border-stone-800/80 text-[11px] text-stone-300 font-serif truncate max-w-[200px]">
            {character.name} · {character.race}
          </div>
          <div className="px-2 py-0.5 rounded-md bg-stone-900/90 backdrop-blur-sm border border-stone-800 text-[10px] font-mono text-stone-400">
            Lvl {character.level}
          </div>
        </div>
      </div>

      {/* Style Label Indicator */}
      <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-stone-400">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span className="font-medium text-stone-300">{activeStyle}</span>
      </div>

      {/* 2. Two Buttons Directly Under the Image Component */}
      <div className="grid grid-cols-2 gap-2.5 w-full mt-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || isRolling}
          id="portrait-generate-btn"
          aria-label="Generate cartoon or video game portrait matching current character"
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-stone-950 font-semibold text-xs rounded-xl shadow-md shadow-amber-950/40 border border-amber-300/40 transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          <Wand2 className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Generate</span>
        </button>

        <button
          onClick={handleRegenerate}
          disabled={isGenerating || isRolling}
          id="portrait-regenerate-btn"
          aria-label="Regenerate cartoon or video game portrait variant matching current character"
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-stone-850 hover:bg-stone-800 active:scale-[0.98] text-stone-200 hover:text-white font-semibold text-xs rounded-xl border border-stone-700/80 hover:border-amber-500/50 shadow-md transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>Regenerate</span>
        </button>
      </div>
    </div>
  );
};
