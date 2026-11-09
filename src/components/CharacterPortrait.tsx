import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Wand2, Shield, Swords, Zap, Sun, TreePine, Music, Eye, Flame, Compass, ShieldAlert, FlaskConical } from 'lucide-react';
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

  useEffect(() => {
    const initial = getCartoonPortraitForCharacter(character, 0);
    setActiveStyle(initial.styleName);
    onUpdatePortrait(initial.url, initial.styleName);
    setVariantCount(0);
  }, [character.id, character.class]);

  const handleGenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    playRollSound(!soundEnabled);

    setTimeout(() => {
      const portrait = getCartoonPortraitForCharacter(character, variantCount);
      setActiveStyle(portrait.styleName);
      onUpdatePortrait(portrait.url, portrait.styleName);
      setIsGenerating(false);
    }, 280);
  };

  const handleRegenerate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    playRollSound(!soundEnabled);

    const nextVariant = variantCount + 1;
    setVariantCount(nextVariant);

    setTimeout(() => {
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
      {/* 1. Image Component: Ancient Alchemist Scrying Mirror Frame */}
      <div 
        className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-amber-600/60 bg-stone-950 shadow-2xl group transition-all duration-300"
        style={{
          boxShadow: `0 12px 36px -10px ${character.accentColor}44, inset 0 0 20px rgba(0,0,0,0.8)`,
          borderColor: isGenerating ? '#f59e0b' : 'rgba(217, 119, 6, 0.55)',
        }}
      >
        {/* Brass Filigree Corner Ornaments */}
        <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-400/80 z-20 pointer-events-none" />
        <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400/80 z-20 pointer-events-none" />
        <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400/80 z-20 pointer-events-none" />
        <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400/80 z-20 pointer-events-none" />

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
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-amber-500/50 bg-stone-950">
            <ClassIcon className="w-20 h-20 text-amber-600/40 mb-2" />
            <span className="font-['MedievalSharp'] text-sm text-amber-400">{character.class}</span>
          </div>
        )}

        {/* Ambient Dark Alchemist Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-stone-950/25 pointer-events-none" />

        {/* Shimmer loading effect while generating */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-xs z-30">
            <FlaskConical className="w-8 h-8 text-amber-400 animate-bounce" />
            <span className="font-['MedievalSharp'] text-xs text-amber-200 mt-2 tracking-widest uppercase">
              Transmuting Portrait...
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs pointer-events-none z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-950/90 backdrop-blur-sm border border-amber-800/70 text-amber-200 font-serif text-[11px] shadow-sm">
            <ClassIcon className="w-3.5 h-3.5" style={{ color: character.accentColor }} />
            <span>{character.class}</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-stone-950/90 backdrop-blur-sm border border-amber-800/70 text-[10px] font-mono text-amber-400">
            Game Avatar
          </div>
        </div>

        {/* Bottom Details Banner with Stylized Font */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs pointer-events-none z-10">
          <div className="px-2.5 py-1 rounded bg-stone-950/90 backdrop-blur-sm border border-amber-800/70 text-[11px] text-amber-200 font-['MedievalSharp'] tracking-wide truncate max-w-[200px]">
            {character.name} · {character.race}
          </div>
          <div className="px-2 py-0.5 rounded bg-stone-900/90 backdrop-blur-sm border border-amber-800/70 text-[10px] font-mono text-amber-400">
            Lvl {character.level}
          </div>
        </div>
      </div>

      {/* Style Label Indicator styled in parchment tones */}
      <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-amber-400/80 font-serif">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span className="font-medium text-amber-200/90">{activeStyle}</span>
      </div>

      {/* 2. Two Buttons Directly Under the Image: Generate & Regenerate */}
      <div className="grid grid-cols-2 gap-2.5 w-full mt-3">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || isRolling}
          id="portrait-generate-btn"
          aria-label="Generate cartoon or video game portrait matching current character"
          className="alchemist-brass-btn flex items-center justify-center gap-2 py-2.5 px-4 text-amber-50 font-['MedievalSharp'] font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          <Wand2 className={`w-3.5 h-3.5 text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${isGenerating ? 'animate-spin' : ''}`} />
          <span className="tracking-wide text-amber-50 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-bold">Generate</span>
        </button>

        <button
          onClick={handleRegenerate}
          disabled={isGenerating || isRolling}
          id="portrait-regenerate-btn"
          aria-label="Regenerate cartoon or video game portrait variant matching current character"
          className="alchemist-slate-btn flex items-center justify-center gap-2 py-2.5 px-4 text-amber-200 hover:text-amber-100 font-['MedievalSharp'] font-bold text-xs rounded-xl transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isGenerating ? 'animate-spin' : ''}`} />
          <span className="tracking-wide">Regenerate</span>
        </button>
      </div>
    </div>
  );
};
