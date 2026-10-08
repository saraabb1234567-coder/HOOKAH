import React, { useState } from 'react';
import { ArrowDown, Sparkles, Shield, Cpu, Wind } from 'lucide-react';
import { HookahVisualizer } from './HookahVisualizer';
import { useData } from '../context/DataContext';

interface HeroSectionProps {
  onScrollToAssembly: () => void;
  onOpenDrawer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToAssembly, onOpenDrawer }) => {
  const { websiteContent } = useData();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between items-center overflow-hidden bg-radial from-[#0D121D] via-[#07090E] to-[#040508]"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Hero Typography & Proposition in Natural Mongolian */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 mt-4">
        {/* Unboxed natural kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-cyan-400/90 uppercase mb-4">
          <span>{websiteContent.heroKicker}</span>
        </div>

        {/* Priority 1 translation: "HOOKAH-Г ШИНЭЭР МЭДЭР" */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-display text-balance uppercase leading-none">
          {websiteContent.heroTitle}
        </h1>

        <p className="mt-5 text-lg sm:text-2xl text-slate-300 font-light max-w-xl mx-auto tracking-wide text-balance">
          {websiteContent.heroSubtitle}
        </p>

        {/* Mongolian quick highlight badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>{websiteContent.heroBadge1}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>{websiteContent.heroBadge2}</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>{websiteContent.heroBadge3}</span>
          </div>
        </div>
      </div>

      {/* Centered Hero Product Stage with 2.5D visual tilt and idle movement */}
      <div className="relative z-10 w-full max-w-lg px-4 my-2 flex items-center justify-center">
        <div className="relative w-full group cursor-pointer" onClick={onScrollToAssembly}>
          {/* Subtle floating glow */}
          <div className="absolute inset-0 bg-cyan-400/10 blur-2xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />

          {/* Fully assembled product visual with subtle movement & smoke */}
          <HookahVisualizer
            assemblyProgress={1}
            explodedProgress={0}
            heatActivated={true}
            smokeIntensity={0.6}
            interactiveTilt={tilt}
            className="w-full scale-95 group-hover:scale-100 transition-all duration-500"
          />

          {/* Interactive touch hint in Mongolian */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-cyan-500/20 text-[11px] font-mono text-cyan-300/90 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Курсороо хөдөлгөж эргүүлэх · Дарж угсралт руу шилжих
          </div>
        </div>
      </div>

      {/* Bottom CTA & Scroll Trigger */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onScrollToAssembly}
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-cyan-400/20 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Угсралттай танилцах</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>

          <button
            onClick={onOpenDrawer}
            className="px-6 py-3 rounded-xl glass-panel-subtle hover:bg-white/10 text-slate-200 font-semibold text-xs tracking-wider uppercase transition-all border border-white/10 active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Дэлгэрэнгүй үзүүлэлт</span>
          </button>
        </div>

        {/* The Prompt requirement in Mongolian: "ДООШ ГҮЙЛГЭЖ ТАНИЛЦАХ ↓" */}
        <button
          onClick={onScrollToAssembly}
          className="group flex flex-col items-center gap-2 text-xs font-mono tracking-widest text-slate-400 hover:text-cyan-400 transition-colors uppercase cursor-pointer mt-2"
        >
          <span>{websiteContent.scrollExploreText}</span>
          <div className="w-5 h-8 rounded-full border border-slate-600 group-hover:border-cyan-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
