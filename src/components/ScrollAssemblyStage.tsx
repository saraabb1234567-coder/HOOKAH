import React, { useRef, useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { HookahVisualizer } from './HookahVisualizer';
import { Layers, Sparkles } from 'lucide-react';

export const ScrollAssemblyStage: React.FC = () => {
  const { assemblySteps } = useData();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isHoveredStep, setIsHoveredStep] = useState<number | null>(null);

  // Monitor continuous scroll progress through the sticky track
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(progress);

      const stepIdx = Math.min(8, Math.floor(progress * 9));
      setActiveStepIndex(stepIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToStep = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetProgress = (index + 0.5) / 9;
    const targetY = container.offsetTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const currentComponent = assemblySteps[activeStepIndex] || assemblySteps[0];

  return (
    <div
      id="assembly"
      ref={containerRef}
      className="relative w-full bg-[#06080D]"
      style={{ height: '520vh' }}
    >
      {/* Sticky Cinematic Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6 select-none">
        {/* Ambient background light gradients reacting to progress */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(0, 242, 254, ${0.05 + scrollProgress * 0.12}) 0%, rgba(7, 9, 14, 0.95) 75%)`,
          }}
        />

        {/* Stage Header Info Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between pt-16 sm:pt-20">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Бүтээгдэхүүний Дараалсан Угсралт</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400">9-өөс {activeStepIndex + 1}-р алхам</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight mt-1">
              {currentComponent?.title || currentComponent?.componentName}
            </h2>
          </div>

          {/* Assembly completion percentage indicator */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">Угсралтын явц</span>
              <span className="text-lg font-bold font-mono text-cyan-400 tabular-nums">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border border-cyan-500/20 glass-panel-subtle flex items-center justify-center text-xs font-mono font-bold text-cyan-400">
              0{activeStepIndex + 1}
            </div>
          </div>
        </div>

        {/* Center Sticky Hookah Stage */}
        <div className="relative z-20 flex-1 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 my-auto">
          {/* Left Info Card (Desktop) in Natural Mongolian */}
          <div className="w-full md:w-80 order-2 md:order-1 glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-500/15 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
              <span className="tracking-widest">АЛХАМ 0{activeStepIndex + 1}</span>
              <span className="text-slate-500">{currentComponent?.shortLabel}</span>
            </div>
            <h3 className="text-lg font-bold font-display text-white mb-1">
              {currentComponent?.subtitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
              {currentComponent?.description}
            </p>

            <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span className="font-mono">Материал</span>
                <span className="text-slate-200 text-right">{currentComponent?.material}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="font-mono">Техник үзүүлэлт</span>
                <span className="text-cyan-300 text-right">{currentComponent?.specs}</span>
              </div>
            </div>

            {/* Hint for continuous scroll in Mongolian */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Дараагийн хэсгийг залгахын тулд доош гүйлгэнэ үү</span>
            </div>
          </div>

          {/* Centered 2.5D Animated Hookah Visualizer */}
          <div className="relative w-full max-w-[460px] aspect-[4/5] order-1 md:order-2 flex items-center justify-center">
            <HookahVisualizer
              assemblyProgress={scrollProgress}
              explodedProgress={0}
              heatActivated={scrollProgress > 0.88}
              smokeIntensity={scrollProgress > 0.88 ? 0.4 : 0}
              showLabels={true}
              highlightedComponentId={
                isHoveredStep !== null ? assemblySteps[isHoveredStep]?.id : currentComponent?.id
              }
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Bottom Interactive Step Navigation Scrubber */}
        <div className="relative z-20 max-w-5xl mx-auto w-full pb-4">
          {/* Continuous progress track bar */}
          <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-white/5 mb-3">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-300 transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* 9 Step Pills / Quick Scrub Buttons with Mongolian Labels */}
          <div className="grid grid-cols-9 gap-1 sm:gap-2">
            {assemblySteps.map((step, idx) => {
              const isPast = idx < activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => handleJumpToStep(idx)}
                  onMouseEnter={() => setIsHoveredStep(idx)}
                  onMouseLeave={() => setIsHoveredStep(null)}
                  className={`group py-2 px-1 rounded-lg text-center transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-500/20'
                      : isPast
                      ? 'bg-slate-900/40 border-cyan-500/20 text-slate-400 hover:text-white'
                      : 'bg-slate-900/20 border-white/5 text-slate-500 hover:text-slate-300'
                  }`}
                  title={`${step.title} (${step.subtitle})`}
                >
                  <div className="text-[10px] sm:text-xs font-mono font-bold block">
                    0{idx + 1}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-sans truncate hidden sm:block tracking-tighter">
                    {step.shortLabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
