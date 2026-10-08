import React, { useState } from 'react';
import { Flame, Wind, Sliders } from 'lucide-react';
import { HookahVisualizer } from './HookahVisualizer';
import { useData } from '../context/DataContext';

export const ActivationSection: React.FC = () => {
  const { websiteContent } = useData();
  const [heatState, setHeatState] = useState<'idle' | 'ignited'>('ignited');
  const [smokeDensity, setSmokeDensity] = useState(0.8);

  return (
    <section id="activation" className="relative min-h-screen py-24 px-6 bg-[#06080D] overflow-hidden flex flex-col justify-center items-center">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Section Sub-header in Natural Mongolian */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-amber-400 tracking-widest mb-3">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{websiteContent.activationTagline}</span>
          </div>

          {/* Mongolian: "ЭХЛҮҮЛЭХЭД БЭЛЭН" -> "ТАНСАГ МЭДРЭМЖ ЭХЭЛЛЭЭ" */}
          <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight text-balance uppercase">
            {websiteContent.activationTitle}
          </h2>
          <p className="mt-3 text-lg sm:text-xl text-cyan-300 font-light font-display tracking-widest uppercase">
            {websiteContent.activationSubtitle}
          </p>
        </div>

        {/* Central visualizer with charcoal embers and volumetric smoke */}
        <div className="relative w-full max-w-lg aspect-[4/5] my-4 flex items-center justify-center">
          <HookahVisualizer
            assemblyProgress={1}
            explodedProgress={0}
            heatActivated={heatState === 'ignited'}
            smokeIntensity={heatState === 'ignited' ? smokeDensity : 0}
            className="w-full h-full"
          />

          {/* Interactive floating control panel */}
          <div className="absolute bottom-4 right-4 glass-panel p-4 rounded-xl border border-white/10 shadow-xl max-w-[220px] text-xs">
            <div className="flex items-center justify-between font-mono text-slate-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-cyan-400" />
                <span>Утааны нягтрал</span>
              </span>
              <span className="text-cyan-400 font-bold">{Math.round(smokeDensity * 100)}%</span>
            </div>

            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={smokeDensity}
              onChange={(e) => setSmokeDensity(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer mb-3"
              aria-label="Утааны нягтрал тохируулах"
            />

            <button
              onClick={() => setHeatState(heatState === 'ignited' ? 'idle' : 'ignited')}
              className={`w-full py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                heatState === 'ignited'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>{heatState === 'ignited' ? 'Нүүрс асаалттай (650°C)' : 'Нүүрс асаах'}</span>
            </button>
          </div>
        </div>

        {/* Mongolian: "ЗӨӨЛӨН. ТАНСАГ. МАРТАГДАШГҮЙ." */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            <span>Өтгөн Утааны Сарнилт</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-wider uppercase">
            ЗӨӨЛӨН. ТАНСАГ. <span className="text-gradient-cyan">МАРТАГДАШГҮЙ.</span>
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            {websiteContent.activationDescription}
          </p>
        </div>
      </div>
    </section>
  );
};
