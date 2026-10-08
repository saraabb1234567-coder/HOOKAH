import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { HookahVisualizer } from './HookahVisualizer';
import { Binary, Sliders, Info, ShieldCheck } from 'lucide-react';

export const ExplodedViewSection: React.FC = () => {
  const { assemblySteps, websiteContent } = useData();
  const [explosionAmount, setExplosionAmount] = useState(0.85);
  const [selectedCompId, setSelectedCompId] = useState<string>(assemblySteps[6]?.id || 'bowl');
  const [interactiveTilt, setInteractiveTilt] = useState({ x: 0, y: 0 });

  const activeComp = assemblySteps.find((c) => c.id === selectedCompId) || assemblySteps[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setInteractiveTilt({ x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setInteractiveTilt({ x: 0, y: 0 });
  };

  return (
    <section id="exploded" className="relative min-h-screen py-24 px-6 bg-[#05070B] overflow-hidden">
      {/* Background technical radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#00F2FE 1px, transparent 1px), linear-gradient(90deg, #00F2FE 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header in Mongolian */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 tracking-widest mb-3">
            <Binary className="w-3.5 h-3.5" />
            <span>{websiteContent.explodedSubtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight uppercase">
            {websiteContent.explodedTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            {websiteContent.explodedDescription}
          </p>
        </div>

        {/* Exploded Layout: Interactive Stage + Technical Specification Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Component Quick Selection List */}
          <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-2">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest px-2 mb-1 flex items-center justify-between">
              <span>Бүрдэл хэсгүүд ({assemblySteps.length})</span>
              <span className="text-cyan-400">Хэсэг сонгох</span>
            </div>

            {assemblySteps.map((comp) => {
              const isSelected = comp.id === selectedCompId;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompId(comp.id)}
                  className={`p-3 rounded-xl text-left transition-all cursor-pointer border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#0A0E17]/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10'
                  }`}
                >
                  <div>
                    <div className="text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                      0{comp.stepNumber} · {comp.shortLabel}
                    </div>
                    <div className="text-sm font-semibold text-slate-200 mt-0.5 truncate max-w-[180px]">
                      {comp.title || comp.componentName}
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-cyan-400 scale-125' : 'bg-slate-700'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Center Column: Exploded Stage with 3D Tilt & SVG Visualizer */}
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 order-1 lg:order-2 relative flex flex-col items-center justify-center p-4 rounded-3xl glass-panel-subtle border border-cyan-500/15"
          >
            {/* Visualizer Stage */}
            <div className="relative w-full max-w-[500px] aspect-[4/5] flex items-center justify-center">
              <HookahVisualizer
                assemblyProgress={1}
                explodedProgress={explosionAmount}
                heatActivated={false}
                smokeIntensity={0}
                showLabels={true}
                highlightedComponentId={selectedCompId}
                interactiveTilt={interactiveTilt}
                className="w-full h-full"
              />
            </div>

            {/* Exploded Separation Slider Bar */}
            <div className="w-full max-w-sm mt-4 p-3 rounded-xl glass-panel border border-white/5 flex items-center gap-3 text-xs font-mono">
              <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-400 shrink-0">Задлах түвшин:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explosionAmount}
                onChange={(e) => setExplosionAmount(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
                aria-label="Задлах түвшин тохируулах"
              />
              <span className="text-cyan-400 font-bold tabular-nums w-10 text-right">
                {Math.round(explosionAmount * 100)}%
              </span>
            </div>
          </div>

          {/* Right Column: Active Component Deep Technical Specs */}
          <div className="lg:col-span-3 order-3 flex flex-col">
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Техникийн деталь</span>
                </span>
                <span className="bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded text-[10px]">
                  АЛХАМ 0{activeComp?.stepNumber}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  {activeComp?.title || activeComp?.componentName}
                </h3>
                <p className="text-xs text-cyan-300 font-mono mt-0.5">
                  {activeComp?.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {activeComp?.description}
              </p>

              <div className="pt-3 border-t border-white/10 space-y-3">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Материалын бүтэц
                  </span>
                  <span className="text-xs text-white font-medium block mt-0.5">
                    {activeComp?.material}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Инженерийн нарийвчлал
                  </span>
                  <span className="text-xs text-cyan-300 font-mono block mt-0.5">
                    {activeComp?.specs}
                  </span>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>100% Чанарын баталгаажуулалттай</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
