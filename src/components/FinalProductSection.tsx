import React, { useState, useEffect } from 'react';
import { COLOR_THEMES, ColorTheme } from '../types/hookah';
import { HookahVisualizer } from './HookahVisualizer';
import { Sparkles, Palette, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface FinalProductSectionProps {
  onOpenDrawer: () => void;
}

export const FinalProductSection: React.FC<FinalProductSectionProps> = ({ onOpenDrawer }) => {
  const { websiteContent } = useData();
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(COLOR_THEMES[0]);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    let frameId: number;
    let t = 0;
    const animate = () => {
      t += 0.015;
      setRotationAngle(Math.sin(t) * 0.8);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative min-h-screen py-28 px-6 bg-radial from-[#090D16] via-[#07090E] to-[#040508] overflow-hidden flex flex-col justify-center items-center">
      {/* Background ambient radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[170px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: selectedTheme.accentHex }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center text-center">
        {/* Section Sub-header */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{websiteContent.finalSubtitle}</span>
        </div>

        {/* Priority 1 translation: "ТАНЫ HOOKAH. ТАНЫ МЭДРЭМЖ." */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-none">
          {websiteContent.finalTitle.split('.')[0] || 'ТАНЫ HOOKAH'}.<br />
          <span className="text-gradient-cyan">
            {websiteContent.finalTitle.split('.')[1] || 'ТАНЫ МЭДРЭМЖ.'}
          </span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-300 font-light max-w-xl mx-auto">
          {websiteContent.finalDescription}
        </p>

        {/* Central Assembled Visualizer with Slow Cinematic Rotation & Soft Cyan Glow */}
        <div className="relative w-full max-w-lg aspect-[4/5] my-6 flex items-center justify-center">
          <HookahVisualizer
            assemblyProgress={1}
            explodedProgress={0}
            heatActivated={true}
            smokeIntensity={0.65}
            ledTheme={selectedTheme}
            interactiveTilt={{ x: rotationAngle, y: 0 }}
            className="w-full h-full scale-100 drop-shadow-2xl"
          />
        </div>

        {/* Interactive LED Color Selector in Mongolian */}
        <div className="glass-panel py-3 px-5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Palette className="w-4 h-4 text-cyan-400" />
            <span>Гэрэлтүүлгийн өнгө:</span>
          </div>

          <div className="flex items-center gap-2.5">
            {COLOR_THEMES.map((theme) => {
              const isSelected = theme.id === selectedTheme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-7 h-7 rounded-full transition-all cursor-pointer relative flex items-center justify-center ${
                    isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: theme.accentHex,
                    boxShadow: isSelected ? `0 0 15px ${theme.accentHex}` : 'none',
                  }}
                  title={theme.name}
                  aria-label={`${theme.name} өнгө сонгох`}
                />
              );
            })}
          </div>

          <span className="text-xs font-mono text-cyan-300 font-medium hidden sm:inline">
            {selectedTheme.name}
          </span>
        </div>

        {/* Priority 1 CTA button: "ЗАГВАРУУДТАЙ ТАНИЛЦАХ" */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenDrawer}
            className="px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-cyan-400/25 active:scale-95 cursor-pointer flex items-center gap-2.5"
          >
            <span>{websiteContent.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
